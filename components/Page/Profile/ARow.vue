<template>
  <div
    class="d-flex flex-wrap align-items-center no-gutters border-bottom py-3"
  >
    <div class="col-md-3 col-12 mb-2 mb-md-0">
      <div class="text-light">{{ label }}</div>
    </div>
    <div class="col-md-7 col-10">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    objKey: {
      type: [String, Array],
      required: true
    }
  },
  data() {
    return {
      edit: false
    }
  },
}
</script>

<style lang="scss" scoped></style>
