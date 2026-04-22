import axios from "axios"

const baseApi = axios.create({
    // baseURL:"http://localhost:8080/api/v1",
    // baseURL: import.meta.env.VITE_API_URL,
     baseURL: import.meta.env.VITE_TRIAL_URI,
    withCredentials:true
})

export default baseApi;