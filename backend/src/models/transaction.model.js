// import mongoose, { Schema } from "mongoose"

// const transactionSchema = new Schema({

//     booking: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Booking",
//         required: true
//     },

//     technician: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     totalAmount: {
//         type: Number,
//         required: true
//     },

//     technicianEarning: {
//         type: Number,
//         required: true
//     },

//     companyProfit: {
//         type: Number,
//         required: true
//     },

//     status: {
//         type: String,
//         enum: ["completed", "cancelled"],
//         default: "completed"
//     },

//     date: {
//         type: Date,
//         default: Date.now
//     }
// }, { timestamps: true });


// export const Transaction = mongoose.model("Transaction", transactionSchema);


import mongoose, { Schema } from "mongoose"
const transactionSchema = new Schema({

  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  companyProfit: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["completed", "cancelled"],
    default: "completed"
  },

  date: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);