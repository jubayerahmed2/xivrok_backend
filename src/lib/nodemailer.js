import nodemailer from "nodemailer";
import envVariables from "../config/env.js";

const transporter = nodemailer.createTransport({
    host: envVariables.NODEMAILER_HOST,
    port: 587,
    secure: false,
    auth: {
        user: envVariables.NODEMAILER_USER_EMAIL,
        pass: envVariables.NODEMAILER_PASS
    }
});

export { transporter };
