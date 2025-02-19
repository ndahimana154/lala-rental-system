import httpStatus from "http-status";
import propertyRepositories from "../repositories/property.Repositories.js";

export const isPropertyAlreadyExists = async (req, res, next) => {
    try {
        const property = await propertyRepositories.findPropertyByAttribute("title", req.body.title);
        if (property) {
            return res.status(httpStatus.CONFLICT).json({
                status: httpStatus.CONFLICT,
                message: "Property already exists with given title",
            })
        }
        return next();
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        })
    }
}