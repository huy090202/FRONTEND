import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
    withCredentials: true,
});

instance.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
});

export default instance;
