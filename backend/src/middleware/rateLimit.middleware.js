import rateLimit from "express-rate-limit";

const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

const otpRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3,
    message: "Too many OTP requests. Please wait a minute."
});

export { globalRateLimiter, otpRateLimiter };