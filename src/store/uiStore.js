import { defineStore } from "pinia"

export const useUIStore = defineStore("ui", {
  state: () => ({
    sidebarOpen: false,
    rightbarOpen: false
  }),

  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen

      if (this.sidebarOpen) {
        this.rightbarOpen = false
      }
    },

    toggleRightbar() {
      this.rightbarOpen = !this.rightbarOpen

      if (this.rightbarOpen) {
        this.sidebarOpen = false
      }
    }
  }
})