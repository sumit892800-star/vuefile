<script setup>
import { computed } from "vue"
import { menuItems } from "../config/menu"
import { useAuthStore } from "../store/store"
import { useUIStore } from "../store/uiStore"

const auth = useAuthStore()
const ui = useUIStore()

const filteredMenu = computed(() => {
  const permissions = auth.permissions || []
  return menuItems.filter(item => permissions.includes(item.permission))
})
</script>

<template>

  <div v-if="ui.sidebarOpen" class="sidebar">

    <div class="brand">SecureApp</div>

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
  background:#0f172a;
  color:white;
  padding:18px;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.brand{
  font-weight:700;
  letter-spacing:0.5px;
  margin-bottom:8px;
}

.menu-link{
  color:white;
  text-decoration:none;
  padding:8px 10px;
  border-radius:8px;
}

.menu-link.router-link-active{
  background:#1f2937;
}
</style>
