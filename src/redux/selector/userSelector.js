import { createSelector } from '@reduxjs/toolkit';

export const createFilteredSelector = (selector) =>
    createSelector(
        [selector, (_, searchQuery) => searchQuery, (_, __, activeFilter) => activeFilter],
        (items, searchQuery, activeFilter) => {
            let filteredItems = items;

            if (searchQuery) {
                const lowerQuery = searchQuery.toLowerCase();
                filteredItems = filteredItems.filter((item) =>
                    item.firstName.toLowerCase().includes(lowerQuery) ||
                    item.lastName.toLowerCase().includes(lowerQuery) ||
                    item.email.toLowerCase().includes(lowerQuery) ||
                    item.phoneNumber.includes(searchQuery)
                );
            }

            if (activeFilter !== 'all') {
                filteredItems = filteredItems.filter(
                    (item) => item.active.toString() === activeFilter
                );
            }

            return filteredItems;
        }
    );


// Tìm kiếm và lọc dữ liệu khách hàng
export const filteredCustomersSelector = createFilteredSelector((state) => state.user.customers.data);

// Tìm kiếm và lọc dữ liệu kỹ thuật viên
export const filteredTechniciansSelector = createFilteredSelector((state) => state.user.techs.data);

// Tìm kiếm và lọc dữ liệu nhân viên
export const filteredStaffsSelector = createFilteredSelector((state) => state.user.staffs.data);

// Tìm kiếm và lọc dữ liệu thu ngân
export const filteredCashiersSelector = createFilteredSelector((state) => state.user.cashiers.data);

// Tìm kiếm và lọc dữ liệu quản lý
export const filteredSupervisorsSelector = createFilteredSelector((state) => state.user.supervisors.data);