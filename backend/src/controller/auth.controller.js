import { asyncHandler } from '../utils/async.handler.js';
import { ApiError } from '../utils/api.error.js';
import { ApiResponse } from '../utils/api.response.js';
import { redisClient } from '../config/redis.config.js'
import crypto from 'crypto';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { uploadFile } from '../config/cloudinary.config.js';
import { checkBlockedPhone } from '../utils/checkBlockedPhone.js';
import { sendOtpEmail } from "../utils/sendOtp.js";

const MAX_OTP_ATTEMPTS = 5;
const MAX_OTP_ATTEMPTS_RESEND = 3;
const OTP_BLOCK_TIME = 15 * 60;

const generateToken = (user) => {
    return jwt.sign({
        id: user._id.toString(),
        role: user.role,
        status: user.status,
    },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
            issuer: "fixnest",
        });
}

const registerUser = asyncHandler(async (req, res, _) => {
    const { name, email, phone } = req.body;

    // console.log(name, phone, email);


    if (!name || !phone || !email) {
        throw new ApiError(400, "Name, email, and phone are required");
    }

    await checkBlockedPhone(phone);

    const existingUser = await User.findOne({
        $or: [
            { email: email },
            { phone: phone }
        ]
    });
    if (existingUser) {
        throw new ApiError(400, "User with this phone & email number already exists");
    }

    const cooldown = await redisClient.get(`otp-cooldown:user:${email}`);
    if (cooldown) {
        throw new ApiError(429, "Please wait before requesting OTP again");
    }

    const type = "register";
    const attemptsKey = `otp-attempts:${type}:${email}`;
    const blockKey = `otp-block:${type}:${email}`;

    const isBlocked = await redisClient.get(blockKey);

    if (isBlocked) {
        throw new ApiError(429, "Too many OTP requests. Try again after 15 minutes.");
    }

    let attempts = await redisClient.get(attemptsKey);
    attempts = attempts ? parseInt(attempts) : 0;

    if (attempts > MAX_OTP_ATTEMPTS_RESEND) {
        await redisClient.set(blockKey, "1", { ex: OTP_BLOCK_TIME })
        await redisClient.del(attemptsKey);
        throw new ApiError(403, "Too many OTP requests. Try again after 15 minutes.");
    }

    await redisClient.set(attemptsKey, attempts + 1, { ex: OTP_BLOCK_TIME })

    const role = "user";

    // 📦 Store registration data in Redis
    const regData = {
        name,
        phone,
        email,
        role,
        isVerified: false,
        status: "active",
    };

    await redisClient.set(
        `register:${role}:${email}`,
        JSON.stringify(regData),
        { ex: 300 } // expires in 5 minutes
    );


    const otp = crypto.randomInt(100000, 1000000).toString();
    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    await redisClient.set(`otp:${role}:${email}`, hashedOtp, { ex: 300 });// OTP expires in 5 minutes

    // 🔒 STEP 2: Set Cooldown (60 seconds)
    await redisClient.set(`otp-cooldown:user:${email}`, "1", { ex: 60 });

    // console.log(`OTP for ${email}: ${hashedOtp} (original: ${otp})`); // In production, send this OTP via SMS

    await sendOtpEmail(email, otp);

    return res.status(201).json(
        new ApiResponse(201, { otp }, "OTP sent successfully")
    );

})

