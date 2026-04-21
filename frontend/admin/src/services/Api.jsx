import axios from 'axios';

const baseApi = axios.create({
    // baseURL: "http://localhost:8080/api/admin",
    baseURL: "https://fixnest-6t18.onrender.com/api/admin",
    withCredentials: true
})

export default baseApi