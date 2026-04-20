import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async.handler.js';
import { ApiError } from '../utils/api.error.js';
import { ApiResponse } from '../utils/api.response.js';

const getProfile = asyncHandler(async (req, res) => {

    const userData = await User.findById(req.user.id).select("name phone email role status technicianType fullAddress city state pincode ");

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
                    email: userData.email,
                    role: userData.role,
                },
                "User profile fetched successfully"
            )
        );
    }

    if (userData.role === "technician") {

        const baseProfile = {
            id: userData._id,
            name: userData.name,
            phone: userData.phone,
            role: userData.role,
            status: userData.status,
            technicianType: userData.technicianType || null,
        };

  // 🟡 Pending / Rejected
  if (userData.status === "pending" || userData.status === "rejected") {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: baseProfile,
          access: "limited", // 🔥 KEY
        },
        `Technician profile is ${userData.status}`
      )
    );
  }

  // 🟢 Approved
  const maskedId = userData.idProofNumber
    ? userData.idProofNumber.slice(-4).padStart(userData.idProofNumber.length, "X")
    : null;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          ...baseProfile,
          fullAddress: userData.fullAddress,
          city: userData.city,
          state: userData.state,
          pincode: userData.pincode,
        },
        access: "full",
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
                phone: user.phone,
                fullAddress: user.fullAddress,
                city: user.city,
                state: user.state,
                pincode: user.pincode
            },
            "Profile updated successfully"
        )
    );

});

export { getProfile, updateProfile };