import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout, ProfileLayout, AdminLayout } from '~/layouts';

import Motor from '~/pages/Motor/motor';
import Home from '~/pages/Home/home.jsx';
import AboutUs from '~/pages/AboutUs/aboutUs';
import Menu from '~/pages/Menu/menu';
import Cart from '~/pages/Carts/cart';
import Payment from '~/pages/Carts/payment';
import HistoryAppointment from '~/pages/Appointment/HistoryAppointment/historyAppointment';
import CreateAppointment from '~/pages/Appointment/CreateAppointment/createAppointment';
import OrderHistory from '~/pages/OrderHistory/orderHistory';

import Login from '~/pages/Auth/Login/login.jsx';
import HistoryMaintenance from '~/pages/Auth/HistoryMaintenance/historyMaintenance';
import Profile from '~/pages/Auth/Profile/profile.jsx';
import Register from '~/pages/Auth/Register/register.jsx';
import ChangePassword from '~/pages/Auth/ChangePassword/changePassword';

import Parts from '~/pages/Admin/Part/parts';
import Staffs from '~/pages/Admin/Staff/staffs';
import Cashiers from '~/pages/Admin/Cashier/cashiers';
import Customers from '~/pages/Admin/Customer/customers';
import Dashboard from '~/pages/Admin/Dashboard/dashboard';
import Warehouses from '~/pages/Admin/Warehouse/warehouse';
import Categories from '~/pages/Admin/Category/categories';
import Technicians from '~/pages/Admin/Technician/technicians';
import Supervisors from '~/pages/Admin/Supervisor/supervisors';
import Appointment from '~/pages/Admin/Appointment/appointment';
import Maintenances from '~/pages/Admin/Maintenance/maintenances';
import Manufacturers from '~/pages/Admin/Manufacturer/manufacturers';
import Order from '~/pages/Admin/Order/order';
import Invoice from '~/pages/Admin/Invoice/invoice';

import Maintenance from '~/pages/Maintenance/maintenance';
import MaintenanceHistory from '~/pages/Maintenance/MaintenanceHistory/maintenanceHistory';
import MaintenanceInvoice from '~/pages/Maintenance/MaintenanceInvoice/maintenanceInvoice';
import PrintVoice from '~/pages/Maintenance/PrintVoice/printVoice';

import ProtectedRoute from '~/routers/protectedRoute.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about-us',
                element: <AboutUs />
            },
            {
                path: '/menu',
                element: <Menu />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/payment',
                element: <Payment />
            },
            {
                path: 'create-appointment',
                element: <CreateAppointment />
            },
            {
                path: 'maintenance-list',
                element: (
                    <ProtectedRoute roleRequired={['Kỹ thuật viên']}>
                        <Maintenance />
                    </ProtectedRoute>
                )
            },
            {
                path: 'maintenance-history/:maintenanceId',
                element: (
                    <ProtectedRoute roleRequired={['Kỹ thuật viên']}>
                        <MaintenanceHistory />
                    </ProtectedRoute>
                )
            },
            {
                path: 'maintenance-invoice/:maintenanceId',
                element: (
                    <ProtectedRoute roleRequired={['Kỹ thuật viên']}>
                        <MaintenanceInvoice />
                    </ProtectedRoute>
                )
            },
            {
                path: 'maintenance-print-invoice/:maintenanceId',
                element: (
                    <ProtectedRoute roleRequired={['Kỹ thuật viên']}>
                        <PrintVoice />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <ProfileLayout />,
        children: [
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'change-password',
                element: <ChangePassword />
            },
            {
                path: 'order-history',
                element: <OrderHistory />
            },
            {
                path: 'history',
                element: <HistoryMaintenance />
            },
            {
                path: 'motor',
                element: <Motor />
            },
            {
                path: 'history-appointment',
                element: <HistoryAppointment />
            }
        ]
    },
    {
        path: '/',
        element: (
            <ProtectedRoute roleRequired={['Quản trị viên', 'Nhân viên', 'Thu ngân']}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'part',
                element: <Parts />
            },
            {
                path: 'category',
                element: <Categories />
            },
            {
                path: 'manufacturer',
                element: <Manufacturers />
            },
            {
                path: 'warehouse',
                element: <Warehouses />
            },
            {
                path: 'invoice',
                element: <Invoice />
            },
            {
                path: 'order',
                element: <Order />
            },
            {
                path: 'appointment',
                element: <Appointment />
            },
            {
                path: 'maintenance',
                element: <Maintenances />
            },
            {
                path: 'customer',
                element: <Customers />
            },
            {
                path: 'staff',
                element: <Staffs />
            },
            {
                path: 'technician',
                element: <Technicians />
            },
            {
                path: 'cashier',
                element: <Cashiers />
            },
            {
                path: 'supervisor',
                element: <Supervisors />
            },
            {
                path: 'admin-profile',
                element: <Profile />
            },
            {
                path: 'admin-change-password',
                element: <ChangePassword />
            }
        ]
    }
]);
