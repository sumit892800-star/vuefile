import api from "./api"

export const registerUser = (payload) => {
  return api.post("/api/auth/register", payload)
}

export const loginUser = (payload) => {
  return api.post("/api/auth/login", payload)
}

export const loginWithGoogle = (payload) => {
  return api.post("/api/auth/google", { provider: "google", ...payload })
}

export const logoutUser = (payload = {}) => {
  return api.post("/api/auth/logout", payload)
}
