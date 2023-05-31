<template>
  <div class="container">
    <div class="mb-4">
      <div class="fs-24 font-weight-bold"><slot name="title"></slot></div>
      <span class="fs-14"><slot name="subtitle"></slot></span>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <button
          class="btn last-month"
          :class="[showLast ? 'btn-primary' : 'btn-outline-primary']"
          @click.prevent="filterByLastMonth"
        >
          Last Month
        </button>
        <button
          class="btn current-month"
          :class="[showCurrent ? 'btn-primary' : 'btn-outline-primary']"
          @click.prevent="filterByCurrentMonth"
        >
          This Month
        </button>
        <button
          class="btn today"
          :class="[showToday ? 'btn-primary' : 'btn-outline-primary']"
          @click.prevent="filterByToday"
        >
          Today
        </button>
      </div>
      <div class="custom-select1" @click.prevent="getProperties('authors')">
        <v-select
          v-model="author"
          class="style-chooser"
          placeholder="Author"
          label="name"
          :options="authors"
          >
          <!-- :loading="loading" -->
        </v-select>
      </div>
      <!-- <div class="custom-select1">
        <v-select
        v-model="book"
          class="style-chooser"
          placeholder="Books"
          label="name"
          :options="books"
        >
        </v-select>
      </div> -->
      <div class="custom-select1" @click.prevent="getProperties('categories')">
        <v-select
        v-model="category"
          class="style-chooser"
          placeholder="Categories"
          label="name"
          :options="categories"
        >
        </v-select>
      </div>
      <div class="custom-select1" @click.prevent="getProperties('formats')">
        <v-select
        v-model="format"
          class="style-chooser"
          placeholder="Format"
          label="name"
          :options="formats"
        >
        </v-select>
      </div>
      <div class="filter-input">
        <v-date-picker v-model="start_date" mode="date">
          <template #default="{ togglePopover }">
            <span @click="togglePopover()">
              <input class="form-control" placeholder="YYYY-MM-DD" :value="start_date | date" />
            </span>
          </template>
        </v-date-picker>
        <b-icon-calendar4 class="fs-10 text-grey calender" />
      </div>
      <div class="filter-input">
        <v-date-picker v-model="end_date" mode="date">
          <template #default="{ togglePopover }">
            <span @click="togglePopover()">
              <input class="form-control" placeholder="YYYY-MM-DD" :value="end_date | date" />
            </span>
          </template>
        </v-date-picker>
        <b-icon-calendar4 class="fs-10 text-grey calender" />
      </div>
      <div>
        <button class="btn btn-light" @click="applyFilter">apply</button>
        <button class="btn btn-light" @click="resetFilter">Reset</button>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-body earning-card">
        <div class="top-card d-flex align-items-center justify-content-between">
          <div>
            <div class="fs-14 text-uppercase">
              <slot name="smallcard-title"></slot>
            </div>
            <div class="fs-40 text-blue"><slot name="value"></slot></div>
          </div>
          <div>
            <div class="fs-14">ESTIMATED EARNING</div>
            <div class="fs-40 text-blue"><slot name="earnings"></slot></div>
          </div>
          <div></div>
        </div>
        <div class="hey d-flex justify-content-center align-items-center">
          <span
            class="iconify text-white fs-20"
            data-icon="material-symbols:insights"
          ></span>
        </div>
      </div>
    </div>
    <div class="mt-4 chart-wrapper">
      <slot name="chart"></slot>
    </div>
    <div class="mt-4">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
  layout: "authWithoutTopbar",
  data() {
    return {
      filter_date: "",
      date: new Date(),
      showLast: false,
      showCurrent: false,
      showToday: true,
      start_date: "",
      end_date: "",
      authors: [],
      formats: [],
      categories: [],
      category: '',
      author: '',
      book: '',
      format: '',
      filterData: {},
      loading: false
    };
  },
  mounted() {
    this.filterByToday();
  },
  methods: {
    filterByLastMonth() {
      this.showCurrent = false;
      this.showLast = true;
      this.showToday = false
      const currentDate = DateTime.now();
      this.start_date = currentDate
        .minus({ months: 1 })
        .startOf("month")
        .toISODate();
      this.end_date = currentDate
        .minus({ months: 1 })
        .endOf("month")
        .toISODate();
      this.$emit("filter-date", this.start_date, this.end_date);
    },
    async getProperties(property) {
      try {
        this.loading = true
        const { data } = await this.$axios.get(`/app/publisher/books_properties?property=${property}`)
        if (property === 'authors') {
        this.authors = data.data
        } else if(property === 'categories') {

          this.categories = data.data
        } else if(property === 'formats') {

          this.formats = data.data
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    filterByCurrentMonth() {
      this.showCurrent = true;
      this.showLast = false;
      this.showToday = false
      const currentDate = DateTime.now();
      this.start_date = currentDate.startOf("month").toISODate();
      this.end_date = currentDate.endOf("month").toISODate();
      this.$emit("filter-date", this.start_date, this.end_date);
    },
    filterByToday() {
      this.showCurrent = false;
      this.showLast = false;
      this.showToday = true
      const currentDate = DateTime.now();
      this.start_date = currentDate.toISODate();
      this.end_date = currentDate.toISODate();
      this.$emit("filter-date", this.start_date, this.end_date);
    },
    applyFilter() {
      this.filterData = {
        start_date: this.start_date ? this.formatDate(this.start_date) : '',
        end_date: this.end_date ? this.formatDate(this.end_date) : '',
        format: this.format,
        categories: this.category,
        author: this.author
      }
      this.$emit('filter-items', this.filterData)
    },
    resetFilter() {
      this.format = ''
      this.category = ''
      this.author = ''
      this.filterByCurrentMonth()
      this.filterData = {
        start_date: this.start_date,
        end_date: this.end_date,
        format: this.format,
        categories: this.category,
        author: this.author
      }
      this.$emit('filter-items', this.filterData)
    },
    formatDate(date) {
      const oldDate = date.toISOString()
        const newDate = DateTime.fromISO(oldDate).toISODate()
      return newDate
    }
  },
};
</script>

<style scoped>
button {
  font-size: 12px;
}
.chart-wrapper {
  position: relative;
}
.form-control {
  font-size: 12px !important;
  width: 110px;
}
.last-month {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-right: none;
}
.current-month {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.today {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-left: none;
}
/* .filter-input {
    width: 203px;
} */
.card {
  height: 109px;
  border: 0.4px solid #eaeaf1;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
}
.custom-select1 {
  width: 170px;
}
input::placeholder {
  font-size: 11px;
}
.top-card {
  font-weight: 300;
}
hr {
  transform: rotate(-90deg);
  border: 1px solid #eaeaf1;
}
.earning-card {
  position: relative;
}
.hey {
  width: 70px;
  height: 109px;
  background: #1070b7;
  position: absolute;
  right: 0;
  top: 0;
}
.filter-input {
  position: relative;
}
.calender {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
