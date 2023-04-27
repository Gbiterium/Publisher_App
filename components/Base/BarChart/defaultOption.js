export default {
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
}