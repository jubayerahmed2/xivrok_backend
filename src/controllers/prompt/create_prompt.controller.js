import { PromptModel } from "../../models/prompt.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const createPrompt = asyncHandler(async (req, res) => {
    /*
    -> get data from request body - content, author(id), tags[]
    -> create new prompt 
    -> return response
    */

    const { content, author, tags } = req.body;

    const newPrompt = await PromptModel.create({
        content,
        author,
        tags
    });

    return res
        .status(200)
        .json(new ApiResponse(200, newPrompt, "Created new prompt"));
});

export { createPrompt };
