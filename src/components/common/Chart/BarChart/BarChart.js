import Highcharts from 'highcharts';

const BarChart = (arr) => {
    let tempA = [], tempB = [], tempC = [];
    arr.map(element => {
        tempA.push(element.sumA);
        tempB.push(element.sumB);
        tempC.push(element.year);
    });
    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Stacked bar chart'
        },
        xAxis: {
            categories: tempC
        },
        yAxis: {
            min: 0,
            title: {
                text: 'EMI Payment/ Year'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Principal',
            data: tempA
        }, {
            name: 'Interest',
            data: tempB
        }]
    });
}

export default BarChart;