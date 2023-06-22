<template>
  <div class="container-fluid">
    <div class="mb-4">
      <div class="fs-24 font-weight-bold">Analytics</div>
    </div>
    <div class="row report-card">
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mt-2">
              <div>
                <div class="fs-14 mb-3">Today’s Estimated Earnings</div>
                <div>
                  <div class="fs-36 font-weight-bold">
                    {{ earnings ? earnings.toLocaleString("en-US") : 0 }}
                  </div>
                  <span class="fs-14 text-grey">Nigeria Naira (NGN)</span>
                </div>
              </div>
            </div>
            <hr class="mt-4 w-100" />
            <nuxt-link to="./analytics/estimated-earning">
              <div class="text-blue fs-14 pointer text-decoration-none">
                View Monthly Report
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mt-2">
              <div>
                <div class="fs-14 mb-3">Today’s Book Read</div>
                <div>
                  <div class="fs-36 font-weight-bold">
                    {{ reads ? reads.toLocaleString("en-US") : 0 }}
                  </div>
                  <span class="fs-14 text-grey">Pages Read</span>
                </div>
              </div>
            </div>
            <hr class="mt-4" />
            <nuxt-link to="./analytics/page-reads">
              <div class="text-blue fs-14 pointer">View Monthly Report</div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mt-2">
              <div class="">
                <div class="fs-14 mb-3">Today’s Books Added to Shelf</div>
                <div>
                  <div class="fs-36 font-weight-bold">
                    {{ addedToShelf ? addedToShelf.books.length : 0 }}
                  </div>
                  <span class="fs-14 text-grey">Added to Shelf</span>
                </div>
              </div>
            </div>
            <hr class="mt-4" />
            <nuxt-link to="./analytics/added-shelf">
              <div class="text-blue fs-14 pointer">View Monthly Report</div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-5 top-earning">
      <div
        class="card-header d-flex align-items-center justify-content-between"
      >
        <div>
          <div class="font-weight-bold">Top Earning Books</div>
          <div class="fs-14 text-grey">Top 10 performing books</div>
        </div>
        <div class="d-flex">
          <button
            class="btn daily-btn"
            :class="[showDaily ? 'btn-primary' : 'btn-outline-primary']"
            @click.prevent="filterByDay"
          >
            Today
          </button>
          <button
            class="btn weekly-btn"
            :class="[showWeekly ? 'btn-primary' : 'btn-outline-primary']"
            @click.prevent="filterByWeek"
          >
            WTD
          </button>
        </div>
      </div>
      <hr />
      <div class="card-body">
        <div v-if="loading">
          <div class="row">
            <div v-for="n in 4" :key="n" class="col-lg-3 col-md-6">
              <div>
                <b-skeleton width="100%" height="160px" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-lg-3 col-md-6 top-book mb-3" v-for="el in top_earning.slice(0,4)" :key="el.id">
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
        <div class="d-flex justify-content-end mt-4">
          <nuxt-link to="./analytics/view-more">
            <a
              href="#"
              class="text-uppercase text-decoration-underline text-blue fs-12"
              >View More</a
            ></nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="pie-chart mt-5">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <highcharts :options="categoryOptions"></highcharts>
        </div>
        <div class="col-lg-4 col-md-6">
          <highcharts :options="formatOptions"></highcharts>
        </div>
        <div class="col-lg-4 col-md-6">
          <highcharts :options="subjectOptions"></highcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { DateTime } from "luxon";
