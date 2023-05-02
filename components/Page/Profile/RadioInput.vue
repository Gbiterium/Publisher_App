<template>
    <div class="col-4">
        <div v-if="toInput && !readOnly" class="d-flex align-items-center">
      <input
        v-model="currentValue"
        type="radio"
        :value="label"
      /> <span class="ml-2">{{ label }}</span>
      </div>
      <span v-else>{{ currentValue }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        required: true
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      toInput: {
      type: Boolean,
      default: false
    }
    },
    data() {
      return {
        // toInput: true
      }
    },
    computed: {
      currentValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped></style>
  