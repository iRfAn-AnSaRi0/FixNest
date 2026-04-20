import { Router } from "express";
import { getTechnicianBookings, getTechnicianIncomeHistory, updateBookingStatus } from "../controller/technician.controller.js"
import { authMiddleware, allowRoles, requireApprovedTechnician, checkBlockedUser } from "../middleware/auth.middleware.js";
import { getProfile, updateProfile } from "../controller/user.controller.js";

const technicianRoute = Router();

technicianRoute.use(authMiddleware, allowRoles("technician"));

technicianRoute.get("/", getTechnicianBookings);

technicianRoute.patch("/:bookingId/status", updateBookingStatus)


// ---------------------- TECHNICIAN PROFILE ROUTES ----------------------
technicianRoute.get("/me", getProfile);

technicianRoute.use(authMiddleware, allowRoles("technician"), checkBlockedUser, requireApprovedTechnician);

technicianRoute.patch("/update-profile", updateProfile);

technicianRoute.get("/history", getTechnicianIncomeHistory)

export default technicianRoute;