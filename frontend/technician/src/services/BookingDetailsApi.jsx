import baseApi from "./Api";

const getAllBooking = () => {
    return baseApi.get("/technician/")
}

const getBookingHistory = () =>{
    return baseApi.get("/technician/history")
}

export { getAllBooking, getBookingHistory }