import { engine } from "../../engine/engine.js";
import { UserModel } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const recommendation = asyncHandler(async (req, res) => {
    /*
    -> get user category and interest from request body 
    -> pass it on engine method 
    */
    const userId = req.user._id;

    const user = await UserModel.findById(userId);

    const result = await engine(user.category, user.bio);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "fetched recommended ai"));
});

export { recommendation };
