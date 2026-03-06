import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async.handler.js';
import { ApiError } from '../utils/api.error.js';
import { ApiResponse } from '../utils/api.response.js';

const getProfile = asyncHandler(async (req, res) => {

     const userData = await User.findById(req.user.id).select("name phone role status");

    if (!userData) {
        throw new ApiError(401, "Unauthorized");
    }

    // 👤 USER PROFILE
    if (userData.role === "user") {
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    name: userData.name,
                    phone: userData.phone,
                },
                "User profile fetched successfully"
            )
        );
    }

    // 🧑‍🔧 TECHNICIAN PROFILE
    if (userData.role === "technician") {

        const basicTechProfile = {
            name: userData.name,
            phone: userData.phone,
            status: userData.status
        };

        if (userData.status === "pending") {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    basicTechProfile,
                    "Technician profile is pending"
                )
            );
        }

        if (userData.status === "rejected") {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    basicTechProfile,
                    "Technician profile is rejected"
                )
            );
        }

        // Mask ID number for security
        const maskedId = user.idProofNumber
            ? user.idProofNumber.slice(-4).padStart(user.idProofNumber.length, "X")
            : null;

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    id: user._id,
                    name: user.name,
                    phone: user.phone,
                    technicianType: user.technicianType,
                    experience: user.experience,
                    idProofType: user.idProofType,
                    idProofNumber: maskedId,
                    idProofImage: user.idProofImage,
                    fullAddress: user.fullAddress,
                    city: user.city,
                    state: user.state,
                    pincode: user.pincode,
                    status: user.status,
                    isVerified: userData.isVerified,
                    createdAt: userData.createdAt
                },
                "Technician profile fetched successfully"
            )
        );
    }

    throw new ApiError(403, "Invalid role");

});

const updateProfile = asyncHandler(async (req, res) => {

    const authUser = req.user;

    if (!authUser) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await User.findById(authUser.id);


    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const { name, phone, fullAddress, city, state, pincode } = req.body;

    // ======================
    // UPDATE NAME
    // ======================
    if (name) {
        user.name = name;
    }

    // ======================
    // UPDATE PHONE
    // ======================
    if (phone) {

        const existingUser = await User.findOne({ phone });

        if (existingUser && existingUser._id !== user._id) {
            throw new ApiError(400, "Phone number already in use");
        }

        user.phone = phone;
    }

    // ======================
    // TECHNICIAN UPDATE LIMIT
    // ======================
    if (user.role === "technician") {

        if (fullAddress) user.fullAddress = fullAddress;
        if (city) user.city = city;
        if (state) user.state = state;
        if (pincode) user.pincode = pincode;
    }

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                id: user._id,
                name: user.name,
            },
            "Profile updated successfully"
        )
    );

});

export { getProfile, updateProfile };