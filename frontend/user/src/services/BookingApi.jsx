import baseApi from "./Api";

const book = (data) => {
    return baseApi.post("/booking/", data)
}

const getCurrentBooking = () =>{
    return baseApi.get("/booking/my-bookings")
}

const getHistory = () =>{
    return baseApi.get("/booking/history")
}

const cancelBooking = (id) =>{
    return baseApi.patch(`/booking/${id}/cancel`)
}

export { book, getCurrentBooking, getHistory, cancelBooking }