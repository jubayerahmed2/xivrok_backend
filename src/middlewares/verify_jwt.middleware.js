import jwt from "jsonwebtoken";
import envVariables from "../config/env.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/api_error.js";
import { asyncHandler } from "../utils/async_handler.js";

const verifyAdmin = asyncHandler(async (req, _, next) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized request");
    }

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Access denied: Admin only");
    }

    next();
});

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token =
            req.header("accessToken")?.replace("Bearer", "") ||
            req.cookies.accessToken;

        if (!token) {
            throw new ApiError(401, "Unauthorized request. Token not found");
        }

        const decodedToken = jwt.verify(
            token,
            envVariables.ACCESS_TOKEN_SECRET
        );

        const user = await UserModel.findById(decodedToken._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(`Something went wrong white verify JWT. Error: ${error}`);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export { verifyAdmin, verifyJWT };
