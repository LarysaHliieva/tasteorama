import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:5000", //сюди потрібно додати посилання на наш бекенд
  withCredentials: true,
});

export const createRecipe = async (recipe) => {
  const formData = new FormData();
  Object.keys(recipe).forEach((key) => {
    if (key === "ingredients") {
      formData.append(key, JSON.stringify(recipe[key]));
    } else {
      formData.append(key, recipe[key]);
    }
  });

  const { data } = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

axiosAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export const AuthAPI = {
    register: (data) => axiosAPI.post("/auth/register", data),
    login: (data) => axiosAPI.post("/auth/login", data),
    refresh: (token) => axiosAPI.post("/auth/refresh", { refreshToken: token }),
    logout:() => axiosAPI.post("/auth/logout")
}

export default axiosAPI;
