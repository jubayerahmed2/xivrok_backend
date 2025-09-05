import { AiModel } from "../../models/ai.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const getAi = asyncHandler(async (req, res) => {
    /*
    -> get ai if from request params 
    -> find by id and validate
    -> return response
    */

    const { aiId } = req.params;

    const ai = await AiModel.findById(aiId);

    if (!ai) {
        throw new ApiError();
    }

    return res
        .status(200)
        .json(new ApiResponse(200, ai, "Fetched successfully"));
});

export { getAi };
