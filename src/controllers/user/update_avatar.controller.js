import { UserModel } from "../../models/user.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { removeFromCloudinary } from "../../utils/delete_from_cloudinary.js";
import { uploadOnCloudinary } from "../../utils/upload_on_cloudinary.js";

const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalFile = req.file?.path;
    const userId = req.user._id;

    if (!avatarLocalFile) {
        throw new ApiError(400, "Avatar is required");
    }

    const user = await UserModel.findById(userId);

    // if avatar exist: remove it first
    if (user.avatar) {
        await removeFromCloudinary(user.avatar);
    }

    // then upload
    const avatar = await uploadOnCloudinary(avatarLocalFile);

    if (!avatar?.url) {
        throw new ApiError(500, "Failed to update avatar");
    }

    const updateUser = await UserModel.findByIdAndUpdate(
        userId,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { avatar: updateUser.avatar },
                "update avatar successfully"
            )
        );
});

export { updateAvatar };
