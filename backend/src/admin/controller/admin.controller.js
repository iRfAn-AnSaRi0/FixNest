import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/async.handler.js";
import { generateToken } from "../../controller/auth.controller.js"
import { User } from "../../models/user.model.js"
import { ApiResponse } from "../../utils/api.response.js";
import { ApiError } from "../../utils/api.error.js";
import { Booking } from "../../models/booking.model.js"
import { Transaction } from "../../models/transaction.model.js";

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

  const isProduction = process.env.NODE_ENV === "production";

  const option = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  }

  return res
    .status(200)
    .cookie("token", token, option)
    .json(
      new ApiResponse(
        200,
        {
          id: admin._id,
          name: admin.name,
          phone: admin.phone,
          role: admin.role,
          token
        },
        "Admin login successful"
      )
    );
});

const adminProfile = asyncHandler(async (req, res) => {

  const admin = await User.findById(req.user.id).select("-password");

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        name: admin.name,
        phone: admin.phone
      },
      "Admin profile fetched"
    )
  )

})

const adminLogout = asyncHandler(async (req, res, _) => {

  const isProduction = process.env.NODE_ENV === "production";

  const option = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  }

  return res
    .status(200)
    .clearCookie("token", option)
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

const assignTechnician = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { technicianId } = req.body;

  const booking = await Booking.findOne({
    _id: bookingId,
    status: "pending"
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found")
  }

  const technician = await User.findById(technicianId);
  if (!technician) {
    throw new ApiError(404, "Technician not found");
  }

  if (technician.status === "pending") {
    throw new ApiError(400, "Technician is not approved yet");
  }

  if (technician.status === "rejected") {
    throw new ApiError(400, "Technician is rejected, cannot assign");
  }

  booking.technician = technicianId;
  booking.status = "technician_assigned";

  await booking.save();

  return res.status(200).json(
    new ApiResponse(200, {}, "Technicain assigne")
  )
});

const getLiveBookings = asyncHandler(async (req, res) => {

  const bookings = await Booking.find({
    status: { $in: ["pending", "technician_assigned", "accepted", "in_progress"] }
  })
    .populate("user", "name")
    .populate("technician", "name")
    .populate({
      path: "items.service",
      populate: {
        path: "category",
        select: "name"
      }
    })
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      bookings,
      "Live bookings fetched"
    )
  );
});

const getCompletedBookings = asyncHandler(async (req, res) => {

  const bookings = await Booking.find({
    status: { $in: ["completed", "cancelled"] }
  })
    .populate("user", "name")
    .populate("technician", "name")
    .populate({
      path: "items.service",
      populate: {
        path: "category",
        select: "name" // 👈 THIS FIXES YOUR ISSUE
      }
    })
    .sort({ completedAt: -1 })
    .limit(10);

  return res.status(200).json(
    new ApiResponse(
      200,
      bookings,
      "Completed bookings fetched"
    )
  );
});

const getAdminDashboard = asyncHandler(async (req, res) => {

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  /*
    TRANSACTION STATS
  */

  const transactionStats = await Transaction.aggregate([
    {
      $group: {
        _id: null,

        totalProfit: { $sum: "$companyProfit" },
        totalRevenue: { $sum: "$totalAmount" },

        todayProfit: {
          $sum: {
            $cond: [
              { $gte: ["$date", startOfDay] },
              "$companyProfit",
              0
            ]
          }
        },

        todayRevenue: {
          $sum: {
            $cond: [
              { $gte: ["$date", startOfDay] },
              "$totalAmount",
              0
            ]
          }
        }
      }
    }
  ]);

  /*
    BOOKING STATS
  */

  const bookingStats = await Booking.aggregate([
    {
      $group: {
        _id: null,

        totalBookings: { $sum: 1 },

        todayBookings: {
          $sum: {
            $cond: [
              { $gte: ["$createdAt", startOfDay] },
              1,
              0
            ]
          }
        }
      }
    }
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalProfit: transactionStats[0]?.totalProfit || 0,
        totalRevenue: transactionStats[0]?.totalRevenue || 0,
        todayProfit: transactionStats[0]?.todayProfit || 0,
        todayRevenue: transactionStats[0]?.todayRevenue || 0,

        totalBookings: bookingStats[0]?.totalBookings || 0,
        todayBookings: bookingStats[0]?.todayBookings || 0
      },
      "Dashboard data fetched"
    )
  );
});

