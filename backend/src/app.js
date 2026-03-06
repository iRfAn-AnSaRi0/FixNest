import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { globalRateLimiter } from './middleware/rateLimit.middleware.js';
import userRouter from './routes/user.route.js';
import adminRouter from './admin/routes/admin.route.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ limit: '24kb', extended: true }));
app.use(cookieparser());

app.use(globalRateLimiter);
app.use("/api/v1/users", userRouter);
app.use("/api/admin", adminRouter)

export { app }