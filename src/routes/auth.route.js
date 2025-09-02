import { Router } from "express";
import { registerUser } from "../controllers/auth/register.controller.js";
import { resisterValidation } from "../validation/user.validation.js";

const router = Router();

router.route("/register").post(resisterValidation, registerUser);

export default router;
