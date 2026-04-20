import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    // BASIC INFO (Both User & Technician)
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must be less than 50 characters"],
      match: [/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"],
    },

    email: {
      type: String,
       required: function () {
        return this.role === "user" || this.role === "technician"
      },
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address"
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      index: true,
      match: [/^[6-9]\d{9}$/, "Enter valid 10-digit Indian phone"],
    },

    alternatePhone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Enter valid 10-digit Indian phone"],
    },

    isVerified: {
      type: Boolean,
      required: function () {
        return this.role === "user" || this.role === "technician"
      },
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "technician", "admin"],
      default: "user",
    },

    // Technician Approval Status
    status: {
      type: String,
      enum: ["active",      // normal users
        "blocked",     // blocked by admin
        "pending",     // technician waiting approval
        "approved",    // technician approved
        "rejected"],
      default: "active",
    },

    // ==========================
    // TECHNICIAN ONLY FIELDS
    // ==========================

    technicianType: {
      type: String,
      enum: ["Electrical", "Plumber", "AC", "Refrigerator", "Washing Machine"],
      required: function () {
        return this.role === "technician";
      },
    },

    experience: {
      type: Number,
      min: [0, "Experience cannot be negative"],
      max: [50, "Experience seems invalid"],
      required: function () {
        return this.role === "technician";
      },
    },

    idProofType: {
      type: String,
      enum: ["Aadhar", "PAN", "Driving License"],
      required: function () {
        return this.role === "technician";
      },
    },

    idProofNumber: {
      type: String,
      required: function () {
        return this.role === "technician";
      },
      validate: {
        validator: function (value) {
          if (this.idProofType === "Aadhar") {
            return /^\d{12}$/.test(value);
          }
          if (this.idProofType === "PAN") {
            return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
          }
          if (this.idProofType === "Driving License") {
            return /^[A-Z0-9]{8,15}$/.test(value);
          }
          return true;
        },
        message: "Invalid ID proof number format",
      },
    },

    idProofImage: {
      type: String,
      required: function () {
        return this.role === "technician";
      },
    },
    idProofPublicId: {
      type: String,
      required: function () {
        return this.role === "technician"
      }
    },

    isDocumentsVerified: {
      type: Boolean,
      required: function () {
        return this.role === "technician"
      },
      default: false,
    },

    // ==========================
    // ADDRESS (Both Can Have)
    // ==========================

    fullAddress: {
      type: String,
      trim: true,
      minlength: [10, "Address too short"],
      maxlength: [300, "Address too long"],
      required: function () {
        return this.role === "technician";
      }
    },

    city: {
      type: String,
      trim: true,
      minlength: [2, "City too short"],
      maxlength: [50, "City too long"],
      required: function () {
        return this.role === "technician";
      }
    },

    state: {
      type: String,
      trim: true,
      minlength: [2, "State too short"],
      maxlength: [50, "State too long"],
      required: function () {
        return this.role === "technician";
      }
    },

    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, "Invalid pincode"],
      required: function () {
        return this.role === "technician";
      }
    },
    password: {
      type: String,
      required: function () {
        return this.role === "admin";
      }
    },

    lastActiveAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);