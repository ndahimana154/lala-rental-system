import httpStatus from "http-status";
import authRepositories from "../repositories/auth.Repositories.js";
export const isUserExistsByEmail = async (req, res, next) => {
    try {
        const user = await authRepositories.findUserByAttribute("email", req.body.email);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "User not found with given email"
            })
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}