<template>
  <v-dialog
    width="1000"
    persistent
    :model-value="itemStore.dialog"
  >
    <v-card>
      <v-card-title class="d-flex items-center align-center pt-3 px-6">
        <span> Edit item </span>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="itemStore.closeDialog"
        />
      </v-card-title>
      <v-divider />
      <v-card-text class="pt-4"> {{ itemStore.activeItem }} </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useItemStore } from "@/store/item";

const itemStore = useItemStore();
</script>
