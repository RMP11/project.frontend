<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { SucursalesService } from '@/modules/sucursales/services/sucursales.services'
import { ref } from 'vue'
import { VentasService } from '../services/ventas.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sucursales = ref<any>([])
const sucursal = ref()

async function getSucursales() {
  sucursales.value = await SucursalesService.obtener()
}
getSucursales()

const ventas = ref<any[]>()
async function getVentas() {
  ventas.value = await VentasService.obtener({ sucursalId: sucursal.value })
}
getVentas()
</script>

<template>
  <Select
    v-model="sucursal"
    :options="sucursales"
    option-label="descripcion"
    option-value="id"
    class="w-full"
    show-clear
    @update:model-value="
      () => {
        getVentas()
      }
    "
  />

  <DataTable :value="ventas" tableStyle="min-width: 50rem">
    <Column field="fecha" header="Fecha">
      <template #body="{ data }">
        {{ new Date(data.fecha).toLocaleString() }}
      </template>
    </Column>

    <Column field="cliente" header="Cliente"></Column>

    <Column field="descuento" header="Descuento"></Column>

    <Column field="total" header="Total"></Column>

    <Column field="empleado.nombre" header="Encargado"></Column>

    <Column field="sucursal.descripcion" header="Sucursal"></Column>
  </DataTable>
</template>

<style scoped></style>
