import axios from "axios"

const baseApi = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
    //  baseURL: import.meta.env.VITE_TRIAL_URI,
    withCredentials:true
})

export default baseApi;