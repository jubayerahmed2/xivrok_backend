import cloudinary from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";
import { ApiError } from "./api_error.js";

const removeFromCloudinary = async (url, resource_type) => {
    try {
        if (!url) {
            throw new ApiError(400, "File url is required");
        }

        const extractPublicIdFromUrl = extractPublicId(url);

        const removeFile = await cloudinary.v2.uploader.destroy(
            extractPublicIdFromUrl,
            {
                resource_type: resource_type || "image"
            }
        );

        return removeFile;
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while removing file from cloudinary"
        );
    }
};

export { removeFromCloudinary };
