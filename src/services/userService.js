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
