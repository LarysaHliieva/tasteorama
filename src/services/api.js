import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:5000", //сюди потрібно додати посилання на наш бекенд
  // withCredentials: true,
});

export default axiosAPI;
