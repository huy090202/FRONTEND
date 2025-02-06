import Chart from 'react-apexcharts';

// eslint-disable-next-line react/prop-types
const MonthlyIncomeChart = ({ orders }) => {
    const groupOrdersByMonth = (orders) => {
        const monthlyData = {};

        // eslint-disable-next-line react/prop-types
        orders.forEach((order) => {
            const orderDate = new Date(order.order_date);
            const monthYear = `${orderDate.toLocaleString('default', {
                month: 'long'
            })} ${orderDate.getFullYear()}`;

            const totalPrice = parseFloat(order.total_price);
            if (monthlyData[monthYear]) {
                monthlyData[monthYear] += totalPrice;
            } else {
                monthlyData[monthYear] = totalPrice;
            }
        });

        return monthlyData;
    };

    const monthlyIncomeData = groupOrdersByMonth(orders);

    // Lấy danh sách tháng và tổng thu nhập cho mỗi tháng
    const months = Object.keys(monthlyIncomeData);
    const totalIncomes = Object.values(monthlyIncomeData);

    // Cấu hình cho biểu đồ
    const options = {
        chart: {
            id: 'income-chart',
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            categories: months,
            title: {
                text: 'Tháng'
            }
        },
        yaxis: {
            title: {
                text: 'Tổng Thu Nhập'
            }
        },
        title: {
            text: 'Tổng Thu Nhập Theo Tháng',
            align: 'center'
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 5
        },
        tooltip: {
            shared: true,
            intersect: false
        }
    };

    const series = [
        {
            name: 'Tổng Thu Nhập',
            data: totalIncomes
        }
    ];

    return (
        <div>
            <Chart options={options} series={series} type='line' height={350} />
        </div>
    );
};

export default MonthlyIncomeChart;
