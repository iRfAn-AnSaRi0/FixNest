import axios from 'axios';

const baseApi = axios.create({
    // baseURL: import.meta.env.VITE_TRIAL_URI,
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export default baseApi