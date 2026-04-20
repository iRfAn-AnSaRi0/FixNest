import baseApi from "./Api";

const getService = () => {
    return baseApi.get("/services")
}

const getServiceByCategory = (id) =>{
    return baseApi.get(`/services/${id}`)
}

export { getService, getServiceByCategory }