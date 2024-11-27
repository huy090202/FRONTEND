import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getToken, setToken } from '~/utils/token';

const initialState = {
    carts: getToken('carts') || []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { part } = action.payload;
            const existingPartIndex = state.carts.findIndex((cart) => cart.id === part.id);

            if (existingPartIndex !== -1) {
                state.carts[existingPartIndex].quantity += 1;
            } else {
                state.carts.push({ ...part, quantity: 1 });
            }

            toast.success('Thêm vào giỏ hàng thành công!');
            setToken('carts', state.carts);
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingPartIndex = state.carts.findIndex((cart) => cart.id === id);

            if (existingPartIndex !== -1) {
                state.carts[existingPartIndex].quantity = quantity;
            }

            setToken('carts', state.carts);
        },
        removeFromCart(state, action) {
            const { id } = action.payload;
            state.carts = state.carts.filter((cart) => cart.id !== id);
            setToken('carts', state.carts);
        },
        clearCart(state) {
            state.carts = [];
            setToken('carts', state.carts);
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;