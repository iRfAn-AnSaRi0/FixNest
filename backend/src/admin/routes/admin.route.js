import { Router } from "express";
import { adminLogin, adminProfile, getTotalUser, updateBookingStatus, getTotalTechnician, adminLogout, getCompletedBookings, getAdminDashboard, getUserTechnicianStats, getLiveBookings, adminApproveAndRejectApplication, adminBlockUserOrTechnician, assignTechnician } from "../controller/admin.controller.js";
import { authMiddleware, allowRoles } from "../../middleware/auth.middleware.js";
import { adminLoginLimiter } from "../middleware/adminRateLimit.middleware.js"


const adminRouter = Router();

// Admin Login
adminRouter.post("/login", adminLoginLimiter, adminLogin);

// Protected Admin APIs
adminRouter.use(authMiddleware, allowRoles("admin"));

adminRouter.get("/me", adminProfile)

adminRouter.post("/logout", adminLogout)

adminRouter.patch("/technicians/:technicianId/status", adminApproveAndRejectApplication)

adminRouter.patch("/users/:userId/block", adminBlockUserOrTechnician)

adminRouter.patch("/booking/:bookingId/assign-technician", assignTechnician)

adminRouter.get("/booking", getLiveBookings);

adminRouter.get("/history", getCompletedBookings)

adminRouter.get("/dashboard", getAdminDashboard);

adminRouter.get("/user-stats" , getUserTechnicianStats)

adminRouter.get("/user", getTotalUser)

adminRouter.get("/technician", getTotalTechnician)

adminRouter.patch("/booking/:bookingId/status", updateBookingStatus)


export default adminRouter;