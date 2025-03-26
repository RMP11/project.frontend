<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { axiosCustom } from '@/config/axiosCustom'

const dt = ref()
const usuarioDialog = ref(false)
const eliminarUsuarioDialog = ref(false)
const usuario = ref<{ id?: number; correo?: string; nombre?: string; contrasena?: string }>({})

const enviado = ref(false)

const abrirNuevo = () => {
  usuario.value = {}
  enviado.value = false
  usuarioDialog.value = true
}
const ocultarDialog = () => {
  usuarioDialog.value = false
  enviado.value = false
}

const estaGuardandoLoading = ref(false)

async function guardarUsuario() {
  enviado.value = true

  estaGuardandoLoading.value = true

  let axiosResponse
  if (usuario.value.id) {
    axiosResponse = await axiosCustom
      .patch('usuarios/' + usuario.value.id, usuario.value)
      .catch(() => null)
  } else {
    axiosResponse = await axiosCustom.post('usuarios', usuario.value).catch(() => null)
  }

  estaGuardandoLoading.value = false

  if (!axiosResponse?.data) return

  usuarioDialog.value = false
  usuario.value = {}
  getUsuarios().then()
}

const editProduct = (usuarioParam) => {
  usuario.value = { ...usuarioParam }
  usuarioDialog.value = true
}

const confirmarEliminarUsuario = (usuarioParam) => {
  usuario.value = usuarioParam
  eliminarUsuarioDialog.value = true
}

const isLoading = ref()
const usuarios = ref([])

async function getUsuarios() {
  isLoading.value = true
  usuarios.value = (await axiosCustom.get('usuarios').catch(() => ({ data: [] }))).data
  isLoading.value = false
}

async function eliminar() {
  estaGuardandoLoading.value = true
  const axiosResponse = await axiosCustom.delete('usuarios/' + usuario.value.id).catch(() => null)
  estaGuardandoLoading.value = false

  if (!axiosResponse?.data?.id) return

  usuario.value = {}
  eliminarUsuarioDialog.value = false
  getUsuarios()
}

onMounted(() => {
  getUsuarios()
})
</script>

<template>
  <div>
    <div class="card">
      <Toolbar class="mb-6">
        <template #start>
          <Button label="Nuevo" icon="mdi mdi-plus" @click="abrirNuevo" />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="usuarios"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 25]"
        :loading="isLoading"
      >
        <template #header>
          <h4 class="m-0 font-bold">USUARIOS</h4>
        </template>

        <Column header="Nro" style="width: 0rem" class="text-center">
          <template #body="{ index }"> {{ index + 1 }} </template>
        </Column>

        <Column field="correo" header="Correo Electrónico"></Column>

        <Column field="nombre" header="Nombre"></Column>

        <Column field="createdAt" header="Fecha de creación">
          <template #body="{ data }">
            {{ new Date(data.createdAt).toLocaleString() }}
          </template>
        </Column>

        <Column field="createdAt" header="Fecha de creación">
          <template #body="{ data }">
            {{ new Date(data.updatedAt).toLocaleString() }}
          </template>
        </Column>

        <Column style="width: 8rem">
          <template #body="slotProps">
            <Button
              icon="mdi mdi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="mdi mdi-trash-can-outline"
              outlined
              rounded
              severity="danger"
              @click="confirmarEliminarUsuario(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="usuarioDialog"
      :style="{ width: '450px' }"
      header="Nuevo Usuario"
      :modal="true"
    >
      <form class="flex flex-col gap-6" @submit.prevent>
        <div>
          <label for="correo" class="block font-bold mb-3">Correo</label>
          <InputText
            id="correo"
            v-model.trim="usuario.correo"
            required="true"
            autofocus
            :invalid="enviado && !usuario"
            fluid
          />
          <small v-if="enviado && !usuario.correo" class="text-red-500">Correo es requerido.</small>
        </div>

        <div>
          <label for="contrasena" class="block font-bold mb-3">Contraseña</label>
          <Password
            id="contrasena"
            v-model.trim="usuario.contrasena"
            autofocus
            min="6"
            :invalid="enviado && !usuario"
            fluid
          />
          <small v-if="enviado && !usuario.contrasena" class="text-red-500"
            >Contraseña es requerido.</small
          >
        </div>

        <div>
          <label for="nombre" class="block font-bold mb-3">Nombre</label>
          <InputText
            id="nombre"
            v-model.trim="usuario.nombre"
            required="true"
            autofocus
            :invalid="enviado && !usuario.nombre"
            fluid
          />
          <small v-if="enviado && !usuario.nombre" class="text-red-500">Nombre es requerido.</small>
        </div>
      </form>

      <template #footer>
        <Button
          label="Cancelar"
          icon="mdi mdi-close"
          :loading="estaGuardandoLoading"
          text
          @click="ocultarDialog"
        />
        <Button
          label="Guardar"
          icon="mdi mdi-check"
          :loading="estaGuardandoLoading"
          @click="guardarUsuario"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="eliminarUsuarioDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="usuario">
          ¿Estás seguro de que quiere eliminar <b>{{ usuario.nombre }}</b
          >?
        </span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="mdi mdi-close"
          :loading="estaGuardandoLoading"
          text
          @click="eliminarUsuarioDialog = false"
        />
        <Button label="Si" icon="mdi mdi-check" :loading="estaGuardandoLoading" @click="eliminar" />
      </template>
    </Dialog>
  </div>
</template>