const registerTechnician = asyncHandler(async (req, res, _) => {
    const {
        name,
        phone,
        technicianType,
        experience,
        idProofType,
        idProofNumber,
        fullAddress,
        city,
        state,
        pincode, } = req.body;

    if (
        !name ||
        !phone ||
        !technicianType ||
        experience === undefined ||
        !idProofType ||
        !idProofNumber ||
        !fullAddress ||
        !city ||
        !state ||
        !pincode
    ) {
        throw new ApiError(400, "All technician details are required");
    }

    // ✅ Check file exists
    if (!req.file) {
        throw new ApiError(400, "ID proof image is required");
    }

    // ✅ Minimum file size check (10KB)
    if (req.file.size < 10 * 1024) {
        await fs.promises.unlink(req.file.path);
        throw new ApiError(400, "File size must be at least 10KB");
    }

    await checkBlockedPhone(phone);

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
        throw new ApiError(400, "Technician with this phone number already exists");
    }

    const cooldown = await redisClient.get(`otp-cooldown:technician:${phone}`);
    if (cooldown) {
        throw new ApiError(429, "Please wait before requesting OTP again");
    }

    // ✅ Upload after validations
    const uploadIdProof = await uploadFile(req.file.path, "fixnest/technician-documents");

    if (!uploadIdProof) {
        throw new ApiError(500, "Failed to upload ID proof image");
    }

    const role = "technician";

    // 📦 Store registration data in Redis
    const regData = {
        name,
        phone,
        role,
        isVerified: false,
        technicianType,
        experience,
        idProofType,
        idProofNumber,
        idProofImage: uploadIdProof.secure_url,
        idProofPublicId: uploadIdProof.public_id,
        fullAddress,
        city,
        state,
        pincode,
        status: "pending" // will be pending for admin approval
    };
    await redisClient.set(
        `register:${role}:${phone}`,
        JSON.stringify(regData),
        { ex: 900 } // expires in 15 minutes
    );


    const otp = crypto.randomInt(100000, 1000000).toString();
    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    await redisClient.set(`otp:${role}:${phone}`, hashedOtp, { ex: 300 });// OTP expires in 5 minutes

    // 🔒 STEP 2: Set Cooldown (60 seconds)
    await redisClient.set(`otp-cooldown:technician:${phone}`, "1", { ex: 60 });

    // console.log(`OTP for ${phone}: ${hashedOtp} (original: ${otp})`); // In production, send this OTP via SMS

    return res.status(201).json(
        new ApiResponse(201, {}, "OTP sent successfully")
    );

})

const verifyOtp = asyncHandler(async (req, res, _) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    let storedHashedOtp = await redisClient.get(`otp:user:${email}`);
    let role = "user";
    if (!storedHashedOtp) {
        storedHashedOtp = await redisClient.get(`otp:technician:${email}`);
        role = "technician";
    }

    if (!storedHashedOtp) {
        throw new ApiError(400, "OTP has expired or is invalid");
    }

    // Check if phone is blocked due to too many failed attempts
    const attempts = await redisClient.get(`otp-attempts:${role}:${email}`);
    if (attempts && Number(attempts) >= MAX_OTP_ATTEMPTS) {
        throw new ApiError(429, `Too many wrong OTP attempts. Try again after 15 minutes.`);
    }

    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    const isMatch =
        storedHashedOtp.length === hashedOtp.length &&
        crypto.timingSafeEqual(
            Buffer.from(storedHashedOtp),
            Buffer.from(hashedOtp)
        );


    if (!isMatch) {
        const failed = await redisClient.incr(`otp-attempts:${role}:${email}`);
        if (failed === 1) {
            await redisClient.expire(`otp-attempts:${role}:${email}`, OTP_BLOCK_TIME);
        }

        // ❗ If max attempts reached delete uploaded file
        if (failed >= MAX_OTP_ATTEMPTS) {
            const regDataKey = `register:${role}:${email}`;
            const regData = await redisClient.get(regDataKey);

            if (regData) {
                const parsedData = regData;

                if (parsedData.idProofPublicId) {
                    await cloudinary.uploader.destroy(parsedData.idProofPublicId);
                }
            }

            await redisClient.del(regDataKey);
        }


        throw new ApiError(400, "Invalid OTP");
    }

    // ✅ OTP is correct — now get registration data
    const regDataKey = `register:${role}:${email}`;
    const regData = await redisClient.get(regDataKey);
    if (!regData) throw new ApiError(400, "Registration session expired");
    console.log("Redis raw value:", regData);
    const parsedData = regData;

    // Check if already exists (safety check)
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, `${role === "user" ? "User" : "Technician"} already exists`);

    // console.log("Redis raw value:", regData);

    // Create user
    if (role === "technician") parsedData.status = "pending"; // enforce pending
    const user = await User.create(parsedData);
    user.isVerified = true;
    await user.save();

    // Clean up Redis
    // await redisClient.del(`otp:${role}:${email}`);
    // await redisClient.del(`otp-attempts:${role}:${email}`);
    // await redisClient.del(`otp-block:register:${email}`);

    await redisClient.del(`otp:${role}:${email}`);
    await redisClient.del(`otp-attempts:${role}:${email}`);
    await redisClient.del(`otp-block:${role}:${email}`);
    await redisClient.del(regDataKey);

    const token = generateToken(user);
    // console.log(token);

    // const cookieName = user.role === "technician" ? "techToken" : "userToken";

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }

    return res.status(200).cookie("token", token, option).json(
        new ApiResponse(200, {
            user,
            token
        }, "Registration successful")
    )

});


