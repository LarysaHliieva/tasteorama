//   export const getImageUrl = (path) =>{
//     const BASE_BACKEND = 
//     import.meta.env.MODE === "development"
//     ? "http://localhost:5000"
//     : "https://group2-b.onrender.com";

//     if( !path || typeof path !== "string" )return null;

//     const imageUrl = path.startsWith("http") ? path : `${BASE_BACKEND}${path.toLocaleLowerCase()}`
//   return imageUrl
// } ;