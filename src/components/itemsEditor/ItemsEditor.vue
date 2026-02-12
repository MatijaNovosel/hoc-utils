<template>
  <div class="d-flex flex-column align-start">
    <v-file-input
      accept=".json"
      label="Input file (json)"
      density="compact"
      prepend-icon="mdi-code-json"
      bg-color="grey-lighten-4"
      class="w-100"
      v-model="inputFile"
    />
    <v-text-field
      density="compact"
      label="Output file name"
      prepend-icon="mdi-folder"
      bg-color="grey-lighten-4"
      class="w-100"
      hide-details
      v-model="outputPath"
      @click="selectOutputPath"
      readonly
    />
    <v-btn
      :disabled="buttonShouldBeDisabled"
      rounded="6"
      class="mt-5 text-white text-capitalize align-self-end"
      color="orange"
    >
      Save
    </v-btn>
    <v-data-table
      class="mt-5"
      :headers="headers"
      :items="items"
      item-key="id"
    >
      <template #item.actions="row">
        <v-btn
          variant="text"
          rounded="0"
          @click="itemStore.editItem(row.item)"
        >
          Edit
        </v-btn>
        <v-btn
          variant="text"
          rounded="0"
          color="red"
        >
          Delete
        </v-btn>
      </template>
      <template #item.tag="{ value }">
        {{ ItemTagName[value] }}
      </template>
      <template #item.rarity="{ value }">
        <div class="d-flex">
          <v-icon
            :style="{
              color: ItemRarityData[value].color
            }"
            class="mr-2 rarity-circle"
          >
            mdi-circle
          </v-icon>
          <div>
            {{ ItemRarityData[value].name }}
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { ItemRarityData, ItemTagName } from "@/constants/game";
import { ItemModel } from "@/models/common";
import { useItemStore } from "@/store/item";
import { computed, ref, watch } from "vue";

const itemStore = useItemStore();

const inputFile = ref<File | null>(null);
const outputPath = ref<string>("");
const items = ref<ItemModel[]>([]);

const headers: any = computed(() => {
  let baseHeaders = [
    { title: "ID", align: "start", key: "id" },
    { title: "Name", align: "start", key: "name" },
    { title: "Description", align: "start", key: "description", maxWidth: "200px" },
    { title: "Tag", align: "start", key: "tag" }
  ];

  return [...baseHeaders, { title: "Actions", align: "center", key: "actions" }];
});

const selectOutputPath = async () => {
  //
};

const buttonShouldBeDisabled = computed(() => {
  return !inputFile.value || !outputPath.value;
});

watch(inputFile, async (file) => {
  if (!file) return;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);

    if (Array.isArray(parsed.items)) {
      items.value = parsed.items;
    } else {
      console.error("Invalid JSON format: 'items' array not found");
      items.value = [];
    }
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    items.value = [];
  }
});
</script>

<style lang="scss" scoped>
.tabs-content {
  flex-grow: 1;
}

.rarity-circle {
  border-radius: 100%;
  box-shadow: #00000026 1.95px 1.95px 2.6px;
}
</style>
