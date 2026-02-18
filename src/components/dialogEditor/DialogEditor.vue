<template>
  <div class="dialog-editor">
    <v-btn
      class="fit-btn text-white"
      color="orange"
      rounded="6"
      @click="centerGraph"
    >
      Fit into view
    </v-btn>
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
import dagre from "dagre";
import { onMounted, ref } from "vue";
import SpecialEdge from "./SpecialEdge.vue";
import SpecialNode from "./SpecialNode.vue";

import { DialogueFile } from "@/models/dialog";
import dialogueData from "./Dialogue.json";

const { fitView } = useVueFlow();

const nodes = ref<Node[]>([]);
const edges = ref<Edge[]>([]);

const dialogueFile = ref<DialogueFile>(structuredClone(dialogueData as unknown as DialogueFile));

function updateStepText(stepId: string, text: string) {
  const dialogue = getDialogue();
  const step = dialogue.steps.find((s) => s.id === stepId);
  if (!step) return;

  step.text = text;

  // @ts-ignore
  const n = nodes.value.find((x) => x.id === stepId);
  if (n) n.data = { ...(n.data ?? {}), label: text };
}

function updateChoiceText(choiceId: string, text: string) {
  const dialogue = getDialogue();

  const parentStep = dialogue.steps.find((s) => (s.choices ?? []).some((c) => c.id === choiceId));
  if (!parentStep) return;

  const choice = (parentStep.choices ?? []).find((c) => c.id === choiceId);
  if (!choice) return;

  choice.text = text;

  const parsed = parseChoiceText(text);
  const n = nodes.value.find((x) => x.id === choiceId);
  if (n) {
    n.data = {
      ...(n.data ?? {}),
      label: parsed.cleanText,
      rawText: text
    };
  }
}

function addFailStepFromChoice(choiceId: string) {
  const dialogue = getDialogue();

  const parentStep = dialogue.steps.find((s) => (s.choices ?? []).some((c) => c.id === choiceId));
  if (!parentStep) return;

  const choice = (parentStep.choices ?? []).find((c) => c.id === choiceId);
  if (!choice) return;

  if (choice.onFailStepId) return;

  const newStepId = nextStepId(dialogue.id);

  dialogue.steps.push({
    id: newStepId,
    nextStepId: null,
    text: "Fail step",
    choices: []
  });

  choice.onFailStepId = newStepId;

  buildGraph();
}

function centerGraph() {
  setTimeout(() => {
    fitView({
      padding: 100,
      maxZoom: 1,
      minZoom: 0.5
    });
  }, 80);
}

function nodeHeight(n: Node) {
  const kind = n.data?.kind;
  if (kind === "branch") return 120;

  let h = kind === "choice" ? 240 : 260;

  const condCount = Array.isArray(n.data?.conditions) ? n.data.conditions.length : 0;
  const trigCount = Array.isArray(n.data?.triggers) ? n.data.triggers.length : 0;

  h += Math.ceil(condCount / 2) * 22;
  h += Math.ceil(trigCount / 2) * 22;
  h += 40;

  return Math.max(h, 160);
}

function nodeWidth(n: Node) {
  if (n.data?.kind === "branch") return 280;
  return 380;
}

function parseChoiceText(text: string) {
  const skillMatch = text.match(/\[(.*?)\]/);
  const cleanText = text.replace(/<[^>]*>/g, "").trim();
  return { skill: skillMatch ? skillMatch[1] : null, cleanText };
}

function getDialogue() {
  return dialogueFile.value.dialogues[0];
}

function nextStepId(dialogueId: string) {
  const dialogue = getDialogue();
  let max = 0;

  for (const s of dialogue.steps) {
    const parts = s.id.split(":");
    if (parts.length === 2 && parts[0] === dialogueId) {
      const n = Number(parts[1]);
      if (!Number.isNaN(n)) max = Math.max(max, n);
    }
  }
  return `${dialogueId}:${max + 1}`;
}

function nextChoiceId(stepId: string) {
  const dialogue = getDialogue();
  const step = dialogue.steps.find((s) => s.id === stepId);
  const choices = step?.choices ?? [];
  let max = 0;

  for (const c of choices) {
    const parts = c.id.split(":");
    const last = Number(parts[parts.length - 1]);
    if (!Number.isNaN(last)) max = Math.max(max, last);
  }

  return `${stepId}:${max + 1}`;
}

function addChoice(stepId: string) {
  const dialogue = getDialogue();
  const step = dialogue.steps.find((s) => s.id === stepId);
  if (!step) return;

  step.choices = step.choices ?? [];

  step.choices.push({
    id: nextChoiceId(stepId),
    text: "New choice",
    nextStepId: null,
    triggers: []
  });

  buildGraph();
}

function addNextStepFromChoice(choiceId: string) {
  const dialogue = getDialogue();

  const parentStep = dialogue.steps.find((s) => (s.choices ?? []).some((c) => c.id === choiceId));
  if (!parentStep) return;

  const choice = (parentStep.choices ?? []).find((c) => c.id === choiceId);

  if (!choice) return;
  if (choice.nextStepId) return;

  const dialogueId = dialogue.id;
  const newStepId = nextStepId(dialogueId);

  dialogue.steps.push({
    id: newStepId,
    nextStepId: null,
    text: "New step",
    choices: []
  });

  choice.nextStepId = newStepId;

  buildGraph();
}

