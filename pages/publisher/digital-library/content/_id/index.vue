<template>
  <div class="container-fluid">
    <div>
        <div class="d-flex align-items-center text-blue fs-14 mb-4" @click.prevent="$router.push('/publisher/digital-library')">
        <span class="iconify mr-2 pointer" data-icon="akar-icons:arrow-left"></span>
        <div class="pointer">Content</div>
        </div>
        <!-- <hr /> -->
    </div>
    <div class="card">
        <div class="card-body pt-xl-4 pb-xl-5 px-xl-5">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="fs-24 font-weight-bold mb-4 text-capitalize">
                  {{ content.title }}
                </div>
                <div>
                <button class="btn btn-outline-danger bg-white text-danger py-2 px-3 mb-3 mr-1" :disabled="isLoading" @click.prevent="handleDelete"><div class="d-flex align-items-center"><span class="iconify mr-1" data-icon="ic:baseline-delete"></span>Delete <b-spinner
                          class="ml-1"
                          v-if="isLoading"
                          label="Spinning"
                          style="width: 1rem; height: 1rem"
                        ></b-spinner></div></button>
                <button class="btn btn-light py-2 px-3 mb-3" @click.prevent="handleEdit"><div class="d-flex align-items-center text-grey"><span class="iconify mr-1 text-grey" data-icon="ic:round-mode-edit-outline"></span>edit</div></button>
                <button v-if="content.content_type !== 'quiz'" class="btn btn-primary py-2 px-3 mb-3" @click.prevent="preview">view</button>
                </div>
              </div>
            <div class="row">
                <div class="col-lg-10 pr-5">
            <div class="fs-14 text-grey font-weight-600">DESCRIPTION</div>
            <p class="mt-2">{{ content.description }}</p>
            </div>
            <div class="col-lg-2">
                <div class="fs-14 text-grey font-weight-600">TOTAL VIEWS</div>
                <p class="mt-2 text-blue fs-28">0</p>
            </div>
            </div>
            <div class="row">
                <div class="col-lg-10">
            <div class="text-grey fs-14 mt-3 font-weight-600 text-uppercase">Categories</div>
            <div class="d-flex">
            <div v-for="el in content.categories" :key="el.id" class="mt-2 mr-2">
            <span class="subject-container p-2 fs-14">{{ el }}</span>
            </div>
            </div>
            </div>
            <div class="col-lg-2">
                <div class="fs-14 text-grey mt-3 font-weight-600">DATE UPLOADED</div>
                <p class="mt-2">{{ content.date_created }}</p>
            </div>
            </div>
            <div class="row">
                <div class="col-lg-5">
                <div class="text-grey fs-14 mt-3 font-weight-600">GRADE LEVEL</div>
            <div class="d-flex">
            <div v-for="el, index in content.grade_levels" :key="index" class="mt-2 mr-2">
            <span class="subject-container p-2 fs-14">{{ el }}</span>
            </div>
        </div>
            </div>
            </div>
            <div class="row">
                <div class="col-lg-5">
            <div class="text-grey fs-14 mt-3 font-weight-600 text-uppercase">subject</div>
            <div class="d-flex">
            <div v-for="el in content.subject" :key="el.id" class="mt-2 mr-2">
            <span class="subject-container p-2 fs-14">{{ el.name }}</span>
            </div>
            </div>
            </div>
            </div>
            <hr class="my-4" />
            <div v-if="content.thumbnails" class="thumbnails-container">
                <div class="text-grey fs-14">Thumbnails</div>
                <div v-if="loading" class="d-flex align-items-center">
                <div class="mt-3 mr-2">
                  <b-skeleton width="90px" height="56px" />
                </div>
                <div class="mt-3">
                  <b-skeleton width="90px" height="56px" />
                </div>
            </div>
            <div v-else class="d-flex align-items-center">
                <div v-for="el in content.thumbnails" :key="el.id" class="mb-4 mt-2 pointer mr-2">
                    <div @click.prevent="switchThumbnail(el)">
                    <img :src="`${$config.BASE_URL}${el.image}`">
                    </div>
                </div>
                </div>
            </div>
            <div class="">
                <div class="file-container">
                    <div v-if="loading">
              <!-- <div class=" mt-3"> -->
                <div class="mt-3">
                  <b-skeleton width="550px" height="323px" />
                </div>
              <!-- </div> -->
            </div>
            <!-- <div v-if="content.content_type === 'video'">
                <video :src="`${$config.BASE_URL}${content.content_file}`" controls></video>
                </div> -->
                <div v-else>
                    <img v-if="thumbnail" :src="`${$config.BASE_URL}${thumbnail.image}`">
                    <div class="btn-abs">
                        <button v-if="content.content_type === 'document'" class=" btn btn-light border-none" @click.prevent="preview">Download Document</button>
                        <button v-if="content.content_type === 'worksheet'" class=" btn btn-light border-none" @click.prevent="preview">Download Worksheet</button>
                        <button v-if="content.content_type === 'game'" class=" btn btn-light border-none">Play Game</button>
                        </div>
                        <div class="icon-abs pointer" @click.prevent="preview">
                        <span v-if="content.content_type === 'video'" class="iconify " data-icon="bi:play-circle-fill"></span>
                    </div>
                </div>
            </div>
            </div>
            <div class="my-5"
            v-if="content.content_type === 'quiz'"
          >
            <div
              v-for="(section, sectionIndex) in content.quiz_config.sections"
              :key="sectionIndex"
            >
              <div class="">
                <div class="mb-3 mb-xl-0">
                  <div class="text-primary fs-14 mb-4">
                    <strong>Section {{ sectionIndex + 1 }} - {{ section.title }}</strong>
                    <span class="text-dark">
                      ( {{ sectionsScore(section) }} mark{{
                        sectionsScore(section) > 1 ? "s" : ""
                      }}
                      )
                    </span>
                  </div>
                  <div class="mb-2">
                    <label class="form-control-label mb-2"
                      >Header / Section Instruction</label
                    >
                    <div class="fs-14 text-dark">
                      <span v-html="section.header"></span>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />

              <div class="">
                <template v-for="(question, questionIndex) in section.questions">
                  <div :key="questionIndex">
                    <div v-if="question.question_type === 'trueFalse'">
                      <div class="row">
                        <div class="col-md-8 col-lg-12 col-xl-8">
                          <div
                            class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                          >
                            <div>
                              QUESTION {{ (questionIndex + 1) }} of
                              {{ section.questions.length }}
                            </div>
                            <div>
                              {{ question.marks }}
                              <span class="text-light">marks</span>
                            </div>
                          </div>
                          <div class="mb-3 font-family_brown fs-16 text-dark"
                            style="overflow: auto"
                          v-html="question.text"
                          >
                           
                          </div>
                          <div>
                            <div
                              v-for="(option, optionIndex) in question.question_option"
                              :key="optionIndex"
                              class="d-flex align-items-center mb-2"
                            >
                              <label class="exercise-option-check">
                                <input
                                  type="radio"
                                  :name="'customRadio' + Math.random()"
                                  disabled
                                  :checked="
                                    question.question_option[0].correct_flag ===
                                    option.option
                                  "
                                />
                                <span class="checkmark"></span>
                                <span class="text text-capitalize">{{
                                  option.option
                                }}</span>
                              </label>
                            </div>
                            <div v-if="question.hint">
                              <small> Solution</small>
                              <p class="text-capitalize"
                               style="overflow:auto"
                           v-html="question.hint"
                              ></p>
                            </div>
                          </div>
                        </div>
                        <div v-if="question.file_upload">
                          <div
                            v-if="question.file_upload.url"
                            class="col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0 order-first order-md-last order-lg-first order-xl-last"
                          >
                            <div
                              class="file-type-display text-center bg-white"
                              style="width: 260px"
                            >
                              <img
                                :src="
                                  question.file_upload
                                    ? question.file_upload.url
                                    : require('~/assets/img/illustration-6.svg')
                                "
                                class="img-fluid w-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                    </div>
                    <div v-else-if="question.question_type === 'options'">
                      <div class="row">
                        <div class="col-md-8 col-lg-12 col-xl-8">
                          <div
                            class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                          >
                            <div>
                              QUESTION {{ (questionIndex + 1) }} of
                              {{  section.questions.length }}
                            </div>
                            <div>
                              {{ question.marks }}
                              <span class="text-light">marks</span>
                            </div>
                          </div>
                          <div class="mb-3 font-family_brown fs-16 text-dark"
                            style="overflow: auto"
                          v-html="question.text"
                          >
                           
                            <br />
                            <small>Select all that apply</small>
                          </div>
                          <div>
                            <div
                              v-for="(option, optionIndex) in question.question_option"
                              :key="optionIndex"
                              class="d-flex align-items-center mb-2"
                            >
                              <label class="exercise-option-check">
                                <input
                                  type="checkbox"
                                  name="customRadio"
                                  :checked="option.correct_flag"
                                  disabled
                                />
                                <span class="checkmark"></span>
                                <span class="text"
                                style="overflow: auto"
                                v-html="option.option"
                                
                                ></span>
                              </label>
                            </div>
                            <div v-if="question.hint">
                              <small> Solution</small>
                              <p
                               style="overflow:auto"
                           v-html="question.hint"
                              ></p>
                            </div>
                          </div>
                        </div>
                        <div v-if="question.file_upload">
                          <div
                            v-if="question.file_upload.url"
                            class="col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0 order-first order-md-last order-lg-first order-xl-last"
                          >
                            <div
                              class="file-type-display text-center bg-white"
                              style="width: 260px"
                            >
                              <img
                                :src="
                                  question.file_upload
                                    ? question.file_upload.url
                                    : require('~/assets/img/illustration-6.svg')
                                "
                                class="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                    </div>
                    <div v-else-if="question.question_type === 'freeText'">
                      <div class="row">
                        <div class="col-md-8 col-lg-12 col-xl-8">
                          <div
                            class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                          >
                            <div>
                              QUESTION {{ (questionIndex + 1)  }} of
                              {{  section.questions.length }}
                            </div>
                            <div>
                              {{ question.marks }}
                              <span class="text-light">marks</span>
                            </div>
                          </div>
                          <div class="mb-3 font-family_brown fs-16 text-dark"
                            style="overflow: auto"
                          v-html="question.text"
                          > 
                          </div>
                          <div>
                            <textarea id="" name="" cols="60" rows="4"></textarea>
                          </div>
                          <div v-if="question.hint">
                            <small> Solution</small>
                            <p
                             style="overflow:auto"
                           v-html="question.hint"
                            ></p>
                          </div>
                        </div>
                        <div v-if="question.file_upload">
                          <div
                            v-if="question.file_upload.url"
                            class="col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0 order-first order-md-last order-lg-first order-xl-last"
                          >
                            <div
                              class="file-type-display text-center bg-white"
                              style="width: 260px"
                            >
                              <img
                                :src="
                                  question.file_upload
                                    ? question.file_upload.url
                                    : require('~/assets/img/illustration-6.svg')
                                "
                                class="img-fluid w-100 h-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                    </div>
                  </div>
                </template>
              </div>
              <div v-if="content.quiz_config.sections.length > 1">
                <hr class="my-5" style="height: 1rem; background: black" />
              </div>
            </div>
          </div>
            </div>
            </div>
            <b-modal
        id="showViewer"
        centered
        hide-footer
        size="lg"
      >
        <div class="text-center">

      <client-only>

      
          <WebViewer
            v-if=" fileToView.content_type === 'document' || fileToView.content_type === 'worksheet' || fileToView.content_type === 'game'
            "
            ref="webViewer"
            :style="{ height: onFullScreen ? '85vh' : '500px' }"
            :url="fileToView.url"
          />

          <video-player
            v-if="fileToView.content_type === 'video'"
            :src="fileToView.url"
          />

          </client-only>
        </div>
      </b-modal>
            </div>
