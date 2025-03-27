<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const sidebarVisible = ref(false)

const menuItems = ref([
  { label: 'Inicio', icon: 'mdi mdi-home', to: '/admin' },
  { label: 'Permisos', icon: 'mdi mdi-order-bool-ascending-variant', to: '/admin/permisos' },
  { label: 'Roles', icon: 'mdi mdi-account-settings', to: '/admin/roles' },
  { label: 'Usuarios', icon: 'mdi mdi-account-group', to: '/admin/usuarios' },
])

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const socialLinks = [
  { icon: 'mdi mdi-facebook', url: 'https://facebook.com' },
  { icon: 'mdi mdi-twitter', url: 'https://twitter.com' },
  { icon: 'mdi mdi-instagram', url: 'https://instagram.com' },
]
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Topbar -->
    <Menubar class="shadow-md">
      <template #start>
        <button @click="toggleSidebar" class="p-2 text-gray-700 hover:text-blue-600">
          <i class="mdi mdi-menu text-xl"></i>
        </button>
      </template>
      <template #end>
        <Button @click="$router.push('/')">Ver Publicaciones</Button>
      </template>
    </Menubar>

    <!-- Sidebar -->
    <Drawer v-model:visible="sidebarVisible" class="w-60">
      <nav>
        <h3 class="p-3 text-lg font-semibold">Menú</h3>
        <ul class="space-y-2 p-3">
          <li
            v-for="item in menuItems"
            :key="item.label"
            class="flex items-center space-x-2 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            <RouterLink
              :to="item.to"
              :exact-active-class="`text-blue-300`"
              class="p-2 w-full flex items-center"
            >
              <i :class="item.icon" class="text-2xl pr-3"></i>
              <span>{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </Drawer>

    <main class="flex-grow p-4">
      <RouterView />
    </main>

    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p class="text-sm">
          &copy; {{ new Date().getFullYear() }} Mi Sitio. Todos los derechos reservados.
        </p>

        <div class="flex space-x-4">
          <a
            v-for="social in socialLinks"
            :key="social.icon"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-lg hover:text-blue-400"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
