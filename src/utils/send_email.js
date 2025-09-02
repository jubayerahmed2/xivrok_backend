import envVariables from "../config/env.js";
import { transporter } from "../lib/nodemailer.js";

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `${envVariables.SMTP_USER}`,
            to,
            subject,
            html
        });

        return info;
    } catch (error) {
        return {
            ...error,
            message: "Email is not valid"
        };
    }
};

export { sendEmail };
