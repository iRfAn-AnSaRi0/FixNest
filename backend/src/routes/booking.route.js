import { Router } from "express";
import { authMiddleware, allowRoles } from "../middleware/auth.middleware.js";
import { createBooking, getUserBookings, cancelBooking, getBookingHistory } from "../controller/booking.controller.js"


const bookingRoute = Router();

bookingRoute.use(authMiddleware, allowRoles("user"))

bookingRoute.post("/", createBooking);

bookingRoute.get("/my-bookings", getUserBookings);

bookingRoute.patch("/:id/cancel", cancelBooking)

bookingRoute.get("/history", getBookingHistory)

export default bookingRoute;