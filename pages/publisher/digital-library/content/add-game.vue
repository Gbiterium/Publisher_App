<template>
    <div>
      <AddContent @file-upload="handleUpload" @content-data="handleSubmit" :loading="loading">
        <template #title> Add a Game </template>
        <template #upload-title>Upload Game</template>
      <template #upload-label>game</template>
      <template #thumbnail-label>game</template>
      </AddContent>
    </div>
  </template>
  
  <script>
  export default {
    layout: "authWithoutTopbar",
    data () {
        return {
            loading: false
        }
    },
    methods: {
      handleUpload(file) {
        if (file.type !== "video/mp4") {
          this.$toast({
            type: "error",
            text: "Invalid file format",
          });
        } else {
          return file;
        }
      },
      async handleSubmit(data) {
          try {
            this.loading = true
              const formData = new FormData()
              formData.append('content_type', 'game')
              formData.append('title', data.title)
              formData.append('description', data.description)
              formData.append('subject', data.subject)
              data.languages.forEach((el) => {
              formData.append('languages', el)
              })
              data.grade_levels.forEach((el) => {
              formData.append('grade_levels', el)
              })
              formData.append('content_file', data.content_file)
              data.categories.forEach((el) => {
              formData.append('categories', el)
              })
              data.keywords.forEach((el) => {
              formData.append('keywords', el)
              })
              data.curriculum.forEach((el) => {
              formData.append('curriculum', el)
              })
              data.thumbnails.forEach((el) => {
              formData.append('thumbnails', el)
              })
              const response = await this.$axios.post('/content/upload_content/', formData)
              if(response.status === 200) {
                this.$toast({
                    type: 'success',
                    text : 'content uploaded successfully'
                })
                this.$router.push('/publisher/digital-library')
              }
          } catch (error) {
              console.log(error)
          } finally {
            this.loading = false
          }
      }
    },
  };
  </script>
  
  <style></style>
  