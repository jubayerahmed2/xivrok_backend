import { ApiResponse } from "./api_response.js";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            const result = schema.safeParse(req.body);
            const message = JSON.parse(result.error?.message);

            return res
                .status(400)
                .json(new ApiResponse(400, message[0].message));
        }
    };
};

export { validate };
