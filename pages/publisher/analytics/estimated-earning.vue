<template>
  <div>
    <Analytics @filter-date="handleDateFilter" @filter-items="handleFilter">
      <template #title>
        <div>Estimated Monthly Earning</div>
      </template>
      <template #subtitle>
        <div>
          View the total amount of money earned for this month, you can adjust
          how data is displaced using the filters belows.
        </div>
      </template>
      <template #smallcard-title>
        <div>PAGES READ</div>
      </template>
      <template #value>
        {{ page_reads ? page_reads.toLocaleString("en-US") : 0 }}
      </template>
      <template #earnings>
        {{ total_earnings ? total_earnings.toLocaleString("en-US") : 0 }}
      </template>
      <template #chart>
        <b-overlay :show="loading" rounded="sm">
          <highcharts :options="chartOptions"></highcharts>
          <div class="no-data" v-if="noData">
            No Analytics for the selected period
          </div>
        </b-overlay>
      </template>
      <template #table>
        <Table :fields="fields" :items="uniqueBooks" :is-busy="loading">
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
      category: "",
      format: "",
      author: "",
      chartOptions: chartOptions,
      noData: false,
      books: [],
      uniqueBooks: [],
      fields: [
        { key: "book_cover", label: "Book Title", sortable: false },
        { key: "categories", label: "Category", sortable: false },
        // { key: "purchase", label: "Books Purchased", sortable: false },
        { key: "total_earnings", label: "Estimated Earnings", sortable: false },
      ],
      page_reads: "",
      total_earnings: "",
      loading: false,
    };
  },
  methods: {
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
    async handleFilter(data) {
      this.start_date = data.start_date;
      this.end_date = data.end_date;
      this.category = data.categories;
      this.format = data.format;
      this.author = data.author;
      await this.getEarning();
    },
    async getEarning() {
      try {
        this.loading = true;
        const { data } = await this.$axios.get(
          "/app/publisher/books/reads_earnings",
          {
            params: {
              start_date: this.start_date,
              end_date: this.end_date,
              ...(this.category ? { categories: this.category } : {}),
              ...(this.author ? { author: this.author } : {}),
              ...(this.format ? { book_format: this.format } : {}),
            },
          }
        );
        const earnings = data.data.map((el) =>
          el.books.reduce((a, el) => a + el.total_earnings, 0)
        );
        const date = data.data.map((el) => this.formatDate(el.date));
        const books = data.data.map((el) => el.books);
        this.books = [].concat(...books);
        this.uniqueBooks = [];
        this.uniqueBooks = Object.values(
          this.books.reduce((acc, book) => {
            const {
              book_id,
              book_name,
              total_reads,
              total_earnings,
              book_cover,
              categories,
            } = book;
            if (!acc[book_id]) {
              acc[book_id] = {
                book_id,
                book_name,
                total_reads,
                total_earnings,
                book_cover,
                categories,
              };
            } else {
              acc[book_id].total_reads += total_reads;
              acc[book_id].total_earnings += total_earnings;
            }
            return acc;
          }, {})
        );
        this.page_reads = this.books.reduce((a, el) => a + el.total_reads, 0);
        this.total_earnings = this.books.reduce(
          (a, el) => a + el.total_earnings,
          0
        );
        this.chartOptions.xAxis.categories = date;
        this.chartOptions.series[0].data = earnings;
        this.chartOptions.tooltip.pointFormat =
          "<b>Estimated Earnings: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{point.y}</b><hr>";
        if (this.books.length > 0) {
          this.noData = false;
        } else {
          this.noData = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
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
