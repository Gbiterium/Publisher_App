<template>
  <div>
    <div v-if="$cookies.get('publisher-token') !== undefined" class="row text-center my-3">
      <div class="col text-left">
        <h2 class="text-left font-family_brown font-weight-bold">Continue as a Publisher</h2>
        <!-- <span>Don't have account? <nuxt-link to="/auth/signup">Sign Up</nuxt-link></span> -->
        <button class="btn btn-primary mt-3" @click="$router.push('./publisher/analytics')">continue</button>
      </div>
    </div>
    <button v-else class="btn btn-primary" @click="loginHandler">login</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
export default Vue.extend({
  layout: 'signup',
  name: 'IndexPage',
  computed: {
    ...mapGetters('publisher', ['getToken'])
  },
  data () {
    return {
      token: ''
    }
  },
  // mounted () {
  //  this.token = this.$cookies.get('publisher-token')
  // },
  methods: {
    ...mapActions('publisher', ['GET_TOKEN']),
    async loginHandler() {
      const response = await this.GET_TOKEN()
      console.log(response)
      this.$router.push('./publisher/analytics')
    }
  }
})
</script>
