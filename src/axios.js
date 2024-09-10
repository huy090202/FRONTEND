import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001/api/v1/",
    withCredentials: true,
});

instance.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
});

export default instance;
