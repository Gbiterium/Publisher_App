<template>
  <div class="container">
    <div class="row report-card">
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mt-2">
                <div>
              <div class="fs-14 mb-3">Today’s Estimated Earnings</div>
              <div>
                <div class="fs-36 font-weight-bold">62,980.50</div>
                <span class="fs-14 text-grey">Nigeria Naira (NGN)</span>
              </div>
            </div>
            </div>
              <hr class="mt-4 w-100" />
              <nuxt-link to="./analytics/estimated-earning">
              <div class="text-blue fs-14 pointer text-decoration-none">View Monthly Report</div>
              </nuxt-link>
            </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mt-2">
            <div>
              <div class="fs-14 mb-3">Today’s Book Read</div>
              <div>
                <div class="fs-36 font-weight-bold">9,782</div>
                <span class="fs-14 text-grey">Pages Read</span>
              </div>
            </div>
            </div>
              <hr class="mt-4" />
              <nuxt-link to="./analytics/estimated-earning">
              <div class="text-blue fs-14 pointer">View Monthly Report</div>
              </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mt-2">
            <div>
              <div class="fs-14 mb-3">Today’s Book Purchase</div>
              <div>
                <div class="fs-36 font-weight-bold">500</div>
                <span class="fs-14 text-grey">Units Purchased</span>
              </div>
              </div>
            </div>
              <hr class="mt-4" />
              <nuxt-link to="./analytics/estimated-earning">
              <div class="text-blue fs-14 pointer">View Monthly Report</div>
              </nuxt-link>
            </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mt-2">
            <div class="">
              <div class="fs-14 mb-3">Today’s Books Added to Shelf</div>
              <div>
                <div class="fs-36 font-weight-bold">{{ addedToShelf ? addedToShelf.books.length : 0 }}</div>
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
          <button class="btn daily-btn" :class="[showDaily ? 'btn-primary' : 'btn-outline-primary']" @click.prevent="filterByDay">Daily</button>
          <button class="btn weekly-btn" :class="[showWeekly ? 'btn-primary' : 'btn-outline-primary']" @click.prevent="filterByWeek">Weekly</button>
        </div>
      </div>
      <hr />
      <div class="card-body">
        <div class="row">
          <div class="col-md-3 top-book">
            <div class="d-flex align-items-center">
              <img src="@/assets/img/world.png" />
              <div class="earn-details">
                <div class="font-weight-bold">NGN 5,550.00</div>
                <div class="text-grey fs-12">Estimated Earnings</div>
                <div class="font-weight-bold mt-4">450</div>
                <div class="text-grey fs-12">Pages Read</div>
              </div>
            </div>
          </div>
          <div class="col-md-3 top-book">
            <div class="d-flex align-items-center">
              <img src="@/assets/img/world.png" />
              <div class="earn-details">
                <div class="font-weight-bold">NGN 5,550.00</div>
                <div class="text-grey fs-12">Estimated Earnings</div>
                <div class="font-weight-bold mt-4">450</div>
                <div class="text-grey fs-12">Pages Read</div>
              </div>
            </div>
          </div>
          <div class="col-md-3 top-book">
            <div class="d-flex align-items-center">
              <img src="@/assets/img/world.png" />
              <div class="earn-details">
                <div class="font-weight-bold">NGN 5,550.00</div>
                <div class="text-grey fs-12">Estimated Earnings</div>
                <div class="font-weight-bold mt-4">450</div>
                <div class="text-grey fs-12">Pages Read</div>
              </div>
            </div>
          </div>
          <div class="col-md-3 top-book">
            <div class="d-flex align-items-center">
              <img src="@/assets/img/world.png" />
              <div class="earn-details">
                <div class="font-weight-bold">NGN 5,550.00</div>
                <div class="text-grey fs-12">Estimated Earnings</div>
                <div class="font-weight-bold mt-4">450</div>
                <div class="text-grey fs-12">Pages Read</div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <a
            href="#"
            class="text-uppercase text-decoration-underline text-blue fs-12"
            >View More</a
          >
        </div>
      </div>
    </div>
    <div class="pie-chart mt-5">
      <div class="row">
        <div class="col-md-4">
          <highcharts :options="chartOptions"></highcharts>
        </div>
        <div class="col-md-4">
          <highcharts :options="chartOptions"></highcharts>
        </div>
        <div class="col-md-4">
          <highcharts :options="chartOptions"></highcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { DateTime } from 'luxon'
export default {
  layout: "authWithoutTopbar",
  data() {
    return {
      chartOptions: {
        chart: {
          type: "pie",
          width: 350,
          height: 215,
          shadow: {
            color: "rgba(0, 0, 0, 0.1)",
            offsetX: 1,
            offsetY: 1,
            opacity: "0.1",
            width: 5,
          },
          borderColor: "#EAEAF1",
          borderRadius: 4,
          borderWidth: 0.4,
        },
        title: {
          text: "Top Categories",
          align: "left",
          y: 20,
          x: 10,
          style: {
            fontWeight: "bold",
            fontSize: "14px",
            marginTop: "50px",
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          floating: true,
          itemMarginTop: 8,
          width: 160,
          itemStyle: {
            color: "#171E40",
            fontWeight: "normal",
          },
        },
        credits: {
          enabled: false,
        },

        tooltip: {
          valueDecimals: 2,
          valueSuffix: "%",
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            colorByPoint: true,
            type: "pie",
            size: "100%",
            innerSize: "80%",
            showInLegend: true,
            center: [70, 50],
            dataLabels: {
              enabled: false,
              crop: false,
              distance: "-10%",
              connectorWidth: 0,
            },
          },
        },
        colors: ["#FBA725", "#CBC619", "#EA6F46", "#4AA7CA"],
        series: [
          {
            type: "pie",
            name: "1999",
            data: [
              ["Firefox", 45.0],
              ["IE", 26.8],
              ["Safari", 8.5],
              ["Opera", 6.2],
            ],
          },
        ],
      },
      showDaily: true,
      showWeekly: false,
      addedToShelf: '',
    }
  },
  async created() {
    if (!this.$cookies.get('publisher-token')) {
    await this.GET_TOKEN()
    }
    await this.getBookShelf()
  },
  methods: {
    ...mapActions('publisher', ['GET_TOKEN']),
    filterByDay() {
        this.showDaily = true
        this.showWeekly = false
    },
    filterByWeek() {
        this.showWeekly = true
        this.showDaily = false
    },
    async getBookShelf() {
            try{
              const currentDate = DateTime.now();
      const start_date = currentDate.startOf("month").toISODate();
      const end_date = currentDate.endOf("month").toISODate();
                const { data } = await this.$axios.get('/app/publisher/books/shelf_additions/', {
                    params: {
                        start_date: start_date,
                        end_date: end_date
                    }
                })
                this.addedToShelf = data.data.find((el) => el.date === currentDate.toISODate())
            } catch (error) {
                console.log(error)
            }
        }
  }
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
  height: 346px;
}
.pie-chart .card {
  height: 215px;
}
.top-earning button {
  font-size: 12px;
}
.top-earning img {
  width: 104px;
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
