export const setToken = (name, auth) => {
    localStorage.setItem(name, JSON.stringify(auth));
    // sessionStorage.setItem(name, JSON.stringify(auth));
};

export const getToken = (name) => {
    return JSON.parse(localStorage.getItem(name));
    // return JSON.parse(sessionStorage.getItem(name));
};

export const removeToken = (name) => {
    localStorage.removeItem(name);
    // sessionStorage.removeItem(name);
};

// export const setToken = (accessToken) => {
//     localStorage.setItem('access_token', accessToken);
// };

// export const getToken = () => {
//     return localStorage.getItem('access_token');
// };

// export const removeToken = () => {
//     localStorage.removeItem('access_token');
// };