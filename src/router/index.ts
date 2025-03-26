import AppAutenticadoView from '@/views/AppAutenticadoView.vue'
import HomeView from '@/views/HomeView.vue'
import PermisosView from '@/views/PermisosView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppAutenticadoView,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'permisos',
          name: 'permisos',
          component: PermisosView,
        },
      ],
    },
    {
      path: '/login',
      name: 'auth',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
})

export default router
