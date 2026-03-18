<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../store/store"
import { rolePermissions } from "../config/permission"
import { loginUser, registerUser, loginWithGoogle } from "../services/auth"
import { signInWithGoogle, isFirebaseConfigured } from "../services/firebase"

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref("login")
const role = ref("user")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const errorMessage = ref("")
const loading = ref(false)

const roleRedirect = {
  admin: "/dashboard",
  manager: "/dashboard",
  user: "/users"
}

const clearError = () => {
  errorMessage.value = ""
}

const validateLogin = () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Email and password are required."
    return false
  }
  return true
}

const validateRegister = () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = "All fields are required."
    return false
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match."
    return false
  }
  return true
}

const handleLogin = async () => {
  clearError()
  if (!validateLogin()) return

  loading.value = true
  try {
    const res = await loginUser({
      email: email.value,
      password: password.value
    })

    const data = res?.data || {}
    const accessToken = data.accessToken || data.token
    const refreshToken = data.refreshToken || data.refresh || "refresh_demo"
    const apiRole = data.role || role.value
    const permissions = data.permissions || rolePermissions[apiRole] || []

    if (!accessToken) {
      throw new Error("Missing access token")
    }

    authStore.login(accessToken, refreshToken, apiRole, permissions)
    router.push(roleRedirect[apiRole])
  } catch (err) {
    errorMessage.value = "Login failed. Check your credentials."
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  clearError()
  if (!validateRegister()) return

  loading.value = true
  try {
    const res = await registerUser({
      email: email.value,
      password: password.value
    })

    const data = res?.data || {}
    const accessToken = data.accessToken || data.token
    const refreshToken = data.refreshToken || data.refresh || "refresh_demo"
    const apiRole = data.role || "user"
    const permissions = data.permissions || rolePermissions[apiRole] || []

    if (!accessToken) {
      throw new Error("Missing access token")
    }

    authStore.login(accessToken, refreshToken, apiRole, permissions)
    router.push(roleRedirect[apiRole])
  } catch (err) {
    errorMessage.value = "Registration failed. Try again."
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  clearError()
  if (!isFirebaseConfigured) {
    errorMessage.value = "Firebase is not configured. Add your Firebase keys in .env."
    return
  }

  loading.value = true
  try {
    const { idToken, email: googleEmail, name } = await signInWithGoogle()
    const res = await loginWithGoogle({ idToken, email: googleEmail, name })
    const data = res?.data || {}
    const accessToken = data.accessToken || data.token
    const refreshToken = data.refreshToken || data.refresh || "refresh_demo"
    const apiRole = data.role || "user"
    const permissions = data.permissions || rolePermissions[apiRole] || []

    if (!accessToken) {
      throw new Error("Missing access token")
    }

    authStore.login(accessToken, refreshToken, apiRole, permissions)
    router.push(roleRedirect[apiRole])
  } catch (err) {
    errorMessage.value = "Google login failed. Try again."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Welcome Back</h1>
      <p class="auth-subtitle">Login or create an account to continue</p>

      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'login' }"
          @click="activeTab = 'login'; clearError()"
        >
          Login
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'; clearError()"
        >
          Register
        </button>
      </div>

      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>

      <form v-if="activeTab === 'login'" class="form" @submit.prevent="handleLogin">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" />

        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />

        <button type="submit" class="primary-btn" :disabled="loading">
          {{ loading ? "Signing in..." : "Login" }}
        </button>
      </form>

      <form v-else class="form" @submit.prevent="handleRegister">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" />

        <label>Password</label>
        <input v-model="password" type="password" placeholder="Create a password" />

        <label>Confirm Password</label>
        <input v-model="confirmPassword" type="password" placeholder="Re-enter password" />

        <button type="submit" class="primary-btn" :disabled="loading">
          {{ loading ? "Creating..." : "Create Account" }}
        </button>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <button class="google-btn" @click="handleGoogleLogin" :disabled="loading">
        Continue with Google
      </button>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f4f7ff 0%, #fff2f7 100%);
  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.auth-title {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
}

.auth-subtitle {
  margin: 0;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
}

.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 6px;
}

.tab {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.tab.active {
  background: #111827;
  color: white;
  border-color: #111827;
}

.error {
  background: #fff1f2;
  color: #b91c1c;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
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
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
}

.primary-btn {
  margin-top: 6px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #ff2c6d;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.primary-btn:disabled,
.google-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #9ca3af;
  font-size: 12px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.google-btn {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
  font-weight: 600;
}
</style>
