import { defineStore } from "pinia";
export const mainStore = defineStore("main", {
  state: () => {
    return {
      activeComponent: null,
    };
  },
  getters: {},
  actions: {
    setActiveComponent() {},
  },
});
