import { axiosCustom } from '@/config/axiosCustom'

async function registrar(body: object) {
  const axiosResponse = await axiosCustom.post('ventas', body).catch(() => ({ data: undefined }))

  return axiosResponse?.data
}

async function obtener(body?: { sucursalId: number }) {
  const axiosResponse = await axiosCustom
    .get('ventas', { params: body })
    .catch(() => ({ data: [] }))

  return axiosResponse?.data
}
export const VentasService = {
  registrar,
  obtener,
}
