import { Router } from "express";
import { adminLogin, adminLogout, adminApproveAndRejectApplication, adminBlockUserOrTechnician } from "../controller/admin.controller.js";
import { authMiddleware, allowRoles } from "../../middleware/auth.middleware.js";
import { adminLoginLimiter } from "../../admin/middleware/adminRateLimit.middleware.js"


const adminRouter = Router();

// Admin Login
adminRouter.post("/login", adminLoginLimiter, adminLogin);

// Protected Admin APIs
adminRouter.use(authMiddleware, allowRoles("admin"));

adminRouter.post("/logout", adminLogout)

adminRouter.patch("/technicians/:technicianId/status", adminApproveAndRejectApplication)

adminRouter.patch("/users/:userId/block", adminBlockUserOrTechnician)


export default adminRouter;