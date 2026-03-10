import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    role: null,
    permissions: []
  }),

  actions: {
    login(token, role, permissions) {
      this.token = token
      this.role = role
      this.permissions = permissions

      localStorage.setItem("token", token)
      localStorage.setItem("role", role)
      localStorage.setItem("permissions", JSON.stringify(permissions))
    },

    loadFromStorage() {
      this.token = localStorage.getItem("token")
      this.role = localStorage.getItem("role")
      this.permissions = JSON.parse(localStorage.getItem("permissions") || "[]")
    },

    logout() {
      this.token = null
      this.role = null
      this.permissions = []

      localStorage.clear()
    }
  }
})