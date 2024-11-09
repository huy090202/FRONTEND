import { BarChart, PieChart } from '~/components/shared/Charts';

const Dashboard = () => {
    return (
        <div className='w-full pr-5'>
            <h1>Thống kê</h1>
            <BarChart/>
            <PieChart/>
        </div>
    );
};

export default Dashboard;
