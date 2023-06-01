<template>
      <div
        class="navbar px-3 px-lg-5 d-flex justify-content-between py-2 pr-5 pr-lg-0"
      >
        <div class="d-flex justify-content-center align-items-center">
          <!-- <nuxt-link to="/publisher/bookshelf"> -->
            <div class="d-flex align-items-center justify-content-center fs-14 text-light-blue pointer" @click="showModal">
            <span class="iconify mr-2" data-icon="bi:arrow-left"></span>
            <span>Back to Book Shelf</span>
            </div>
          <!-- </nuxt-link> -->
          <div class="font-weight-bold fs-24 text-white mx-5">
            <h3>Create Book</h3>
          </div>
          <div class="text-white fs-14 font-weight-bold">
            {{ $route.query.book_id ? getBook.name : 'DRAFT' }}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center flex-wrap">
            <button class="btn btn-transparent px-3 py-2 text-white">Save</button>
        </div>
        <ModalWrapper
      id="goBackModal"
      title="Save as Draft"
      :no-footer="true"
    >
    <div class="my-4">
      <div class="d-flex align-items-center justify-content-center">
      <span>Are you sure you want to go to bookshelf?</span>
      </div>
      <div class="d-flex w-100 justify-content-center align-items-center mt-4 mb-2">
        <div>
          <button
            class="btn btn-light py-2 px-3 mr-2"
            @click="goBack()"
            >
            Go Back
          </button>
        </div>
        <div>
          <button
            class="btn btn-primary px-3 py-2"
            >
            <!-- @click="save_draft" -->
          Save as Draft
          </button>
        </div>
      </div>
      </div>
    </ModalWrapper>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('publisher', ['getBook'])
  },
  methods: {
    showModal() {
      this.$bvModal.show('goBackModal')
    },
    goBack() {
      this.$router.push('/publisher/bookshelf')
      this.$bvModal.hide('goBackModal')
    }
  }
}
</script>

<style scoped>
.navbar {
    background: #171E40;
}
button {
    border: 1px solid #fff;
}
.text-light-blue {
    color: #5DB4F5;
}
</style>