<template>
  <client-only>
    <ckeditor
      v-if="editorLoaded"
      v-model="editorData"
      :editor="editor"
      :config="editorConfig"
    ></ckeditor>
  </client-only>
</template>

<script>
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
    // this.editorConfig.simpleUpload.headers = {
    //   Authorization: `Bearer ${this.$store.state.auth.token}`,
    //   'Access-Control-Allow-Origin': '*',
    // }
    this.editorConfig.simpleUpload.withCredentials = false

    this.editorConfig.removePlugins.push('Markdown')
  },

  created() {
    setTimeout(() => {
      this.editorLoaded = true
    }, 1000)
  },
}
</script>
