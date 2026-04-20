import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { globalRateLimiter } from './middleware/rateLimit.middleware.js';
import { updateUserActivity } from "./middleware/active.middleware.js"
import userRouter from './routes/user.route.js';
import adminRouter from './admin/routes/admin.route.js';
import categoryRoute from './routes/category.route.js'
import serviceRoute from './routes/service.route.js'
import technicianRoute from "./routes/technician.route.js"
import bookingRoute from './routes/booking.route.js';
import { errorHandler } from "./middleware/error.handler.js"

const app = express();


const allowedOrigins = process.env.CORS_ORIGIN.split(",").map(origin => origin.trim());

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like Postman or server-to-server)
            if (!origin) return callback(null, true);

            // allow only if origin is in allowed list
            if (allowedOrigins.includes(origin)) {
                callback(null, origin); // send ONLY the requesting origin
            } else {
                callback(new Error("CORS not allowed"));
            }
        },
        credentials: true, // allow cookies/auth headers
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // explicitly allowed methods
        allowedHeaders: ["Content-Type", "Authorization"], // headers allowed from frontend
        optionsSuccessStatus: 200, // for legacy browsers
    })
);

app.use(express.json());
app.use(express.urlencoded({ limit: '24kb', extended: true }));
app.use(cookieparser());

app.use(globalRateLimiter);
app.use(updateUserActivity);
app.use("/api/v1/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/technician", technicianRoute);
app.use(errorHandler);

export { app }