import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout, ProfileLayout, AdminLayout } from '~/layouts';

import Motor from '~/pages/Motor/motor';
import Home from '~/pages/Home/home.jsx';
import Cashiers from '~/pages/Admin/Cashier/cashiers';
import HistoryAppointment from '~/pages/Appointment/HistoryAppointment/historyAppointment';
import CreateAppointment from '~/pages/Appointment/CreateAppointment/createAppointment';

import Login from '~/pages/Auth/Login/login.jsx';
import History from '~/pages/Auth/History/history';
import Profile from '~/pages/Auth/Profile/profile.jsx';
import Register from '~/pages/Auth/Register/register.jsx';
import ChangePassword from '~/pages/Auth/ChangePassword/changePassword';

import Parts from '~/pages/Admin/Part/parts';
import Staffs from '~/pages/Admin/Staff/staffs';
import Customers from '~/pages/Admin/Customer/customers';
import Dashboard from '~/pages/Admin/Dashboard/dashboard';
import Warehouses from '~/pages/Admin/Warehouse/warehouse';
import Categories from '~/pages/Admin/Category/categories';
import Technicians from '~/pages/Admin/Technician/technicians';
import Supervisors from '~/pages/Admin/Supervisor/supervisors';
import Appointment from '~/pages/Admin/Appointment/appointment';
import Maintenances from '~/pages/Admin/Maintenance/maintenances';
import Manufacturers from '~/pages/Admin/Manufacturer/manufacturers';

import Maintenance from '~/pages/Maintenance/maintenance';

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
                path: 'history',
                element: <History />
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
