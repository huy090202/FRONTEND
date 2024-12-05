import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import {
    totalMaintenancesCanceled,
    totalMaintenancesChecking,
    totalMaintenancesCompleted,
    totalMaintenancesMaintaining
} from '~/redux/selector/maintenanceSelector';
import { maintenanceActions } from '~/redux/slice/maintenanceSlice';

const PieChart = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { maintenances } = useSelector((state) => state.maintenance);

    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(maintenanceActions.fetchMaintenances({ token, page: 1, limit: 100 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, maintenances.data.length]);

    const totalMainsChecking = useSelector(totalMaintenancesChecking);
    const totalMainsMaintaining = useSelector(totalMaintenancesMaintaining);
    const totalMainsCompleted = useSelector(totalMaintenancesCompleted);
    const totalMainsCanceled = useSelector(totalMaintenancesCanceled);

    const chartOptions = {
        chart: {
            type: 'pie',
            height: 350
        },
        labels: ['Kiểm tra xe', 'Đang bảo dưỡng', 'Hoàn thành bảo dưỡng', 'Đã hủy'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };

    const chartSeries = [
        totalMainsChecking,
        totalMainsMaintaining,
        totalMainsCompleted,
        totalMainsCanceled
    ];

    return (
        <div className='chart-container'>
            <Chart options={chartOptions} series={chartSeries} type='pie' height={350} />
        </div>
    );
};

export default PieChart;
