<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ProductService } from './productService'
import { axiosCustom } from '@/config/axiosCustom'

onMounted(() => {
  ProductService.getProducts().then((data) => (products.value = data))
})

const dt = ref()
const products = ref()
const permisoDialog = ref(false)
const eliminarPermisoDialog = ref(false)
const permiso = ref<{ id?: number; nombre?: string }>({})

const enviado = ref(false)

const abrirNuevo = () => {
  permiso.value = {}
  enviado.value = false
  permisoDialog.value = true
}
const ocultarDialog = () => {
  permisoDialog.value = false
  enviado.value = false
}

const estaGuardandoLoading = ref(false)

async function guardarPermiso() {
  enviado.value = true

  estaGuardandoLoading.value = true

  let axiosResponse
  if (permiso.value.id) {
    axiosResponse = await axiosCustom
      .patch('permisos/' + permiso.value.id, { nombre: permiso.value?.nombre })
      .catch(() => null)
  } else {
    axiosResponse = await axiosCustom
      .post('permisos', { nombre: permiso.value?.nombre })
      .catch(() => null)
  }

  estaGuardandoLoading.value = false

  if (!axiosResponse?.data) return

  permisoDialog.value = false
  permiso.value = {}
  getPermisos().then()
}

const editProduct = (permisoParam) => {
  permiso.value = { ...permisoParam }
  permisoDialog.value = true
}

const confirmarEliminarPermiso = (perm) => {
  permiso.value = perm
  eliminarPermisoDialog.value = true
}

const isLoading = ref()
const permisos = ref([])

async function getPermisos() {
  isLoading.value = true
  permisos.value = (await axiosCustom.get('permisos').catch(() => ({ data: [] }))).data
  isLoading.value = false
}

async function eliminar() {
  estaGuardandoLoading.value = true
  const axiosResponse = await axiosCustom.delete('permisos/' + permiso.value.id).catch(() => null)
  estaGuardandoLoading.value = false

  if (!axiosResponse?.data?.id) return

  permiso.value = {}
  eliminarPermisoDialog.value = false
  getPermisos()
}

onMounted(() => {
  getPermisos()
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
        :value="permisos"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 25]"
        :loading="isLoading"
      >
        <template #header>
          <h4 class="m-0 font-bold">PERMISOS</h4>
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
              @click="confirmarEliminarPermiso(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="permisoDialog"
      :style="{ width: '450px' }"
      header="Nuevo Permiso"
      :modal="true"
    >
      <form class="flex flex-col gap-6" @submit.prevent>
        <div>
          <label for="nombre" class="block font-bold mb-3">Nombre</label>
          <InputText
            id="nombre"
            v-model.trim="permiso.nombre"
            required="true"
            autofocus
            :invalid="enviado && !permiso"
            fluid
          />
          <small v-if="enviado && !permiso" class="text-red-500">Nombre es requerido.</small>
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
          @click="guardarPermiso"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="eliminarPermisoDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="permiso">
          ¿Estás seguro de que quiere eliminar <b>{{ permiso.nombre }}</b
          >?
        </span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="mdi mdi-close"
          :loading="estaGuardandoLoading"
          text
          @click="eliminarPermisoDialog = false"
        />
        <Button label="Si" icon="mdi mdi-check" :loading="estaGuardandoLoading" @click="eliminar" />
      </template>
    </Dialog>
  </div>
</template>
