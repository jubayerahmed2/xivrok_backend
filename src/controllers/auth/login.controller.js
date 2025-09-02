import { UserModel } from "../../models/user.model.js";
import { ApiError } from "../../utils/api_error.js";

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh token"
        );
    }
};
