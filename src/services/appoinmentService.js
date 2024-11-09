import axios from "~/axios";

// Lấy danh sách lịch hẹn - Public
export const getAllAppoinmentsUser = async (accessToken, { page, limit }) => {
    return await axios.get(`/appointment/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// Lấy danh sách lịch hẹn - Admin
export const getAllAppoinmentsAdmin = async (accessToken, { page, limit }) => {
    return await axios.get(`/appointment/all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// Tạo lịch hẹn
export const createAppoinment = async (accessToken, { appointmentDate, appointmentTime, notes, motorId }) => {
    return await axios.post('/appointment/create', {
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        content: notes,
        motor_id: motorId
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// Cập nhật lịch hẹn
export const updateAppoinment = async (accessToken, data) => {
    return await axios.put(`/appointment/update/${data.appointmentId}`,
        data
        , {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
};

// Cập nhật trạng thái lịch hẹn
export const updateAppoinmentStatus = async (accessToken, appointmentId, status) => {
    return await axios.patch(`/appointment/change-status/${appointmentId}`, {
        status
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// Tạo ảnh cho lịch hẹn
export const createAppoinmentImage = async (accessToken, formData) => {
    return await axios.post('/appointment-image/create', formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Lấy danh sách ảnh của lịch hẹn
export const getAllImages = async (accessToken, { appointmentId }) => {
    return await axios.get(`/appointment-image/all?appointment_id=${appointmentId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Cập nhật ảnh cho lịch hẹn
export const updateAppoinmentImage = async (accessToken, { imageId }, formData) => {
    return await axios.put(`/appointment-image/update/${imageId}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Xóa ảnh của lịch hẹn
export const deleteAppointmentImage = async (accessToken, imageId) => {
    return await axios.delete(`/appointment-image/delete/${imageId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}