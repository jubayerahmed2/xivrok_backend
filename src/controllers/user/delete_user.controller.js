// @ts-nocheck
import { UserModel } from "../../models/user.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const deleteUser = asyncHandler(async (req, res) => {
    /*
    -> get password from request body 
    -> match password, if incorrect password throw error 
    -> is password correct, delete user from DB 
    -> return response  
    */

    const userId = req.user._id;
    const { password } = req.body;

    const user = await UserModel.findById(userId);

    const isPasswordCorrect = user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(409, "Incorrect password");
    }

    await UserModel.findByIdAndDelete(userId);

    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "Account deleted"));
});

export { deleteUser };
