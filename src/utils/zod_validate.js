import { ApiError } from "./api_error.js";

const validate = (schema) => {
    return (req, _, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            const result = schema.safeParse(req.body);
            const message = JSON.parse(result.error?.message);

            throw new ApiError(400, message[0].message);
        }
    };
};

export { validate };
