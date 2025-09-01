import envVariables from "../config/env.js";
import { transporter } from "../lib/nodemailer.js";
import { ApiError } from "./api_error.js";

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `Xivrok ${envVariables.SMTP_USER}`,
            to,
            subject,
            html
        });

        console.log(info.messageId);
        return info;
    } catch (error) {
        throw new ApiError("Failed to send email");
    }
};

export { sendEmail };
