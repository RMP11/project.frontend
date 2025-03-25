import axios, { type AxiosResponse } from 'axios'

export const axiosCustom = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_BASE,
})

axiosCustom.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
})

axiosCustom.interceptors.response.use(
  (response) => {
    mostrarMensajes(response)

    return response
  },

  async (err) => {
    const message = err?.response?.data?.message

    if (message.length > 0) {
      mostrarMensajes(err.response)
    }

    throw err
  },
)

function mostrarMensajes(response: AxiosResponse) {
  let message = response?.data?.message
  const method = response?.config?.method

  const status = response?.status

  if (status < 300) {
    if (status === 201) toast?.add({ severity: 'success', summary: 'REGISTRO CREADO', life: 5000 })
    if (status === 200 && ['put', 'patch'].includes(method ?? ''))
      toast?.add({ severity: 'success', summary: 'REGISTRO CREADO', life: 5000 })
    return
  }

  let detail = ''
  const data = response?.data

  /* if (err.message === 'Network Error') {
    message = 'ERROR DE CONEXIÓN'
  } else */ if ([401, 422, 400].includes(status)) {
    message = `CORRIJA LOS ERRORES`
    const _errors = data?.message ?? ''

    if (typeof _errors === 'object') {
      // for (const [key, value] of Object.entries(_errors)) {
      //   if (!Array.isArray(value)) continue

      //   detail += `<li><b>${key}</b> : ${value[0]}</li>`
      // }
      detail = _errors.join(',  ')
    } else {
      detail = _errors
    }
  } else if (status === 403) {
    message = `ACCESO PROHIBIDO`
  } else if (status === 500) {
    message = `ERROR DE SERVIDOR`
  }

  toast?.add({ severity: 'error', summary: detail, life: 5000 })
}
