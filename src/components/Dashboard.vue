<script setup>
import { computed } from "vue"
import { useAuthStore } from "../store/store"

const auth = useAuthStore()
const roleLabel = computed(() => auth.role || "user")
</script>

<template>
  <div class="rounded-xl border border-border bg-card p-6 text-fg shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <p class="mt-1 text-sm text-muted-foreground">
          Welcome back. Your role is {{ roleLabel }}.
        </p>
      </div>
      <span class="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-fg">
        Active
      </span>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-border bg-bg p-4">
        <p class="text-xs text-muted-foreground">Total Users</p>
        <p class="mt-2 text-2xl font-semibold">1,284</p>
      </div>
      <div class="rounded-lg border border-border bg-bg p-4">
        <p class="text-xs text-muted-foreground">Monthly Revenue</p>
        <p class="mt-2 text-2xl font-semibold">$24,900</p>
      </div>
      <div class="rounded-lg border border-border bg-bg p-4">
        <p class="text-xs text-muted-foreground">Pending Requests</p>
        <p class="mt-2 text-2xl font-semibold">17</p>
      </div>
    </div>
  </div>
</template>
