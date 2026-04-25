import axios from "axios"

const baseApi = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    //   baseURL: import.meta.env.VITE_TRIAL_URI,
    withCredentials: true
})

baseApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// baseApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/"; // or login
//     }
//     return Promise.reject(error);
//   }
// );


export default baseApi;