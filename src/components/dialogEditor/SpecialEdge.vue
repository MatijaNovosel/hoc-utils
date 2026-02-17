<template>
  <BaseEdge
    :path="path[0]"
    :style="edgeStyle"
  />
  <EdgeLabelRenderer>
    <div
      v-if="isFail"
      :style="{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        fontSize: '12px',
        padding: '2px 6px',
        borderRadius: '6px',
        background: '#e74c3c',
        color: 'white'
      }"
      class="nodrag nopan"
    >
      FAIL
    </div>
  </EdgeLabelRenderer>
</template>

<script setup lang="ts">
import { BaseEdge, EdgeLabelRenderer, getStraightPath, type EdgeProps } from "@vue-flow/core";
import { computed } from "vue";

const props = defineProps<EdgeProps>();

const path = computed(() => getStraightPath(props));

const isFail = computed(() => props.data?.kind === "fail");

const edgeStyle = computed(() => ({
  stroke: isFail.value ? "#e74c3c" : "#999",
  strokeWidth: isFail.value ? 2 : 1,
  strokeDasharray: isFail.value ? "6 4" : "0"
}));
</script>
