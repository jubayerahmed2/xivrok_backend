import { UserModel } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const updateRote = asyncHandler(async (req, res) => {
    /* Admin Action:
    -> get user id from request params 
    -> get role = "admin" | "user" from req.body 
    -> update user with new role 
    -> return response 
    */

    const { userId } = req.params;

    const { newRole } = req.body;

    const user = await UserModel.findByIdAndUpdate(
        userId,
        {
            $set: {
                role: newRole
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Update role successfully"));
});

export { updateRote };
