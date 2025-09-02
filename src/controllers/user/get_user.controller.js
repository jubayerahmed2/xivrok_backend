import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const getUserDetails = asyncHandler(async (req, res) => {
    const user = req.user;

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Fetched user details"));
});

export { getUserDetails };
