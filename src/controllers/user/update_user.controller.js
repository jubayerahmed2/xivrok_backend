import { UserModel } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const updataUserDetails = asyncHandler(async (req, res) => {
    /*
    -> get updatable data from request body 
    -> filter empty fields 
    -> update user by id 
    -> return response 
    */
    const userId = req.user._id;

    const { fullname, bio, category, country } = req.body;
    const filledFields = Object.entries({
        fullname,
        bio,
        category,
        country
    }).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
    }, {});

    const user = await UserModel.findByIdAndUpdate(
        userId,
        {
            $set: {
                ...filledFields
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "update user successfully"));
});

export { updataUserDetails };
