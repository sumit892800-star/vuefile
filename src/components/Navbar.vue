<script setup>
import { computed } from "vue"
import { useUIStore } from "../store/uiStore"
import { useAuthStore } from "../store/store"
import { useRouter } from "vue-router"
import { logoutUser } from "../services/auth"

const ui = useUIStore()
const auth = useAuthStore()
const router = useRouter()

const roleLabel = computed(() => auth.role || "user")

async function logout() {
  try {
    await logoutUser()
  } catch {
    // ignore logout API errors
  }
  auth.logout()
  router.push("/login")
}
</script>

<template>
  <div class="navbar">
    <button class="icon-btn" @click="ui.toggleSidebar()">
      =
    </button>

    <div class="spacer"></div>

    <div class="right">
      <span class="role">{{ roleLabel }}</span>
      <button class="icon-btn" @click="ui.toggleRightbar()">i</button>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </div>
</template>

<style>
.navbar {
  background: #111827;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.spacer {
  flex: 1;
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #cbd5f5;
}

.icon-btn {
  font-size: 16px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.logout-btn {
  background: #ef4444;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
