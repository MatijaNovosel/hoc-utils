<template>
  <v-container class="main-ctr">
    <div class="pb-5">
      <h2 class="pb-3 pl-2">HOC Utils</h2>
      <v-tabs
        v-model="tab"
        :disabled="appStore.loading"
        color="orange"
        bg-color="grey-lighten-5"
      >
        <v-tab
          :value="Tabs.Items"
          rounded="0"
          class="text-capitalize"
        >
          Items
        </v-tab>
        <v-tab
          :value="Tabs.Dialogue"
          rounded="0"
          class="text-capitalize"
        >
          Dialogue
        </v-tab>
      </v-tabs>
      <v-divider />
      <v-tabs-window
        v-model="tab"
        class="tabs-content pt-6"
      >
        <v-tabs-window-item :value="Tabs.Items"> <items-editor /> </v-tabs-window-item>
        <v-tabs-window-item :value="Tabs.Dialogue"> <dialog-editor /> </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import DialogEditor from "@/components/dialogEditor/DialogEditor.vue";
import ItemsEditor from "@/components/itemsEditor/ItemsEditor.vue";
import { useAppStore } from "@/store/app";
import { ref } from "vue";

const appStore = useAppStore();

enum Tabs {
  Items = "items",
  Dialogue = "dialogue"
}

const tab = ref(Tabs.Items);
</script>
