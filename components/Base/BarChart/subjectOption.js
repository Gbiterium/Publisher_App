export default {
    chart: {
      type: "pie",
    //   width: 350,
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
        text: '',
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
      width: 150,
      itemStyle: {
        color: "#171E40",
        fontWeight: "normal",
      },
      labelFormatter: function() {
        return this.y + '%' + ' ' + '-' + ' ' + this.name;
      }
    },
    credits: {
      enabled: false,
    },

    tooltip: {
    //   valueDecimals: 2,
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
        name: "Percentage",
        data: [
        ],
      },
    ],
}