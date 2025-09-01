import { ApiError } from "../utils/api_error.js";

const loadEnvs = () => {
    const requiredEnvVars = [
        "MONGO_URI",
        "PORT",
        "CORS_ORIGIN",

        "ACCESS_TOKEN_SECRET",
        "ACCESS_TOKEN_EXPIRY",
        "REFRESH_TOKEN_SECRET",
        "REFRESH_TOKEN_EXPIRY",

        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",

        "NODEMAILER_USER_EMAIL",
        "NODEMAILER_PASS",
        "NODEMAILER_HOST",
        "SMTP_USER"
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
        REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,

        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

        NODEMAILER_USER_EMAIL: process.env.NODEMAILER_USER_EMAIL,
        NODEMAILER_PASS: process.env.NODEMAILER_PASS,
        NODEMAILER_HOST: process.env.NODEMAILER_HOST,
        SMTP_USER: process.env.SMTP_USER
    };
};

const envVariables = loadEnvs();
export default envVariables;
