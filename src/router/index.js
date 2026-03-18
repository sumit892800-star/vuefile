import { createRouter, createWebHistory } from "vue-router"
import Login from "../components/Login.vue"
import Dashboard from "../components/Dashboard.vue"
import MainLayout from "../layouts/MainLayout.vue"
import Users from "../components/Users.vue"


const routes = [
  {
    path: "/login",
    component: Login
  },
{
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/dashboard"
      },
      {
        path: "dashboard",
        component: Dashboard,
        meta: {
          roles: ["admin", "manager", "user"],
          permission: "dashboard:view",
          title: "Dashboard"
        }
      },
      {
        path: "users",
        component: Users,
        meta: {
          roles: ["admin", "manager", "user"],
          permission: "users:view",
          title: "Users"
        }
      }


    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const defaultRouteByRole = {
  admin: "/dashboard",
  manager: "/dashboard",
  user: "/users"
}

const safeParsePermissions = () => {
  try {
    const raw = localStorage.getItem("permissions") || "[]"
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const getFirstAllowedRoute = (permissions) => {
  if (!Array.isArray(permissions)) return "/login"
  if (permissions.includes("dashboard:view")) return "/dashboard"
  if (permissions.includes("users:view")) return "/users"
  return "/login"
}

/* PROTECTED ROUTE GUARD */
router.beforeEach((to, from, next) => {

  const token = localStorage.getItem("access_token")
  const role = localStorage.getItem("role")
  const permissions = safeParsePermissions()

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiredRole = to.matched.find(r => r.meta.roles)?.meta.roles
  const requiredPermission = to.matched.find(r => r.meta.permission)?.meta.permission

  if (requiresAuth && !token) {
    return next("/login")
  }

  if (to.path === "/login" && token) {
    const fallback = defaultRouteByRole[role] || getFirstAllowedRoute(permissions)
    return next(fallback)
  }

  if (requiredRole && !requiredRole.includes(role)) {
    const fallback = defaultRouteByRole[role] || getFirstAllowedRoute(permissions)
    return next(fallback)
  }

  if (requiredPermission && !permissions.includes(requiredPermission)) {
    const fallback = getFirstAllowedRoute(permissions)
    return next(fallback)
  }

  next()

})
export default router
