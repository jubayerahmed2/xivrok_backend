import jwt from "jsonwebtoken";
import envVariables from "../../config/env.js";
import { UserModel } from "../../models/user.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { generateAccessAndRefreshToken } from "./login.controller.js";

const refreshAccessToken = asyncHandler(async (req, res) => {
    /*
    -> get refresh token from client  and validate
    -> verify refresh token 
    -> get decoded refresh token and find user with userId
    -> if user doesn't exist, through error 
    -> if exist:    
        - compare refresh token with DB one, if not matched throw error 
        - matched: generate new access and refresh token 
        - set tokens in cookie and return to client 
    -> done 
    */

    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Invalid refresh token");
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        envVariables.REFRESH_TOKEN_SECRET
    );

    const user = await UserModel.findById(decodedToken?._id);
    if (!user) {
        throw new ApiError(401, "Unauthorized request");
    }

    if (user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

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
                { accessToken, refreshToken },
                "Refresh access token successfully"
            )
        );
});

export { refreshAccessToken };