const login = asyncHandler(async (req, res, _) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (!user.isVerified) {
        throw new ApiError(400, "User is not verified. Please register first.")
    }

    await checkBlockedPhone(user.phone);

    // 🚫 Reject technician login if rejected
    if (user.role === "technician" && user.status === "rejected") {
        throw new ApiError(403, "Your technician account was rejected.");
    }

    // ⏳ Cooldown check
    const cooldown = await redisClient.get(`otp-cooldown:login:${email}`);
    if (cooldown) {
        throw new ApiError(429, "Please wait before requesting OTP again");
    }


    const type = "login";
    const attemptsKey = `otp-attempts:${type}:${email}`;
    const blockKey = `otp-block:${type}:${email}`;

    const isBlocked = await redisClient.get(blockKey);

    if (isBlocked) {
        throw new ApiError(429, "Too many OTP requests. Try again after 15 minutes.");
    }

    let attempts = await redisClient.get(attemptsKey);
    attempts = attempts ? parseInt(attempts) : 0;

    if (attempts > MAX_OTP_ATTEMPTS_RESEND) {
        await redisClient.set(blockKey, "1", { ex: OTP_BLOCK_TIME })
        await redisClient.del(attemptsKey);
        throw new ApiError(403, "Too many OTP requests. Try again after 15 minutes.");
    }

    await redisClient.set(attemptsKey, attempts + 1, { ex: OTP_BLOCK_TIME })


    const otp = crypto.randomInt(100000, 1000000).toString();

    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    await redisClient.set(`otp:login:${email}`, hashedOtp, { ex: 300 }); // OTP expires in 5 minutes

    // set cooldown
    await redisClient.set(`otp-cooldown:login:${email}`, "true", { ex: 60 });

    // console.log(`OTP for ${email}: ${hashedOtp} (original: ${otp})`); // In production, send this OTP via SMS
    await sendOtpEmail(email, otp);
    return res.status(200).json(
        new ApiResponse(200, { otp }, "OTP sent successfully")
    );
})


const verifyLoginOtp = asyncHandler(async (req, res, _) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    // Check if phone is blocked due to too many failed attempts
    const attempts = await redisClient.get(`otp-attempts:login:${email}`);
    if (attempts && Number(attempts) >= MAX_OTP_ATTEMPTS) {
        throw new ApiError(429, `Too many wrong OTP attempts. Try again after 15 minutes.`);
    }


    const storedHashedOtp = await redisClient.get(`otp:login:${email}`);

    if (!storedHashedOtp) {
        throw new ApiError(400, "OTP has expired or is invalid")
    }

    // 🚫 Blocked account check
    if (user.status === "blocked") {
        throw new ApiError(403, "Your account has been blocked by admin.");
    }

    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    const isMatch = crypto.timingSafeEqual(
        Buffer.from(storedHashedOtp),
        Buffer.from(hashedOtp)
    );

    if (!isMatch) {
        const failed = await redisClient.incr(`otp-attempts:login:${email}`);
        if (failed === 1) {
            await redisClient.expire(`otp-attempts:login:${email}`, OTP_BLOCK_TIME);
        }

        throw new ApiError(400, "Invalid OTP");
    }

    // OTP is correct → reset failed attempts
    // await redisClient.del(`otp-attempts:login:${email}`);
    // await redisClient.del(`otp:login:${email}`);
    // await redisClient.del(`otp-block:login:${email}`);

    await redisClient.del(`otp:login:${email}`);
    await redisClient.del(`otp-attempts:login:${email}`);
    await redisClient.del(`otp-block:login:${email}`);

    const token = generateToken(user);
    // Decide cookie name based on role
    // const cookieName = user.role === "technician" ? "techToken" : "userToken";

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }

    return res.status(200).cookie("token", token, option).json(
        new ApiResponse(200, {
            user,
            token
        }, "Login successful")
    )
})


