import { Router } from "express";
import { otpRateLimiter } from "../middleware/rateLimit.middleware.js";
import { authMiddleware, allowRoles, requireApprovedTechnician, checkBlockedUser } from "../middleware/auth.middleware.js";
import { registerUser, registerTechnician, verifyOtp, login, verifyLoginOtp, resendOtp, logout } from "../controller/auth.controller.js";
import { getProfile, updateProfile } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const userRouter = Router();

// ---------------------- AUTH ROUTES ----------------------

userRouter.post("/register-user", otpRateLimiter, checkBlockedUser, registerUser);

userRouter.post("/register-technician", otpRateLimiter, checkBlockedUser, upload.single("idProofImage"), registerTechnician);

userRouter.post("/verify-otp", verifyOtp);

userRouter.post("/login", otpRateLimiter, checkBlockedUser, login);

userRouter.post("/verify-login-otp", verifyLoginOtp);

userRouter.post("/resend-otp", otpRateLimiter, resendOtp);

userRouter.post("/logout", authMiddleware, logout);

// ---------------------- USER PROFILE ROUTES ----------------------

userRouter.use(authMiddleware, allowRoles("user", "technician"), checkBlockedUser);

userRouter.get("/me", getProfile);

userRouter.patch("/update-profile", updateProfile);

export default userRouter;