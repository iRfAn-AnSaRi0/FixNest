import axios from "axios"

const baseApi = axios.create({
    // baseURL:"http://localhost:8080/api/v1",
    baseURL:"https://fixnest-6t18.onrender.com/api/v1",
    withCredentials:true
})

export default baseApi;