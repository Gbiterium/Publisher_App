<template>
  <div>
    <client-only>
      <!-- <div v-if="$store.getters['auth/isLoggedIn']" class="site-nav">
        <LayoutAuthNavbar />
      </div> -->
      <no-auth-navbar />
    </client-only>
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import noAuthNavbar from '~/components/Layout/Auth/noAuthNavbar.vue'
export default {
  components: { noAuthNavbar }
}
</script>
