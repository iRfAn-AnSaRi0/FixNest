import axios from "axios"

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
//    baseURL: import.meta.env.VITE_TRIAL_URI,
    withCredentials:true
})

baseApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})


export default baseApi;