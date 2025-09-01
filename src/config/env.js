import { ApiError } from "../utils/api_error.js";

const loadEnvs = () => {
    const requiredEnvVars = [
        "MONGO_URI",
        "PORT",
        "CORS_ORIGIN",

        "ACCESS_TOKEN_SECRET",
        "ACCESS_TOKEN_EXPIRY",
        "REFRESH_TOKEN_SECRET",
        "REFRESH_TOKEN_EXPIRY"
    ];

    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new ApiError(500, `${envVar} env variable is required`);
        }
    });

    return {
        MONGO_URI: process.env.MONGO_URI,
        PORT: process.env.PORT,
        CORS_ORIGIN: process.env.CORS_ORIGIN,

        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY
    };
};

const envVariables = loadEnvs();
export default envVariables;
