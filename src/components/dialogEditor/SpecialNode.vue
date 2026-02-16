<template>
  <div
    class="node"
    :class="nodeClasses"
  >
    <div class="text">
      {{ data.label }}
    </div>
    <div
      v-if="data.skill"
      class="badge skill"
    >
      {{ data.skill }}
    </div>
    <div
      v-if="data.rewardId"
      class="badge reward ml-2"
    >
      {{ data.rewardId }}
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

const nodeClasses = computed(() => ({
  step: props.data.kind === "step",
  choice: props.data.kind === "choice",
  dead: props.data.deadEnd
}));
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

.reward {
  background: #f39c12;
  color: black;
}
</style>
