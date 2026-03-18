import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    role: null,
    permissions: []
  }),

  actions: {
    login(accessToken, refreshToken, role, permissions) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.role = role
      this.permissions = Array.isArray(permissions) ? permissions : []

      localStorage.setItem("access_token", accessToken)
      localStorage.setItem("refresh_token", refreshToken)
      localStorage.setItem("role", role)
      localStorage.setItem("permissions", JSON.stringify(permissions))
    },

    loadFromStorage() {
      this.accessToken = localStorage.getItem("access_token")
      this.refreshToken = localStorage.getItem("refresh_token")
      this.role = localStorage.getItem("role")
      try {
        const raw = localStorage.getItem("permissions") || "[]"
        const parsed = JSON.parse(raw)
        this.permissions = Array.isArray(parsed) ? parsed : []
      } catch {
        this.permissions = []
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.role = null
      this.permissions = []

      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("role")
      localStorage.removeItem("permissions")
    }
  }
})
