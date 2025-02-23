import Bookings from "../database/models/bookings.js";
import Property from "../database/models/property.js";

const findPropertyByAttribute = async (key, value) => {
    return await Property.findOne({ [key]: value });
}

const saveProperty = async (data) => {
    return await Property.create(data);
}

const deleteProperty = async (id) => {
    return await Property.findByIdAndDelete(id);
}

const updateProperty = async (id, data) => {
    return await Property.findByIdAndUpdate(id, data, { new: true });
}

const findActiveProperties = async () => {
    return await Property.find({ status: "active" }).sort({ createdAt: -1 })
}

const bookProperty = async (data) => {
    return await Bookings.create(data);
}

const findExistingBooking = async (_id, checkOutDate, checkInDate) => {
    return await Bookings.findOne({
        property: _id,
        $or: [
            {
                checkInDate: { $lte: checkOutDate },
                checkOutDate: { $gte: checkInDate }
            }
        ]
    });
}

const findAllProperties = async () => {
    return await Property.find().sort({ createdAt: -1 })
}

export default {
    findPropertyByAttribute,
    saveProperty,
    findActiveProperties,
    bookProperty,
    findExistingBooking,
    findAllProperties
}