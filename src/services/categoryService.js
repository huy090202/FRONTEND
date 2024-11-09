import axios from "~/axios";

export const changeCategoryStatus = async (accessToken, id, { active }) => {
    return await axios.patch(`category/change-status/${id}`, { active }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllCategories = async (accessToken, { page, limit }) => {
    return await axios.get(`category/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const allCategoriesPublic = async () => {
    return await axios.get('category/get');
}

export const createCategory = async (accessToken, { name, description }) => {
    return await axios.post('category/create', { name, description }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const updateCategory = async (accessToken, id, { name, description }) => {
    return await axios.put(`category/update/${id}`, { name, description }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const deleteCategory = async (accessToken, id) => {
    return await axios.delete(`category/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}