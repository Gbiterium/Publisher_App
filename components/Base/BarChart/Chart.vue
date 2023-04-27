<template>
  
</template>

<script>
import { cloneDeep } from 'lodash';
import defaultOptions from './defaultOption';

export default {
  data() {
    return {
      options: { ...defaultOptions },
    };
  },
  props: {
    chartOptions: {
      type: Object,
      default: () => ({}),
    },

    title: {
      type: String,
      default: '',
    },
    chart: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    /**
     * when to chartOptions changes
     * and when the component is rendered
     */
    chartOptions: {
      handler(passedObj) {
        // eslint-disable-next-line prefer-object-spread
        this.options = cloneDeep(Object.assign({}, this.options, passedObj));

        this.options.exporting.chartOptions.title.text = this.title;
      },
      deep: true,
      immediate: true,
    },
  },

  mounted() {
    // changing the title of the text when downloaded
    this.options.exporting.chartOptions.title.text = this.title;
  },

}
</script>

<style>

</style>