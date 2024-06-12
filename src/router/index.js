import { createRouter, createWebHashHistory } from 'vue-router'
import home from "@/views/home.vue"
import interview from "@/views/interview.vue"
import list from "@/views/list.vue"
import detail from "@/views/detail.vue"


const routes = [
  {
    path: "/",
    component: home
  }, {
    path: "/interview",
    component: interview
  }, {
    path: "/list",
    component: list
  },{
    path: "/detail/:id",
    component: detail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