const resendOtp = asyncHandler(async (req, res, _) => {
    const { email, type } = req.body;
    if (!email || !type) {
        throw new ApiError(400, "Email is required")
    }
    if (!["register", "login"].includes(type)) {
        throw new ApiError(400, "Invalid OTP type");
    }


    let role;

    // =========================
    // 🔹 LOGIN RESEND
    // =========================
    if (type === "login") {

        const user = await User.findOne({ email });
        if (!user) throw new ApiError(404, "User not found");

        if (user.status === "blocked") {
            throw new ApiError(403, "Your account has been blocked.");
        }

        role = user.role;

        const cooldown = await redisClient.get(`otp-cooldown:login:${email}`);
        if (cooldown) {
            throw new ApiError(429, "Please wait before requesting OTP again");
        }

        const requestKey = `otp-requests:login:${email}`;
        const blockKey = `otp-block:login:${email}`;

        // Check block
        const isBlocked = await redisClient.get(blockKey);
        if (isBlocked) {
            throw new ApiError(429, "Too many OTP requests. Try again after 15 minutes.");
        }

        // Count requests
        let requests = await redisClient.get(requestKey);
        requests = requests ? parseInt(requests) : 0;

        // If exceeded → block
        if (requests > MAX_OTP_ATTEMPTS_RESEND) {
            await redisClient.set(blockKey, "1", { ex: OTP_BLOCK_TIME });
            await redisClient.del(requestKey);

            throw new ApiError(429, "Too many OTP requests. Blocked for 15 minutes.");
        }

        // Increment
        await redisClient.set(requestKey, requests + 1, { ex: OTP_BLOCK_TIME });



        const otp = crypto.randomInt(100000, 1000000).toString();
        const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

        await redisClient.set(`otp:login:${email}`, hashedOtp, { ex: 300 });
        await redisClient.set(`otp-cooldown:login:${email}`, "1", { ex: 60 });

        // console.log(`Login OTP: ${otp}`); // remove in production
        sendOtpEmail(email, otp);
        return res.status(200).json(
            new ApiResponse(200, {}, "Login OTP resent successfully")
        );
    }


    // =========================
    // 🔹 REGISTER RESEND
    // =========================
    if (type === "register") {

        // Check which registration session exists
        let regData = await redisClient.get(`register:user:${email}`);
        role = "user";

        if (!regData) {
            regData = await redisClient.get(`register:technician:${email}`);
            role = "technician";
        }

        if (!regData) {
            throw new ApiError(400, "Registration session expired. Please register again.");
        }

        const cooldown = await redisClient.get(`otp-cooldown:${role}:${email}`);
        if (cooldown) {
            throw new ApiError(429, "Please wait before requesting OTP again");
        }

        const requestKey = `otp-requests:${role}:${email}`;
        const blockKey = `otp-block:${role}:${email}`;

        // Check block
        const isBlocked = await redisClient.get(blockKey);
        if (isBlocked) {
            throw new ApiError(429, "Too many OTP requests. Try again after 15 minutes.");
        }

        // Count requests
        let requests = await redisClient.get(requestKey);
        requests = requests ? parseInt(requests) : 0;

        // If exceeded → block
        if (requests > MAX_OTP_ATTEMPTS_RESEND) {
            await redisClient.set(blockKey, "1", { ex: OTP_BLOCK_TIME });
            await redisClient.del(requestKey);

            throw new ApiError(429, "Too many OTP requests. Blocked for 15 minutes.");
        }

        // Increment
        await redisClient.set(requestKey, requests + 1, { ex: OTP_BLOCK_TIME });

        const otp = crypto.randomInt(100000, 1000000).toString();
        const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

        await redisClient.set(`otp:${role}:${email}`, hashedOtp, { ex: 300 });
        await redisClient.set(`otp-cooldown:${role}:${email}`, "1", { ex: 60 });

        // console.log(`Register OTP: ${otp}`); // remove in production
        sendOtpEmail(email, otp);
        return res.status(200).json(
            new ApiResponse(200, {}, "Registration OTP resent successfully")
        );
    }
})


const logout = asyncHandler(async (req, res, _) => {
    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0)
    }

    res.clearCookie("token", option);

    return res.status(200).json(
        new ApiResponse(200, {}, "Logout successfully")
    );
});

export { registerUser, registerTechnician, verifyOtp, login, verifyLoginOtp, resendOtp, logout, generateToken }