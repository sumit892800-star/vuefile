<script setup>
import { useUIStore } from "../store/uiStore"
import { useAuthStore } from "../store/store"
import { useRouter } from "vue-router"

const ui = useUIStore()
const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push("/login")
}
</script>

<template>
  <div class="navbar">

    <!-- Hamburger Icon -->
    <button class="icon-btn" @click="ui.toggleSidebar()">
      ☰
    </button>

    <div>
      <button class="icon-btn" @click="ui.toggleRightbar()">⚙</button>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>

  </div>
</template>

<style>
.navbar {
  background: #3498db;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.icon-btn {
  font-size: 20px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.logout-btn {
  background: #e74c3c;
  border: none;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
}
</style>