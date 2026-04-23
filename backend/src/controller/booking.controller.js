import { asyncHandler } from "../utils/async.handler.js"
import { ApiError } from "../utils/api.error.js"
import { ApiResponse } from "../utils/api.response.js"
import { Service } from "../models/service.model.js"
import { Booking } from "../models/booking.model.js"
import { User } from "../models/user.model.js"
import SibApiV3Sdk from 'sib-api-v3-sdk';

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const emailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

const createBooking = asyncHandler(async (req, res) => {

    const { items, bookingDate, problemDescription, address } = req.body

    console.log(req.user)

    if (!items || items.length === 0) {
        throw new ApiError(400, "Service is required")
    }

    let totalPrice = 0;

    const bookingItems = [];

    for (const item of items) {
        const service = await Service.findById(item.service);

        if (!service) {
            throw new ApiError(404, "Service not found")
        }

        const quantity = item.quantity || 1;
        const itemTotal = service.price * quantity;

        totalPrice += itemTotal;

        bookingItems.push({
            service: service._id,
            quantity,
            price: service.price,
            estimateTime: service.estimateTime
        });
    }


    const booking = await Booking.create({
        user: req.user.id,
        items: bookingItems,
        problemDescription,
        totalPrice,
        address,
        bookingDate
    })

    // 🔥 Populate service details for email
    const bookingWithService = await Booking.findById(booking._id)
        .populate({
            path: "items.service",
            populate: {
                path: "category"
            }
        });

    const itemsHtml = bookingWithService.items.map(item => `
        <div style="margin-bottom:10px;">
            <p><b>Service:</b> ${item.service.name}</p>
            <p><b>Category:</b> ${item.service.category.name}</p>
            <p><b>Quantity:</b> ${item.quantity}</p>
            <p><b>Price:</b> ₹${item.price}</p>
            <p><b>Estimate Time:</b> ${item.estimateTime}</p>
        </div>
        <hr/>
    `).join("");

    const user = await User.findById(req.user.id);

    const fullAddress = typeof address === "object"
        ? `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`
        : address;

    const formattedDate = new Date(bookingDate).toLocaleDateString("en-IN");

    // 📩 Send email to admin
    await emailsApi.sendTransacEmail({
        sender: {
            email: process.env.SENDER_EMAIL,
            name: "New Booking"
        },
        to: [{ email: process.env.RECEIVER_EMAIL }],
        subject: "New Booking Received",

        htmlContent: `
            <h2>🔥 New Booking Received</h2>

            <h3>👤 User Details</h3>
            <p><b>Name:</b> ${user?.name || "N/A"}</p>
            <p><b>Phone:</b> ${user?.phone || "N/A"}</p>

            <h3>📍 Booking Info</h3>
            <p><b>Address:</b> ${fullAddress}</p>
            <p><b>Date:</b> ${formattedDate}</p>
            <p><b>Problem:</b> ${problemDescription || "N/A"}</p>

            <h3>🛠 Services</h3>
            ${itemsHtml}

            <h3>💰 Total</h3>
            <p><b>₹${totalPrice}</b></p>
        `
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            booking,
            "Booking Confirm"
        )
    )


})

const cancelBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(id);


    const booking = await Booking.findById(id);
    if (!booking) {
        throw new ApiError(404, "Booking not found")
    }
    // console.log("USER:", req.user);
    if (booking.user.toString() !== req.user.id.toString()) {
        throw new ApiError(403, "You are not allowed to cancel this booking");
    }

    if (
        booking.status === "technician_assigned" ||
        booking.status === "in_progress" ||
        booking.status === "completed"
    ) {
        throw new ApiError(400, "Booking cannot be cancelled at this stage");
    }

    booking.status = "cancelled";

    await booking.save();

    // 🔥 ADD THIS BLOCK
    const populatedBooking = await Booking.findById(booking._id)
        .populate("items.service", "name price")
        .populate("technician", "name phone");

    return res.status(200).json(
        new ApiResponse(
            200,
            populatedBooking,
            "Booking cancel"
        )
    )

})

const getBookingHistory = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({
        user: req.user.id,
        status: { $in: ["completed", "cancelled"] }
    })
        .populate("items.service", "name price")
        .populate("technician", "name phone")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            bookings,
            "Booking history fetch"
        )
    )
})

const getUserBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({
        user: req.user.id,
        status: { $nin: ["completed", "cancelled"] }
    })
        .populate("technician", "name phone")
        .populate("items.service", "name price").sort({ createdAt: -1 })

    return res.status(200).json(
        new ApiResponse(200, bookings, "Booking fetch")
    )
})

export { createBooking, cancelBooking, getBookingHistory, getUserBookings }