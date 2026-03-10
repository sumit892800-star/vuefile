<!-- <script setup>
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


    // CURRENT DEMO MODE
    const token = "12345"
    const apiRole = role.value

    authStore.login(token, apiRole)

    router.push(roleRedirect[apiRole])

  } catch (err) {
    console.log("Login failed", err)
  }

}
</script> -->

<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"
import { useAuthStore } from "../store/store"
import { rolePermissions } from "../config/permission"

const router = useRouter()
const authStore = useAuthStore()

const role = ref("user")

const roleRedirect = {
  admin: "/dashboard",
  manager: "/dashboard",
  user: "/home"
}

async function login() {

  const token = "12345"
  const apiRole = role.value

  // get dummy permissions
  const permissions = rolePermissions[apiRole]
  authStore.login(token, apiRole, permissions)

  router.push(roleRedirect[apiRole])

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