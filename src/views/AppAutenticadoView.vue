<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const sidebarVisible = ref(false)

const menuItems = ref([
  { label: 'Inicio', icon: 'mdi mdi-home' },
  { label: 'Permisos', icon: 'mdi mdi-order-bool-ascending-variant' },
  { label: 'Roles', icon: 'mdi mdi-account-settings' },
  { label: 'Usuarios', icon: 'mdi mdi-account-group' },
])

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}
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
        <span class="text-gray-700">Usuario</span>
      </template>
    </Menubar>

    <!-- Sidebar -->
    <Sidebar v-model:visible="sidebarVisible" class="w-60">
      <h3 class="p-3 text-lg font-semibold">Menú</h3>
      <ul class="space-y-2 p-3">
        <li
          v-for="item in menuItems"
          :key="item.label"
          class="p-2 flex items-center space-x-2 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          <i :class="item.icon" class="text-xl"></i>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </Sidebar>

    <main class="flex-grow p-4">
      <RouterView />
    </main>
  </div>
</template>
