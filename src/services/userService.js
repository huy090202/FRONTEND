import axios from "~/axios";

export const register = async ({ firstName, lastName, email, phoneNumber, password }) => {
    return await axios.post(`user/create`, { firstName, lastName, email, phoneNumber, password });
};

export const login = async ({ email, password }) => {
    return await axios.post('user/login', { email, password });
};

export const getUser = async (accessToken) => {
    return await axios.get("user/profile", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// Lấy thông tin người dùng theo id
export const getUserById = async (accessToken, id) => {
    return await axios.get(`user/get/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const updateUser = async (accessToken, data) => {
    return await axios.put('user/update', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const changePassword = async (accessToken, data) => {
    return await axios.patch('user/change-password', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const changeUserStatus = async (accessToken, id, { active }) => {
    return await axios.patch(`user/update-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllUsers = async (accessToken, { page, limit }) => {
    return await axios.get(`user/all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllStaffs = async (accessToken, { page, limit }) => {
    return await axios.get(`user/all-staff?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllTechs = async (accessToken, { page, limit }) => {
    return await axios.get(`user/all-tech?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllCashiers = async (accessToken, { page, limit }) => {
    return await axios.get(`user/all-cashier?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllAdmins = async (accessToken, { page, limit }) => {
    return await axios.get(`user/all-admin?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const createStaff = async (accessToken, { firstName, lastName, email, phoneNumber, password, role }) => {
    return await axios.post(`user/create-staff`, { firstName, lastName, email, phoneNumber, password, role }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// Tạo tài khoản tự động cho người dùng vãng lai
export const createGuest = async ({ firstName, lastName, email, phone }) => {
    return await axios.post('user/guest', { firstName, lastName, email, phoneNumber: phone });
}