import chartOptions from "~/components/Base/BarChart/defaultOption";
import formatOption from "~/components/Base/BarChart/formatOption";
import subjectOption from "~/components/Base/BarChart/subjectOption";
export default {
  layout: "authWithoutTopbar",
  data() {
    return {
      showDaily: true,
      showWeekly: false,
      addedToShelf: "",
      earnings: "",
      reads: "",
      start_date: "",
      end_date: "",
      top_earning: "",
      loading: false,
      categoryOptions: chartOptions,
      formatOptions: formatOption,
      subjectOptions: subjectOption,
    };
  },
  async created() {
    if (!this.$cookies.get("publisher-token")) {
      await this.GET_TOKEN();
    }
    await this.getBookShelf();
    await this.filterByDay();
    await this.getData();
    this.categoryOptions.title.text = "Top Categories";
    this.formatOptions.title.text = "Top Format";
    this.subjectOptions.title.text = "Top Subject";
  },
  methods: {
    ...mapActions("publisher", ["GET_TOKEN"]),
    async filterByDay() {
      this.showDaily = true;
      this.showWeekly = false;
      this.start_date = DateTime.now().toISODate();
      this.end_date = DateTime.now().toISODate();
      await this.getEarning();
    },
    async getData() {
      try {
        const { data } = await this.$axios.get(
          "/app/publisher/category_reads/"
        );
        const format = [].concat(...data.data.formats);
        const categories = [].concat(...data.data.categories);
        const subjects = [].concat(...data.data.subjects);
        const sortedFormat = format.sort(
          (a, b) => b.books_with_format - a.books_with_format
        );
        const sortedCategories = categories.sort(
          (a, b) => b.books_with_category - a.books_with_category
        );
        const sortedSubjects = subjects.sort(
          (a, b) => b.books_with_subject - a.books_with_subject
        );
        const totalWithFormat = format.reduce(
          (total, el) => total + el.books_with_format,
          0
        );
        const totalWithCategories = categories.reduce(
          (total, el) => total + el.books_with_category,
          0
        );
        const totalWithSubjects = subjects.reduce(
          (total, el) => total + el.books_with_subject,
          0
        );
        const formatData = sortedFormat.map((el) => {
          const percentage = (el.books_with_format / totalWithFormat) * 100;
          return [el.format, parseFloat(percentage.toFixed(1))];
        });
        const categoryData = sortedCategories.map((el) => {
          const percentage =
            (el.books_with_category / totalWithCategories) * 100;
          return [el.category, parseFloat(percentage.toFixed(1))];
        });
        const subjectData = sortedSubjects.map((el) => {
          const percentage = (el.books_with_subject / totalWithSubjects) * 100;
          return [el.subject, parseFloat(percentage.toFixed(1))];
        });
        this.formatOptions.series[0].data = formatData;
        this.categoryOptions.series[0].data = categoryData;
        this.subjectOptions.series[0].data = subjectData;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByWeek() {
      this.showWeekly = true;
      this.showDaily = false;
      const currentDate = DateTime.now();
      this.start_date = currentDate.startOf("week").toISODate();
      this.end_date = currentDate.endOf("week").toISODate();
      console.log(this.start_date, this.end_date);
      await this.getEarning();
    },
    async getBookShelf() {
      try {
        const currentDate = DateTime.now();
        const start_date = currentDate.startOf("month").toISODate();
        const end_date = currentDate.endOf("month").toISODate();
        const { data } = await this.$axios.get(
          "/app/publisher/books/shelf_additions/",
          {
            params: {
              start_date: start_date,
              end_date: end_date,
            },
          }
        );
        this.addedToShelf = data.data.find(
          (el) => el.date === currentDate.toISODate()
        );
      } catch (error) {
        console.log(error);
      }
    },
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
        if (todayData) {
          this.earnings = todayData.books.reduce(
            (a, el) => a + el.total_earnings,
            0
          );
          this.reads = todayData.books.reduce((a, el) => a + el.total_reads, 0);
          this.top_earning = todayData.books.sort(
            (a, b) => b.total_earnings - a.total_earnings
          );
          // console.log(top_earning)
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
.card {
  border: 0.4px solid #eaeaf1;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
}
.report-card .card {
  height: 234px;
}
.top-earning {
  min-height: 346px;
}
.pie-chart .card {
  height: 215px;
}
.top-earning button {
  font-size: 12px;
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
  /* right: 30px; */
}
.daily-btn {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.weekly-btn {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
.top-earning hr {
  margin: 0 1.25rem;
}
</style>
