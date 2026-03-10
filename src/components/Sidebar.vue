<script setup>
import { computed } from "vue"
import { menuItems } from "../config/menu"
import { useAuthStore } from "../store/store"
import { useUIStore } from "../store/uiStore"

const auth = useAuthStore()
const ui = useUIStore()

const filteredMenu = computed(() => {
  return menuItems.filter(item =>
    auth.permissions.includes(item.permission)
  )
})
</script>

<template>

  <div v-if="ui.sidebarOpen" class="sidebar">

    <h3>Sidebar</h3>

    <router-link
      v-for="item in filteredMenu"
      :key="item.path"
      :to="item.path"
      class="menu-link"
    >
      {{ item.name }}
    </router-link>

  </div>

</template>

<style>
.sidebar{
  width:220px;
  background:#2c3e50;
  color:white;
  padding:20px;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.menu-link{
  color:white;
  text-decoration:none;
}
</style>