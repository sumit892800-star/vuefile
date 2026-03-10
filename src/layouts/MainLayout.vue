<script setup>
import Sidebar from "../components/Sidebar.vue"
import Navbar from "../components/Navbar.vue"
import Rightbar from "../components/Rightbar.vue"
</script>

<template>

<div class="layout">

  <Sidebar />

  <div class="content">

    <Navbar />

    <div class="page">
      <router-view />
    </div>

  </div>

  <Rightbar />

</div>

</template>

<style>

.layout{
  display:flex;
  height:100vh;
}

.content{
  flex:1;
  display:flex;
  flex-direction:column;
}

.page{
  flex:1;
  padding:20px;
}

</style>