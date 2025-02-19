import mongoose from "mongoose"

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },

    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
})

const Property = mongoose.model("Property", propertySchema)

export default Property