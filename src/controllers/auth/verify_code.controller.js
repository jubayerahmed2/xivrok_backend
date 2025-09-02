import { UserModel } from "../../models/user.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { generateAccessAndRefreshToken } from "./login.controller.js";

const verifyCode = asyncHandler(async (req, res) => {
    /*
    -> Get email and code from request body 
    -> zod validation
    -> check if email exist
    -> check is email verified 
    -> check if code same
    -> if not match throw/return error
    -> if match: generate access & refresh token, update user
    -> return response 
    */

    const { email, code } = req.body;

    const emailExist = await UserModel.findOne({ email });

    if (!emailExist) {
        throw new ApiError(404, "Email doesn't exist");
    }

    if (emailExist?.isVerified) {
        throw new ApiError(409, "Email already verified");
    }

    if (emailExist.verifyCode.trim() !== code.trim()) {
        throw new ApiError(409, "Invalid verify code");
    }

    const user = await UserModel.findOneAndUpdate(
        { email },
        {
            $set: {
                isVerified: true,
                verifyCode: null,
                verifyExpiry: null
            }
        }
    );

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const getUser = await UserModel.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: getUser, accessToken, refreshToken },
                "Email verification successfully"
            )
        );
});

export { verifyCode };
