import axios from "~/axios";

// Tạo mới đơn hàng
export const createOrder = async (accessToken, data) => {
    console.log(data);
    return await axios.post('order/create', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}