import { axiosCustom } from '@/config/axiosCustom'

async function registrar(body: object) {
  const axiosResponse = await axiosCustom.post('ventas', body).catch(() => ({ data: [] }))

  return axiosResponse?.data
}
export const VentasService = {
  registrar,
}
