<script setup>
import { useUIStore } from "../store/uiStore"
import { useAuthStore } from "../store/store"
import { computed } from "vue"

const ui = useUIStore()
const auth = useAuthStore()

const roleLabel = computed(() => auth.role || "user")
</script>

<template>
  <div v-if="ui.rightbarOpen" class="rightbar">

    <h3 class="title">Account</h3>

    <div class="row">
      <span class="label">Role</span>
      <span class="value">{{ roleLabel }}</span>
    </div>

    <div class="row">
      <span class="label">Permissions</span>
      <span class="value">{{ auth.permissions.length }}</span>
    </div>

    <div class="hint">
      Refresh tokens are handled automatically when your access token expires.
    </div>

  </div>
</template>

<style>
.rightbar{
  width:200px;
  background:#111827;
  color:#e5e7eb;
  padding:20px;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.title{
  margin:0 0 4px 0;
  font-size:16px;
}

.row{
  display:flex;
  justify-content:space-between;
  font-size:13px;
}

.label{
  color:#9ca3af;
}

.value{
  font-weight:600;
}

.hint{
  font-size:12px;
  color:#9ca3af;
  margin-top:8px;
  line-height:1.4;
}
</style>
