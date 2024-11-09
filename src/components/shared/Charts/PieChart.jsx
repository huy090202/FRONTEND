import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = () => {
    const chartOptions = {
        chart: {
            type: 'pie',
            height: 350,
        },
        labels: ['A', 'B', 'C', 'D'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const chartSeries = [44, 55, 13, 43];

    return (
        <div className="chart-container">
            <Chart options={chartOptions} series={chartSeries} type="pie" height={350} />
        </div>
    );
};

export default PieChart;