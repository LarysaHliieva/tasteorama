import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://", //сюди потрібно додати посилання на наш бекенд
  withCredentials: true,
});

export default axiosAPI;
