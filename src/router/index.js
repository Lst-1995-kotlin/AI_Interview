import { createRouter, createWebHashHistory } from 'vue-router'
import test from "@/views/test.vue"

const routes = [
  {
    path: '/',
    component: test
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
