<template>
  <v-app>
    <v-overlay
      v-model="loading"
      persistent
      contained
      z-index="2000"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="orange"
        indeterminate
        size="160"
        width="16"
      >
        <v-icon
          class="pulse"
          size="70"
        >
          mdi-timer-sand
        </v-icon>
      </v-progress-circular>
    </v-overlay>
    <confirmation-dialog-provider>
      <router-view />
    </confirmation-dialog-provider>
  </v-app>
  <item-dialog />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import ConfirmationDialogProvider from "./components/confirmationDialog/ConfirmationDialogProvider.vue";
import ItemDialog from "./components/itemDialog/ItemDialog.vue";
import { useAppStore } from "./store/app";

const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
</script>
