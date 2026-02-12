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
import { useItemStore } from "@/store/item";

const itemStore = useItemStore();
</script>
