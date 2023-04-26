<template>
  <div>
    <Transition name="slide-fade">
      <div class="site-nav">
        <LayoutAuthCreateBookHeader />
      </div>
    </Transition>

    <div class="site-container">
        <div class="row">
            <div class="col-md-2">
                <h4 class="fs-14 font-weight-bold">Create your book</h4>
                <div>
                    <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      class="custom-checkbox"
      unchecked-value="not_accepted"
      :class="[showDetails ? 'selected-color' : '']"
    >
    <span class="ml-2 fs-14" @click.prevent="showDetailsForm">Book Details</span>
    </b-form-checkbox>
                </div>
                <div>
                    <b-form-checkbox
      id="checkbox-2"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      class="custom-checkbox"
      :class="[showContent ? 'selected-color' : '']"
    >
    <span class="ml-2 fs-14" @click.prevent="showContentForm">Book Content</span>
    </b-form-checkbox>
                </div>
            </div>
            <div class="col-md-10">
      <BookDetails v-if="showDetails" />
      <BookContent v-else />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDetails: true,
      showContent: false
    }
  },
  methods: {
    showContentForm() {
      this.showDetails = false
      this.showContent = true
    },
    showDetailsForm() {
      this.showDetails = true
      this.showContent = false
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.selected-color {
  color: #1070B7;
  border-right: 5px solid #1070B7;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>