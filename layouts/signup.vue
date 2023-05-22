<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-md-4 bg-slate-primary px-4 text-white d-none d-md-block">
        <div class="row logo my-5">
          <div class="col" style="cursor: pointer" @click="$router.push(`/`)">
            <img src="~/assets/img/logo-white.png" alt="">
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="d-flex justify-content-center align-items-center vh-100">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  // layout: 'signup',
  data () {
    return {
      slate_account_benefit: [
        'Access to courses',
        'Shop for educational material',
        'Learn at your pace',
        'Search for schools with reviews'
      ],
      amazing_feature: [
        'Join your school lms',
        'Pay all educational fees on slate',
        'Access tutors for learning',
        'Download engaging material'
      ]
    }
  },
  methods: {}
})
</script>

<style scoped>
.top {
  position: absolute;
  top: 0;
}

.auth-footer {
  color: #b8bcd5;
  font-size: 14px;
}

/* .width75 {
  width: 75%;
} */

@media screen and (max-width: 708px) {
  .auth-footer {
    font-size: 12px;
  }
  .width75 {
    width: 100%;
  }
}
a {
  /* color: #c0c0c0; */
}

.bottom {
  position: relative;
  bottom: 40px;
}
</style>
