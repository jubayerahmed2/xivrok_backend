import { AiModel } from "../../models/ai.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { removeTemporaryFile } from "../../utils/remove_temp_file.js";
import { uploadOnCloudinary } from "../../utils/upload_on_cloudinary.js";

const updateAiLogo = asyncHandler(async (req, res) => {
    /*
    -> get aiId from req.params 
    -> get logo path from req.file.path // cause one file 
    -> if path empty throw error 
    -> upload file on cloudinary 
    -> update Ai 
    -> return response 
    */

    const logoLocalFile = req.file?.path;
    const { aiId } = req.params;

    console.log(logoLocalFile);

    if (!logoLocalFile) {
        removeTemporaryFile(logoLocalFile);
        throw new ApiError(400, "Logo is required");
    }

    const isAiExist = await AiModel.findById(aiId);

    if (!isAiExist) {
        throw new ApiError(404, "Invalid AI id");
    }

    const logo = await uploadOnCloudinary(logoLocalFile);

    if (!logo.url) {
        throw new ApiError(
            500,
            "Something went wrong while uploading logo on cloudinary"
        );
    }

    await AiModel.findByIdAndUpdate(aiId, {
        $set: {
            logo: logo.url
        }
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, { logo: logo.url }, "update logo successfully")
        );
});

export { updateAiLogo };
