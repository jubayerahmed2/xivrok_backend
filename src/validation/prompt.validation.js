import z from "zod";
import { validate } from "../utils/zod_validate.js";

const createPromptSchema = z.object({
    content: z.string("Content is required"),
    author: z.string("Author id is required"),
    tags: z.array(z.string())
});

export const createPromptValidation = validate(createPromptSchema);
