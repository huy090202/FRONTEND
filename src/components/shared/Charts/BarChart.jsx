import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = () => {
    const chartOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        yaxis: {
            title: {
                text: 'Traffic'
            }
        },
        fill: {
            opacity: 1
        },
    };

    const chartSeries = [{
        name: 'Traffic',
        data: [30, 40, 45, 50, 49, 60, 70]
    }];

    return (
        <div className="chart-container">
            <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
        </div>
    );
};

export default BarChart;