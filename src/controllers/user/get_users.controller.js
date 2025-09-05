import { UserModel } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

const getUsers = asyncHandler(async (req, res) => {
    /* Admin Action:
    -> get limit, page, sortBy(date, premium), sortType(asc, dec)  from req.query
    -> get users with pagination  
    -> return response except - password, refreshToken  
    */

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const query = req.query.query || "";
    const sortBy = req.query.sortBy || "createdAt";
    const sortType = req.query.sortType === "desc" ? -1 : 1;

    const options = {
        limit,
        page,
        offset: limit * page - limit,
        sort: {
            [sortBy]: sortType
        }
    };

    const aggregateUsers = UserModel.aggregate([
        {
            $match: {
                fullname: {
                    $regex: query,
                    $options: "i"
                }
            }
        },
        {
            $project: {
                fullname: 1,
                email: 1,
                avatar: 1,
                createdAt: 1,
                role: 1,
                isPremium: 1,
                category: 1
            }
        }
    ]);

    const users = await UserModel.aggregatePaginate(aggregateUsers, options);
    console.log(users);

    return res.status(200).json(new ApiResponse(200, users, "Fetched users"));
});

export { getUsers };
