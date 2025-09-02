import { UserModel } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const UpdateRecentView = asyncHandler(async (req, res) => {
    /*
    -> get AI id from request params
    -> update user by id and use $push operator to add new AI in views
    -> return response 
    */

    const { aiId } = req.params;
    const userId = req.user._id;

    const user = await UserModel.findByIdAndUpdate(
        userId,
        {
            $push: {
                recentViewedAis: aiId
            }
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { recentViewedAis: user.recentViewedAis },
                "added new ai in view history"
            )
        );
});

export { UpdateRecentView };
