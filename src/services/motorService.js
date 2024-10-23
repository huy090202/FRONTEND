import axios from "~/axios";

export const allMotors = async (accessToken) => {
    return await axios.get('/motor/all', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const getAllMotors = async (accessToken, { page, limit }) => {
    return await axios.get(`/motor/all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllImages = async (accessToken, { motorId }) => {
    return await axios.get(`/motor-image/all?motor_id=${motorId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const createMotor = async (accessToken, { motorName, motorType, motorPlate, motorEngine, motorChassis, motorModel, createdAt, motorColor }) => {
    return await axios.post('/motor/create', {
        motor_name: motorName,
        motor_type: motorType,
        license_plate: motorPlate,
        engine_number: motorEngine,
        chassis_number: motorChassis,
        motor_model: motorModel,
        created_at: createdAt,
        motor_color: motorColor
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const updateMotor = async (accessToken, data) => {
    return await axios.put(`/motor/update/${data.motorId}`,
        data
        , {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
};

export const deleteMotor = async (accessToken, motorId) => {
    return await axios.delete(`/motor/delete/${motorId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export const createMotorImage = async (accessToken, formData) => {
    return await axios.post('/motor-image/create', formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateMotorImage = async (accessToken, { imageId }, formData) => {
    return await axios.put(`/motor-image/update/${imageId}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteMotorImage = async (accessToken, imageId) => {
    return await axios.delete(`/motor-image/delete/${imageId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}