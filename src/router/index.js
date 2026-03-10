import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"
import About from "../components/About.vue"
import Login from "../components/Login.vue"
import Dashboard from "../components/Dashboard.vue"
import MainLayout from "../layouts/MainLayout.vue"


const routes = [
  {
    path: "/login",
    component: Login
  },
{
  path: "/",
  component: MainLayout,
  children: [
    {
      path: "dashboard",
      component: Dashboard
    },
    {
      path: "about",
      component: About
    },
    // {
    //   path: "profile",
    //   component: Profile
    // }
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
  const userRole = localStorage.getItem("role")

  if (to.meta.requiresAuth && !token) {
    return next("/login")
  }

  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    return next("/") 
  }

  next()
})

export default router