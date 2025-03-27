<script setup lang="ts">
import { axiosCustom } from '@/config/axiosCustom'
import { onMounted, ref } from 'vue'

type TypePublicacion = {
  id: number
  titulo: string
  contenido: string
  autor: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

const isLoading = ref(false)
const publicaciones = ref<TypePublicacion[]>([])

async function getPublicaciones() {
  isLoading.value = true
  publicaciones.value = (await axiosCustom.get('publicaciones').catch(() => ({ data: [] }))).data
  isLoading.value = false
}

onMounted(() => {
  getPublicaciones().then()
})
</script>

<template>
  <div class="h-screen p-2">
    <div class="flex justify-between">
      <Button class="invisible">Administrar</Button>
      <h2 class="text-center text-5xl">Publicaciones</h2>
      <Button @click="$router.push('login')">Administrar</Button>
    </div>

    <main class="content-publicaciones m-7">
      <Card v-for="publicacion in publicaciones" :key="publicacion.id" class="shadow-lg rounded-xl">
        <template #title>
          {{ publicacion.titulo }}
        </template>
        <template #content>
          <p class="text-gray-600">
            {{ publicacion.contenido }}
          </p>
        </template>
        <template #footer>
          <small class="text-slate-400">Autor: {{ publicacion.autor }}</small>
        </template>
      </Card>
    </main>
  </div>
</template>

<style scoped>
.content-publicaciones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1.5rem;
}
</style>
