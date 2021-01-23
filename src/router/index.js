import { createRouter, createWebHistory } from 'vue-router'
import Tasks from "@/views/Tasks";

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/task/:taskId',
    component: ()=> import('../views/Task')
  },
  {
    path: '/new',
    name: 'New',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/New')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})

export default router
