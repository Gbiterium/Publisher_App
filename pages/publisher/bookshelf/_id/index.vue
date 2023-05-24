<template>
    <div class="container">
        <div class="card">
          <div class="card-body py-xl-5 px-xl-5">
            <div class="row">
              <div class="col-md-3">
                <div class="thumbnail">
                <img :src="`${$config.BASE_URL}${book.cover}`">
                </div>
                <button class="btn btn-primary mt-4">View Book</button>
                <button class="btn btn-outline-primary mt-2" @click.prevent="editBook">Edit Book</button>
              </div>
              <div class="col-md-9 details">
                <div class="fs-20">{{ book.name }}</div>
                <div>{{ book.author }}</div>
                <div class="mt-4">
                <UtilsBaseCardTab @tab-selected="handleOnSelectTab($event)">
        <template
            v-for="(tab, index) in ['Details', 'Rating & Review', 'Book Statistic']"
          >
          <UtilsCardTab :key="index" :title="tab">
            <div v-if="showDetails" class="about-book">
              <div class="mt-3">
              <h4 class="fs-18">About this Book</h4>
              <p class="fs-14 text-grey">Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin metus, volutpat lacinia arcu nibh vel ante. Proin dapibus dui eget justo tincidunt eleifend. Mauris porta elementum est. Nullam euismod quis libero sed convallis. Vestibulum fringilla felis nec turpis aliquam auctor a a lectus. Etiam porttitor at eros vitae posuere. Suspendisse nec mollis dolor, vel cursus leo. Integer vitae sem vitae leo pretium porta. In consequat magna purus, iaculis rhoncus velit imperdiet sit amet. Fringilla felis nec turpis aliquam auctor a a lectus. Etiam porttitor at eros vitae posuere. Suspendisse nec mollis dolor, vel cursus leo. Integer vitae sem vitae leo pretium porta. In consequat magna purus, iaculis rhoncus velit imperdiet sit amet.</p>
            </div>
            <div class="mt-4">
              <h4 class="fs-18">More Information</h4>
              <table class="mt-3">
  <tr>
    <td>Primary Language</td>
    <td>{{ book.primary_language }}</td>
  </tr>
  <tr>
    <td>Curriculum</td>
    <td>{{ curriculums ? curriculums.join(", ") : ''  }}</td>
  </tr>
  <tr>
    <td>Subject</td>
    <td>{{ subjects ? subjects.join(", "): '' }}</td>
  </tr>
  <tr>
    <td>Grade Level</td>
    <td>{{ book.level ? book.level.join(", ") : ''}}</td>
  </tr>
  <tr>
    <td>Category</td>
    <td>{{ book.category ? book.category.join(", ") : ''}}</td>
  </tr>
  <tr>
    <td>Format</td>
    <td>{{ book.format }}</td>
  </tr>
  <tr>
    <td>Size</td>
    <td>{{ book.size }}</td>
  </tr>
  <tr>
    <td>Pages</td>
    <td>{{ book.number_of_pages }}</td>
  </tr>
  <tr>
    <td>Published</td>
    <td>{{ formatDate(book.published) }}</td>
  </tr>
