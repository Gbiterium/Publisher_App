<template>
  <div>
    <button v-if="token !== undefined" class="btn btn-primary" @click="$router.push('./publisher/analytics')">continue</button>
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
  mounted () {
    this.token = this.$cookies.get('publisher-token')
  },
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
