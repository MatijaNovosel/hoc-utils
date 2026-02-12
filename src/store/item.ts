import { ItemModel } from "@/models/common";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useItemStore = defineStore("item", () => {
  const loading = ref(false);
  const dialog = ref(false);
  const activeItem = ref<ItemModel | null>(null);

  const formData = reactive<ItemModel>({} as ItemModel);

  const setLoading = (data: boolean) => {
    loading.value = data;
  };

  const editItem = (item: ItemModel) => {
    activeItem.value = item;
    Object.assign(formData, { ...item });
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
    formData,
    closeDialog,
    editItem,
    setLoading
  };
});
