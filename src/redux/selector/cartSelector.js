import { createSelector } from '@reduxjs/toolkit';

const cartsSelector = (state) => state.cart.carts;

// Đếm số lượng sản phẩm trong giỏ hàng
export const countCartItems = createSelector(cartsSelector, (carts) => carts.reduce((count, cart) => count + cart.quantity, 0));

// Tính tổng tiền của giỏ hàng
export const totalCartPrice = createSelector(cartsSelector, (carts) =>
    carts.reduce((total, cart) => total + cart.quantity * cart.part_price, 0)
);

// Tính tổng tiền của giỏ hàng sau khi giảm giá
export const totalCartPriceAfterDiscount = createSelector(cartsSelector, (carts) =>
    carts.reduce((total, cart) => total + cart.quantity * cart.part_price * (1 - cart.sale / 100), 0)
);