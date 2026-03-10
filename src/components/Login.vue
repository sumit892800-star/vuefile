<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"
import { useAuthStore } from "../store/store"

const router = useRouter()
const authStore = useAuthStore()

const role = ref("user")

const roleRedirect = {
  admin: "/dashboard",
  manager: "/dashboard",
  user: "/home"
}

async function login() {

  try {

    // Example API call (future)
    // const res = await axios.post("/api/login", { email, password })

    // If API exists
    // const token = res.data.token
    // const apiRole = res.data.role

    // CURRENT DEMO MODE
    const token = "12345"
    const apiRole = role.value

    authStore.login(token, apiRole)

    router.push(roleRedirect[apiRole])

  } catch (err) {
    console.log("Login failed", err)
  }

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