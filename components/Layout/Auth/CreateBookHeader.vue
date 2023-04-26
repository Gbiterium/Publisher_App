<template>
      <div
        class="navbar px-3 px-lg-5 d-flex justify-content-between py-2 pr-5 pr-lg-0"
      >
        <div class="d-flex justify-content-center align-items-center">
          <nuxt-link to="/publisher/bookshelf">
            <div class="d-flex align-items-center justify-content-center fs-14 text-light-blue">
            <span class="iconify mr-2" data-icon="bi:arrow-left"></span>
            <span>Back to Book Shelf</span>
            </div>
          </nuxt-link>
          <div class="font-weight-bold fs-24 text-white mx-5">
            <h3>Create Book</h3>
          </div>
          <div class="text-white fs-14 font-weight-bold">
            DRAFT
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center flex-wrap">
            <button class="btn btn-transparent px-3 py-2 text-white">Save</button>
        </div>
      </div>
</template>

<script>
export default {

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