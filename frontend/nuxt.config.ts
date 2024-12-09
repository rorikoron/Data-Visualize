// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image'],
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.plot.ly/plotly-2.35.2.min.js',
          type: 'text/javascript',
        },
      ],
    },
  },
})