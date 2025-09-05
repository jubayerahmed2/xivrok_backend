import { Router } from "express";
import { createPrompt } from "../controllers/prompt/create_prompt.controller.js";
import { verifyJWT } from "../middlewares/verify_jwt.middleware.js";
import { createPromptValidation } from "../validation/prompt.validation.js";

const router = Router();

router.use(verifyJWT);
router.route("/create").post(createPromptValidation, createPrompt);

export default router;
