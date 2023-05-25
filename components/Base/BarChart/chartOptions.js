export default {
    chart: {
      type: "area",
      zoomType: "x",
      panning: true,
      panKey: "shift",
      scrollablePlotArea: {
        minWidth: 600,
      },
    },

    title: {
      text: null,
    },

    credits: {
      enabled: false,
    },

    tooltip: {
      headerFormat: "<b>{point.x:.1f}, 2023</b><br><br>", },

    legend: {
      enabled: false,
    },
    xAxis: {
      // minRange: 5,
      title: {
        text: null,
      },
    },

    yAxis: {
      startOnTick: true,
      endOnTick: false,
      title: {
        text: null,
      },
      lineWidth: 1
    },

    series: [
      {
        data: [
        //   [12.2, 195],
        //   [12.3, 197],
        //   [12.4, 197],
        //   [12.5, 197],
        //   [12.6, 198],
        //   [12.7, 201],
        //   [12.8, 202],
        //   [12.9, 203],
        //   [13.0, 205],
        //   [13.1, 205],
        //   [13.2, 204],
        //   [13.3, 210],
        //   [13.4, 213],
        //   [13.5, 212],
        //   [13.6, 213],
        //   [13.7, 213],
        //   [13.8, 213],
        ],
        lineColor: "#1070B7",
        lineWidth: 1,
        color: "#DDEFFE",
        fillOpacity: 0.5,
        // name: 'Elevation',
        marker: {
          enabled: true,
          fillColor: "#1070B7",
        },
        threshold: null,
      },
    ],
  }