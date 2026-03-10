<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

function logout() {
  localStorage.removeItem("token")
  router.push("/login")
}
</script>

<template>
  <div>
    <h1>Dashboard Page</h1>
    <p>You are logged in.</p>

    <button @click="logout">
      Logout
    </button>
  </div>
</template>