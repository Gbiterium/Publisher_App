<template>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
      <div class="fs-24 font-weight-bold mb-4">
        Book Shelf
      </div>
      <button class="btn btn-primary py-2 px-3 mb-3" @click="$router.push('./bookshelf/create-book')">
        <div class="d-flex align-items-center">
        <span class="iconify mr-1" data-icon="fluent:add-16-filled"></span>
         Create Book</div></button>
      </div>
      <div class="card">
        <div v-if="getBooks" class="mt-3">
        <UtilsBaseCardTab @tab-selected="handleOnSelectTab($event)">
        <template
            v-for="(tab, index) in [`All (${getBooks.length})`, `Published (${published.length})`, `Draft (${draft.length})`, `Under Review (${under_review.length})`]"
          >
          <UtilsCardTab :key="index" :title="tab">
        <div class="card-body">
          <div class="d-flex align-items-center">
          <div class="search-input mr-3">
          <input
          v-model="name"
              type="search"
              class="form-control"
              placeholder="Search Book"
              @input="slowBook()"
            @keyup.enter="getBookList()"
            />
            <b-icon-search class="search-icon fs-14"></b-icon-search>
            </div>
            <div class="filter-btn">
              <button class="btn btn-light pl-3" type="button">Filters</button>
              <span class="iconify filter" data-icon="fluent:filter-16-filled"></span>
            </div>
            </div>
            <!-- <pre>{{ getBooks }}</pre> -->
            <Table
              :fields="fields"
              :items="books"
              :is-busy="isBusy"
              @row-clicked="onRowSelected($event)"
              >
              <!-- :record-count="recordCount"
                :filter="filter"
              :pages="pages"
              :per-page="perPage"
              @sort="onSortChanged"
              @page-changed="getResources"
               -->
              <template #book="{ data: { item } }">
                <div class="d-flex align-items-center">
                  <img :src="item.book_cover">
                  <span>{{ item.book.name }}</span>
                </div>
              </template>
              <template #actions="{ data: { item } }">
              <div>
                <div class="text-blue pointer" @click="editBook(item)">Edit Book Details</div>
                <div class="text-blue pointer mt-2">View Details</div>
                <div v-if="item.status !== 'DRAFT'" class="text-blue pointer mt-2">Unpublish</div>
              </div>
            </template>
            </Table>
            <div v-if="!isBusy" class="w-100 pr-3 d-flex justify-content-end mt-3">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="right"
                class="my-0"
              ></b-pagination>
            </div>
        </div>
      </UtilsCardTab>
      </template>
      </UtilsBaseCardTab>
      </div>
        <div v-else class="card-body py-xl-4 px-xl-5 d-flex justify-content-center align-items-center">
            <div>
              <img src="@/assets/img/noContent.png" alt="">
              <div class="d-flex justify-content-center align-items-center fs-14 text-grey mt-2 mb-4">
              <span>No Book Created</span>
              </div>
            <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-primary px-3 py-2" @click="$router.push('./create-book')">Create a Book</button>
            </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from  'vuex'
  import { DateTime } from 'luxon'
  import { debounce } from 'lodash'
  export default {
    layout: 'authWithoutTopbar',
    data () {
      return {
        fields: [
          { key: 'book', label: 'Books', sortable: false },
          { key: 'views', label: 'Views', sortable: false },
          { key: 'average_rating', label: 'Rating', sortable: false },
          { key: 'publication_date', label: 'Date Submitted', sortable: false, formatter: (value) => {
            const isoDateStr = value.replace(' ', 'T')
            const dt = DateTime.fromISO(isoDateStr)
            return dt.toISODate()
          }, },
          { key: 'status', label: 'Status', sortable: false },
          { key: 'actions', label: 'Actions', sortable: false },
        ],
        // published: [],
        // under_review: [],
        // draft: [],
        books: [],
        isBusy: false,
        name: '',
        selected: {},
        currentPage: 1,
      pages: 1,
      page: 1,
      totalPages: null,
      perPage: 100,
      }
    },
    async created () {
      this.isBusy = true
      await this.getBookList()
      this.books = this.getBooks
      // this.published = this.getBooks.filter((el) => el.status === 'Published')
      // this.draft = this.getBooks.filter((el) => el.status === 'DRAFT')
      // this.under_review = this.getBooks.filter((el) => el.status === 'AWAITING_APPROVAL')
      this.isBusy = false
    },
    computed: {
      ...mapGetters('publisher', ['getBooks']),
      published() {
        const published = this.getBooks.filter((el) => el.status === 'Published')
        return published
      },
      draft() {
        const draft = this.getBooks.filter((el) => el.status === 'DRAFT')
        return draft
      },
      under_review () {
        const under_review = this.getBooks.filter((el) => el.status === 'AWAITING_APPROVAL')
        return under_review
      }
    },
    methods: {
      ...mapActions('publisher', ['GET_BOOKS']),
      onRowSelected(e) {
        this.$router.push({
          path: `/publisher/bookshelf/${e.id}`,
          // query: { image: `${e.book.image}`, author: `${e.book.author}`, name: `${e.book.name}` },
        })
      },
      editBook(item) {
        this.$router.push({
          path: '/publisher/bookshelf/create-book',
          query: { book_id: `${item.id}` },
        })
      },
      async getBookList() {
        try {
        // await this.GET_BOOKS({name: this.name, page: i, page_size: this.perPage})
        await this.GET_BOOKS({name: this.name})
        this.books = this.getBooks
        } catch (error) {
          console.log(error)
        }
      },
      slowBook: debounce(function () {
      this.getBookList()
    }, 500),
      handleOnSelectTab(e) {
        if (e === `All (${this.getBooks.length})`) {
          // this.getBookList()
          this.books = this.getBooks
        }
        if (e === `Published (${this.published.length})`) {
          this.books = this.published
        }
        if (e === `Draft (${this.draft.length})`) {
          this.books = this.draft
        }
        if (e === `Under Review (${this.under_review.length})`) {
          this.books = this.under_review
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    min-height: 560px;
  }
  button {
    text-transform: none;
  }
  /* .container {
  animation: slide-fade .75s ease-out 0s;
} */
  .search-input input {
    width: 300px;
    padding-left: calc(15px + 15px + 0.2rem);
    font-size: 14px;
  }
  .search-input {
    position: relative;
  }
  .search-icon{
    position: absolute;
    top: 10px;
    left: 10px;
    color: #828A96;
  }
  .filter-btn {
    position: relative;
  }
  .filter-btn button {
    padding-right: 30px;
    color: #6A7481;
    background: #FFFFFF;
  }
  .filter {
    color: #6A7481;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  @media screen and (max-width: 767px) {
    .search-input input {
      width: 150px;
    }
  }
  </style>