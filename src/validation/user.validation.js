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

const imageSchema = z
    .object({
        mimetype: z.enum(["image/jpeg", "image/png", "image/webp"]),
        size: z.number().max(5 * 1024 * 1024, "Image must be <= 5MB"),
        path: z.string() // the local file path multer gives
    })
    .optional();

const updateUserSchema = z.object({
    fullname: z.string().trim().optional(),
    category: z.string().trim().optional(),
    bio: z.string().trim().optional(),
    country: z.string().trim().optional(),
    avatar: imageSchema
});

export const resisterValidation = validate(registerValidationSchema);
export const loginValidation = validate(loginValidationSchema);
export const verifyCodeValidation = validate(verifyCodeSchema);
export const updateUserValidation = validate(updateUserSchema);
