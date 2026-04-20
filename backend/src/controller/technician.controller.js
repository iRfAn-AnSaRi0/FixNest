import { asyncHandler } from "../utils/async.handler.js";
import { ApiError } from "../utils/api.error.js";
import { ApiResponse } from "../utils/api.response.js";
import { Booking } from "../models/booking.model.js";
import { Transaction } from "../models/transaction.model.js";
import { calculateEarning } from "../utils/calculateEarning.js"

const getTechnicianBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    technician: req.user.id
  })
    .populate("user", "name phone")
    .populate("items.service", "name price");


  return res.status(200).json(
    new ApiResponse(
      200,
      bookings,
      "Details fetch"
    )
  )


})

const updateBookingStatus = asyncHandler(async (req, res) => {

  const { bookingId } = req.params;
  const { status } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  /*
  CHECK IF TECHNICIAN ASSIGNED
  */

  if (!booking.technician) {
    throw new ApiError(400, "No technician assigned to this booking");
  }

  /*
  VERIFY TECHNICIAN
  */

  if (booking.technician.toString() !== req.user.id.toString()) {
    throw new ApiError(403, "You are not assigned to this job");
  }

  /*
  PREVENT UPDATE AFTER COMPLETION
  */

  if (booking.status === "completed") {
    throw new ApiError(400, "Job already completed");
  }

  if (status === "completed") {
    const earning = calculateEarning(booking.totalPrice);

    booking.technicianEarning = earning.technician;
    booking.companyProfit = earning.company;
    booking.completedAt = new Date();
  }

  /*
  STATUS FLOW CONTROL
  */

  const statusFlow = {
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
  UPDATE STATUS
  */

  booking.status = status;

  if (status === "completed") {
    booking.completedAt = new Date();
  }

  await booking.save();

  if (status === "completed") {

    await Transaction.create({

      booking: booking._id,

      technician: booking.technician,

      totalAmount: booking.totalPrice,

      technicianEarning: booking.technicianEarning,

      companyProfit: booking.companyProfit

    });

  }

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking status updated successfully"
    )
  );

});

const getTechnicianIncomeHistory = asyncHandler(async (req, res) => {
  const history = await Transaction.find({
    technician: req.user.id
  })
    .populate("booking")
    .sort({ createdAt: -1 })

  return res.status(200).json(
    new ApiResponse(200, history, "Technician history fetch")
  )


})


export { updateBookingStatus, getTechnicianBookings, getTechnicianIncomeHistory };
