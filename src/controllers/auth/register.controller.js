import { sendVerificationEmail } from "../../../email-tamplates/send_varification_email.js";
import { UserModel } from "../../models/user.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

export const verifyEmailSendAndUpdate = async (email, fullname) => {
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    await UserModel.updateOne(
        { "emails.email": email },
        {
            $set: {
                "emails.$.verifyCode": verifyCode,
                "emails.$.verifyCodeExpiry": expiryDate,
                "emails.$.isVerified": false
            }
        }
    );

    // Send verification email
    const emailResponse = await sendVerificationEmail(
        email,
        fullname,
        verifyCode
    );

    return emailResponse;
};

const registerUser = asyncHandler(async (req, res) => {
    /*
    -> Get data from req.body - email, password, fullname, category, bio, country
    -> Validate via Zod 
    -> check email already exits:
      - if exist: check is email verified, 
                if yes, just return "email already exist"
                if not, resend email verification code
    -> if email doesn't exits: create new user and send verification email
    -> return response 
    */

    const { email, password, fullname, category, bio, country } = req.body;
    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
        if (emailExist.isVerified) {
            return res.status(
                new ApiError(409, "User already exist with the email")
            );
        }

        // TODO: resent email
        const verifyEmail = await verifyEmailSendAndUpdate(email, fullname);

        if (verifyEmail.rejected?.length) {
            throw new ApiError(500, "Email not sent");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    null,
                    "Email already exist. verification email sent"
                )
            );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const newUser = await UserModel.create({
        email,
        password,
        fullname,
        category,
        bio: bio || null,
        country: country || null,
        verifyCode,
        verifyExpiry: expiryDate
    });

    const emailResponse = await sendVerificationEmail(
        email,
        fullname,
        verifyCode
    );

    if (emailResponse.rejected?.length || emailResponse.responseCode >= 400) {
        // remove user from database
        await UserModel.findByIdAndDelete(newUser._id);

        throw new ApiError(404, "Invalid email address");
    }

    const user = await UserModel.findById(newUser._id).select(
        "-password -refreshToken"
    );

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                user,
                "Register user successfully. Verification email sent"
            )
        );
});

export { registerUser };
