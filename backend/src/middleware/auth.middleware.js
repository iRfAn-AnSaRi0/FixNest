import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async.handler.js';
import { ApiError } from '../utils/api.error.js';
import jwt from 'jsonwebtoken';

const authMiddleware = asyncHandler(async (req, _, next) => {
  try {
    const authHeader = req.header("Authorization");

    const token =
      req.cookies?.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new ApiError(401, "Token expired. Please login again.");
      }
      throw new ApiError(401, "Invalid token");
    }

    const user = await User.findById(decodedToken.id).select("_id role status");

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // 🔥 Global Block Check
    if (user.status === "blocked") {
      res.clearCookie("token");
      throw new ApiError(403, "Your account has been blocked");
    }


    // Attach minimal safe data
    req.user = {
      id: user._id.toString(),
      role: user.role,
      status: user.status,
    };

    next();

  } catch (error) {
    throw new ApiError(401, error.message || "Authentication failed");
  }
});

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied");
    }
    next();
  };
};

const requireApprovedTechnician = (req, _, next) => {
  if (req.user.role === "technician" && req.user.status !== "approved") {
    throw new ApiError(403, "Your account is not approved yet.");
  }
  next();
};

const checkBlockedUser = async (req, _, next) => {

  if (req.user?.status === "blocked") {
    res.clearCookie("token");
    throw new ApiError(403, "Your account has been blocked by admin");
  }

  next();
};

export { authMiddleware, allowRoles, requireApprovedTechnician, checkBlockedUser };
