import axios from "~/axios";

export const changeManufacturerStatus = async (accessToken, id, { active }) => {
    return await axios.patch(`manufacturer/change-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const getAllManufacturers = async (accessToken, { page, limit }) => {
    return await axios.get(`manufacturer/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const allManufacturersPublic = async () => {
    return await axios.get('manufacturer/all');
}

export const createManufacturer = async (accessToken, { name, country }) => {
    return await axios.post('manufacturer/create', { name, country }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const updateManufacturer = async (accessToken, id, { name, country }) => {
    return await axios.put(`manufacturer/update/${id}`, { name, country }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const deleteManufacturer = async (accessToken, id) => {
    return await axios.delete(`manufacturer/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}