import axios from "axios"
import { toast } from "react-hot-toast"

const baseApi = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  withCredentials: true
})

export default baseApi;