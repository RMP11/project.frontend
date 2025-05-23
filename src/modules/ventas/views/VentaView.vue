<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ProductosService } from '@/modules/productos/services/productos.service'
import { SucursalesService } from '@/modules/sucursales/services/sucursales.services'
import { computed, ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const productos = ref<any>([])

async function getProductos() {
  productos.value = await ProductosService.obtener()
}
getProductos()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sucursales = ref<any>([])
const sucursal = ref()
async function getSucursales() {
  sucursales.value = await SucursalesService.obtener()
}
getSucursales()

const detalleVenta = ref<any>([])

function agregar(producto: any) {
  detalleVenta.value.push({
    cantidad: 1,
    precioUnitario: producto.precioVenta,
    productoId: producto.id,
    producto,
  })
}

const total = computed(() => {
  return detalleVenta.value.reduce((prev: number, actual: any) => {
    return prev + actual.precioUnitario * actual.cantidad
  }, 0)
})
</script>

<template>
  <div class="w-full h-full flex gap-2">
    <div class="flex-1">
      <div class="flex gap-2">
        <Button
          v-for="producto in productos"
          :key="producto.id"
          :label="producto.descripcion"
          outlined
          :title="`Precio de Venta: ` + producto.precioVenta"
          @click="agregar(producto)"
        />
      </div>
    </div>
    <div class="w-[15rem] flex flex-col gap-2">
      <Select
        v-model="sucursal"
        :options="sucursales"
        option-label="descripcion"
        option-value="id"
        class="w-full"
      />

      <Button label="Realizar Venta" />

      <div
        v-for="(detalleItem, index) in detalleVenta"
        :key="index"
        class="p-2"
        style="border: 1px solid lightgray"
      >
        <strong>{{ detalleItem.producto.descripcion }}</strong>
        <div>
          <div>
            Precio Unitario: <span class="">{{ detalleItem.precioUnitario }}</span>
          </div>
          <div class="">
            Cantidad:
            <input
              size="small"
              v-model="detalleItem.cantidad"
              type="number"
              class="border-[1px] rounded-lg w-[5rem]"
            />
          </div>
          <div>Subtotal: {{ detalleItem.precioUnitario * detalleItem.cantidad }}</div>
        </div>
      </div>

      <strong>Total: {{ total }}</strong>
    </div>
  </div>
</template>

<style scoped></style>
