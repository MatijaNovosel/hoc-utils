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
      <v-card-text class="pt-4">
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
        </v-row>
        <v-row>
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
              density="compact"
              placeholder="Select tag"
              hide-details="auto"
              label="Tag"
              :items="tagItems"
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
