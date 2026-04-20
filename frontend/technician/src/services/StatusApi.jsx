import baseApi from "./Api";

const updateStatus = (bookingId , data) => {
    return baseApi.patch(`/technician/${bookingId}/status`, data)
}

export { updateStatus }