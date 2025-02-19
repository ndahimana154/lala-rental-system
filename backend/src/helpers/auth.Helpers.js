import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import httpStatus from "http-status";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = async (_id) => {
    return jwt.sign({ _id }, jwtSecret);
};

export const generateOTP = () => {
    const otp = Math.floor(Math.random() * 1000000);

    return otp.toString().padStart(6, '0');
}

export const decodeToken = (token) => {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Token verification error:", error.message);
        return { status: httpStatus.UNAUTHORIZED, message: "Token verification failed" };
    }
};