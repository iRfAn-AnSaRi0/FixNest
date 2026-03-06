import rateLimit from "express-rate-limit";

const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

export { adminLoginLimiter }