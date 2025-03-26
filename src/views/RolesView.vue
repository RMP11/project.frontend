<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { axiosCustom } from '@/config/axiosCustom'

const dt = ref()
const rolDialog = ref(false)
const eliminarRolDialog = ref(false)
const rol = ref<{ id?: number; nombre?: string }>({})

const enviado = ref(false)

const abrirNuevo = () => {
  rol.value = {}
  enviado.value = false
  rolDialog.value = true
}
const ocultarDialog = () => {
  rolDialog.value = false
  enviado.value = false
}

const estaGuardandoLoading = ref(false)

async function guardarRol() {
  enviado.value = true

  estaGuardandoLoading.value = true

  let axiosResponse
  if (rol.value.id) {
    axiosResponse = await axiosCustom
      .patch('roles/' + rol.value.id, { nombre: rol.value?.nombre })
      .catch(() => null)
  } else {
    axiosResponse = await axiosCustom.post('roles', { nombre: rol.value?.nombre }).catch(() => null)
  }

  estaGuardandoLoading.value = false

  if (!axiosResponse?.data) return

  rolDialog.value = false
  rol.value = {}
  getRoles().then()
}

const editProduct = (rolParam) => {
  rol.value = { ...rolParam }
  rolDialog.value = true
}

const confirmarEliminarRol = (rolParam) => {
  rol.value = rolParam
  eliminarRolDialog.value = true
}

const isLoading = ref()
const roles = ref([])

async function getRoles() {
  isLoading.value = true
  roles.value = (await axiosCustom.get('roles').catch(() => ({ data: [] }))).data
  isLoading.value = false
}

async function eliminar() {
  estaGuardandoLoading.value = true
  const axiosResponse = await axiosCustom.delete('roles/' + rol.value.id).catch(() => null)
  estaGuardandoLoading.value = false

  if (!axiosResponse?.data?.id) return

  rol.value = {}
  eliminarRolDialog.value = false
  getRoles()
}

onMounted(() => {
  getRoles()
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
        :value="roles"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 25]"
        :loading="isLoading"
      >
        <template #header>
          <h4 class="m-0 font-bold">ROLES</h4>
        </template>

        <Column header="Nro" style="width: 0rem" class="text-center">
          <template #body="{ index }"> {{ index + 1 }} </template>
        </Column>

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
              @click="confirmarEliminarRol(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="rolDialog"
      :style="{ width: '450px' }"
      header="Nuevo Rol"
      :modal="true"
    >
      <form class="flex flex-col gap-6" @submit.prevent>
        <div>
          <label for="nombre" class="block font-bold mb-3">Nombre</label>
          <InputText
            id="nombre"
            v-model.trim="rol.nombre"
            required="true"
            autofocus
            :invalid="enviado && !rol"
            fluid
          />
          <small v-if="enviado && !rol" class="text-red-500">Nombre es requerido.</small>
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
          @click="guardarRol"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="eliminarRolDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="rol">
          ¿Estás seguro de que quiere eliminar <b>{{ rol.nombre }}</b
          >?
        </span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="mdi mdi-close"
          :loading="estaGuardandoLoading"
          text
          @click="eliminarRolDialog = false"
        />
        <Button label="Si" icon="mdi mdi-check" :loading="estaGuardandoLoading" @click="eliminar" />
      </template>
    </Dialog>
  </div>
</template>
