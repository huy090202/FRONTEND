import axios from "~/axios";

export const changePartStatus = async (accessToken, id, { active }) => {
    return await axios.patch(`part/change-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const getAllParts = async (accessToken, { page, limit }) => {
    return await axios.get(`part/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const allPartsPublic = async () => {
    return await axios.get('part/get');
}

export const createPart = async (accessToken, formData) => {
    return await axios.post('part/create', formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const updatePart = async (accessToken, id, formData) => {
    return await axios.put(`part/update/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const deletePart = async (accessToken, id) => {
    return await axios.delete(`part/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}