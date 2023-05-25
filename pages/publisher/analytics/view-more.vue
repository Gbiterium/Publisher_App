<template>
    <div>
        <!-- @filter-date="handleDateFilter" @filter-items="handleFilter" -->
      <Analytics>
        <template #title>
          <div>Top Earning Books</div>
        </template>
        <template #subtitle>
          <div>
            Top 10 performing books
          </div>
        </template>
        <template #smallcard-title>
        <div>Top earning books</div>
      </template>
      <template #value>
        {{ books ? books.length.toLocaleString('en-US') : 0 }}
      </template>
      <template #earnings>
            {{ earnings ? earnings.toLocaleString('en-US') : 0 }}
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
              <div class="col-md-3 mb-4 top-book" v-for="el in top_earning" :key="el.id">
                <div class="row">
                  <div class="col-md-6">
                  <img :src="`${$config.BASE_URL}${el.book_cover}`" />
                  </div>
                  <div class="col-md-6">
                  <div class="earn-details">
                    <div class="font-weight-bold">NGN {{ el.total_earnings.toLocaleString('en-US') }}</div>
                    <div class="text-grey fs-12">Estimated Earnings</div>
                    <div class="font-weight-bold mt-4">{{ el.total_reads.toLocaleString('en-US') }}</div>
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
        books: [],
        top_earning: [],
        loading: false,
        earnings: ''
      };
    },
    async mounted() {
      await this.getEarning();
    },
    methods: {
        async getEarning() {
      try {
        this.loading = true;
        const currentDate = DateTime.now();
        // this.start_date = currentDate.toISODate()
        // // this.start_date = currentDate.startOf("month").toISODate();
        // this.end_date = currentDate.endOf("month").toISODate();
        const { data } = await this.$axios.get(
          "/app/publisher/books/reads_earnings",
          {
            params: {
              start_date: this.start_date,
              end_date: this.end_date,
            },
          }
        );
        const todayData = data.data.find(
          (el) => el.date === currentDate.toISODate()
        );
        const books = data.data.map((el) => el.books);
          this.books = [].concat(...books)
        // if (todayData) {
          this.earnings = this.books.reduce(
            (a, el) => a + el.total_earnings,
            0
          );
        //   this.reads = todayData.books.reduce((a, el) => a + el.total_reads, 0);
          this.top_earning = this.books.sort(
            (a, b) => b.total_earnings - a.total_earnings
          );
          console.log(this.top_earning)
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
  