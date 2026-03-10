<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const API = "https://jsonplaceholder.typicode.com/users"

const users = ref([])
const isEdit = ref(false)
const editId = ref(null)

const form = ref({
  name: "",
  email: ""
})

const getUsers = async () => {
  const res = await axios.get(API)
  users.value = res.data
}

onMounted(() => {
  getUsers()
})

const submitForm = async () => {
  if (isEdit.value) {
    await axios.put(`${API}/${editId.value}`, form.value)
  } else {
    await axios.post(API, form.value)
  }

  resetForm()
  getUsers()
}

const editUser = (user) => {
  form.value = {
    name: user.name,
    email: user.email
  }
  editId.value = user.id
  isEdit.value = true
}

const deleteUser = async (id) => {
  await axios.delete(`${API}/${id}`)
  getUsers()
}

const resetForm = () => {
  form.value = {
    name: "",
    email: ""
  }
  editId.value = null
  isEdit.value = false
}
</script>

<template>
<div>

  <h2>{{ isEdit ? "Edit User" : "Add User" }}</h2>

  <!-- Form -->
  <form @submit.prevent="submitForm">

    <input
      v-model="form.name"
      placeholder="Enter Name"
    />

    <input
      v-model="form.email"
      placeholder="Enter Email"
    />

    <button type="submit">
      {{ isEdit ? "Update" : "Add" }}
    </button>

    <button v-if="isEdit" type="button" @click="resetForm">
      Cancel
    </button>

  </form>

  <hr />

  <!-- User Table -->
  <table border="1" width="500">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>

        <td>
          <button @click="editUser(user)">Edit</button>
          <button @click="deleteUser(user.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

</div>
</template>