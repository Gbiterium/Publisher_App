<template>
    <div class="container">
        <div class="card">
          <div class="card-body py-xl-5 px-xl-5">
            <div class="row">
              <div class="col-md-3">
                <div class="thumbnail">
                <img :src="require(`@/assets/img/${$route.query.image}`)">
                </div>
                <button class="btn btn-primary mt-4">View Book</button>
                <button class="btn btn-outline-primary mt-2">Edit Book</button>
              </div>
              <div class="col-md-9">
                <div class="fs-20">{{ $route.query.name }}</div>
                <div>{{ $route.query.author }}</div>
                <div class="mt-4">
                <UtilsBaseCardTab @tab-selected="handleOnSelectTab($event)">
        <template
            v-for="(tab, index) in ['Details', 'Rating & Review', 'Book Statistic']"
          >
          <UtilsCardTab :key="index" :title="tab">
            <div v-if="showDetails" class="about-book">
              <div class="mt-3">
              <h4 class="fs-18">About this Book</h4>
              <p class="fs-14 text-grey">Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin metus, volutpat lacinia arcu nibh vel ante. Proin dapibus dui eget justo tincidunt eleifend. Mauris porta elementum est. Nullam euismod quis libero sed convallis. Vestibulum fringilla felis nec turpis aliquam auctor a a lectus. Etiam porttitor at eros vitae posuere. Suspendisse nec mollis dolor, vel cursus leo. Integer vitae sem vitae leo pretium porta. In consequat magna purus, iaculis rhoncus velit imperdiet sit amet. Fringilla felis nec turpis aliquam auctor a a lectus. Etiam porttitor at eros vitae posuere. Suspendisse nec mollis dolor, vel cursus leo. Integer vitae sem vitae leo pretium porta. In consequat magna purus, iaculis rhoncus velit imperdiet sit amet.</p>
            </div>
            <div class="mt-4">
              <h4 class="fs-18">More Information</h4>
            </div>
            </div>
            <div v-if="showRating">
              Rating
            </div>
            <div v-if="showStat">
            Book Statistics
            </div>
            </UtilsCardTab>
            </template>
            </UtilsBaseCardTab>
            </div>
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
        showDetails: true,
        showRating: false,
        showStat: false, 
      }
    },
    methods: {
      handleOnSelectTab(e) {
      if (e === "Details") {
        // mine
        this.showDetails = true
        this.showRating = false
        this.showStat = false
      }
      if (e === "Rating & Review") {
        // class
        this.showRating = true
        this.showDetails = false
        this.showStat = false
      }
      if (e === "Book Statistic") {
        // class
        this.showRating = false
        this.showDetails = false
        this.showStat = true
      }
    },
    }
  }
  </script>
  
  <style scoped>
  .thumbnail img {
    height: 338px;
    width: 220px;
    object-fit: cover;
  }
  button {
    width: 220px;
  }
  </style>