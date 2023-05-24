<template>
    <div class="container">
      <!-- <BackwardNavigation /> -->
      <div class="card">
          <div class="card-head">
              <h3 class="px-md-5 pt-4 pb-2 fs-24">Book Details</h3>
          <hr />
          </div>
        <div class="card-body py-md-3 px-md-5">
          <ValidationObserver ref="form">
              <form>
                  <div class="row">
          <div class="col-md-10">
                <ValidationProviderWrapper name="Primary Book Language" :rules="['required']">
                  <v-select
                    v-model="language"
                    class="style-chooser"
                    placeholder="Select Book Language"
                    label="name"
                    :options="book_language"
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-10">
                <ValidationProviderWrapper name="Book Title" :rules="['required']">
                  <input
                    v-model="book_title"
                    class="form-control"
                    placeholder="Book Title"
                  >
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-10">
                <ValidationProviderWrapper name="Sub Title" :rules="['required']">
                  <input
                    v-model="sub_title"
                    class="form-control"
                    placeholder="Sub Title"
                  >
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-10">
                <ValidationProviderWrapper name="Author Full Name" :rules="['required']">
                  <input
                    v-model="author_name"
                    class="form-control"
                    placeholder="Author Full Name"
                  >
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-4">
                <ValidationProviderWrapper name="Contributors" :rules="['required']">
                  <v-select
                    v-model="contributor"
                    class="style-chooser"
                    placeholder="Contributor"
                    :options="contributors"
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-6">
                <ValidationProviderWrapper name="Full Name" :rules="['required']">
                  <input
                    v-model="full_name"
                    class="form-control"
                    placeholder="Full Name"
                  >
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
                  <div class="col-md-3 add-more">
                      <button class="btn btn-transparent px-3 py-2">Add Another</button>
                  </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-10">
                <ValidationProviderWrapper name="Short Description" :rules="['required']">
                  <textarea class="form-control" rows="4" v-model="description"></textarea>
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
          <div class="col-md-10">
                <ValidationProviderWrapper name="Categories" :rules="['required']">
                  <v-select
                    v-model="categories"
                    class="style-chooser"
                    placeholder="Select Category"
                    label="name"
                    :options="categories_list"
                    multiple
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
          <div class="col-md-10">
                <ValidationProviderWrapper name="Keywords" :rules="['required']">
                  <v-select
                    v-model="keywords"
                    class="style-chooser"
                    placeholder="Select Keyword"
                    label="name"
                    :options="keywords_list"
                    multiple
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
          <div class="col-md-5">
                <ValidationProviderWrapper name="Grade Level" :rules="['required']">
                  <v-select
                    v-model="grade_level"
                    class="style-chooser"
                    placeholder="Select Grade Level"
                    label="name"
                    :options="grade_level_list"
                    multiple
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-5">
                <ValidationProviderWrapper name="Subject" :rules="['required']">
                  <v-select
                    v-model="subject"
                    class="style-chooser"
                    placeholder="Select Subject"
                    label="name"
                    :options="subject_list"
                    :reduce="(option) => option.id"
                    multiple
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
          <div class="col-md-5">
                <ValidationProviderWrapper name="Curriculum" :rules="['required']">
                  <v-select
                    v-model="curriculum"
                    class="style-chooser"
                    placeholder="Select Curriculum"
                    label="name"
                    :options="curriculum_list"
                    :reduce="(option) => option.id"
                    multiple
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-5">
                <ValidationProviderWrapper name="Format" :rules="['required']">
                  <v-select
                    v-model="format"
                    class="style-chooser"
                    placeholder="Select Subject"
                    label="name"
                    :options="format_list"
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-10">
                <ValidationProviderWrapper name="ISBN" :rules="['required']">
                  <input
                    v-model="isbn"
                    class="form-control"
                    placeholder="ISBN"
                  >
                </ValidationProviderWrapper>
              </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-5">
              <small class="text-grey fs-12">Publication Date</small>
              <div class="date">
              <v-date-picker
                            v-model="publication_date"
                            mode="date"
                          >
                            <template #default="{ togglePopover }">
                              <span @click="togglePopover()">
                                <input
                                  class="form-control"
                                  placeholder="Publication Date"
                                  :value="publication_date | date"
                                />
                              </span>
                            </template>
                          </v-date-picker>
                          </div>
                          <b-icon-calendar4 class="fs-16 calendar-icon" />
            </div>
            <div class="col-md-5">
              <ValidationProviderWrapper name="Number of Pages" :rules="['required']">
                  <input
                    v-model="pages"
                    class="form-control"
                    placeholder="Number of Pages"
                  >
                </ValidationProviderWrapper>
          </div>
            </div>
            <div class="mt-3">
            <span class="fs-14 text-grey">Publishing Rights</span>
            </div>
            <div class="mt-2 fs-14">
              <input type="checkbox" v-model="check">
              <label class="ml-2">I own the copyright and I hold the necessary publishing rights.<span class="text-blue"> Learn more</span></label>
            </div>
            <div class="row">
              <div class="col-md-10 d-flex justify-content-end my-3">
                <button type="button" class="btn btn-primary py-2 px-3" @click.prevent="handleSubmit">next</button>
              </div>
            </div>
              </form>
              </ValidationObserver>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { DateTime } from 'luxon'
  import { mapActions, mapGetters } from 'vuex'
  export default {
      layout: 'book',
      data() {
        return {
          description: '',
          language: '',
          book_title: '',
          sub_title: '',
          author_name: '',
          contributor: '',
          full_name: '',
          categories: '',
          keywords: '',
          grade_level: '',
          subject: '',
          curriculum: '',
          format: '',
          isbn: '',
          publication_date: '',
          pages: '',
          date: new Date(),
          check: false,
          curriculum_list: [],
          subject_list : [],
          categories_list: ['fiction', 'historical'],
          keywords_list: ['Tales', 'Africa'],
          grade_level_list: ['Primary 1', 'Primary 2'],
          format_list: ['Textbook', 'PDF'],
          book_language: ['English', 'Yoruba', 'Spanish'],
          contributors: ['Narrator', 'Editor']
        }
      },
      computed: {
        ...mapGetters('publisher', ['getBook'])
      },
      watch: {
        subject: {
          async handler () {
          await this.getSubjects()
          },
          immediate: true
        },
        curriculum: {
          async handler () {
          await this.getCurriculum()
          },
          immediate: true
        },
      },
      async created () {
        if (this.$route.query.book_id) {
        await this.getBookDetails()
        }
        // await this.getCurriculum()
        // await this.getSubjects()
        if (this.getBook && this.$route.query.book_id) {
          const data = this.getBook
          this.author_name = data.author
          this.sub_title = data.sub_title
          this.language = data.primary_language
          this.description = data.about
          this.categories = data.category
          this.grade_level = data.level
          this.keywords = data.keywords
          this.subject = data.subjects
          this.curriculum = data.curriculum
          this.format = data.format
          this.isbn = data.isbn
          this.publication_date = data.published
          this.book_title = data.name
          this.pages = data.number_of_pages
        }
      },
      methods: {
        ...mapActions('publisher', ['GET_BOOK']),
        async getCurriculum() {
          try {
            const { data } =  await this.$axios.get('/app/list_curriculum')
            this.curriculum_list = data.results
          } catch (error) {
            console.log(error)
          }
        },
        async getSubjects() {
          try {
            const { data } = await this.$axios.get('/app/list_subjects')
            this.subject_list = data.results
          } catch (error) {
            console.log(error)
          }
        },
        formatDate(date) {
          const oldDate = date.toISOString()
          const newDate = DateTime.fromISO(oldDate).toISODate()
        return newDate
    },
    async checkFormValidity() {
      const result = await this.$refs.form.validate()
      return result
    },
        async handleSubmit() {
          const result = await this.checkFormValidity()
      if (!result) {
        // eslint-disable-next-line no-useless-return
        return
      }
          const data = {
        author_name: this.author_name,
    contributors: ['mohammed'],
    short_description: this.short_description,
    categories: this.categories,
    keywords: this.keywords,
    levels: this.grade_level,
    subjects: this.subject,
    curriculums: this.curriculum,
    format: this.format,
    isbn: this.isbn,
    publication_date: this.publication_date ? this.formatDate(this.publication_date) : '',
    number_of_pages: this.pages,
    sub_title: this.sub_title,
    book_title: this.book_title,
    primary_book_language: this.language,
    short_description: this.description
            }
            if (this.check === true) {
            this.$cookies.set('book-details', data)
            this.$emit('handleNext')
            } else {
              this.$toast({
              type: 'error',
              text: 'please tick the publishing rights',
            })
            }
        },
        async getBookDetails() {
          try {
          const response = await this.GET_BOOK(this.$route.query.book_id)
          console.log(response)
          } catch (error) {
            console.log(error)
          }
        }
      }
  }
  </script>
  
  <style scoped>
  .add-more button {
      border: 1px solid #E7E8EB;
      background: #fff !important;
  }
  .card {
    box-shadow: 0px 2px 25px rgba(23, 30, 64, 0.05);
  }
  .date {
    position: relative
  }
  .calendar-icon {
    position: absolute;
    right: 25px;
    top: 33px;
    color: #8F9AA3;
  }
  </style>