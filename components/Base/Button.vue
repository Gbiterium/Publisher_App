<template>
  <button
    class="btn btn-primary"
    :class="extraClass"
    :disabled="isLoading || disable"
    @click="$emit('click', $event)"
  >
    <template v-if="watchRequest">
      <span
        v-if="isLoading"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    </template>
    <slot>A Button</slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    watchRequest: {
      type: Boolean,
      default: false,
    },
    extraClass: {
      type: String,
      default: '',
    },
    disable:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    isLoading() {
      const store = this.$store as any
      return store.state.requestInProgress
    },
  },
})
</script>

<style lang="scss" scoped></style>
