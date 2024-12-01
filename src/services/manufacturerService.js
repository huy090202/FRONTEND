import axios from "~/axios";

export const changeManufacturerStatus = async (accessToken, id, active) => {
    return await axios.patch(`manufacturer/change-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const getAllManufacturers = async (accessToken, page, limit, active) => {
    return await axios.get(`manufacturer/get-all?active=${active}&page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const allManufacturersPublic = async () => {
    return await axios.get('manufacturer/all');
}

export const createManufacturer = async (accessToken, data) => {
    return await axios.post('manufacturer/create', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const updateManufacturer = async (accessToken, id, data) => {
    return await axios.put(`manufacturer/update/${id}`, data, {
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