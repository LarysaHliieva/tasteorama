import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://group2-b.onrender.com/", //сюди потрібно додати посилання на наш бекенд
  withCredentials: true,
});

axiosAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const AuthAPI = {
    register: (data) => axiosAPI.post("/auth/register", data),
    login: (data) => axiosAPI.post("/auth/login", data),
    refresh: (token) => axiosAPI.post("/auth/refresh", { refreshToken: token }),
    logout:() => axiosAPI.post("/auth/logout")
}

export default axiosAPI;
