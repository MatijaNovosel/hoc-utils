<template>
  <v-dialog
    width="70%"
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
      <v-card-text class="pt-4">
        <div class="text-subtitle-2">Basic info</div>
        <v-row class="mt-1">
          <v-col
            cols="2"
            align="center"
            class="sprite-selection"
          >
            <div
              v-ripple
              class="sprite"
              :style="getSpriteStyle(itemStore.activeItem?.spritePath)"
            >
              <v-menu activator="parent">
                <v-card
                  max-width="500"
                  class="pa-4 sprite-selection-menu"
                >
                  <div
                    v-for="(_, i) in Object.entries(activeCoordinates)"
                    :key="i"
                    class="sprite select"
                    :style="getSpriteStyleByIdx(i)"
                    @click="selectItemSprite(i)"
                  />
                </v-card>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="itemStore.formData.id"
                  density="compact"
                  placeholder="Enter id"
                  hide-details="auto"
                  label="ID"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="itemStore.formData.name"
                  density="compact"
                  placeholder="Enter name"
                  hide-details="auto"
                  label="Name"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="itemStore.formData.rarity"
                  density="compact"
                  placeholder="Select rarity"
                  hide-details="auto"
                  label="Rarity"
                  :items="rarityItems"
                >
                  <template v-slot:item="{ props: itemProps, item }">
                    <v-list-item v-bind="itemProps">
                      <template #prepend>
                        <v-icon
                          :style="{
                            color: ItemRarityData[item.raw.value].color
                          }"
                          class="mr-2 rarity-circle"
                        >
                          mdi-circle
                        </v-icon>
                      </template>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ item }">
                    <div class="d-flex items-center align-center justify-center">
                      <v-icon
                        size="15px"
                        :style="{
                          color: ItemRarityData[item.raw.value].color
                        }"
                        class="mr-2 rarity-circle"
                      >
                        mdi-circle
                      </v-icon>
                      {{ item.raw.title }}
                    </div>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="itemStore.formData.tag"
                  disabled
                  density="compact"
                  placeholder="Select tag"
                  hide-details="auto"
                  label="Tag"
                  :items="tagItems"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="itemStore.formData.description"
              density="compact"
              placeholder="Enter description"
              hide-details="auto"
              label="Description"
            />
          </v-col>
        </v-row>
        <template v-if="itemType === 'weapons'">
          <div class="text-subtitle-2 mt-4">Weapon info</div>
          <v-row class="mt-1">
            <v-col
              cols="2"
              align="center"
              class="sprite-selection"
            >
              <div
                v-ripple
                class="sprite-proj"
                :style="getSpriteStyleProj(itemStore.activeItem?.projectilePath)"
              >
                <v-menu activator="parent">
                  <v-card
                    max-width="500"
                    class="pa-4 sprite-selection-menu"
                  >
                    <div
                      v-for="(_, i) in Object.entries(projectileCoordinates)"
                      :key="i"
                      class="sprite-proj select"
                      :style="getProjSpriteStyleByIdx(i)"
                      @click="selectItemProjectileSprite(i)"
                    />
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="10">
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="itemStore.formData.minDamage"
                    density="compact"
                    placeholder="Enter min damage"
                    hide-details="auto"
                    label="Min damage"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="itemStore.formData.maxDamage"
                    density="compact"
                    placeholder="Enter max damage"
                    hide-details="auto"
                    label="Max damage"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="itemStore.formData.projectileScale"
                    density="compact"
                    placeholder="Enter scale"
                    hide-details="auto"
                    label="Projectile scale"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="itemStore.formData.range"
                    density="compact"
                    placeholder="Enter range"
                    hide-details="auto"
                    label="Range"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="itemStore.formData.projectileDegree"
                    density="compact"
                    placeholder="Enter projectile degree"
                    hide-details="auto"
                    label="Projectile degree"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="itemStore.formData.impactColor"
                    density="compact"
                    placeholder="Enter impact color"
                    hide-details="auto"
                    label="Impact color"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </template>
        <div class="text-subtitle-2 mt-4">Stats</div>
        <v-row class="mt-1">
          <v-col cols="2">
            <span class="text-caption"> MGT </span>
            <v-text-field
              v-model="itemStore.formData.stats![Stats.MGT]"
              density="compact"
              placeholder="Enter MGT"
              hide-details="auto"
              :bg-color="StatsData[Stats.MGT].color"
            />
          </v-col>
          <v-col cols="2">
            <span class="text-caption"> ARM </span>
            <v-text-field
              v-model="itemStore.formData.stats![Stats.ARM]"
              density="compact"
              placeholder="Enter ARM"
              hide-details="auto"
              :bg-color="StatsData[Stats.ARM].color"
            />
          </v-col>
          <v-col cols="2">
            <span class="text-caption"> WIS </span>
            <v-text-field
              v-model="itemStore.formData.stats![Stats.WIS]"
              density="compact"
              placeholder="Enter WIS"
              hide-details="auto"
              :bg-color="StatsData[Stats.WIS].color"
            />
          </v-col>
          <v-col cols="2">
            <span class="text-caption"> STR </span>
            <v-text-field
              v-model="itemStore.formData.stats![Stats.STR]"
              density="compact"
              placeholder="Enter STR"
              hide-details="auto"
              :bg-color="StatsData[Stats.STR].color"
            />
          </v-col>
          <v-col cols="2">
            <span class="text-caption"> AGI </span>
            <v-text-field
              v-model="itemStore.formData.stats![Stats.AGI]"
              density="compact"
              placeholder="Enter AGI"
              hide-details="auto"
              :bg-color="StatsData[Stats.AGI].color"
            />
          </v-col>
          <v-col cols="2">
            <span class="text-caption"> SWF </span>
            <v-text-field
              v-model="itemStore.formData.stats![Stats.SWF]"
              density="compact"
              placeholder="Enter SWF"
              hide-details="auto"
              :bg-color="StatsData[Stats.SWF].color"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            align="end"
          >
            <v-btn
              rounded="6"
              class="text-white text-capitalize"
              color="orange"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  accessoryItemCoordinates,
  armorItemCoordinates,
  ItemRarityData,
  ItemTagName,
  projectileCoordinates,
  Stats,
  StatsData,
  weaponItemCoordinates
} from "@/constants/game";
import { useItemStore } from "@/store/item";
import { computed } from "vue";

