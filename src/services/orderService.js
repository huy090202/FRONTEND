import axios from "~/axios";

// Tạo mới đơn hàng
export const createOrder = async (accessToken, data) => {
    return await axios.post('order/create', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Lấy danh sách đơn hàng - Admin
export const allOrders = async (accessToken, page, limit) => {
    return await axios.get(`order/all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (accessToken, id, status) => {
    return await axios.patch(`order/${id}/order-status?status=${status}`, null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Cập nhật trạng thái thanh toán
export const updatePaymentStatus = async (accessToken, orderCode, status) => {
    return await axios.patch(`order/${orderCode}/payment-status?status=${status}`, null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Xóa đơn hàng
export const deleteOrder = async (accessToken, code) => {
    return await axios.delete(`order/delete/${code}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Kiểm tra trạng thái đơn hàng
export const checkOrderStatus = async (accessToken, app_trans_id) => {
    return await axios.get(`order/check/${app_trans_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Lấy danh sách đơn hàng - User
export const allOrdersByUser = async (accessToken, page, limit) => {
    return await axios.get(`order/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}