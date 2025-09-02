import { UserModel } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { removeFromCloudinary } from "../../utils/delete_from_cloudinary.js";
import { uploadOnCloudinary } from "../../utils/upload_on_cloudinary.js";

const updataUserDetails = asyncHandler(async (req, res) => {
    /*
    -> get updatable data from request body 
    -> filter empty fields 
    -> update user by id 
    -> return response 
    */
    const userId = req.user._id;

    const { fullname, bio, category, country } = req.body;
    const filledFields = {};

    function pushNonEmptyField(name, value) {
        if (value) {
            filledFields[name] = value;
        }
    }

    pushNonEmptyField("fullname", fullname);
    pushNonEmptyField("bio", bio);
    pushNonEmptyField("category", category);
    pushNonEmptyField("country", country);

    const getUser = await UserModel.findById(userId);

    const avatarLocalFile = req.file?.path;

    if (avatarLocalFile) {
        // if avatar exist: remove it first
        if (getUser.avatar) {
            await removeFromCloudinary(getUser.avatar);
        }

        const uploadAvatar = await uploadOnCloudinary(avatarLocalFile);

        filledFields.avatar = uploadAvatar.url;
    }

    const user = await UserModel.findByIdAndUpdate(
        userId,
        {
            $set: {
                ...filledFields
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "update user successfully"));
});

export { updataUserDetails };
