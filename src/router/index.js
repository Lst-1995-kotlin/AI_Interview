import { createRouter, createWebHashHistory } from 'vue-router'
import test from "@/views/create.vue"

const routes = [
  {
    path: "/",
    component: test
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
