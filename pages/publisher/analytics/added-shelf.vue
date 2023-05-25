<template>
  <div>
    <Analytics @filter-date="handleDateFilter" @filter-items="handleFilter">
      <template #title>
        <div>Added to Shelf</div>
      </template>
      <template #subtitle>
        <div>
          View the total amount of books added to shelf for this month, you can
          adjust how data is displaced using the filters belows.
        </div>
      </template>
      <template #smallcard-title>
        <div>Books Added to Shelf</div>
      </template>
      <template #value>
        {{ books ? books.length.toLocaleString('en-US') : 0 }}
      </template>
      <template #earnings>
            {{ total_earnings ? total_earnings.toLocaleString('en-US') : 0 }}
        </template>
      <template #chart>
        <b-overlay :show="loading" rounded="lg">
        <highcharts :options="chartOptions"></highcharts>
        <div class="no-data" v-if="noData">
          No Analytics for the selected period
        </div>
    </b-overlay>
      </template>
      <template #table>
        <Table :fields="fields" :items="books" :is-busy="loading">
          <!-- :filter="filter"
        :record-count="recordCount"
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
export default {
  layout: "authWithoutTopbar",
  data() {
    return {
      added: "",
      start_date: "",
      end_date: "",
      category: '',
      format: '',
      author: '',
      chartOptions: chartOptions,
      noData: false,
      books: [],
      fields: [
        { key: "book_name", label: "Book Title", sortable: false },
        { key: "page_read", label: "Category", sortable: false },
        { key: "purchase", label: "Books Purchased", sortable: false },
        { key: "estimated", label: "Estimated Earnings", sortable: false },
      ],
      loading: false,
      total_earnings: 0
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
      await this.getBookShelf();
    },
    async handleFilter(data) {
      this.start_date = data.start_date
      this.end_date = data.end_date
      this.category = data.categories
      this.format = data.format
      this.author = data.author
      await this.getBookShelf()
    },
    async getBookShelf() {
      try {
        this.loading = true
        const { data } = await this.$axios.get(
          "/app/publisher/books/shelf_additions/",
          {
            params: {
              start_date: this.start_date,
              end_date: this.end_date,
              ...(this.category
              ? { categories: this.category }
              : {}),
              ...(this.author
              ? { author: this.author }
              : {}),
              ...(this.format
              ? { book_format: this.format }
              : {}),
            },
          }
        );
        const number_of_books = data.data.map((el) => el.books.length);
        const date = data.data.map((el) => this.formatDate(el.date));
        const books = data.data.map((el) => el.books);
        this.books = [].concat(...books)
        this.chartOptions.xAxis.categories = date;
        this.chartOptions.series[0].data = number_of_books;
    this.chartOptions.tooltip.pointFormat = "<b>Books Added to Shelf &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{point.y}</b><hr>"
        if (number_of_books.length > 0) {
          this.noData = false;
        } else {
          this.noData = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false
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
