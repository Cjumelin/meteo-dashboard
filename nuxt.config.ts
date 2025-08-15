// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: true,
  imports: {
    dirs: [
      'shared',
      'shared/weather',
      'shared/utils/temperature',
      'shared/utils/percentage'
    ]
  },
  
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
})
