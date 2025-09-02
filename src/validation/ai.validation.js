import z from "zod";
import { validate } from "../utils/zod_validate.js";

const aiValidationSchema = z.object({
    name: z.string("name is required").trim(),
    description: z.string("description is required").trim(),
    category: z.string("category is required").trim(),
    tags: z.array(z.string("at least one tag is required")),
    usage: z.string().optional(),
    // logo: validate manualy
    liveLink: z.string("liveLink is required"),
    launchedAt: z.date().optional(),
    batch: z.string().optional()
});

const updateAiValidationSchema = z.object({
    name: z.string("name is required").trim().optional(),
    description: z.string("description is required").trim().optional(),
    category: z.string("category is required").trim().optional(),
    tags: z.array(z.string("at least one tag is required")).optional(),
    usage: z.string().optional(),
    // logo: validate manualy
    liveLink: z.string("liveLink is required").optional(),
    launchedAt: z.date().optional(),
    batch: z.string().optional()
});

export const createAiValidation = validate(aiValidationSchema);
export const updateAiValidation = validate(updateAiValidationSchema);
