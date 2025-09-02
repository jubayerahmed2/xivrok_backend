import { UserModel } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const logoutUser = asyncHandler(async (req, res) => {
    /*
    -> get user id from req.user._id
    -> update user - make null refreshToken  
    -> clear cookies
    -> return response
    */

    const id = req.user._id;
    await UserModel.findByIdAndUpdate(id, {
        $set: {
            refreshToken: null
        }
    });

    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out"));
});

export { logoutUser };
