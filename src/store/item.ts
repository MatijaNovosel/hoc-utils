import { ItemModel } from "@/models/common";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useItemStore = defineStore("item", () => {
  const loading = ref(false);
  const dialog = ref(false);
  const activeItem = ref<ItemModel | null>(null);

  const setLoading = (data: boolean) => {
    loading.value = data;
  };

  const editItem = (item: ItemModel) => {
    activeItem.value = item;
    dialog.value = true;
  };

  const closeDialog = () => {
    activeItem.value = null;
    dialog.value = false;
  };

  return {
    dialog,
    loading,
    activeItem,
    closeDialog,
    editItem,
    setLoading
  };
});
