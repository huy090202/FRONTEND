import axios from "~/axios";

export const changeMaintenanceStatus = async (accessToken, id, { active }) => {
    return await axios.patch(`maintenance/change-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const getAllMaintenances = async (accessToken, { page, limit }) => {
    return await axios.get(`maintenance/all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}