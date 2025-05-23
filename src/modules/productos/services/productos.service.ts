import { axiosCustom } from '@/config/axiosCustom'

async function obtener() {
  const axiosResponse = await axiosCustom.get('productos').catch(() => ({ data: [] }))

  return axiosResponse?.data
}
export const ProductosService = {
  obtener,
}
