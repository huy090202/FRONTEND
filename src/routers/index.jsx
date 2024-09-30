import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout, ProfileLayout, AdminLayout } from '~/layouts';

import Home from '~/pages/Home/home.jsx';

import Login from '~/pages/Auth/Login/login.jsx';
import Register from '~/pages/Auth/Register/register.jsx';
import Profile from '~/pages/Auth/Profile/profile.jsx';
import ChangePassword from '~/pages/Auth/ChangePassword/changePassword';
import History from '~/pages/Auth/History/history';

import Dashboard from '~/pages/Admin/Dashboard/dashboard';
import Parts from '~/pages/Admin/Part/parts';
import Categories from '~/pages/Admin/Category/categories';
import Manufacturers from '~/pages/Admin/Manufacturer/manufacturers';
import Warehouses from '~/pages/Admin/Warehouse/warehouse';
import Maintenances from '~/pages/Admin/Maintenance/maintenances';
import Customers from '~/pages/Admin/Customer/customers';
import Staffs from '~/pages/Admin/Staff/staffs';
import Technicians from '~/pages/Admin/Technician/technicians';
import Supervisors from '~/pages/Admin/Supervisor/supervisors';

import ProtectedRoute from '~/routers/protectedRoute.jsx';
import Cashiers from '~/pages/Admin/Cashier/cashiers';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />
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
            }
        ]
    },
    {
        path: '/',
        element: (
            <ProtectedRoute roleRequired={['ADMIN', 'STAFF', 'TECH', 'CASHIER']}>
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
