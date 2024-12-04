import axios from "~/axios";

// Tạo mới hóa đơn
export const createInvoice = async (accessToken, data) => {
    return await axios.post('invoice/create', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Lấy danh sách hóa đơn
export const allInvoices = async (accessToken, page, limit) => {
    return await axios.get(`invoice/all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Xóa hóa đơn
export const deleteInvoice = async (accessToken, code) => {
    return await axios.delete(`invoice/delete/${code}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Kiểm tra trạng thái thanh toán của hóa đơn
export const checkStatusPayment = async (accessToken, app_trans_id) => {
    return await axios.get(`invoice/check/${app_trans_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}