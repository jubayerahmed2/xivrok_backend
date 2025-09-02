// @ts-nocheck
import { UserModel } from "../../models/user.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { verifyEmailSendAndUpdate } from "./register.controller.js";

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh token"
        );
    }
};

const loginUser = asyncHandler(async (req, res) => {
    /*
    -> get email and password from request body 
    -> validate via zod 
    -> check if email exist 
    -> check password valid using - isPasswordCorrect method 
    -> check is email verified, if not resent email 
    -> generate access and refresh token 
    -> return response 
    */

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User with the email address not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (isPasswordCorrect) {
        throw new ApiError(409, "Incorrect credential");
    }

    if (!user.isVerified) {
        const verifyEmail = await verifyEmailSendAndUpdate(
            user.email,
            user.fullname
        );

        if (verifyEmail.rejected?.length) {
            throw new ApiError(500, "Verification email not sent");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    null,
                    "Email not verified. verification email sent"
                )
            );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    const getUser = await UserModel.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: getUser, accessToken, refreshToken },
                "LoggedIn successfully"
            )
        );
});

export { loginUser };
