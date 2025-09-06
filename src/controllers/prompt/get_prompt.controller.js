import { PromptModel } from "../../models/prompt.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const getPrompt = asyncHandler(async (req, res) => {
    /*
    -> get prompt id from request params 
    -> validate and find prompt by id
    -> return response
    */

    const { promptId } = req.params;

    const prompt = await PromptModel.findById(promptId);

    if (!prompt) {
        throw new ApiError(404, "Prompt not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { prompt }, "fetched prompt"));
});

export { getPrompt };