function applyDagreLayout(direction: "TB" | "LR" = "TB") {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));

  g.setGraph({
    rankdir: direction,
    ranksep: 10,
    nodesep: 50,
    edgesep: 10,
    marginx: 0,
    marginy: 0
  });

  for (const n of nodes.value) {
    // @ts-ignore
    g.setNode(n.id, { width: nodeWidth(n), height: nodeHeight(n) });
  }

  for (const e of edges.value) {
    g.setEdge(e.source, e.target);
  }

  dagre.layout(g);

  // @ts-ignore
  nodes.value = nodes.value.map((n) => {
    const p = g.node(n.id);
    if (!p) return n;

    const w = nodeWidth(n);
    const h = nodeHeight(n);

    return { ...n, position: { x: p.x - w / 2, y: p.y - h / 2 } };
  });
}

function buildGraph(firstIteration?: boolean) {
  const dialogue = dialogueFile.value.dialogues[0];
  const failTargetStepIds = new Set<string>();
  for (const s of dialogue.steps) {
    for (const c of s.choices ?? []) {
      if (c.onFailStepId) failTargetStepIds.add(c.onFailStepId);
    }
  }

  nodes.value = [];
  edges.value = [];

  nodes.value.push({
    id: "START",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: `START (Dialogue ${dialogue.id})`, kind: "start" }
  });

  edges.value.push({
    id: `START-${dialogue.startStepId}`,
    source: "START",
    target: dialogue.startStepId,
    data: { kind: "start" },
    type: "special"
  });

  (dialogue.startPoint ?? []).forEach((b, i) => {
    const branchId = `START_BRANCH_${i + 1}`;

    nodes.value.push({
      id: branchId,
      type: "special",
      position: { x: 0, y: 0 },
      data: {
        label: `BRANCH ${i + 1}`,
        kind: "branch",
        conditions: b.conditions ?? []
      }
    });

    edges.value.push({
      id: `START-${branchId}`,
      source: "START",
      target: branchId,
      data: { kind: "startBranch" },
      type: "special"
    });

    edges.value.push({
      id: `${branchId}-${b.startStepId}`,
      source: branchId,
      target: b.startStepId,
      data: { kind: "startBranchToStep" },
      type: "special"
    });
  });

  nodes.value.push({
    id: "END",
    type: "output",
    position: { x: 0, y: 0 },
    data: { label: "END", kind: "end" }
  });

  for (const step of dialogue.steps) {
    nodes.value.push({
      id: step.id,
      type: "special",
      position: { x: 0, y: 0 },
      data: {
        label: step.text,
        rawText: step.text,
        kind: "step",
        failStep: failTargetStepIds.has(step.id),
        onAddChoice: () => addChoice(step.id),
        onUpdateLabel: (val: string) => updateStepText(step.id, val)
      }
    });

    for (const choice of step.choices ?? []) {
      const parsed = parseChoiceText(choice.text);

      nodes.value.push({
        id: choice.id,
        type: "special",
        position: { x: 0, y: 0 },
        data: {
          label: parsed.cleanText,
          rawText: choice.text,
          kind: "choice",
          conditions: choice.conditions ?? [],
          triggers: choice.triggers ?? [],
          nextStepId: choice.nextStepId ?? null,
          onFailStepId: choice.onFailStepId ?? null,
          deadEnd: !choice.nextStepId && !choice.onFailStepId,
          onAddNextStep: () => addNextStepFromChoice(choice.id),
          onAddFailStep: () => addFailStepFromChoice(choice.id),
          onUpdateLabel: (val: string) => updateChoiceText(choice.id, val)
        }
      });

      edges.value.push({
        id: `${step.id}-${choice.id}`,
        source: step.id,
        target: choice.id,
        type: "special"
      });

      if (choice.nextStepId) {
        edges.value.push({
          id: `${choice.id}-${choice.nextStepId}`,
          source: choice.id,
          target: choice.nextStepId,
          type: "special",
          data: { kind: "success" }
        });
      }

      if (choice.onFailStepId) {
        edges.value.push({
          id: `${choice.id}-FAIL-${choice.onFailStepId}`,
          source: choice.id,
          target: choice.onFailStepId,
          type: "special",
          data: { kind: "fail" }
        });
      }

      if (!choice.nextStepId && !choice.onFailStepId) {
        edges.value.push({
          id: `${choice.id}-END`,
          source: choice.id,
          target: "END",
          type: "special",
          data: { kind: "end" }
        });
      }
    }
  }

  applyDagreLayout("TB");
  if (firstIteration) {
    centerGraph();
  }
}

onMounted(() => buildGraph(true));
</script>

<style lang="scss" scoped>
.dialog-editor {
  width: 100vw;
  height: calc(100vh - 157px);
}

.fit-btn {
  position: absolute;
  right: 15px;
  z-index: 9999;
}
</style>
