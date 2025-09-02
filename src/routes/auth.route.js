import { Router } from "express";
import { loginUser } from "../controllers/auth/login.controller.js";
import { registerUser } from "../controllers/auth/register.controller.js";
import { verifyCode } from "../controllers/auth/verify_code.controller.js";
import {
    loginValidation,
    resisterValidation,
    verifyCodeValidation
} from "../validation/user.validation.js";

const router = Router();

router.route("/register").post(resisterValidation, registerUser);
router.route("/login").post(loginValidation, loginUser);
router.route("/verify-email").post(verifyCodeValidation, verifyCode);

export default router;
