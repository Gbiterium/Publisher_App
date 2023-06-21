<template>
  <div @mouseleave="close()">
    <div
      v-if="!editorLoaded"
      v-b-tooltip.hover
      title="click to edit content"
      @click="show()"
    >
      <slot>
        <span v-html="editorData"></span>
      </slot>
    </div>

    <client-only>
      <ckeditor
        v-if="editorLoaded"
        v-model="editorData"
        :editor="editor"
        :config="editorConfig"
      ></ckeditor>
    </client-only>
  </div>
</template>

<script>
// import { mixin as clickaway } from 'vue-clickaway'
// import Editor from 'ckeditor5-custom-build/build/ckeditor'
// import CKEditor from '@ckeditor/ckeditor5-vue2'

let Editor
let CKEditor

if (process.client) {
  Editor = require('ckeditor5-custom-build/build/ckeditor')
  CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  // mixins: [clickaway],
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      editor: Editor,
      editorLoaded: false,
      timer: null,
      // editorData: '',
      editorConfig: {
        // The configuration of the editor.
        simpleUpload: {
          uploadUrl: ``,
          headers: {
            Authorization: ` `,
          },
        },
        placeholder: '',
        removePlugins: [],
      },
    }
  },
  computed: {
    editorData: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    this.editorLoaded = false
    this.editorConfig = Object.assign(this.editorConfig, this.config)
    this.editorConfig.placeholder = this.placeholder
    // const school = this.$store.getters['school/getSchoolByCode'](
    //   this.$route.params.id
    // )
    // this.editorConfig.simpleUpload.uploadUrl = `${process.env.BASE_URL}/schools/v2/school/${school.id}/wiziwick_resource/`
    this.editorConfig.simpleUpload.headers = {
      Authorization: `Bearer ${this.$cookies.get('publisher-token')}`,
      'Access-Control-Allow-Origin': '*',
    }
    this.editorConfig.simpleUpload.withCredentials = false

    this.editorConfig.removePlugins.push('Markdown')
  },

  created() {
    setTimeout(() => {
      if (this.editorData.length <= 0) {
        this.show()
      }
    }, 1000)
  },
  methods: {
    // away() {
    //   console.log('Click Away')
    //   this.timer = setTimeout(function () {
    //     console.log('Click Awayddd')
    //     this.editorLoaded = false
    //   }, 500)
    // },
    show() {
      this.editorLoaded = true
      // clearTimeout(this.timer)
    },

    close() {
      if (this.editorData.length > 0) {
        setTimeout(() => {
          this.editorLoaded = false
        }, 1000)
      }
    },
  },
}
</script>
