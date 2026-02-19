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
    <div class="my-3 d-flex items-center align-center justify-space-between w-100">
      <div>
        {{ itemStore.activeItemFileName }}
      </div>
      <div>
        <v-btn
          rounded="6"
          class="text-white text-capitalize mr-3"
          color="green"
        >
          New item
        </v-btn>
        <v-btn
          :disabled="buttonShouldBeDisabled"
          rounded="6"
          class="text-white text-capitalize"
          color="orange"
        >
          Save
        </v-btn>
      </div>
    </div>
    <v-data-table
      class="item-table mt-5"
      :headers="headers"
      :items="items"
      :items-per-page="50"
      item-key="id"
    >
      <template #item.actions="row">
        <v-menu min-width="250">
          <template #activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              variant="text"
              v-bind="props"
            />
          </template>
          <v-list
            elevation="1"
            density="compact"
            min-width="250"
          >
            <v-list-item @click="itemStore.editItem(row.item)">
              <v-list-item-title> Edit </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title> Delete </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template #item.tag="{ value }">
        {{ ItemTagName[value] }}
      </template>
      <template #item.stats="{ value }">
        <div class="stat-ctr py-3">
          <div
            class="stat-ctr-item"
            v-for="(stat, i) in value"
            :key="i"
            :style="{
              backgroundColor: StatsData[i as number].color
            }"
          >
            {{ stat }}
          </div>
        </div>
      </template>
      <template #item.rarity="{ value }">
        <v-icon
          :style="{
            color: ItemRarityData[value].color
          }"
          class="mr-2 rarity-circle"
        >
          mdi-circle
        </v-icon>
      </template>
      <template #item.impactColor="{ value }">
        <v-icon
          :style="{
            color: `#${value || 'fff'}`
          }"
          class="mr-2 rarity-circle"
        >
          mdi-circle
        </v-icon>
      </template>
      <template #item.spritePath="{ value }">
        <div
          v-if="value"
          class="sprite"
          :style="getSpriteStyle(value)"
        />
      </template>
      <template #item.projectilePath="{ value }">
        <div
          class="sprite-proj"
          :style="getProjectileSpriteStyle(value)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import {
  accessoryItemCoordinates,
  ItemRarityData,
  ItemTagName,
  projectileCoordinates,
  StatsData,
  weaponItemCoordinates
} from "@/constants/game";
import { ItemModel } from "@/models/common";
import { useItemStore } from "@/store/item";
import { computed, ref, watch } from "vue";

const itemStore = useItemStore();

const inputFile = ref<File | null>(null);
const items = ref<ItemModel[]>([]);

const baseHeaders = [
  { title: "ID", align: "start", key: "id" },
  { title: "Name", align: "start", key: "name" },
  { title: "Description", align: "start", key: "description", maxWidth: "400px" },
  { title: "Sprite", align: "start", key: "spritePath" }
];

const headers: any = computed(() => {
  let headers = [...baseHeaders];

  if (["Weapons"].includes(itemStore.activeItemFileName)) {
    headers.push(
      { title: "Proj spr", align: "center", key: "projectilePath" },
      { title: "Rarity", align: "center", key: "rarity" },
      { title: "Dmg min", align: "start", key: "minDamage" },
      { title: "Dmg max", align: "start", key: "maxDamage" },
      { title: "Range", align: "start", key: "range" },
      { title: "Proj scale", align: "start", key: "projectileScale" },
      { title: "Proj degree", align: "start", key: "projectileDegree" },
      { title: "Impact color", align: "center", key: "impactColor" },
      { title: "Stats", align: "start", key: "stats" }
    );
  }

  if (["Accessories", "Armor"].includes(itemStore.activeItemFileName)) {
    headers.push(
      { title: "Rarity", align: "center", key: "rarity" },
      { title: "Stats", align: "start", key: "stats" }
    );
  }

  return [...headers, { title: "Actions", align: "center", key: "actions" }];
});

const buttonShouldBeDisabled = computed(() => {
  return !inputFile.value;
});

const activeCoordinates = computed(() => {
  let coordinates = weaponItemCoordinates;

  switch (itemStore.activeItemFileName.toLowerCase()) {
    case "weapons":
      return weaponItemCoordinates;
    case "accessories":
      return accessoryItemCoordinates;
  }

  return coordinates;
});

const getSpriteStyle = (path: string) => {
  const id = Number(path.split("_")[1]);
  const pos = activeCoordinates.value[id];

  if (!pos) return {};

  return {
    backgroundImage: `url("/${itemStore.activeItemFileName.toLowerCase()}.png")`,
    backgroundPosition: `${pos.x}px ${pos.y}px`
  };
};

const getProjectileSpriteStyle = (path?: string) => {
  if (!path) return {};
  const id = Number(path.split("_")[1]);
  const pos = projectileCoordinates[id];
  return {
    backgroundPosition: `${pos.x}px ${pos.y}px`
  };
};

watch(inputFile, async (file) => {
  if (!file) return;

  try {
    itemStore.activeItemFileName = file.name.split(".")[0];
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

.sprite {
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
}

.sprite-proj {
  width: 40px;
  height: 40px;
  background-image: url("/projectiles.png");
  background-repeat: no-repeat;
}

.item-table {
  border: 1px solid #80808050;
  border-radius: 8px;
}

.stat-ctr {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-items: center;
  gap: 4px;
  color: white;
  text-align: center;

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    font-weight: bold;
  }
}
</style>
