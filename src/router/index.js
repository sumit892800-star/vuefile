import { createRouter, createWebHistory } from "vue-router"
import About from "../components/About.vue"
import Login from "../components/Login.vue"
import Dashboard from "../components/Dashboard.vue"
import MainLayout from "../layouts/MainLayout.vue"
import Home from "../components/Home.vue"


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
        path: "dashboard",
        component: Dashboard,
        meta: {
          roles: ["admin", "manager"],
          title: "Dashboard"
        }
      },
      {
        path: "about",
        component: About,
        meta: {
          roles: ["admin"],
          title: "About"
        }
      },
      {
        path: "home",
        component: Home,
        meta: {
          roles: ["user"],
          title: "Home"
        }
      }


    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* PROTECTED ROUTE GUARD */
router.beforeEach((to, from, next) => {

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (to.meta.requiresAuth && !token) {
    return next("/login")
  }

  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return next("/dashboard")
  }

  next()

})
export default router