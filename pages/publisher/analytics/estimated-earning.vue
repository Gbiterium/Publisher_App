<template>
    <div class="container">
    <div class="mb-4">
        <div class="fs-24 font-weight-bold">Estimated Monthly Earning</div>
        <span class="fs-14">View the total amount of money earned for this month, you can adjust how data is displaced using the filters belows.</span>
    </div>
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex">
            <button class="btn last-month" :class="[showLast ? 'btn-primary' : 'btn-outline-primary']" @click.prevent="filterByLastMonth">Last Month</button>
            <button class="btn current-month" :class="[showCurrent ? 'btn-primary' : 'btn-outline-primary']" @click.prevent="filterByCurrentMonth">This Month</button>
        </div>
        <div class="custom-select1">
            <v-select
            v-model="author"
                    class="style-chooser"
                    placeholder="Author"
                    label="name"
                    :options="author"
                  >
                  </v-select>
        </div>
        <div class="custom-select1">
            <v-select
                    class="style-chooser"
                    placeholder="Books"
                    label="name"
                    :options="author"
                  >
                  </v-select>
        </div>
        <div class="custom-select1">
            <v-select
                    class="style-chooser"
                    placeholder="Categories"
                    label="name"
                    :options="author"
                  >
                  </v-select>
        </div>
        <div class="custom-select1">
            <v-select
                    class="style-chooser"
                    placeholder="Format"
                    label="name"
                    :options="author"
                  >
                  </v-select>
        </div>
        <div class="filter-input">
            <v-date-picker
                            v-model="filter_date"
                            mode="date"
                          >
                            <template #default="{ togglePopover }">
                              <span @click="togglePopover()">
                                <input
                                  class="form-control"
                                  :placeholder="dateFormat"
                                  :value="filter_date | date"
                                />
                              </span>
                            </template>
                          </v-date-picker>
            <b-icon-calendar4 class="fs-12 calender" />
        </div>
        <div>
            <button class="btn btn-light">Reset All</button>
        </div>
    </div>
    <div class="card mt-4">
        <div class="card-body">
            <div class="top-card  d-flex align-items-center justify-content-between">
                <div>
                    <div class="fs-14">PAGES READ</div>
                    <div class="fs-40 text-blue">12,698</div>
                </div>
                <div>
                        <div class="fs-14">ESTIMATED EARNING</div>
                    <div class="fs-40 text-blue">450,350.50</div>
                    </div>
                    <div>
                        <div class="hey"></div>
                    </div>
            </div>
            </div>
    </div>
    <div class="mt-4">
        <highcharts :options="chartOptions"></highcharts>
    </div>
    <div class="mt-4">
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
              <template #name="{ data: {item} }">
      <div style="max-width: 5rem">
        <span class="">{{ item.name }}</span>
      </div>
    </template>
            </Table>
    </div>
    </div>
  </template>
  
  <script>
  export default {
      layout: 'authWithoutTopbar',
      data () {
        return {
            chartOptions: {
                
    chart: {
        type: 'area',
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        scrollablePlotArea: {
            minWidth: 600
        }
    },

    title: {
        text: null,
    },

    credits: {
        enabled: false
    },


    tooltip: {
        headerFormat: 'Distance: {point.x:.1f} km<br>',
        pointFormat: '{point.y} m a. s. l.',
        shared: true
    },

    legend: {
        enabled: false
    },
    xAxis: {
        // minRange: 5,
        title: {
            text: null
        },
    },

    yAxis: {
        startOnTick: true,
        endOnTick: false,
        title: {
            text: null
        },
    },

    series: [{
        data: [
        [12.2, 195],
    [12.3, 197],
    [12.4, 197],
    [12.5, 197],
    [12.6, 198],
    [12.7, 201],
    [12.8, 202],
    [12.9, 203],
    [13.0, 205],
    [13.1, 205],
    [13.2, 204],
    [13.3, 210],
    [13.4, 213],
    [13.5, 212],
    [13.6, 213],
    [13.7, 213],
    [13.8, 213],
        ],
        lineColor: '#1070B7',
        lineWidth: 1,
        color:'#DDEFFE',
        fillOpacity: 0.5,
        // name: 'Elevation',
        marker: {
            enabled: true,
            fillColor: '#1070B7',
        },
        threshold: null
    }]
            },
            fields: [
          { key: 'title', label: 'Book Title', sortable: false },
          { key: 'page_read', label: 'Pages Read', sortable: false },
          { key: 'purchase', label: 'Book Purchase', sortable: false },
          { key: 'shelf', label: 'Added to Shelf', sortable: false },
          { key: 'estimated', label: 'Estimated Earnings', sortable: false },
        ],
        resources: [
          {id: 1, title: {image: 'thumbnail.jpeg', name:'The Tales of Eve'},
          page_read: '1360', purchase: '1700', shelf: '900', estimated: 'NGN 201,500.00'
      }
        ],
        filter_date: '',
        date: new Date(),
        showLast: false,
        showCurrent: true,
        }
      },
      methods: {
        filterByLastMonth () {
            this.showCurrent = false
            this.showLast = true
        },
        filterByCurrentMonth () {
            this.showCurrent = true
            this.showLast = false
        }
      }
  }
  </script>
  
  <style scoped>
  button {
    font-size: 12px;
  }
  .last-month {
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
}
.current-month {
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
}
.filter-input {
    width: 203px;
}
.card {
    height: 109px;
    border: 0.4px solid #EAEAF1;
box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
}
.top-card {
    font-weight: 300;
}
hr {
    transform: rotate(-90deg);
    border: 1px solid #EAEAF1;
}
.hey {
    width: 70px;
    height: 100%;
    background: #000;
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