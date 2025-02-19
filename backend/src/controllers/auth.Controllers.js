import httpStatus from "http-status";
import { comparePassword, generateToken } from "../helpers/auth.Helpers.js";
import authRepositories from "../repositories/auth.Repositories.js";

const userLogin = async (req, res) => {
    try {
        console.log(req.body);
        const password = await comparePassword(req.body.password, req.user.password);
        if (!password) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: "Invalid password"
            })
        }
        const token = await generateToken(req.user._id);
        req.body.token = token;
        const session = await authRepositories.saveSession({
            user: req.user._id,
            token: token
        });
        return res.json({
            status: httpStatus.OK,
            message: "Login successful",
            data: {
                session
            }
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Profile retrieved successfully",
            data: {
                user: req.user
            }
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

export default {
    userLogin,
    getProfile
}