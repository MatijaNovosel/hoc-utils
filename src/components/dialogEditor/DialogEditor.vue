<template>
  <div class="dialog-editor">
    <vue-flow
      :nodes="nodes"
      :edges="edges"
      :default-edge-options="{ type: 'straight' }"
    >
      <template #node-special="specialNodeProps">
        <special-node v-bind="specialNodeProps" />
      </template>
      <template #edge-special="specialEdgeProps">
        <special-edge v-bind="specialEdgeProps" />
      </template>
    </vue-flow>
  </div>
</template>

<script lang="ts" setup>
import { Edge, Node, useVueFlow, VueFlow } from "@vue-flow/core";
import { onMounted, ref } from "vue";
import SpecialEdge from "./SpecialEdge.vue";
import SpecialNode from "./SpecialNode.vue";

import dialogueData from "./Dialogue.json";

type Trigger = { id: number; value: number };
type Choice = { id: string; text: string; nextStepId: string | null; triggers?: Trigger[] };
type Step = { id: string; nextStepId: string | null; text: string; choices: Choice[] };
type Dialogue = { id: string; npcId: number; startStepId: string; steps: Step[] };
type DialogueFile = { dialogues: Dialogue[] };

const { fitView } = useVueFlow();

const nodes = ref<Node[]>([]);
const edges = ref<Edge[]>([]);

function centerGraph() {
  setTimeout(() => {
    fitView({ padding: 0.2 });
  }, 100);
}

function parseChoiceText(text: string) {
  const skillMatch = text.match(/\[(.*?)\]/);
  const cleanText = text.replace(/<[^>]*>/g, "").trim();

  return {
    skill: skillMatch ? skillMatch[1] : null,
    cleanText
  };
}

function buildGraph() {
  const file = dialogueData as unknown as DialogueFile;
  const dialogue = file.dialogues[0];
  const stepMap = new Map(dialogue.steps.map((s) => [s.id, s]));

  nodes.value = [];
  edges.value = [];

  const levelHeight = 220;
  const siblingWidth = 320;

  const visitedSteps = new Set<string>();

  function layoutStep(stepId: string, depth: number, xOffset: number) {
    const step = stepMap.get(stepId);
    if (!step) return;

    const alreadyPlaced = visitedSteps.has(step.id);
    if (!alreadyPlaced) {
      const currentX = xOffset;
      const currentY = depth * levelHeight;

      nodes.value.push({
        id: step.id,
        type: "special",
        position: { x: currentX, y: currentY },
        data: {
          label: step.text,
          kind: "step"
        }
      });

      visitedSteps.add(step.id);
    }

    // @ts-ignore
    const stepNode = nodes.value.find((n) => n.id === step.id);
    const stepX = stepNode?.position?.x ?? xOffset;

    const choices = step.choices ?? [];
    let childOffset = stepX - ((choices.length - 1) * siblingWidth) / 2;

    choices.forEach((choice) => {
      const choiceId = choice.id;
      const choiceY = (depth + 1) * levelHeight;
      const choiceX = childOffset;

      const isDeadEnd = !choice.nextStepId;
      const parsed = parseChoiceText(choice.text);

      nodes.value.push({
        id: choiceId,
        type: "special",
        position: { x: choiceX, y: choiceY },
        data: {
          label: parsed.cleanText,
          kind: "choice",
          skill: parsed.skill,
          triggers: choice.triggers ?? [],
          deadEnd: isDeadEnd
        }
      });

      edges.value.push({
        id: `${step.id}-${choiceId}`,
        source: step.id,
        target: choiceId
      });

      if (choice.nextStepId) {
        edges.value.push({
          id: `${choiceId}-${choice.nextStepId}`,
          source: choiceId,
          target: choice.nextStepId
        });

        layoutStep(choice.nextStepId, depth + 2, choiceX);
      } else {
        edges.value.push({
          id: `${choiceId}-END`,
          source: choiceId,
          target: "END"
        });
      }

      childOffset += siblingWidth;
    });
  }

  nodes.value.push({
    id: "END",
    type: "output",
    position: { x: 0, y: 1000 },
    data: { label: "END" }
  });

  layoutStep(dialogue.startStepId, 0, 0);

  centerGraph();
}

onMounted(() => {
  buildGraph();
});
</script>

<style lang="scss" scoped>
.dialog-editor {
  width: 100vw;
  height: calc(100vh - 157px);
}
</style>
