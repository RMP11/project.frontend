import './assets/main.css'

import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import '@mdi/font/css/materialdesignicons.min.css'
import router from './router'
import { useToast } from 'primevue/usetoast'
import App from './App.vue'
import { ToastService } from 'primevue'

const app = createApp({
  beforeCreate() {
    const toast = useToast()

    window.toast = toast
  },
  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  ripple: true,
  locale: 'es',
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'base, theme, primevue',
      },
    },
  },
})

app.use(ToastService)

app.mount('#app')
