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
        <div v-if="available" class="mt-3">
        <UtilsBaseCardTab>
        <template
            v-for="(tab, index) in [`All (${resources.length})`, 'Published', 'Draft', 'Under Review']"
          >
          <UtilsCardTab :key="index" :title="tab">
        <div class="card-body">
          <div class="d-flex align-items-center">
          <div class="search-input mr-3">
          <input
              type="search"
              class="form-control"
              placeholder="Search Book"
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
              :items="resources"
              :filter="filter"
              :record-count="recordCount"
              :is-busy="isBusy"
              :pages="pages"
              :per-page="perPage"
              @sort="onSortChanged"
              @page-changed="getResources"
              @row-clicked="onRowSelected($event)"
            >
              <template #book="{ data: { item } }">
                <div class="d-flex align-items-center">
                  <img :src="`@/assets/img/${item.book.image}`">
                  <span>{{ item.book.name }}</span>
                </div>
              </template>
            </Table>
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
  export default {
    layout: 'authWithoutTopbar',
    data () {
      return {
        available: true,
        hey: false,
        fields: [
          { key: 'book', label: 'Books', sortable: false },
          { key: 'views', label: 'Views', sortable: false },
          { key: 'rating', label: 'Rating', sortable: false },
          { key: 'date_created', label: 'Date Submitted', sortable: false },
          { key: 'status', label: 'Status', sortable: false },
          { key: 'actions', label: 'Actions', sortable: false },
        ],
        resources: [
          {id: 1, book: {image: 'thumbnail.jpeg', author:'Mr Alex', name:'The Tales of Eve', categories: 'Fiction, Historical, Rural'},
          views: '1360', rating: 4, date_created: 'Jun 12, 2023', status: 'Published'
      }
        ]
      }
    },
    methods: {
      onRowSelected(e) {
        console.log(e)
        this.$router.push({
          path: `/publisher/bookshelf/${e.id}`,
          query: { image: `${e.book.image}`, author: `${e.book.author}`, name: `${e.book.name}` },
        })
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