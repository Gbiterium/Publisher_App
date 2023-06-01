<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center">
      <div class="fs-24 font-weight-bold mb-4">
        <slot name="title"></slot>
      </div>
      <button class="btn btn-primary py-2 px-3 mb-3" :disabled="loading" @click.prevent="handleSubmit">Save <b-spinner
                class="ml-1"
                v-if="loading"
                label="Spinning"
                style="width: 1rem; height: 1rem"
              ></b-spinner></button>
    </div>
    <div class="card">
      <div class="card-body py-xl-4 px-xl-5">
        <ValidationObserver ref="form">
          <form>
            <div class="row">
              <div class="col-lg-7">
                <div class="mt-3">
                  <ValidationProviderWrapper name="Title" :rules="['required']">
                    <input
                      v-model="title"
                      class="form-control"
                      placeholder="Add title"
                    />
                  </ValidationProviderWrapper>
                </div>
                <div class="mt-3">
                  <ValidationProviderWrapper
                    name="Description"
                    :rules="['required']"
                  >
                    <textarea
                      class="form-control"
                      rows="4"
                      placeholder="Add Description"
                      v-model="description"
                    ></textarea>
                  </ValidationProviderWrapper>
                </div>
                <div class="mt-3">
                  <ValidationProviderWrapper
                    name="Subject"
                    :rules="['required']"
                  >
                    <v-select
                      v-model="subject"
                      class="style-chooser"
                      placeholder="Select Subject"
                      label="name"
                      :options="subjects"
                      :reduce="(option) => option.id"
                      multiple
                    >
                    </v-select>
                  </ValidationProviderWrapper>
                </div>
                <div class="mt-3">
                  <ValidationProviderWrapper
                    name="Languages"
                    :rules="['required']"
                  >
                    <v-select
                      v-model="language"
                      class="style-chooser"
                      placeholder="Select Languages"
                      :options="languages"
                      multiple
                    >
                    </v-select>
                  </ValidationProviderWrapper>
                </div>
                <div class="mt-3">
                  <ValidationProviderWrapper
                    name="Grade levels"
                    :rules="['required']"
                  >
                    <v-select
                      v-model="grade_level"
                      class="style-chooser"
                      placeholder="Select Grade levels"
                      :options="grade_levels"
                      multiple
                    >
                    </v-select>
                  </ValidationProviderWrapper>
                </div>
                <div class="mt-3">
                  <ValidationProviderWrapper
                    name="Categories"
                    :rules="['required']"
                  >
                    <v-select
                      v-model="category"
                      class="style-chooser"
                      placeholder="Select Categories"
                      :options="categories"
                      multiple
                    >
                    </v-select>
                    </ValidationProviderWrapper>
                    </div>
                    <div class="mt-3">
                      <ValidationProviderWrapper
                        name="Keywords"
                        :rules="['required']"
                      >
                        <!-- <v-select
                          v-model="keyword"
                          class="style-chooser"
                          placeholder="Select Keywords"
                          :options="keywords"
                          multiple
                        > -->
                        <v-select
                          ref="multiple"
                          v-model="keyword"
                          taggable
                          multiple
                          :options="keywords"
                          class="style-chooser"
                          push-tags
                          placeholder="Type in Keyword"
                          :select-on-key-codes="[188, 13]"
                        />
                        <!-- </v-select> -->
                      </ValidationProviderWrapper>
                    </div>
                    <div class="mt-3">
                      <ValidationProviderWrapper
                        name="Curriculum"
                        :rules="['required']"
                      >
                        <v-select
                          v-model="curriculum"
                          class="style-chooser"
                          placeholder="Select Curriculum"
                          label="name"
                          :options="curriculums"
                          :reduce="(option) => option.id"
                          multiple
                        >
                        </v-select>
                      </ValidationProviderWrapper>
                    </div>
              </div>
              <div class="col-lg-5 pl-lg-5 mt-3">
                <small class="text-grey fs-12 font-weight-600"><slot name="upload-title"></slot></small>
                <div
                  v-if="!validFile"
                  class="upload-area d-flex align-items-center justify-content-center"
                >
                  <div class="">
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <span
                        class="iconify text-grey upload-icon"
                        data-icon="ic:sharp-upload"
                      ></span>
                    </div>
                    <div
                      class="d-flex align-items-center justify-content-center fs-12 mt-1"
                    >
                      <span
                        ><span
                          class="text-blue pointer text-decoration-underline"
                          @click="$refs.fileInput.click()"
                          >Browse</span
                        >
                        <span class="text-grey">to choose a <slot name="upload-label"></slot></span>
                      </span>
                      <input
                        ref="fileInput"
                        type="file"
                        class="d-none"
                        @change.prevent="handleUpload()"
                      />
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="uploaded-area">
                    <div
                      class="file-area d-flex align-items-center justify-content-center"
                    >
                      <div
                        class="d-flex align-items-center justify-content-center fs-12 text-blue"
                      >
                        {{ validFile.name ? truncate(validFile.name, 35) : '' }}
                      </div>
                    </div>
                    <div
                      class="d-flex align-items-center justify-content-center mt-2 fs-12 text-decoration-underline pointer"
                      style="color: #e16c7a"
                      @click.prevent="removeFile"
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 mb-5 ml-3">
                <small class="text-grey fs-12 font-weight-600">Thumbnail</small>
                <div>
                  <label class="text-grey fs-14"
                    >Select or upload a picture that shows what's in your
                    <slot name="thumbnail-label"></slot></label
                  >
                </div>
                <div class="d-flex">
                <div class="d-flex align-items-center img-container mr-3" v-for="(el, index) in images" :key="index">
                    <div>
                    <img :src="el.url || `${$config.BASE_URL}${el.image}`" :alt="el.name">
                    <div
                      class="d-flex align-items-center justify-content-end mt-2 fs-12 text-decoration-underline pointer"
                      style="color: #e16c7a"
                      @click.prevent="removeThumbnail(index)"
                    >
                      Delete
                    </div>
                    </div>
                </div>
                <div
                  class="thumbnail-area d-flex align-items-center justify-content-center"
                >
                <div>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <span
                        class="iconify fs-40 text-grey"
                        data-icon="bi:image-fill"
                      ></span>
                      </div>
                      <div
                        class="fs-12 d-flex align-items-center justify-content-center text-grey mt-2 pointer"
                        @click="$refs.imageInput.click()"
                      >
                      <span class="iconify mr-1" data-icon="fluent:add-16-filled"></span>
                        <span>Upload Thumbnail</span>
                      </div>
                      <input
                        ref="imageInput"
                        type="file"
                        class="d-none"
                        multiple
                        @change.prevent="uploadImage()"
                      />
                      </div>
                  </div>
                  </div>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    validFile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      file: '',
      images: [],
      title: '',
      description: '',
      subject: '',
      language: '',
      grade_level: '',
      category: '',
      keyword: '',
        curriculum: '',
        keywords: ['Tales', 'Fictions'],
        curriculums: [],
        subjects: [],
        languages: ['English', 'Spanish', 'French', 'Yoruba'],
        categories: ['Textbook', 'Lesson Plan', 'Historical'],
        grade_levels: ["Primary 1", "Primary 2", 'JSS 1', 'JSS 2'],
        thumbnails: [],
        content: {},
        uploadedFile: ''
    };
  },
  watch: {
    subject: {
      async handler() {
        await this.getSubjects();
      },
      immediate: true,
    },
    curriculum: {
      async handler() {
        await this.getCurriculum();
      },
      immediate: true,
    },
    validFile: {
      handler(newVal) {
        this.uploadFile = newVal;
      },
      immediate: true,
    }
  },
  async created() {
      if(this.$route.query.id) {
        await this.getContent()
        this.language = this.content.languages
        this.title = this.content.title
        this.description = this.content.description
        this.curriculum = this.content.curriculum
        this.subject = this.content.subject
        this.keyword = this.content.keywords
        this.category = this.content.categories
        this.grade_level = this.content.grade_levels
        this.images = this.content.thumbnails
        this.content.thumbnails.forEach((el) => {
          this.thumbnails.push(el.id)
        })
      }
    },
  methods: {
    handleUpload() {
      const input = this.$refs.fileInput;
      this.file = input.files[0];
      this.$emit("file-upload", this.file);
    },
    async getContent() {
      try {
        const { data } = await this.$axios.get(`/content/list_content?content_id=${this.$route.query.id}`)
        this.content = data.data[0]
      } catch (error) {
        console.log(error)
      }
    },
    removeFile() {
      // this.validFile = null;
      this.$emit('remove-file')
    },
    removeThumbnail(index) {
        this.images.splice(index, 1)
        this.thumbnails.splice(index, 1)
    },
    truncate(source, size) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
    async uploadImage() {
        const input = this.$refs.imageInput;
        const files = input.files
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          const image = {
            name: file.name,
            url: imageUrl
          };
          this.images.push(image);
        };
        reader.readAsDataURL(file);
        await this.uploadThumbnail(file)
    }
    },
    async uploadThumbnail(file) {
        try {
            const formData  = new FormData()
            formData.append('image', file)
            const { data } = await this.$axios.post('/content/upload_thumbnail/', formData)
            this.thumbnails.push(data.id)
        } catch (error) {
            console.log(error)
        }
    },
    async getCurriculum() {
      try {
        const { data } = await this.$axios.get("/app/list_curriculum");
        this.curriculums = data.results;
      } catch (error) {
        console.log(error);
      }
    },
    async getSubjects() {
      try {
        const { data } = await this.$axios.get("/app/list_subjects");
        this.subjects = data.results;
      } catch (error) {
        console.log(error);
      }
    },
    async checkFormValidity() {
      const result = await this.$refs.form.validate();
      return result;
    },
    async handleSubmit() {
      const result = await this.checkFormValidity();
      if (!result) {
        // eslint-disable-next-line no-useless-return
        return;
      }
        const data = {
            title: this.title,
            description: this.description,
            subject: this.subject,
            languages: this.language,
            grade_levels: this.grade_level,
            content_file: this.file,
            categories: this.category,
            keywords: this.keyword,
            curriculum: this.curriculum,
            thumbnails: this.thumbnails,
        }
        this.$emit('content-data', data)
}
  },
};
</script>

<style scoped>
.upload-area {
  height: 140px;
  width: 250px;
  background: #ffffff;
  border: 1px dashed #d4d7e4;
  border-radius: 5px;
}
.thumbnail-area {
  height: 100px;
  width: 170px;
  background: #f4f4f4;
  border: 2px dashed #c2c2c2;
  border-radius: 4px;
}
.upload-icon {
  font-size: 70px;
}
.file-area {
  height: 140px;
  width: 250px;
  background: #f7fafa;
  border: 1px dashed #d4d7e4;
  border-radius: 5px;
  position: relative;
}
.uploaded-area {
  width: 250px;
}
.img-container img {
    height: 100px;
  width: 170px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
