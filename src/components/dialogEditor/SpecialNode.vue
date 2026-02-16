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

.ml-2 {
  margin-left: 8px;
}
</style>