const getUserTechnicianStats = asyncHandler(async (req, res) => {

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const stats = await User.aggregate([

    {
      $group: {

        _id: null,

        totalUsers: {
          $sum: {
            $cond: [{ $eq: ["$role", "user"] }, 1, 0]
          }
        },

        activeUsers: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$role", "user"] },
                  { $eq: ["$status", "active"] }
                ]
              },
              1,
              0
            ]
          }
        },

        blockedUsers: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$role", "user"] },
                  { $eq: ["$status", "blocked"] }
                ]
              },
              1,
              0
            ]
          }
        },

        totalTechnicians: {
          $sum: {
            $cond: [{ $eq: ["$role", "technician"] }, 1, 0]
          }
        },

        activeTechnicians: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$role", "technician"] },
                  { $eq: ["$status", "active"] }
                ]
              },
              1,
              0
            ]
          }
        },

        blockedTechnicians: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$role", "technician"] },
                  { $eq: ["$status", "blocked"] }
                ]
              },
              1,
              0
            ]
          }
        }

      }
    }

  ]);

  /*
  CURRENTLY ACTIVE USERS
  */

  const onlineUsers = await User.countDocuments({
    lastActiveAt: { $gte: fiveMinutesAgo }
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        ...stats[0],
        onlineUsers
      },
      "User & technician stats fetched"
    )
  );

});

const getTotalUser = asyncHandler(async (req, res) => {

  const users = await User.aggregate([
    {
      $match: { role: "user" }
    },

    {
      $lookup: {
        from: "bookings", // collection name
        localField: "_id",
        foreignField: "user",
        as: "bookings"
      }
    },

    {
      $addFields: {
        bookingsCount: { $size: "$bookings" }
      }
    },

    {
      $project: {
        name: 1,
        phone: 1,
        status: 1,
        bookingsCount: 1
      }
    }
  ]);

  return res.status(200).json(
    new ApiResponse(200, users, "Total user fetched")
  );
});

const getTotalTechnician = asyncHandler(async (req, res) => {

  const technicians = await User.aggregate([
    {
      $match: { role: "technician" }
    },

    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "technician",
        as: "jobs"
      }
    },

    {
      $addFields: {
        totalJobs: { $size: "$jobs" },

        completedJobs: {
          $size: {
            $filter: {
              input: "$jobs",
              as: "job",
              cond: { $eq: ["$$job.status", "completed"] }
            }
          }
        }
      }
    },

    {
      $project: {
        name: 1,
        phone: 1,
        technicianType: 1,
        status: 1,
        city: 1,
        experience: 1,
        totalJobs: 1,
        completedJobs: 1
      }
    }
  ]);

  return res.status(200).json(
    new ApiResponse(200, technicians, "Total technician fetched")
  );
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  // ❌ prevent double completion
  if (booking.status === "completed") {
    throw new ApiError(400, "Job already completed");
  }

  /*
    STATUS FLOW CONTROL (same as technician)
  */
  const statusFlow = {
    pending: "technician_assigned",
    technician_assigned: "accepted",
    accepted: "in_progress",
    in_progress: "completed"
  };

  const expectedNextStatus = statusFlow[booking.status];

  if (status !== expectedNextStatus) {
    throw new ApiError(
      400,
      `Invalid status update. Next allowed status is ${expectedNextStatus}`
    );
  }

  /*
    IF COMPLETED → CALCULATE + CREATE TRANSACTION
  */
  if (status === "completed") {

    const companyProfit = booking.totalPrice * 0.10;

    booking.companyProfit = companyProfit;
    booking.completedAt = new Date();

    await booking.save();

    await Transaction.create({
      booking: booking._id,
      totalAmount: booking.totalPrice,
      companyProfit
    });
  }

  /*
    UPDATE STATUS
  */
  booking.status = status;

  await booking.save();

  return res.status(200).json(
    new ApiResponse(200, booking, "Booking status updated by admin")
  );
});

export { adminLogin, adminProfile, adminLogout, getAdminDashboard, getUserTechnicianStats, adminApproveAndRejectApplication, adminBlockUserOrTechnician, assignTechnician, getLiveBookings, getCompletedBookings, getTotalUser, getTotalTechnician, updateBookingStatus };