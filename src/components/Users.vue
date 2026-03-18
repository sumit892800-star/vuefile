<script setup>
import { computed, onMounted, ref } from "vue"
import { useAuthStore } from "../store/store"
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/users"

const auth = useAuthStore()

const users = ref([])
const loading = ref(false)
const error = ref("")

const form = ref({
  id: null,
  name: "",
  email: "",
  role: "user"
})

const roleLabel = computed(() => auth.role || "user")
const permissions = computed(() => auth.permissions || [])
const canCreate = computed(() => permissions.value.includes("users:create"))
const canUpdate = computed(() => permissions.value.includes("users:update"))

const resetForm = () => {
  form.value = { id: null, name: "", email: "", role: "user" }
}

const loadUsers = async () => {
  error.value = ""
  loading.value = true
  try {
    const res = await fetchUsers()
    users.value = Array.isArray(res?.data) ? res.data : res?.data?.users || []
  } catch (err) {
    error.value = "Failed to load users."
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  error.value = ""
  if (!form.value.name || !form.value.email) {
    error.value = "Name and email are required."
    return
  }

  if (form.value.id && !canUpdate.value) {
    error.value = "You do not have permission to update users."
    return
  }

  if (!form.value.id && !canCreate.value) {
    error.value = "You do not have permission to create users."
    return
  }

  loading.value = true
  try {
    if (form.value.id) {
      await updateUser(form.value.id, {
        name: form.value.name,
        email: form.value.email,
        role: form.value.role
      })
    } else {
      await createUser({
        name: form.value.name,
        email: form.value.email,
        role: form.value.role
      })
    }
    resetForm()
    await loadUsers()
  } catch (err) {
    error.value = "Save failed. Please try again."
  } finally {
    loading.value = false
  }
}

const editUser = (user) => {
  form.value = {
    id: user.id || user._id,
    name: user.name || "",
    email: user.email || "",
    role: user.role || "user"
  }
}

const removeUser = async (user) => {
  error.value = ""
  if (!canUpdate.value) {
    error.value = "You do not have permission to delete users."
    return
  }

  loading.value = true
  try {
    await deleteUser(user.id || user._id)
    await loadUsers()
  } catch (err) {
    error.value = "Delete failed."
  } finally {
    loading.value = false
  }
}

onMounted(loadUsers)
</script>

<template>
  <div class="page">
    <div class="header">
      <div>
        <h1 class="title">Users</h1>
        <p class="subtitle">Role: {{ roleLabel }}</p>
      </div>
      <button class="ghost" @click="loadUsers" :disabled="loading">Refresh</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="grid">
      <form class="card form" @submit.prevent="handleSubmit">
        <h3>{{ form.id ? "Edit User" : "Create User" }}</h3>
        <label>Name</label>
        <input v-model="form.name" placeholder="Full name" />

        <label>Email</label>
        <input v-model="form.email" placeholder="email@example.com" />

        <label>Role</label>
        <select v-model="form.role">
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>

        <div class="actions">
          <button type="submit" class="primary" :disabled="loading">
            {{ form.id ? "Update" : "Create" }}
          </button>
          <button type="button" class="ghost" @click="resetForm">Reset</button>
        </div>
      </form>

      <div class="card list">
        <h3>All Users</h3>
        <div v-if="loading" class="muted">Loading...</div>
        <div v-else-if="users.length === 0" class="muted">No users found.</div>
        <div v-else class="table">
          <div class="row header-row">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Actions</span>
          </div>
          <div v-for="user in users" :key="user.id || user._id" class="row">
            <span>{{ user.name }}</span>
            <span>{{ user.email }}</span>
            <span class="pill">{{ user.role || "user" }}</span>
            <span class="row-actions">
              <button class="link" @click="editUser(user)" :disabled="!canUpdate">Edit</button>
              <button class="link danger" @click="removeUser(user)" :disabled="!canUpdate">Delete</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.subtitle {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.error {
  background: #fff1f2;
  color: #b91c1c;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 16px;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background: #ffffff;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form label {
  font-size: 13px;
  color: #374151;
  font-weight: 600;
}

.form input,
.form select {
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
}

.primary {
  background: #111827;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.ghost {
  background: transparent;
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.table {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
}

.row {
  display: grid;
  grid-template-columns: 1.2fr 1.6fr 0.8fr 1fr;
  gap: 10px;
  align-items: center;
}

.header-row {
  font-weight: 700;
  color: #6b7280;
  font-size: 12px;
  text-transform: uppercase;
}

.row-actions {
  display: flex;
  gap: 8px;
}

.link {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0;
}

.link.danger {
  color: #dc2626;
}

.pill {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f3f4f6;
  font-size: 12px;
}

.muted {
  color: #9ca3af;
  font-size: 13px;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
