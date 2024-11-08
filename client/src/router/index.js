import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './auth';
import taskRoutes from './task';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...taskRoutes,
  ],
})

export default router
