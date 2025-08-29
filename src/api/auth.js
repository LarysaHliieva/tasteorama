import axiosAPI from '../services/api.js'

export const AuthAPI = {
    register: (data) => axiosAPI.post("/auth/register", data),
    login: (data) => axiosAPI.post("/auth/login", data),
    refresh: (token) => axiosAPI.post("/auth/refresh", { refreshToken: token }),
    logout:() => axiosAPI.post("/auth/logout")
}