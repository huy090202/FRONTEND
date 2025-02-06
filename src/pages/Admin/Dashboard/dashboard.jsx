import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '~/redux/slice/userSlice';
import { MoneyCollectOutlined, UserOutlined } from '@ant-design/icons';
import { PieChart } from '~/components/shared/Charts';
import { totalCompletedOrdersAmount } from '~/redux/selector/orderSelector';
import { orderActions } from '~/redux/slice/orderSlice';
import { totalPaidInvoicesAmount } from '~/redux/selector/invoiceSelector';
import { formatVND } from '~/utils/formatVND';
import { invoiceActions } from '~/redux/slice/invoiceSlice';

const Dashboard = () => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const dispatch = useDispatch();

    // Số lượng khách hàng
    const { customers } = useSelector((state) => state.user);
    useEffect(() => {
        if (token) {
            dispatch(userActions.fetchCustomers({ token, active: true, page: 1, limit: 100 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, customers.data.length]);

    // Số lượng Kỹ thuật viên
    const { techs } = useSelector((state) => state.user);
    useEffect(() => {
        if (token) {
            dispatch(userActions.fetchTechs({ token, active: true, page: 1, limit: 100 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, techs.data.length]);

    // Số lượng nhân viên
    const { staffs } = useSelector((state) => state.user);
    useEffect(() => {
        if (token) {
            dispatch(userActions.fetchStaffs({ token, active: true, page: 1, limit: 100 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, staffs.data.length]);

    // Số lượng thu ngân
    const { cashiers } = useSelector((state) => state.user);
    useEffect(() => {
        if (token) {
            dispatch(userActions.fetchCashiers({ token, active: true, page: 1, limit: 100 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, cashiers.data.length]);

    // Số lượng quản lý
    const { supervisors } = useSelector((state) => state.user);
    useEffect(() => {
        if (token) {
            dispatch(userActions.fetchSupervisors({ token, active: true, page: 1, limit: 100 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, supervisors.data.length]);

    // Tổng danh thu từ đơn hàng
    const { orders } = useSelector((state) => state.order);
    useEffect(() => {
        if (token) {
            dispatch(orderActions.fetchOrders({ token, active: true, page: 1, limit: 100 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, orders.data.length]);
    const totalCompletedOrders = useSelector(totalCompletedOrdersAmount);

    // Tổng danh thu từ đơn bảo dưỡng
    const { invoices } = useSelector((state) => state.invoice);
    useEffect(() => {
        if (token) {
            dispatch(invoiceActions.fetchInvoices({ token, active: true, page: 1, limit: 100 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, invoices.data.length]);
    const totalCompletedInvoices = useSelector(totalPaidInvoicesAmount);

    // Số đơn bảo dưỡng chưa hoàn thành

    // Số đơn bảo dưỡng đã hoàn thành

    // Số đơn bảo dưỡng đã hủy

    return (
        <div className='flex flex-col w-full gap-5 pr-5'>
            <div className='flex items-center justify-between my-10'>
                <h1 className='text-4xl font-bold'>Thống kê</h1>
            </div>
            <div className='flex justify-around gap-5 p-5 bg-white shadow-sm rounded-xl h-fit'>
                <div className='px-20 py-10 text-2xl font-bold flex flex-col items-center justify-center text-white bg-[#46dfb1] rounded-xl'>
                    <p>Khách hàng</p>
                    <p className='flex items-center gap-2'>
                        <span>
                            <UserOutlined />
                        </span>
                        <span> {customers.data.length}</span>
                    </p>
                </div>
                <div className='px-20 py-10 text-2xl font-bold flex flex-col items-center justify-center text-white bg-[#09d1c7] rounded-xl'>
                    <p>Kỹ thuật viên</p>
                    <p className='flex items-center gap-2'>
                        <span>
                            <UserOutlined />
                        </span>
                        <span>{techs.data.length}</span>
                    </p>
                </div>
                <div className='px-20 py-10 text-2xl font-bold flex flex-col items-center justify-center text-white bg-[#15919b] rounded-xl'>
                    <p>Nhân viên</p>
                    <p className='flex items-center gap-2'>
                        <span>
                            <UserOutlined />
                        </span>
                        <span>{staffs.data.length}</span>
                    </p>
                </div>
                <div className='px-20 py-10 text-2xl font-bold flex flex-col items-center justify-center text-white bg-[#0c6478] rounded-xl'>
                    <p>Thu ngân</p>
                    <p className='flex items-center gap-2'>
                        <span>
                            <UserOutlined />
                        </span>
                        <span>{cashiers.data.length}</span>
                    </p>
                </div>
                <div className='px-20 py-10 text-2xl font-bold flex flex-col items-center justify-center text-white bg-[#213a58] rounded-xl'>
                    <p>Quản trị viên</p>
                    <p className='flex items-center gap-2'>
                        <span>
                            <UserOutlined />
                        </span>
                        <span>{supervisors.data.length}</span>
                    </p>
                </div>
            </div>
            <div className='flex justify-around gap-5 p-5 bg-white shadow-sm rounded-xl h-fit'>
                <div className='px-20 py-10 text-2xl font-bold flex flex-col items-center justify-center text-white bg-[#98a77c] rounded-xl'>
                    <p>Tổng danh thu từ đơn bảo dưỡng</p>
                    <p className='flex items-center gap-2'>
                        <span>
                            <MoneyCollectOutlined />
                        </span>
                        <span>{formatVND(totalCompletedOrders)} VNĐ</span>
                    </p>
                </div>
                <div className='px-20 py-10 text-2xl font-bold flex flex-col items-center justify-center text-white bg-[#728156] rounded-xl'>
                    <p>Tổng danh thu từ đơn hàng</p>
                    <p className='flex items-center gap-2'>
                        <span>
                            <MoneyCollectOutlined />
                        </span>
                        <span>{formatVND(totalCompletedInvoices)} VNĐ</span>
                    </p>
                </div>
            </div>
            <div className='p-5 bg-white shadow-sm rounded-xl h-fit'>
                <p className='text-3xl font-bold'>Sơ đồ đơn bảo dưỡng</p>
                <PieChart />
            </div>
            {/* <div className='p-5 bg-white shadow-sm rounded-xl h-fit'>
                <MonthlyIncomChart orders={orders.data} />
            </div> */}
        </div>
    );
};

export default Dashboard;
