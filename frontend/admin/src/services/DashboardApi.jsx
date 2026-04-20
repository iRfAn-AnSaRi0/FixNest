import baseApi from "./Api"


const OverviewApi = () => {
    return baseApi.get("/dashboard")
}

const Bookings = () =>{
    return baseApi.get("/booking")
}

const History = () =>{
    return baseApi.get("/history")
}

const UpdateBookingStatus = (bookingId, status) =>{
    return baseApi.patch(`/booking/${bookingId}/status`, status)
}

const User = () =>{
    return baseApi.get("/user")
}

const Technician = () =>{
    return baseApi.get("/technician")
}

export { OverviewApi, Bookings, History, User, Technician, UpdateBookingStatus }