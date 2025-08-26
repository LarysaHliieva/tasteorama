import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://", //сюди потрібно додати посилання на наш бекенд
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

export default axiosAPI;
