export default {
  loadingIndicator: {
    name: 'chasing-dots',
    color: '#161e40',
    background: 'white'
  },
  loading: {
    color: '#1070b7',
    throttle: 0,
    height: '4px',
    continuous: true
  },
  // Global Transition (default)
  pageTransition: 'slide-bottom',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Slate Books - Publisher',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: '/js/iconify.min.js',
      },
      {
        src: '/js/jquery-3.5.1.slim.min.js',
      },
      {
        src: '/js/bootstrap.bundle.min.js',
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ '@/assets/css/all.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/iziToast', mode: 'client' },
    '~/plugins/vee-validate',
    '~/plugins/iconify',
    '~/plugins/axios',
    '~/plugins/dateFormat',
    '~/plugins/vue-select',
    '~/plugins/persistedState.client.js',
    { src: '~/plugins/calender', mode: 'client' },
    { src: '~/plugins/highchart.js', mode: 'client' },
    { src: '~/plugins/vue-star-rating.js', mode: 'client'},
  ],

  router: {
    middleware: 'route-guard'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'cookie-universal-nuxt'
  ],
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],

    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/i,
          loader: 'comlink-loader',
          options: {
            singleton: true,
          },
        })
      }

    },
  }
}
