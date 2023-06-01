<template>
    <div>
      <AddContent @file-upload="handleUpload" @remove-file="removeFile" :valid-file="validFile" @content-data="handleSubmit" :loading="loading">
        <template #title> Add a Document </template>
        <template #upload-title>Upload Document</template>
      <template #upload-label>document</template>
      <template #thumbnail-label>document</template>
      </AddContent>
    </div>
  </template>
  
  <script>
  export default {
    layout: "authWithoutTopbar",
    data () {
        return {
        loading: false,
        content: {},
        validFile: '',
        }
    },
    methods: {
      handleUpload(file) {
        if (!file.type.includes('officedocument')) {
          this.$toast({
            type: "error",
            text: "Invalid file format",
          });
        } else {
          this.validFile = file
        }
      },
      removeFile() {
      this.validFile = null
    },
      async handleSubmit(data) {
          try {
            this.loading = true
              const formData = new FormData()
              formData.append('content_type', 'document')
              formData.append('title', data.title)
              formData.append('description', data.description)
              data.subject.forEach((el) => {
              formData.append('subject', el.id || el)
              })
              data.languages.forEach((el) => {
              formData.append('languages', el)
              })
              data.grade_levels.forEach((el) => {
              formData.append('grade_levels', el)
              })
              formData.append('content_file', this.validFile)
              data.categories.forEach((el) => {
              formData.append('categories', el)
              })
              data.keywords.forEach((el) => {
              formData.append('keywords', el)
              })
              data.curriculum.forEach((el) => {
              formData.append('curriculum', el.id || el)
              })
              data.thumbnails.forEach((el) => {
              formData.append('thumbnails', el)
              })
              if(this.$route.query.id) {
                const response = await this.$axios.put(`/content/update_content/${this.$route.query.id}/`, formData)
                if(response.status === 200) {
                  this.$toast({
                    type: 'success',
                    text: 'content updated successfully'
                  })
                  this.$router.push(`/publisher/digital-library/content/${this.$route.query.id}`)
                }
              } else {
              const response = await this.$axios.post('/content/upload_content/', formData)
              if(response.status === 200) {
                this.$toast({
                    type: 'success',
                    text : 'content uploaded successfully'
                })
                this.$router.push('/publisher/digital-library')
              }
            }
          } catch (error) {
            if (error.response.data && error.response) {
          const keys = Object.keys(error.response.data);
          keys.forEach((key) => {
            this.$toast({
              type: "error",
              text: `${key} - ${error.response.data[key][0]}`,
            });
          });
        }
          } finally {
            this.loading = false
          }
      },
    },
  };
  </script>
  
  <style></style>
  