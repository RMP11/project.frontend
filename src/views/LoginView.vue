<script lang="ts" setup>
import { ref } from 'vue'
import { axiosCustom } from '../config/axiosCustom'
import { useRouter } from 'vue-router'

const router = useRouter()

const correo = ref('')
const contrasena = ref('')
const isLoading = ref(false)

async function iniciarSesion() {
  const credenciales = {
    correo: correo.value,
    contrasena: contrasena.value,
  }

  isLoading.value = true
  const axiosResponse = await axiosCustom.post('auth/login', credenciales).catch(() => null)
  isLoading.value = false

  if (!axiosResponse?.data?.accessToken) return

  localStorage.setItem('token', axiosResponse.data.accessToken)

  router.push('/')
}
</script>

<template>
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="p-[0.3rem] border-gradient">
        <div
          class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
          style="border-radius: 53px"
        >
          <div class="text-center mb-8">
            <i class="mdi mdi-account-outline text-9xl text-blue-400"></i>
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
              Bienvenido
            </div>
            <span class="text-muted-color font-medium">Inicie sesión para continuar</span>
          </div>

          <form @submit.prevent="iniciarSesion">
            <label
              for="email1"
              class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
              >Correo Electrónico</label
            >
            <InputText
              autofocus
              id="email1"
              type="text"
              class="w-full md:w-[30rem] mb-8"
              v-model="correo"
            />

            <label
              for="password1"
              class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
              >Contraseña</label
            >
            <Password
              id="password1"
              v-model="contrasena"
              :toggleMask="true"
              class="mb-4"
              fluid
              :feedback="false"
            ></Password>

            <Button
              type="submit"
              label="Iniciar Sesión"
              class="w-full"
              :loading="isLoading"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.border-gradient {
  border-radius: 56px;
  background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
}
</style>
