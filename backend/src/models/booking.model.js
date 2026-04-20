import mongoose, { Schema } from "mongoose"


// Item Scheam
const bookingItemSchema = new Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    quantity: {
        type: Number,
        default: 1,
        min: 1
    },

    price: {
        type: Number,
        required: true
    },
    estimateTime: {
        type: String,
        required: true
    }
});

// Booking Schema

const bookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [bookingItemSchema],

    totalPrice: {
        type: Number,
        required: true
    },

    problemDescription: {
        type: String
    },

    address: {

        street: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        },
    },

    bookingDate: {
        type: Date,
        required: true
    },

    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: [
            "pending",
            "technician_assigned",
            "accepted",
            "in_progress",
            "completed",
            "cancelled"
        ],
        default: "pending"
    },
    technicianEarning: {
        type: Number,
        default: 0
    },

    companyProfit: {
        type: Number,
        default: 0
    },
    completedAt: {
        type: Date
    }

}, { timestamps: true })


export const Booking = mongoose.model("Booking", bookingSchema);