import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
});

instance.interceptors.response.use((response) => {
    const { data } = response;
    return data;
});

export default instance;
