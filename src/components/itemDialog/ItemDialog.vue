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
        <div class="text-subtitle-2 mt-4">Weapon info</div>
        <v-row class="mt-1">
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
        </v-row>
        <div class="text-subtitle-2 mt-4">Stats</div>
        <v-row class="mt-1">
          <v-col cols="2">
            <v-text-field
              v-model="itemStore.formData.stats![0]"
              density="compact"
              placeholder="Enter MGT"
              hide-details="auto"
              label="MGT"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="itemStore.formData.stats![1]"
              density="compact"
              placeholder="Enter ARM"
              hide-details="auto"
              label="ARM"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="itemStore.formData.stats![2]"
              density="compact"
              placeholder="Enter WIS"
              hide-details="auto"
              label="WIS"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="itemStore.formData.stats![3]"
              density="compact"
              placeholder="Enter STR"
              hide-details="auto"
              label="STR"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="itemStore.formData.stats![4]"
              density="compact"
              placeholder="Enter AGI"
              hide-details="auto"
              label="AGI"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="itemStore.formData.stats![5]"
              density="compact"
              placeholder="Enter SWF"
              hide-details="auto"
              label="SWF"
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
import { ItemRarityData, ItemTagName } from "@/constants/game";
import { useItemStore } from "@/store/item";

const itemStore = useItemStore();

const rarityItems = Object.entries(ItemRarityData).map((x) => ({
  title: x[1].name,
  value: Number(x[0])
}));

const tagItems = Object.entries(ItemTagName).map((x) => ({
  title: x[1],
  value: Number(x[0])
}));
</script>

<style lang="scss" scoped>
.rarity-circle {
  border-radius: 100%;
  box-shadow: #00000026 1.95px 1.95px 2.6px;
}
</style>
