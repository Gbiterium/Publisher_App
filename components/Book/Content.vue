<template>
  <div class="container">
    <div class="card">
          <div class="card-head">
              <h3 class="px-xl-5 pt-4 pb-2 fs-24">Book Content</h3>
          <hr />
          </div>
        <div class="card-body pt-xl-3 pb-xl-5 px-xl-5">
            <div class="row">
                <div class="col-md-10">
                    <div>Manuscript</div>
                    <div v-if="!manuscript">
                    <small class="mt-3 fs-12">Upload Manuscript </small>
                    <div class="upload-area d-flex align-items-center justify-content-center">
                        <div class="">
                            <div class="d-flex align-items-center justify-content-center">
                        <img src="@/assets/img/file.png" alt="">
                        </div>
                        <div class="d-flex align-items-center justify-content-center fs-12">
                        <span><span class="text-blue text-decoration-underline pointer" @click="$refs.manuscriptInput.click()">Browse</span> to choose a file </span>
                        <input
                ref="manuscriptInput"
                type="file"
                class="d-none"
                @change.prevent="upload()"
              />    
                    </div>
                        <div class="d-flex align-items-center justify-content-center fs-10">
                        <span>Recommended formats includes;</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-center fs-10">
                        <span>PDF, DOCX or EPUB.</span>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div v-else class="file-area d-flex align-items-center justify-content-center mt-3">
                        <div>
                            <div class="d-flex align-items-center justify-content-center">
                                <img src="@/assets/img/upload.png">
                            </div>
                            <div class="d-flex align-items-center justify-content-center fs-14 mt-3">
                                {{ truncate(manuscript.name, 30) }}
                            </div>
                            <div class="d-flex align-items-center justify-content-center fs-12 text-grey">
                                {{ formatSize(manuscript.size) }}
                            </div>
                            <div class="d-flex align-items-center justify-content-center mt-3 fs-14 text-blue font-weight-bold">
                                View Attachment
                            </div>
                        </div>
                        <div class="trash-abs">
                            <b-icon-trash class="fs-14 text-blue trash pointer" @click="removeFile" />
                        </div>
                    </div>
                    </div>
                </div>
            <div class="row mt-5">
                <div class="col-md-10">
                    <div>Snippet</div>
                    <div v-if="!file">
                    <small class="mt-3 fs-12">Upload Snippet</small>
                    <div class="upload-area d-flex align-items-center justify-content-center">
                        <div class="">
                            <div class="d-flex align-items-center justify-content-center">
                        <img src="@/assets/img/file.png" alt="">
                        </div>
                        <div class="d-flex align-items-center justify-content-center fs-12">
                        <span><span class="text-blue pointer text-decoration-underline" @click="$refs.fileInput.click()">Browse</span> to choose a file </span>
                        <input
                ref="fileInput"
                type="file"
                class="d-none"
                @change.prevent="handleUpload()"
              />
                        </div>
                        <div class="d-flex align-items-center justify-content-center fs-10">
                        <span>Recommended formats includes;</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-center fs-10">
                        <span>PDF, DOCX or EPUB.</span>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div v-else class="file-area d-flex align-items-center justify-content-center mt-3">
                        <div>
                            <div class="d-flex align-items-center justify-content-center">
                                <img src="@/assets/img/upload.png">
                            </div>
                            <div class="d-flex align-items-center justify-content-center fs-14 mt-3">
                                {{ truncate(file.name, 30) }}
                            </div>
                            <div class="d-flex align-items-center justify-content-center fs-12 text-grey">
                                {{ formatSize(file.size) }}
                            </div>
                            <div class="d-flex align-items-center justify-content-center mt-3 fs-14 text-blue font-weight-bold">
                                View Attachment
                            </div>
                        </div>
                        <div class="trash-abs">
                            <b-icon-trash class="fs-14 text-blue trash pointer" @click="removeFile" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="pl-3">
                    <div>Book Cover</div>
                    <small class="mt-3 fs-12">Upload Book Cover </small>
                    <div class="image-container">
                        <img v-if="book_cover" :src="book_cover" alt="">
                    <img v-else src="@/assets/img/book-cover.png" alt="">
                    <div class="set-cover">
                    <button type="button" class="btn btn-light px-4 py-2" @click="$refs.coverInput.click()">Set Book Cover</button>
                    <input
                ref="coverInput"
                type="file"
                class="d-none"
                @change.prevent="handleCoverUpload()"
              />
                    </div>
                    </div>
                </div>
            </div>
            <div class="row my-5">
                <div class="col-md-10 d-flex justify-content-end">
                    <button class="btn btn-outline-primary px-3 py-2 mr-3">Previous</button>
                    <button class="btn btn-primary px-3 py-2">Next</button>
                    </div>
                </div>
            </div>
  </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            file: '',
            manuscript: '',
            book_cover: ''
        }
    },
methods: {
    handleUpload() {
      const input = this.$refs.fileInput
      this.file = input.files[0]
    //   if (
    //     file &&
    //     file.size <= 500000 &&
    //     (file.type === 'image/png' || file.type === 'image/jpeg')
    //   ) {
    //     const reader = new FileReader()
    //     reader.addEventListener('load', () => {
    //       this.schoolCrest = reader.result
    //       localStorage.setItem('schoolCrest', this.schoolCrest)
    //     })
    //     reader.readAsDataURL(file)
    //     this.uploaded = true
    //   } else {
    //     this.uploaded = false
    //   }
    },
    upload() {
      const input = this.$refs.manuscriptInput
      this.manuscript = input.files[0] 
    },
    handleCoverUpload() {
      const input = this.$refs.coverInput
      const file = input.files[0] 
      const reader = new FileReader()
        reader.addEventListener('load', () => {
          this.book_cover = reader.result
        })
        reader.readAsDataURL(file)
    },
    removeFile() {
        this.file = null
    },
    formatSize(value) {
        if(value.toString().length <= 5) {
            const mb = (value / 1024).toFixed(1)
            const result = mb + 'KB'
            return result
          } else {
            const mb = (value / (1024 * 1024)).toFixed(1)
            const result = mb + 'MB'
            return result
          }
    },
    truncate (source, size) {
        return source.length > size ? source.slice(0, size - 1) + '…' : source
    },
}
}
</script>

<style scoped>
.upload-area {
    height: 160px;
    background: #FFFFFF;
border: 1px dashed #D4D7E4;
border-radius: 5px;
}
.card {
    box-shadow: 0px 2px 25px rgba(23, 30, 64, 0.05);
}
.image-container img {
    width: 280px;
    height: 200px;
    object-fit: cover;
    object-position: center;
}
.image-container {
    position: relative;
}
.set-cover button {
    color: #1070B7 !important;
    background: #fff !important;
    font-size: 12px;
    box-shadow: 0px 2px 25px rgba(23, 30, 64, 0.05);
}
.set-cover {
    position: absolute;
    top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.file-area {
    width: 280px;
    height: 200px;
    background: #FAFDFF;
border: 1px solid #D9E9F6;
border-radius: 5px;
position: relative;
}
.trash-abs{
    position: absolute;
    top: 5px;
    right: 10px;
}
</style>