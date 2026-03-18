<script setup>
import { computed } from "vue"
import { useAuthStore } from "../store/store"

const auth = useAuthStore()
const roleLabel = computed(() => auth.role || "user")
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome back. Your role is {{ roleLabel }}.</p>
  </div>
</template>
