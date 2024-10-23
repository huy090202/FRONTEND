import axios from "~/axios";

export const changeWarehouseStatus = async (accessToken, id, { active }) => {
    return await axios.patch(`warehouse/change-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const getAllWarehouses = async (accessToken, { page, limit }) => {
    return await axios.get(`warehouse/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const allWarehousesPublic = async () => {
    return await axios.get('warehouse/get');
}

export const createWarehouse = async (accessToken, { name, address }) => {
    return await axios.post('warehouse/create', { name, address }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const updateWarehouse = async (accessToken, id, { name, address }) => {
    return await axios.put(`warehouse/update/${id}`, { name, address }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const deleteWarehouse = async (accessToken, id) => {
    return await axios.delete(`warehouse/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}