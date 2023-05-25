<template>
  <div>
    <Analytics @filter-date="handleDateFilter" @filter-items="handleFilter">
      <template #title>
        <div>Top Earning Books</div>
      </template>
      <template #subtitle>
        <div>Top performing books</div>
      </template>
      <template #smallcard-title>
        <div>Top earning books</div>
      </template>
      <template #value>
        {{ top_earning ? top_earning.length.toLocaleString("en-US") : 0 }}
      </template>
      <template #earnings>
        {{ earnings ? earnings.toLocaleString("en-US") : 0 }}
      </template>
      <template #chart>
        <div class="container top-earning">
          <div v-if="loading">
            <div class="row">
              <div v-for="n in 4" :key="n" class="col-md-3">
                <div>
                  <b-skeleton width="100%" height="160px" />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="row">
            <div
              class="col-lg-3 col-md-6 mb-4 top-book"
              v-for="el in top_earning"
              :key="el.id"
            >
              <div class="row">
                <div class="col-6">
                  <img :src="`${$config.BASE_URL}${el.book_cover}`" />
                </div>
                <div class="col-6">
                  <div class="earn-details">
                    <div class="font-weight-bold">
                      NGN {{ el.total_earnings.toLocaleString("en-US") }}
                    </div>
                    <div class="text-grey fs-12">Estimated Earnings</div>
                    <div class="font-weight-bold mt-4">
                      {{ el.total_reads.toLocaleString("en-US") }}
                    </div>
                    <div class="text-grey fs-12">Pages Read</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      start_date: "",
      end_date: "",
      category: "",
      format: "",
      author: "",
      books: [],
      top_earning: [],
      loading: false,
      earnings: "",
      uniqueBooks: []
    };
  },
  async mounted() {
    await this.getEarning();
  },
  methods: {
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
        const currentDate = DateTime.now();
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
        const todayData = data.data.find(
          (el) => el.date === currentDate.toISODate()
        );
        const books = data.data.map((el) => el.books);
        this.books = [].concat(...books);
        this.uniqueBooks = [];
  const ids = new Set();
          for (const book of this.books) {
    if (!ids.has(book.book_cover)) {
      ids.add(book.book_cover);
      this.uniqueBooks.push(book);
    }
  }
        // if (todayData) {
        this.earnings = this.books.reduce((a, el) => a + el.total_earnings, 0);
        //   this.reads = todayData.books.reduce((a, el) => a + el.total_reads, 0);
        this.top_earning = this.books.sort(
          (a, b) => b.total_earnings - a.total_earnings
        );
        // }
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
.top-earning img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.top-book {
  position: relative;
}
.earn-details {
  position: absolute;
  bottom: 0;
  right: 30px;
}
</style>