</table>
            </div>
            </div>
            <div v-if="showRating" class="rating mt-2">
                      <h4 class="fs-18">Student Rating and Reviews</h4>
                      <div class="d-flex align-items-center">
                        <div class="mt-5 mr-4">
                          <span class="font-weight-600 rating-value">{{
                            averageRating ? averageRating.toFixed(1) : "0.0"
                          }}</span>
                          <star-rating
                            :show-rating="false"
                            :max-rating="5"
                            :star-size="12"
                            :padding="5"
                            :read-only="true"
                            v-model="averageRating"
                            active-color="#FF9C09"
                            :increment="0.5"
                          ></star-rating>
                        </div>
                        <div class="flex-grow-1 mt-3">
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">5</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 5).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1 slide-in"
                            ></b-progress>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">4</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 4).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1"
                            ></b-progress>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">3</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 3).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1"
                            ></b-progress>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">2</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 2).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1"
                            ></b-progress>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">1</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 1).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1"
                            ></b-progress>
                          </div>
                        </div>
                      </div>
                      <div class="mt-4 review-details">
                        <div v-if="reviews.length > 0" class="fs-14">
                          <div v-for="el in reviews" :key="el.id">
                            <div class="mb-4">
                              <div class="d-flex align-items-center mobile-top">
                                <!-- <div class="mobile-top"> -->
                                <span class="mr-2">{{ el.title }}</span>
                                <star-rating
                                  class="mb-2"
                                  :show-rating="false"
                                  :rating="el.rating"
                                  :star-size="14"
                                  :padding="5"
                                  :read-only="true"
                                  active-color="#FF9C09"
                                ></star-rating>
                                </div>
                              <!-- </div> -->
                              <div>
                                <span class="text-grey">by</span>
                                {{ user.first_name }} {{ user.last_name }} -
                                <span class="text-grey">{{
                                  formatDate(el.date_created)
                                }}</span>
                              </div>
                              <p class="text-grey capitalize mt-1">
                                {{ el.review_text }}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div v-else class="text-grey">No reviews yet</div>
                      </div>
                    </div>
            <div v-if="showStat">
            Book Statistics
            </div>
            </UtilsCardTab>
            </template>
            </UtilsBaseCardTab>
            </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import { DateTime } from 'luxon'
  export default {
    layout: 'authWithoutTopbar',
    data () {
      return {
        showDetails: true,
        showRating: false,
        showStat: false,
        book: [],
        subjects: [],
        curriculums: [],
        reviews: [],
      averageRating: 0,
      user: {}
      }
    },
    async fetch () {
      try {
        const { data } = await this.$axios.get(`/app/publisher/book/${this.$route.params.id}/`)
        this.book = data
        this.subjects = data.subjects.map((el) => el.name)
        this.curriculums = data.curriculum.map((el) => el.name)
        await this.getReview()
        if (this.$cookies.get("user-details")) {
        this.user = this.$cookies.get("user-details");
      }
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      editBook() {
        this.$router.push({path: '/publisher/bookshelf/create-book', query: {
          book_id: this.$route.params.id
        }})
      },
      async getReview() {
      try {
        const { data } = await this.$axios.get(
          `/app/book/${this.$route.params.id}/reviews/`
        );
        this.reviews = data.data;
        this.averageRating =
          this.reviews.reduce((sum, rating) => sum + rating.rating, 0) /
          this.reviews.length;
      } catch (error) {
        console.log(error);
      }
    },
      handleOnSelectTab(e) {
      if (e === "Details") {
        // mine
        this.showDetails = true
        this.showRating = false
        this.showStat = false
      }
      if (e === "Rating & Review") {
        // class
        this.showRating = true
        this.showDetails = false
        this.showStat = false
      }
      if (e === "Book Statistic") {
        // class
        this.showRating = false
        this.showDetails = false
        this.showStat = true
      }
    },
    formatDate(date) {
      const newdate = DateTime.fromISO(date);
const formattedDate = newdate.toFormat('dd LLL yyyy')
return formattedDate
    }
    }
  }
  </script>
  
  <style scoped>
  .thumbnail img {
    height: 338px;
    width: 100%;
    object-fit: cover;
  }
  button {
    width: 100%;
  }
  table {
    font-size: 14px;
    width: 100%;
  }
  td, th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}

tr:nth-child(odd) {
  background-color: #F8F8F8;
}
.rating-value {
  font-size: 64px;
  line-height: 0 !important;
}
.review-details {
  position: relative;
}
  @media screen and (max-width: 767px) {
    .thumbnail img {
      width: 100%;
    }
    button {
    width: 100%;
  }
  .details {
    margin-top: 20px;
  }
  }
  </style>