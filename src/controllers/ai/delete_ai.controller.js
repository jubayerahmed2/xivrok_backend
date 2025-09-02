import { AiModel } from "../../models/ai.model.js";
import { FavoriteModal } from "../../models/favorite.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const deleteAi = asyncHandler(async (req, res) => {
    /*
    -> get Ai id from request params 
    -> remove ai favorites
    -> remove ai from DB 
    -> return response
    */

    const { aiId } = req.params;

    await FavoriteModal.deleteMany({ AI: aiId });

    await await AiModel.findByIdAndDelete(aiId);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Deleted Ai successfully"));
});

export { deleteAi };
