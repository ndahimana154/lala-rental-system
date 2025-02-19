import httpStatus from "http-status";
import propertyRepositories from "../repositories/property.Repositories.js";

const createProperty = async (req, res) => {
    try {
        req.body.host = req.user._id;
        const property = propertyRepositories.saveProperty(req.body);

        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: "Property created successfully",
            data: { property }
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        })
    }
}

const getActiveProperites = async (req, res) => {
    try {
        const properties = await propertyRepositories.findActiveProperties();

        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Active properties fetched successfully",
            data: { properties }
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const getSingleProperty = async (req, res) => {
    try {
        const property = await propertyRepositories.findPropertyByAttribute("_id", req.params.id);
        if (!property) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "Property not found with given id"
            })
        }

        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Property fetched successfully",
            data: { property }
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        })
    }
}

// const getAllProperites = async (req, res) => {
//     try {
//         const properties = await propertyRepositories.findActiveProperties();

//         return res.status(httpStatus.OK).json({
//             status: httpStatus.OK,
//             message: "Active properties fetched successfully",
//             data: { properties }
//         })
//     } catch (error) {
//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             status: httpStatus.INTERNAL_SERVER_ERROR,
//             message: error.message
//         })
//     }
// }

export default {
    createProperty,
    getActiveProperites,
    getSingleProperty
}