const itemStore = useItemStore();

const itemType = computed(() => {
  return itemStore.activeItemFileName.toLowerCase();
});

const rarityItems = Object.entries(ItemRarityData).map((x) => ({
  title: x[1].name,
  value: Number(x[0])
}));

const tagItems = Object.entries(ItemTagName).map((x) => ({
  title: x[1],
  value: Number(x[0])
}));

const activeCoordinates = computed(() => {
  let coordinates = weaponItemCoordinates;

  switch (itemType.value) {
    case "weapons":
      return weaponItemCoordinates;
    case "accessories":
      return accessoryItemCoordinates;
    case "armor":
      return armorItemCoordinates;
  }

  return coordinates;
});

const getSpriteStyle = (path?: string) => {
  if (!path) return {};
  const id = Number(path.split("_")[1]);
  const pos = activeCoordinates.value[id];

  if (!pos) return {};

  return {
    backgroundImage: `url("/${itemType.value}.png")`,
    backgroundPosition: `${pos.x}px ${pos.y}px`
  };
};

const getSpriteStyleProj = (path?: string) => {
  if (!path) return {};
  const id = Number(path.split("_")[1]);
  const pos = projectileCoordinates[id];
  return {
    backgroundPosition: `${pos.x}px ${pos.y}px`
  };
};

const getSpriteStyleByIdx = (idx: number) => {
  const pos = activeCoordinates.value[idx];

  return {
    backgroundImage: `url("/${itemType.value}.png")`,
    backgroundPosition: `${pos.x}px ${pos.y}px`
  };
};

const getProjSpriteStyleByIdx = (idx: number) => {
  const pos = projectileCoordinates[idx];
  return {
    backgroundPosition: `${pos.x}px ${pos.y}px`
  };
};

const selectItemSprite = (idx: number) => {
  itemStore.activeItem!.spritePath = `weapons_${idx}`;
};

const selectItemProjectileSprite = (idx: number) => {
  itemStore.activeItem!.projectilePath = `projectilePath_${idx}`;
};
</script>

<style lang="scss" scoped>
.rarity-circle {
  border-radius: 100%;
  box-shadow: #00000026 1.95px 1.95px 2.6px;
}

.sprite {
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;

  &.select {
    cursor: pointer;
  }
}

.sprite-proj {
  width: 40px;
  height: 40px;
  background-image: url("/projectiles.png");
  background-repeat: no-repeat;

  &.select {
    cursor: pointer;
  }
}

.sprite-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &-menu {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
