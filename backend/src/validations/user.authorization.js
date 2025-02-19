import httpStatus from "http-status";
import { decodeToken } from "../helpers/auth.Helpers.js";
import authRepositories from "../repositories/auth.Repositories.js";

export const isUserAuthorized = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                res.status(httpStatus.UNAUTHORIZED).json({
                    status: httpStatus.UNAUTHORIZED,
                    message: "No token provided",
                });
                return;
            }

            const decoded = await decodeToken(token)
            const session = await authRepositories.findSessionByTwoAttributes(
                "user",
                decoded._id,
                "token",
                token
            );

            if (!session) {
                res.status(httpStatus.UNAUTHORIZED).json({
                    status: httpStatus.UNAUTHORIZED,
                    message: "Session expired!",
                });
                return;
            }

            const user = await authRepositories.findUserByAttribute("_id", decoded._id);

            if (!user) {
                res.status(httpStatus.UNAUTHORIZED).json({
                    status: httpStatus.UNAUTHORIZED,
                    message: "User not found!",
                });
                return;
            }

            if ((user.isDisabled)) {
                res.status(httpStatus.UNAUTHORIZED).json({
                    status: httpStatus.UNAUTHORIZED,
                    message: "User is disabled for access, contact system admin for support!",
                });
                return;
            }

            if (!roles.includes(user.role) && !roles.includes("All")) {
                res.status(httpStatus.UNAUTHORIZED).json({
                    status: httpStatus.UNAUTHORIZED,
                    message: "Invalid user role!",
                });
                return;
            }

            req.user = user;
            req.session = session;
            return next();
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
        }
    };
};
