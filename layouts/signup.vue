<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-md-4 bg-slate-primary px-4 text-white d-none d-md-block">
        <div class="row logo my-5">
          <div class="col" style="cursor: pointer" @click="$router.push(`/`)">
            <img src="~/assets/img/logo-white.png" alt="">
          </div>
        </div>
        <div class="row my-5">
          <div class="col">
            <h1>Online Learning with no bounds.</h1>
          </div>
        </div>
        <div class="row my-4">
          <div class="col">
            <h3 class="font-weight-bold font-family_brown line-height-170p">
              Slate Account Benefits
            </h3>
            <!-- <p> -->
            <ul class="list-unstyled line-height-170p">
              <li
                v-for="(benefit, index) in slate_account_benefit"
                :key="index"
              >
                <b-icon icon="check-circle-fill" variant="success" />
                {{ benefit }}
              </li>
            </ul>
            <!-- </p> -->
          </div>
        </div>

        <div class="row my-4">
          <div class="col">
            <h3 class="font-weight-bold font-family_brown line-height-170p">
              Amazing Features
            </h3>
            <!-- <p> -->
            <ul class="list-unstyled line-height-170p">
              <li v-for="(amazing, index) in amazing_feature" :key="index">
                <b-icon variant="success" icon="check-circle-fill" />
                {{ amazing }}
              </li>
            </ul>
            <!-- </p> -->
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="mx-auto my-3 mx-2 top">
          <!-- <div class="d-flex justify-content-between flex-wrap"> -->
          <a href="" @click.prevent="$router.push('/')">
            <span> <b-icon icon="arrow-left" />Home</span>
          </a>
          <!-- </div> -->
        </div>
        <div class="d-flex flex-column justify-content-around vh-100">
          <nuxt />
        </div>
        <div class="auth-footer mx-auto px-md-5 px-3 bottom width75">
          <div class="d-flex justify-content-between flex-wrap w-100">
            <div class="d-flex flex-wrap">
              <!-- <span class="click mr-2">
                <nuxt-link to="/support" class="summ auth-footer">
                  Support
                </nuxt-link> </span
              > -->

              <span class="click mx-2">
                <nuxt-link to="/privacy-policy" class="auth-footer">
                  Privacy Policy
                </nuxt-link> </span><span class="click ml-2">
                <nuxt-link to="/terms" class="auth-footer">
                  Terms and Conditions
                </nuxt-link>
              </span>
            </div>
            <div class="auth-footer">
              © {{ new Date().getFullYear() }} Slate.ng, All Rights Reserved
            </div>
          </div>
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
