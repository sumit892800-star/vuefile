import axios from "axios"
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./tokenService"

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

const api = axios.create({
  baseURL
})

const refreshClient = axios.create({
  baseURL
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let refreshPromise = null

const extractTokens = (data) => {
  const accessToken = data?.accessToken || data?.token || null
  const refreshToken = data?.refreshToken || null
  return { accessToken, refreshToken }
}

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error("Missing refresh token")
  }

  const res = await refreshClient.post("/api/auth/refresh", { refreshToken })
  const { accessToken, refreshToken: newRefresh } = extractTokens(res.data)

  if (!accessToken) {
    throw new Error("Refresh failed")
  }

  setTokens(accessToken, newRefresh || refreshToken)
  return accessToken
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const status = error?.response?.status

    const isAuthRoute = original?.url?.includes("/api/auth/")

    if (status === 401 && original && !original._retry && !isAuthRoute) {
      original._retry = true

      try {
        if (!isRefreshing) {
          isRefreshing = true
          refreshPromise = refreshAccessToken()
        }

        const newToken = await refreshPromise
        original.headers.Authorization = `Bearer ${newToken}`
        return api(original)
      } catch (err) {
        clearTokens()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
        refreshPromise = null
      }
    }

    return Promise.reject(error)
  }
)

export default api
