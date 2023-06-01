<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-head">
        <h3 class="px-md-5 pt-4 pb-2 fs-24">Book Content</h3>
        <hr />
      </div>
      <div class="card-body pt-md-3 pb-md-5 px-md-5">
        <div class="row">
          <div class="col-lg-4 col-md-8 mb-3">
            <div>Manuscript</div>
            <div v-if="!manuscript">
              <small class="mt-3 fs-12">Upload Manuscript </small>
              <div
                class="upload-area d-flex align-items-center justify-content-center"
              >
                <div class="">
                  <div class="d-flex align-items-center justify-content-center">
                    <img src="@/assets/img/file.png" alt="" />
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-center fs-12"
                  >
                    <span
                      ><span
                        class="text-blue text-decoration-underline pointer"
                        @click="$refs.manuscriptInput.click()"
                        >Browse</span
                      >
                      to choose a file
                    </span>
                    <input
                      ref="manuscriptInput"
                      type="file"
                      class="d-none"
                      @change.prevent="upload()"
                    />
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-center fs-10"
                  >
                    <span>Recommended formats includes;</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-center fs-10"
                  >
                    <span>PDF, DOCX or EPUB.</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="file-area d-flex align-items-center justify-content-center mt-3"
            >
              <div>
                <div class="d-flex align-items-center justify-content-center">
                  <img src="@/assets/img/upload.png" />
                </div>
                <div
                  class="d-flex align-items-center justify-content-center fs-14 mt-3"
                >
                  {{ truncate(manuscript.name, 30) }}
                </div>
                <div
                  class="d-flex align-items-center justify-content-center fs-12 text-grey"
                >
                  {{ formatSize(manuscript.size) }}
                </div>
                <div
                  class="d-flex align-items-center justify-content-center mt-3 fs-14 text-blue font-weight-bold"
                >
                  View Attachment
                </div>
              </div>
              <div class="trash-abs">
                <b-icon-trash
                  class="fs-14 text-blue trash pointer"
                  @click="removeManuscript"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-8 mb-3">
            <div>Snippet</div>
            <div v-if="!file">
              <small class="mt-3 fs-12">Upload Snippet</small>
              <div
                class="upload-area d-flex align-items-center justify-content-center"
              >
                <div class="">
                  <div class="d-flex align-items-center justify-content-center">
                    <img src="@/assets/img/file.png" alt="" />
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-center fs-12"
                  >
                    <span
                      ><span
                        class="text-blue pointer text-decoration-underline"
                        @click="$refs.fileInput.click()"
                        >Browse</span
                      >
                      to choose a file
                    </span>
                    <input
                      ref="fileInput"
                      type="file"
                      class="d-none"
                      @change.prevent="handleUpload()"
                    />
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-center fs-10"
                  >
                    <span>Recommended formats includes;</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-center fs-10"
                  >
                    <span>PDF, DOCX or EPUB.</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="file-area d-flex align-items-center justify-content-center mt-3"
            >
              <div>
                <div class="d-flex align-items-center justify-content-center">
                  <img src="@/assets/img/upload.png" />
                </div>
                <div
                  class="d-flex align-items-center justify-content-center fs-14 mt-3"
                >
                  {{ truncate(file.name, 30) }}
                </div>
                <div
                  class="d-flex align-items-center justify-content-center fs-12 text-grey"
                >
                  {{ formatSize(file.size) }}
                </div>
                <div
                  class="d-flex align-items-center justify-content-center mt-3 fs-14 text-blue font-weight-bold"
                >
                  View Attachment
                </div>
              </div>
              <div class="trash-abs">
                <b-icon-trash
                  class="fs-14 text-blue trash pointer"
                  @click="removeFile"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-8 mb-3">
            <div class="pl-lg-3">
              <div>Book Cover</div>
              <small class="mt-3 fs-12">Upload Book Cover </small>
              <div class="image-container">
                <img v-if="book_cover" :src="book_cover" alt="" />
                <img v-else src="@/assets/img/book-cover.png" alt="" />
                <div class="set-cover">
                  <button
                    type="button"
                    class="btn btn-light fs-12 px-3 py-2"
                    @click="$refs.coverInput.click()"
                  >
                    Set Book Cover
                  </button>
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
        </div>
        <div class="row my-5">
          <div class="col-md-12 d-flex justify-content-end">
            <button
              class="btn btn-outline-primary px-3 py-2 mr-3"
              @click.prevent="$emit('goBack')"
            >
              Previous
            </button>
            <button
              class="btn btn-primary px-3 py-2"
              @click.prevent="handleSubmit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalWrapper id="publishModal" title="Publish Book" :no-footer="true">
      <div class="my-4">
        <div class="d-flex align-items-center justify-content-center">
          <span>Are you sure you want to publish book?</span>
        </div>

        <div
          class="d-flex w-100 justify-content-center align-items-center mt-5 mb-2"
        >
          <div>
            <button
              class="btn btn-primary py-2 px-3 mr-2"
              @click="submit_review"
            >
              Submit for review
            </button>
          </div>
          <div>
            <button class="btn btn-light px-5 py-2" @click="save_draft">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: "",
      manuscript: "",
      book_cover: "",
      bookCover: "",
      subjects: "",
      submit_for_review: false,
    };
  },
  methods: {
    handleUpload() {
      const input = this.$refs.fileInput;
      this.file = input.files[0];
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
      const input = this.$refs.manuscriptInput;
      this.manuscript = input.files[0];
    },
    handleCoverUpload() {
      const input = this.$refs.coverInput;
      const file = input.files[0];
      this.bookCover = file;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.book_cover = reader.result;
      });
      reader.readAsDataURL(file);
    },
    book_data() {
      const bookDetails = this.$cookies.get("book-details");
      const formData = new FormData();
      formData.append("author_name", bookDetails.author_name),
        bookDetails.contributors.forEach((el) => {
          formData.append("contributors", el);
        }),
        formData.append("short_description", bookDetails.short_description),
        bookDetails.categories.forEach((el) => {
          formData.append("categories", el);
        }),
        bookDetails.keywords.forEach((el) => {
          formData.append("keywords", el);
        }),
        bookDetails.levels.forEach((el) => {
          formData.append("levels", el);
        }),
        bookDetails.subjects.forEach((el) => {
          formData.append("subjects", el);
        }),
        bookDetails.curriculums.forEach((el) => {
          formData.append("curriculums", el);
        }),
        formData.append("format", bookDetails.format),
        formData.append("isbn", bookDetails.isbn),
        formData.append("publication_date", bookDetails.publication_date),
        formData.append("number_of_pages", bookDetails.number_of_pages),
        formData.append("sub_title", bookDetails.sub_title),
        formData.append("book_title", bookDetails.book_title),
        formData.append(
          "primary_book_language",
          bookDetails.primary_book_language
        ),
        formData.append("short_description", bookDetails.short_description),
        formData.append("book_cover", this.bookCover),
        formData.append("manuscript", this.manuscript),
        formData.append("snippet", this.file);
      formData.append("submit_for_review", this.submit_for_review);
      return formData;
    },
    async save_draft() {
      this.submit_for_review = false;
      const formData = await this.book_data();
      try {
        const response = await this.$axios.post(
          "/app/publisher/add_book/",
          formData
        );
        if (response.status === 200) {
          this.$router.push("/publisher/bookshelf");
          this.$bvModal.hide("publishModal");
        }
        console.log(response);
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
      }
    },
    async submit_review() {
      this.submit_for_review = true;
      const formData = await this.book_data();
      try {
        const response = await this.$axios.post(
          "/app/publisher/add_book/",
          formData
        );
        if (response.status === 200) {
          this.$router.push("/publisher/bookshelf");
          this.$bvModal.hide("publishModal");
        }
        console.log(response);
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
      }
    },
    handleSubmit() {
      // const bookDetails = this.$cookies.get("book-details");
      // const formData = new FormData();
      // formData.append("author_name", bookDetails.author_name),
      //   bookDetails.contributors.forEach((el) => {
      //     formData.append("contributors", el);
      //   }),
      //   formData.append("short_description", bookDetails.short_description),
      //   bookDetails.categories.forEach((el) => {
      //     formData.append("categories", el);
      //   }),
      //   bookDetails.keywords.forEach((el) => {
      //     formData.append("keywords", el);
      //   }),
      //   bookDetails.levels.forEach((el) => {
      //     formData.append("levels", el);
      //   }),
      //   bookDetails.subjects.forEach((el) => {
      //     formData.append("subjects", el);
      //   }),
      //   bookDetails.curriculums.forEach((el) => {
      //     formData.append("curriculums", el);
      //   }),
      //   formData.append("format", bookDetails.format),
      //   formData.append("isbn", bookDetails.isbn),
      //   formData.append("publication_date", bookDetails.publication_date),
      //   formData.append("number_of_pages", bookDetails.number_of_pages),
      //   formData.append("sub_title", bookDetails.sub_title),
      //   formData.append("book_title", bookDetails.book_title),
      //   formData.append(
      //     "primary_book_language",
      //     bookDetails.primary_book_language
      //   ),
      //   formData.append("short_description", bookDetails.short_description),
      //   formData.append("book_cover", this.bookCover),
      //   formData.append("manuscript", this.manuscript),
      //   formData.append("snippet", this.file);
      this.$bvModal.show("publishModal");
      // try {
      //   const response = await this.$axios.post(
      //     "/app/publisher/add_book/",
      //     formData
      //   );
      //   console.log(response);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    removeFile() {
      this.file = null;
    },
    removeManuscript() {
      this.manuscript = null;
    },
    formatSize(value) {
      if (value.toString().length <= 5) {
        const mb = (value / 1024).toFixed(1);
        const result = mb + "KB";
        return result;
      } else {
        const mb = (value / (1024 * 1024)).toFixed(1);
        const result = mb + "MB";
        return result;
      }
    },
    truncate(source, size) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
  },
};
</script>

<style scoped>
.upload-area {
  height: 200px;
  background: #ffffff;
  border: 1px dashed #d4d7e4;
  border-radius: 5px;
}
.card {
  box-shadow: 0px 2px 25px rgba(23, 30, 64, 0.05);
}
.image-container img {
  /* width: 280px; */
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.image-container {
  position: relative;
}
.set-cover button {
  color: #1070b7 !important;
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
  width: 100%;
  height: 200px;
  background: #fafdff;
  border: 1px solid #d9e9f6;
  border-radius: 5px;
  position: relative;
}
.trash-abs {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
