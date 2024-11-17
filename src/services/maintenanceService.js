import axios from "~/axios";

export const changeMaintenanceStatus = async (accessToken, id, active) => {
    return await axios.patch(`maintenance/change-status/${id}`, { status: active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Hiển thị toàn bộ đơn bảo dưỡng của hệ thống
export const getAllMaintenances = async (accessToken, { page, limit }) => {
    return await axios.get(`maintenance/all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const createMaintenance = async (accessToken, { techId, appointId }) => {
    return await axios.post(`maintenance/create`, {
        user_id: techId,
        appointment_id: appointId,
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const deleteMaintenance = async (accessToken, id) => {
    return await axios.delete(`maintenance/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Hiển thị toàn bộ đơn bảo dưỡng có 1 kỹ thuật viên xác định
export const getMaintenancesByTech = async (accessToken) => {
    return await axios.get(`maintenance/get-all`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Cập nhật thông tin đơn bảo dưỡng
export const updateMaintenance = async (accessToken, id, data) => {
    return await axios.put(`maintenance/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Hiển thị lịch sử bảo dưỡng của người dùng
export const getMaintenancesByUser = async (accessToken, { userId }) => {
    return await axios.get(`maintenance/history/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}