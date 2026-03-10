<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../store/store"
import { useUIStore } from "../store/uiStore"

const router = useRouter()
const auth = useAuthStore()
const ui = useUIStore()

const filteredMenu = computed(() => {

  const mainRoute = router.getRoutes().find(r => r.path === "/")

  return mainRoute.children.filter(route => {

    if (!route.meta.roles) return true

    return route.meta.roles.includes(auth.role)

  })

})
</script>

<template>

  <div v-if="ui.sidebarOpen" class="sidebar">

    <h3>Sidebar</h3>

    <router-link
      v-for="item in filteredMenu"
      :key="item.path"
      :to="'/' + item.path"
      class="menu-link"
    >
      {{ item.meta.title }}
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