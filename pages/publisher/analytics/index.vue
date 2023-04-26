<template>
    <div class="container">
        <div class="row report-card">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body d-flex align-items-center">
                        <div>
                        <div class="fs-14 mb-3">Today’s Estimated Earnings</div>
                        <div>
                        <div class="fs-36 font-weight-bold">62,980.50</div>
                        <span class="fs-14 text-grey">Nigeria Naira (NGN)</span>
                        </div>
                        <hr class="mt-4" />
                        <div class="text-blue fs-14">View Monthly Report</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body d-flex align-items-center">
                        <div>
                        <div class="fs-14 mb-3">Today’s Book Read</div>
                        <div>
                        <div class="fs-36 font-weight-bold">9,782</div>
                        <span class="fs-14 text-grey">Pages Read</span>
                        </div>
                        <hr class="mt-4" />
                        <div class="text-blue fs-14">View Monthly Report</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body d-flex align-items-center">
                        <div>
                        <div class="fs-14 mb-3">Today’s Book Purchase</div>
                        <div>
                        <div class="fs-36 font-weight-bold">500</div>
                        <span class="fs-14 text-grey">Units Purchased</span>
                        </div>
                        <hr class="mt-4" />
                        <div class="text-blue fs-14">View Monthly Report</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body d-flex ">
                        <div class="align-items-center">
                        <div class="fs-14 mb-3">Today’s Books Added to Shelf</div>
                        <div>
                        <div class="fs-36 font-weight-bold">148</div>
                        <span class="fs-14 text-grey">Added to Shelf</span>
                        </div>
                        <hr class="mt-4" />
                        <div class="text-blue fs-14">View Monthly Report</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-5 top-earning">
            <div class="card-header d-flex align-items-center justify-content-between">
                <div>
                    <div>Top Earning Books</div>
                    <div class="fs-14 text-grey">Top 10 performing books</div>
                </div>
                <div>
                    <button class="btn btn-primary">Daily</button>
                    <button class="btn btn-outline-primary">Weekly</button>
                </div>
            </div>
            <hr class="mx-2" />
            <div class="card-body">

            </div>
        </div>
        </div>
  </template>

  <script>
  export default {
      layout: 'authWithoutTopbar'
  }
  </script>
  
  <style scoped>
   .card {
    border: 0.4px solid #EAEAF1;
box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
  }
  .report-card .card {
    height: 234px;
  }
  .top-earning {
    height: 346px;
  }
  .top-earning button {
    font-size: 12px;
  }
  </style>