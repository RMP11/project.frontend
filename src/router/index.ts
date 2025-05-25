import VenderView from '@/modules/ventas/views/VenderView.vue'
import VentasView from '@/modules/ventas/views/VentasView.vue'
import AppAutenticadoView from '@/views/AppAutenticadoView.vue'
import HomeView from '@/views/HomeView.vue'
import PermisosView from '@/views/PermisosView.vue'
import PublicacionesView from '@/views/PublicacionesView.vue'
import RolesView from '@/views/RolesView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'publicaciones',
      component: PublicacionesView,
    },
    {
      path: '/admin',
      component: AppAutenticadoView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'permisos',
          name: 'permisos',
          component: PermisosView,
        },
        {
          path: 'roles',
          name: 'roles',
          component: RolesView,
        },
        {
          path: 'usuarios',
          name: 'usuarios',
          component: UsuariosView,
        },
        {
          path: 'Vender',
          name: 'Vender',
          component: VenderView,
        },
        {
          path: 'ventas',
          name: 'ventas',
          component: VentasView,
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
