import { axiosCustom } from '@/config/axiosCustom'

async function obtener() {
  const axiosResponse = await axiosCustom.get('sucursales').catch(() => ({ data: [] }))

  return axiosResponse?.data
}
export const SucursalesService = {
  obtener,
}