</template>

<script>
export default {
    layout: 'authWithoutTopbar',
    data () {
        return {
            content: {},
            thumbnail: {},
            loading: false,
            isLoading: false,
            fileToView: ''
        }
    },
        async fetch() {
            try {
                this.loading = true
                const { data } = await this.$axios.get(`/content/list_content?content_id=${this.$route.params.id}`)
                this.content = data.data[0]
                this.thumbnail = this.content.thumbnails[0]
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
    }, 
    methods: {
        switchThumbnail(item) {
            this.thumbnail = item
        },
        sectionsScore(section) {
      let total = 0;
      section.questions.forEach((e) => {
        total += parseInt(e.marks);
      });
      return total;
    },
        async handleDelete() {
            try {
                this.isLoading = true
                const response = await this.$axios.delete(`/content/delete_content/${this.$route.params.id}`)
                if (response.status === 204) {
                    this.$toast({
                        type: 'success',
                        text: 'content successfully deleted'
                    })
                    this.$router.push('/publisher/digital-library')
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false
            }
        },
        handleEdit() {
            if (this.content.content_type === 'video') {
        this.$router.push({path: './add-video', query: {id: this.content.id}})
      } else if (this.content.content_type === 'document') {
        this.$router.push({path: './add-document', query: {id: this.content.id}})
      } else if (this.content.content_type === 'worksheet') {
        this.$router.push({path: './add-worksheet', query: {id: this.content.id}})
      } else if (this.content.content_type === 'game') {
        this.$router.push({path: './add-game', query: {id: this.content.id}})
      } else if (this.content.content_type === 'quiz') {
        this.$router.push({path: './add-exercise', query: {id: this.content.id}})
      } 
        },
        preview() {
      const file = Object.assign(this.content, {url: `${process.env.BASE_URL}${this.content.content_file}`});
      this.fileToView = file
        this.$bvModal.show('showViewer')
    },
    }
}
</script>

<style scoped>
.subject-container {
    background: #E4EAEE;
}
.icon-abs .iconify {
    font-size: 62px;
    color: #fff;

}
.file-container{
    position: relative;
    width: 550px;
}
 .file-container img {
    width: 550px;
    height: 323px;
    object-fit: cover;
    border-radius: 1px;
    filter: brightness(70%);
}
.btn-abs, .icon-abs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.thumbnails-container img {
    width: 90px;
height: 60px;
border-radius: 4px;
object-fit: cover;
}
</style>