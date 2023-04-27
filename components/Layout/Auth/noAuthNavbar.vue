<template>
  <div>
    <div v-show="isMobile"  class="modal-overlay"></div>
    <div class="cus">
      <div
        class="navbar px-3 px-lg-5 d-flex justify-content-between pr-5 pr-lg-0"
      >
        <div>
          <nuxt-link to="/">
            <img src="~/assets/img/logo.png" class="logo"
          /></nuxt-link>
        </div>
        <div class="d-flex align-items-center flex-wrap">
          <nav
            id="nav-bar-items"
            class="nav-items d-none d-lg-flex order-last order-lg-first"
          >
            <div class="nav-item">
              <a href="https://www.slate.ng" class="slate-blue fs-14 text-decoration-none" target="_blank">Go Back to Slate</a>
            </div>
          </nav>
          <div
            class="
              user-account-options
              d-flex
              align-items-center
              ml-lg-4 ml-3
              pr-lg-0
            "
          >
            <div class>
              <img
                class="account-image"
                :src="fallbackAvatar"
              />
            </div>
            <div class="ml-2">
              <div class="account-name text-left slate-blue">
                Hello, Slate
              </div>
              <div class="d-none d-md-block dropdown account-dropdown">
                <a
                  href="#"
                  class="dropdown-toggle smalltxt slate-blue"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >Accounts</a
                >
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <nuxt-link class="dropdown-item" to="/auth/profile/"
                    >My profile</nuxt-link
                  >
                  <nuxt-link class="dropdown-item" to="/onboarding/"
                    >Add School</nuxt-link
                  >
                  <nuxt-link class="dropdown-item" to="/auth/link/student"
                    >Student Settings</nuxt-link
                  >
                  <nuxt-link class="dropdown-item" to="/auth/link/parent"
                    >Parent Settings</nuxt-link
                  >
                  <nuxt-link class="dropdown-item" to="/auth/link/school"
                    >School Settings</nuxt-link
                  >
                  <b-btn class="bg-danger ml-2 btn mt-1" @click="logout()"
                    >Log out
                  </b-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      fallbackAvatar:
        'https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg',
    }
  },

  methods: {
    openMobile() {
      this.isMobile = !this.isMobile
    },
  },
}
</script>

<style scoped>
.site-nav .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  height: var(--navbar-height);
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  z-index: 999;
}

@media screen and (max-width: 991px) {
  .navbar {
    display: block;
  }

  .relativecontainer {
    position: relative;
  }
  .absolutecontainer {
    position: absolute;
    top: -40px;
    right: 10px;
  }

  .lightborder-bottom {
    border-bottom: 0.2px solid rgb(155, 155, 155);
  }

  .submenu {
    filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.09));
    background-color: #1a234b;
    border-radius: 0;
  }
}

.dropdown-item {
  padding: 0.25rem 0.75rem;
  border-bottom: 0.5px solid #e7e8eb;
}
.dropdown-toggle {
  color: white;
}
.no-arrow {
  text-decoration: none;
}
.no-arrow::after {
  display: none;
}
.dropdown-menu {
  overflow: auto;
}
.cus {
  background-color: #161e40;
}
a {
  color: white;
}
</style>
