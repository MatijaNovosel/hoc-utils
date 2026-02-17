<template>
  <div
    class="node"
    :class="nodeClasses"
  >
    <div class="text">
      {{ data.label }}
    </div>
    <div
      v-if="hasTriggers"
      class="trigger-ctr"
    >
      <div
        v-for="(trigger, i) in data.triggers"
        :key="i"
        class="badge trigger ml-2"
      >
        {{ trigger }}
      </div>
    </div>
    <div
      v-if="Array.isArray(data.conditions) && data.conditions.length"
      class="cond-ctr"
    >
      <div
        v-for="(c, i) in data.conditions"
        :key="i"
        class="badge condition"
      >
        {{ formatCondition(c) }}
      </div>
    </div>
    <div class="actions nodrag nopan">
      <button
        v-if="data.kind === 'step'"
        class="btn"
        @click.stop="data.onAddChoice?.()"
      >
        + Choice
      </button>
      <button
        v-if="data.kind === 'choice' && !data.nextStepId"
        class="btn"
        @click.stop="data.onAddNextStep?.()"
      >
        + Success Step
      </button>
      <button
        v-if="data.kind === 'choice' && !data.onFailStepId"
        class="btn"
        @click.stop="data.onAddFailStep?.()"
      >
        + Fail Step
      </button>
    </div>
    <Handle
      type="target"
      :position="Position.Top"
    />
    <Handle
      type="source"
      :position="Position.Bottom"
    />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position, type NodeProps } from "@vue-flow/core";
import { computed } from "vue";

const props = defineProps<NodeProps>();

const formatCondition = (c: any) => {
  if (!c) return "";
  if (c.type === "stat") return `${c.stat} ${c.op} ${c.value}`;
  if (c.type === "flag") return `${c.key} ${c.op} ${String(c.value)}`;
  return "condition";
};

const nodeClasses = computed(() => ({
  step: props.data.kind === "step",
  choice: props.data.kind === "choice",
  branch: props.data.kind === "branch",
  dead: props.data.deadEnd,
  failStep: props.data.failStep === true
}));

const hasTriggers = computed(
  () => Array.isArray(props.data.triggers) && props.data.triggers.length > 0
);
</script>

<style lang="scss" scoped>
.node {
  width: 280px;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  font-size: 16px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.step {
  background: #0000ff86;
  color: white;
  border: 2px solid #3498db;
}

.choice {
  background: #ffffff85;
}

.dead {
  border: 2px solid #e74c3c;
  background: white;
}

.failStep {
  background: #e74c3c;
  border: 2px solid #c0392b;
  color: white;
}

.badge {
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  display: inline-block;
}

.skill {
  background: #9b59b6;
  color: white;
}

.trigger {
  background: #2ecc71;
  color: black;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn {
  border: 0;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.15);
}

.step .btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.choice .btn {
  background: rgba(0, 0, 0, 0.1);
}

.cond-ctr {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.condition {
  background: #f1c40f;
  color: black;
}
</style>
