<template>
    <div>
      <Analytics @filter-date="handleDateFilter" @start:date="handleStartDate" @end:date="handleEndDate">
        <template #title>
          <div>Esatimated Pages Read</div>
        </template>
        <template #subtitle>
          <div>
            View the total amount of pages read for this month, you can adjust how data is displaced using the filters belows.
          </div>
        </template>
        <template #smallcard-title>
          <div>PAGES READ</div>
        </template>
        <template #value>
          {{ page_reads ? page_reads : 0 }}
        </template>
        <template #earnings>
            {{ total_earnings ? total_earnings : 0 }}
        </template>
        <template #chart>
          <b-overlay :show="show" rounded="sm">
          <highcharts :options="chartOptions"></highcharts>
          <div class="no-data" v-if="noData">
            No Analytics for the selected period
          </div>
      </b-overlay>
        </template>
        <template #table>
          <Table :fields="fields" :items="uniqueBooks">
            <!-- :filter="filter"
          :record-count="recordCount"
          :is-busy="isBusy"
          :pages="pages"
          :per-page="perPage"
          @sort="onSortChanged"
          @page-changed="getResources"
          @row-clicked="onRowSelected($event)" -->
  
            <template #book="{ data: { item } }">
              <div class="d-flex align-items-center">
                <img :src="`@/assets/img/${item.book.image}`" />
                <span>{{ item.book.name }}</span>
              </div>
            </template>
            <template #name="{ data: { item } }">
              <div style="max-width: 5rem">
                <span class="">{{ item.name }}</span>
              </div>
            </template>
          </Table>
        </template>
      </Analytics>
    </div>
  </template>
  
  <script>
  import { DateTime } from "luxon";
  import chartOptions from "~/components/Base/BarChart/chartOptions";
  import _ from "lodash";
  export default {
    layout: "authWithoutTopbar",
    data() {
      return {
        added: "",
        start_date: "",
        end_date: "",
        chartOptions: chartOptions,
        noData: false,
        books: [],
        fields: [
          { key: "book_cover", label: "Book Title", sortable: false },
          { key: "total_reads", label: "Pages Read", sortable: false },
          { key: "purchase", label: "Books Purchased", sortable: false },
          { key: "estimated", label: "Added to Shelf", sortable: false },
          { key: "total_earnings", label: "Estimated Earnings", sortable: false },
        ],
        page_reads: '',
        uniqueBooks: [],
        total_earnings: ''
      };
    },
    async mounted() {
      await this.getBookshelfStat();
    },
    methods: {
      async getBookshelfStat() {
        try {
          const { data } = await this.$axios.get(
            "/app/publisher/bookshelf_stats"
          );
          this.added = data.data.reduce(
            (a, el) => a + el.number_of_book_shelf_adds,
            0
          );
        } catch (error) {
          console.log(error);
        }
      },
      formatDate(date) {
        const parsedDate = DateTime.fromISO(date);
        const formattedDate = parsedDate.toFormat("LLL dd");
        return formattedDate;
      },
      // async handleStartDate(e) {
      //     this.start_date = e
      //     await this.getBookShelf();
      // },
      // async handleEndDate(e) {
      //     this.end_date = e
      //     await this.getBookShelf();
      // },
      async handleDateFilter(start_date, end_date) {
        this.start_date = start_date;
        this.end_date = end_date;
        await this.getEarning();
      },
      async getEarning() {
        try {
          const { data } = await this.$axios.get(
            "/app/publisher/books/reads_earnings",
            {
              params: {
                start_date: this.start_date,
                end_date: this.end_date,
              },
            }
          );
          const page_reads = data.data.map((el) => el.books.reduce(
            (a, el) => a + el.total_reads,
            0
          ));
          const date = data.data.map((el) => this.formatDate(el.date));
          const books = data.data.map((el) => el.books);
          this.books = [].concat(...books)
          this.uniqueBooks = [];
  const ids = new Set();

  for (const book of this.books) {
    if (!ids.has(book.book_cover)) {
      ids.add(book.book_cover);
      this.uniqueBooks.push(book);
    }
  }
          this.page_reads = this.books.reduce(
            (a, el) => a + el.total_reads,
            0
          );
          this.total_earnings = this.books.reduce(
            (a, el) => a + el.total_earnings,
            0
          );
          this.chartOptions.xAxis.categories = date;
          this.chartOptions.series[0].data = page_reads;
          if (number_of_books.length > 0) {
            this.noData = false;
          } else {
            this.noData = true;
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .no-data {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  </style>
  