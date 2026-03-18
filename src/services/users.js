import api from "./api"

export const fetchUsers = () => api.get("/api/users/list")

export const createUser = (payload) => api.post("/api/users/create", payload)

export const updateUser = (id, payload) => api.put(`/api/users/update${id}`, payload)

export const deleteUser = (id) => api.delete(`/api/users/delete${id}`)
