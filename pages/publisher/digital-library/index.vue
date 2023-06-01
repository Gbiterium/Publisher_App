<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center">
    <div class="fs-24 font-weight-bold mb-4">
      Content
    </div>
    <button class="btn btn-primary py-2 px-3 mb-3" data-toggle="dropdown">
      <div class="d-flex align-items-center">
      <span class="iconify mr-1" data-icon="fluent:add-16-filled"></span>
      Add Content</div></button>
      <div class="dropdown-menu fs-14" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item border-bottom" href="#" @click.prevent="$router.push('./digital-library/content/add-video')">Video</a>
    <a class="dropdown-item border-bottom" href="#" @click.prevent="$router.push('./digital-library/content/add-document')">Document</a>
    <a class="dropdown-item border-bottom" href="#" @click.prevent="$router.push('./digital-library/content/add-worksheet')">Worksheets</a>
    <a class="dropdown-item border-bottom" href="#">Exercise</a>
    <a class="dropdown-item" href="#" @click.prevent="$router.push('./digital-library/content/add-game')">Games</a>
  </div>
    </div>
    <div class="card">
      <UtilsBaseCardTab @tab-selected="handleOnSelectTab($event)">
        <template
        v-for="(tab, index) in ['All', 'Videos', 'Documents', 'Worksheets', 'Games']"
        >
        <UtilsCardTab :key="index" :title="tab">
          <div v-if="contents">
      <div class="card-body">
        <div class="d-flex align-items-center">
        <div class="search-input mr-3">
        <input
        v-model="title"
            type="search"
            class="form-control"
            placeholder="Search Content"
            @input="slowContent()"
          @keyup.enter="getContent()"
            />
          <b-icon-search class="search-icon fs-14"></b-icon-search>
          </div>
          <div class="filter-btn">
            <button class="btn btn-light pl-3" type="button">Filters</button>
            <span class="iconify filter" data-icon="fluent:filter-16-filled"></span>
          </div>
          </div>
          <Table
            :fields="fields"
            :items="contents"
            :is-busy="isBusy"
            @row-clicked="onRowSelected($event)"
            >
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
    </div>
      <div v-else class="card-body py-xl-4 px-xl-5 d-flex justify-content-center align-items-center">
          <div>
            <img src="@/assets/img/noContent.png" alt="">
            <div class="d-flex justify-content-center align-items-center fs-14 text-grey mt-2 mb-4">
            <span>No Content Available</span>
            </div>
          <div class="d-flex justify-content-center align-items-center">
          <button class="btn btn-primary px-3 py-2" @click="addContent" data-toggle="dropdown">Add a Content</button>
          <div v-if="selectedTab === 'All'" class="dropdown-menu fs-14" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item border-bottom" href="#" @click.prevent="$router.push('./digital-library/content/add-video')">Video</a>
    <a class="dropdown-item border-bottom" href="#" @click.prevent="$router.push('./digital-library/content/add-document')">Document</a>
    <a class="dropdown-item border-bottom" href="#" @click.prevent="$router.push('./digital-library/content/add-worksheet')">Worksheets</a>
    <a class="dropdown-item border-bottom" href="#">Exercise</a>
    <a class="dropdown-item" href="#" @click.prevent="$router.push('./digital-library/content/add-game')">Games</a>
  </div>
          </div>
          </div>
      </div>
    </UtilsCardTab>
    </template>
    </UtilsBaseCardTab>
    <!-- </div> -->
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
        { key: 'title', label: 'Title', sortable: false },
        // { key: 'content_type', label: 'Type', sortable: false },
        { key: 'views', label: 'Views', sortable: false },
        { key: 'grade_levels', label: 'Grade', sortable: false },
        { key: 'date_created', label: 'Date Submitted', sortable: false },
        // { key: 'status', label: 'Status', sortable: false },
        // { key: 'actions', label: 'Actions', sortable: false },
      ],
      // published: [],
      // under_review: [],
      // draft: [],
      contents: [],
      isBusy: false,
      title: '',
      selected: {},
      currentPage: 1,
    pages: 1,
    page: 1,
    totalPages: null,
    perPage: 100,
    selectedTab: '',
    type: ''
    }
  },
  async created () {
    this.isBusy = true
    // await this.getContent()
    // await this.getBookList()
    // this.books = this.getBooks
    // this.published = this.getBooks.filter((el) => el.status === 'Published')
    // this.draft = this.getBooks.filter((el) => el.status === 'DRAFT')
    // this.under_review = this.getBooks.filter((el) => el.status === 'AWAITING_APPROVAL')
    this.isBusy = false
  },
  methods: {
    onRowSelected(e) {
      this.$router.push({
        path: `/publisher/digital-library/content/${e.id}`,
        // query: { image: `${e.book.image}`, author: `${e.book.author}`, name: `${e.book.name}` },
      })
    },
    // editBook(item) {
    //   this.$router.push({
    //     path: '/publisher/bookshelf/create-book',
    //     query: { book_id: `${item.id}` },
    //   })
    // },
    async getContent(){
      try {
        this.isBusy = true
        const { data } = await this.$axios.get(`/content/list_content?title=${this.title}&content_type=${this.type}`)
        this.contents = data.data
      } catch (error) {
        console.log(error)
      } finally {
        this.isBusy = false
      }
    },
    addContent() {
      if (this.selectedTab === 'Videos') {
        this.$router.push('./digital-library/content/add-video')
      } else if (this.selectedTab === 'Documents') {
        this.$router.push('./digital-library/content/add-document')
      } else if (this.selectedTab === 'Worksheets') {
        this.$router.push('./digital-library/content/add-worksheet')
      } else if (this.selectedTab === 'Games') {
        this.$router.push('./digital-library/content/add-game')
      } 
    },
    slowContent: debounce(function () {
    this.getContent()
  }, 500),
    async handleOnSelectTab(e) {
      this.title = ''
      this.selectedTab = e
      if (e === 'All') {
        this.type = ''
        await this.getContent()
      }
      if (e === 'Videos') {
        this.type = 'video'
        await this.getContent()
      }
      if (e === 'Documents') {
        this.type = 'document'
        await this.getContent()
      }
      if (e === 'Worksheets') {
        this.type = 'worksheet'
        await this.getContent()
      }if (e === 'Games') {
        this.type = 'game'
        await this.getContent()
      }
    }
  }
}
</script>

<style scoped>
.card-body {
  min-height: 500px;
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