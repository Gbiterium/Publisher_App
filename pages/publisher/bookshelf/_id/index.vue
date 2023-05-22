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
            <div v-if="showRating">
              Rating
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
        curriculums: []
      }
    },
    async fetch () {
      try {
        const { data } = await this.$axios.get(`/app/publisher/book/${this.$route.params.id}/`)
        this.book = data
        this.subjects = data.subjects.map((el) => el.name)
        this.curriculums = data.curriculum.map((el) => el.name)
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