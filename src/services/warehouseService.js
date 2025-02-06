import axios from "~/axios";

export const changeWarehouseStatus = async (accessToken, id, active) => {
    return await axios.patch(`warehouse/change-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const getAllWarehouses = async (accessToken, page, limit, active) => {
    return await axios.get(`warehouse/get-all?active=${active}&page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const allWarehousesPublic = async () => {
    return await axios.get('warehouse/get');
}

export const createWarehouse = async (accessToken, data) => {
    return await axios.post('warehouse/create', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const updateWarehouse = async (accessToken, id, data) => {
    return await axios.put(`warehouse/update/${id}`, data, {
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