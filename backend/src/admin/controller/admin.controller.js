import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/async.handler.js";
import { generateToken } from "../../controller/auth.controller.js"
import { User } from "../../models/user.model.js"
import { ApiResponse } from "../../utils/api.response.js";
import { ApiError } from "../../utils/api.error.js";

const adminLogin = asyncHandler(async (req, res) => {

    const { phone, password } = req.body;

    if (!phone || !password) {
        throw new ApiError(400, "Phone and password are required");
    }

    const admin = await User.findOne({ phone, role: "admin" });

    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = generateToken(admin);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    };

    return res
        .status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(
                200,
                {
                    id: admin._id,
                    name: admin.name,
                    role: admin.role,
                    token
                },
                "Admin login successful"
            )
        );
});

const adminLogout = asyncHandler(async (req, res, _) => {

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    };

    return res
        .status(200)
        .clearCookie("token", options)
        .json(
            new ApiResponse(200, {}, "Admin logged out successfully")
        );

});

const adminApproveAndRejectApplication = asyncHandler(async (req, res) => {

    const { status } = req.body;
    const { technicianId } = req.params;

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    if (!["approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    const technician = await User.findById(technicianId);

    if (!technician) {
        throw new ApiError(404, "Technician not found");
    }

    if (technician.role !== "technician") {
        throw new ApiError(400, "This user is not a technician");
    }

    if (technician.status !== "pending") {
        throw new ApiError(400, `Technician already ${technician.status}`);
    }

    // ✅ convert approved → active
    if (status === "approved") {
        technician.status = "active";
    }

    // ❌ rejected stays rejected
    if (status === "rejected") {
        technician.status = "rejected";
    }

    await technician.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                technicianId: technician._id,
                name: technician.name,
                status: technician.status
            },
            `Technician application ${technician.status}`
        )
    );
});

const adminBlockUserOrTechnician = asyncHandler(async (req, res) => {

    const { userId } = req.params;
    const { action } = req.body; // block or unblock

    if (!["block", "unblock"].includes(action)) {
        throw new ApiError(400, "Action must be block or unblock");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Prevent blocking admin
    if (user.role === "admin") {
        throw new ApiError(403, "Admin cannot be blocked");
    }

    // Handle user
    if (user.role === "user") {
        user.status = action === "block" ? "blocked" : "active";
    }

    // Handle technician
    if (user.role === "technician") {

        if (user.status === "pending" || user.status === "rejected") {
            throw new ApiError(400, "Technician is not active yet");
        }

        user.status = action === "block" ? "blocked" : "active";
    }

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                id: user._id,
                name: user.name,
                role: user.role,
                status: user.status
            },
            `${user.role} ${action === "block" ? "blocked" : "unblocked"} successfully`
        )
    );
});

export { adminLogin, adminLogout, adminApproveAndRejectApplication, adminBlockUserOrTechnician }