import mongoose, { Schema } from "mongoose"

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimateTime: {
        type: String,
        required: true
    },
    serviceImage: {
        type: String,
        required: true
    },
    serviceImagePublicId: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })
serviceSchema.index({ name: 1, category: 1, }, { unique: true })
export const Service = mongoose.model("Service", serviceSchema)