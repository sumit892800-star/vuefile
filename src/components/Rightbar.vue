<script setup>
import { useUIStore } from "../store/uiStore"

const ui = useUIStore()
</script>

<template>
  <div v-if="ui.rightbarOpen" class="rightbar">

    <h3>Rightbar</h3>

    <router-link to="/settings">Settings</router-link>

    <router-link to="/notifications">Notifications</router-link>

    <router-link to="/help">Help</router-link>

  </div>
</template>

<style>
.rightbar{
  width:200px;
  background:#171717;
  padding:20px;
  display:flex;
  flex-direction:column;
  gap:10px;
}
</style>