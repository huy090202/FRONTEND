import axios from "~/axios";

export const changeMaintenanceStatus = async (accessToken, id, active) => {
    return await axios.patch(`maintenance/change-status/${id}`, { status: active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Hiển thị toàn bộ đơn bảo dưỡng của hệ thống
export const getAllMaintenances = async (accessToken, page, limit) => {
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

// Lấy thông tin đơn bảo dưỡng theo id
export const getMaintenanceById = async (accessToken, id) => {
    return await axios.get(`maintenance/get/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Cập nhật thông tin đơn bảo dưỡng
export const updateMaintenance = async (accessToken, id, data) => {
    console.log(data);
    return await axios.put(`maintenance/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Hiển thị lịch sử bảo dưỡng của người dùng
export const getMaintenancesByUser = async (accessToken, { id }, page, limit) => {
    return await axios.get(`maintenance/history/${id}?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Lịch sử bảo dưỡng của người dùng trong profile
export const getMaintenancesByUserInProfile = async (accessToken, page, limit) => {
    return await axios.get(`maintenance/me?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Thêm chi tiết bảo dưỡng
export const createMaintenanceDetail = async (accessToken, { data }) => {
    return await axios.post(`maintenance-detail/create`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Xóa chi tiết bảo dưỡng
export const deleteMaintenanceDetail = async (accessToken, id) => {
    return await axios.delete(`maintenance-detail/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Cập nhật chi tiết bảo dưỡng
export const updateMaintenanceDetail = async (accessToken, id, data) => {
    return await axios.put(`maintenance-detail/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Lấy chi tiết bảo dưỡng theo id
export const getMaintenanceDetailById = async (accessToken, id) => {
    return await axios.get(`maintenance-detail/get/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}