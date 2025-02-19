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
    return await Property.find({ status: "active" });
}

export default {
    findPropertyByAttribute,
    saveProperty,
    findActiveProperties
}