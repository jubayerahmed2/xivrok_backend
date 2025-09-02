import { AiModel } from "../../models/ai.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { removeTemporaryFile } from "../../utils/remove_temp_file.js";
import { uploadOnCloudinary } from "../../utils/upload_on_cloudinary.js";

const createAi = asyncHandler(async (req, res) => {
    /* Admin action:
    -> get ai data from request body 
       - name, description, category, tags, usage, logo, liveLink, launchedAt(opt), batch(opt)
    -> check already exist AI with name
    -> upload logo on cloudinary
    -> create new AI 
    -> return response
    */

    const logoLocalFilePath = req.file?.path;
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

    const existingAiWithName = await AiModel.findOne({ name });

    if (existingAiWithName) {
        removeTemporaryFile(logoLocalFilePath);
        throw new ApiError(409, "Ai exist with the same name");
    }

    // upload logo
    const logo = await uploadOnCloudinary(logoLocalFilePath);

    if (!logo?.url) {
        throw new ApiError(500, "Failed to upload logo");
    }

    const newAi = await AiModel.create({
        name,
        description,
        category,
        tags,
        usage,
        liveLink,
        launchedAt,
        batch
    });

    return res
        .status(200)
        .json(new ApiResponse(200, newAi, "Upload Ai successfully"));
});

export { createAi };
