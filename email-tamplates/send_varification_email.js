import { sendEmail } from "../src/utils/send_email.js";

const sendVerificationEmail = async (userEmail, fullname, code) => {
    const subject = `Verify your email - Xivrok`;

    const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Email Verification</h2>
      <p>Hi, ${fullname} </p>
      <p>Your verification code is:</p>
      <h3 style="color: #2F54EB; font-size: 30px">${code}</h3>
      <p>If you didn’t request this, you can ignore this email.</p>
      <br/>
      <p>Thanks,<br/>The Xivrok Team</p>
    </div>
  `;

    return await sendEmail({ to: userEmail, subject, html });
};

export { sendVerificationEmail };
