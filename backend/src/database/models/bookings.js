import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },
    guest: {
        names: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    checkInDate: {
        type: Date,
        required: true
    }
    ,
    checkOutDate: {
        type: Date,
        required: true
    },
}, { timestamps: true });

const Bookings = mongoose.model("Bookings", bookingsSchema);

export default Bookings;