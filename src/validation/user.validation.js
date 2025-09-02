import z from "zod";
import { validate } from "../utils/zod_validate.js";

const registerValidationSchema = z.object({
    email: z.email("Email is required").trim().toLowerCase(),
    password: z
        .string("password is required")
        .min(6, "Password at least minimum 6 character or long.")
        .trim(),
    fullname: z.string("fullname is required").trim(),
    category: z.string("category is required").trim(),
    bio: z.string().trim().optional(),
    country: z.string().trim().optional()
});

const loginValidationSchema = z.object({
    email: z.email("Email is required").trim().toLowerCase(),
    password: z
        .string("password is required")
        .min(6, "Password at least minimum 6 character or long.")
        .trim()
});

const verifyCodeSchema = z.object({
    email: z.email("Email is required").trim().toLowerCase(),
    code: z.string("verify code is required")
});

export const resisterValidation = validate(registerValidationSchema);
export const loginValidation = validate(loginValidationSchema);
export const verifyCodeValidation = validate(verifyCodeSchema);
