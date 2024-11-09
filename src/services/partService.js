import axios from "~/axios";

// Cập nhật trạng thái linh kiện
export const changePartStatus = async (accessToken, id, { active }) => {
    return await axios.patch(`part/change-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Lấy danh sách linh kiện - Admin
export const getAllParts = async (accessToken, { page, limit }) => {
    return await axios.get(`part/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

// Lấy danh sách linh kiện - Public
export const allPartsPublic = async () => {
    return await axios.get('part/get');
}

// Tạo mới linh kiện
export const createPart = async (accessToken, formData) => {
    return await axios.post('part/create', formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}

// Cập nhật thông tin linh kiện theo id
export const updatePart = async (accessToken, id, formData) => {
    return await axios.put(`part/update/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}

// Xóa linh kiện theo id
export const deletePart = async (accessToken, id) => {
    return await axios.delete(`part/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}