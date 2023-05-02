export default function ({ $axios, app, store, redirect }) {
  $axios.interceptors.request.use(
    (config) => {
      const token = app.$cookies.get('publisher-token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // config.headers['Access-Control-Allow-Origin'] = '*'
      // config.headers['Allow'] = 'GET, HEAD, OPTIONS'
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
}
