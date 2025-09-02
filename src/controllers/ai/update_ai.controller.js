import { AiModel } from "../../models/ai.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const updateAi = asyncHandler(async (req, res) => {
    /* Admin action:
    -> get aiId from request params
    -> get updatable data from request body 
    -> filter empty fields 
    -> update AI 
    -> return response 
    */
    const { aiId } = req.params;

    const {
        name,
        description,
        category,
        tags,
        usage, // tutorial Id
        liveLink,
        launchedAt = null,
        batch = null
    } = req.body;

    const entries = Object.entries({
        name,
        description,
        category,
        tags,
        usage,
        liveLink,
        launchedAt,
        batch
    });

    const nonEmptyFields = entries.reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
    }, {});

    const updatedAi = await AiModel.findByIdAndUpdate(
        aiId,
        {
            $set: {
                ...nonEmptyFields
            }
        },
        { new: true }
    );

    return res.status(200).json(new ApiResponse(200, updatedAi, ""));
});

export { updateAi };
