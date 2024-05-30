import { createRouter, createWebHashHistory } from 'vue-router'
import home from "@/views/home.vue"
import interview from "@/views/interview.vue"

const routes = [
  {
    path: "/",
    component: home
  }, {
    path: "/interview",
    component: interview
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
