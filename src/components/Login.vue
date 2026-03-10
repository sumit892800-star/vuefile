<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"
import { useAuthStore } from "../store/store"

const router = useRouter()
const authStore = useAuthStore()

const role = ref("user") // default role

function login() {
  // localStorage.setItem("token", "12345")
  // localStorage.setItem("role", role.value)
  authStore.login(role.value) //PINIA STORE USECASE+++++++++

  router.push("/dashboard")
}
</script>

<template>
  <div>
    <h1>Login Page</h1>

    <label>Select Role</label>
    <select v-model="role">
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="user">User</option>
    </select>

    <br /><br />

    <button @click="login">
      Login
    </button>
  </div>
</template>