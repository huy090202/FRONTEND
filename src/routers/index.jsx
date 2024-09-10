import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout, ProfileLayout, AdminLayout } from '~/layouts';
import Home from '~/pages/Home/home.jsx';

import Login from '~/pages/Auth/Login/login.jsx';
import Register from '~/pages/Auth/Register/register.jsx';
import Profile from '~/pages/Auth/Profile/profile.jsx';
import ChangePassword from '~/pages/Auth/ChangePassword/changePassword';
import History from '~/pages/Auth/History/history';

import Dashboard from '~/pages/Admin/Dashboard/dashboard';
import Products from '~/pages/Admin/Product/products';
import Categories from '~/pages/Admin/Category/categories';
import Warehouses from '~/pages/Admin/Warehouse/warehouse';
import Maintenances from '~/pages/Admin/Maintenance/maintenances';
import Users from '~/pages/Admin/User/users';
import Staffs from '~/pages/Admin/Staff/staffs';
import Supervisors from '~/pages/Admin/Supervisor/supervisors';

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
        element: <AdminLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'product',
                element: <Products />
            },
            {
                path: 'category',
                element: <Categories />
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
                path: 'user',
                element: <Users />
            },
            {
                path: 'staff',
                element: <Staffs />
            },
            {
                path: 'supervisor',
                element: <Supervisors />
            }
        ]
    }
]);
