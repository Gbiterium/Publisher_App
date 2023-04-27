<template>
    <div class="container">
      <!-- <BackwardNavigation /> -->
      <div class="card">
          <div class="card-head">
              <h3 class="px-xl-5 pt-4 pb-2 fs-24">Book Details</h3>
          <hr />
          </div>
        <div class="card-body py-xl-3 px-xl-5">
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
                    :options="contributor"
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
              <small>Publication Date</small>
              <div class="date">
              <v-date-picker
                            v-model="publication_date"
                            mode="date"
                          >
                            <template #default="{ togglePopover }">
                              <span @click="togglePopover()">
                                <input
                                  class="form-control"
                                  :placeholder="dateFormat"
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
                <button type="button" class="btn btn-primary py-2 px-3" @click.prevent="$emit('handleNext')">next</button>
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
          date: new Date(),
          check: false
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
  }
  </style>