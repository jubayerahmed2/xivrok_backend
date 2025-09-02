import { Router } from "express";
import { loginUser } from "../controllers/auth/login.controller.js";
import { logoutUser } from "../controllers/auth/logout.controller.js";
import { refreshAccessToken } from "../controllers/auth/refresh_access_token.controller.js";
import { registerUser } from "../controllers/auth/register.controller.js";
import { verifyCode } from "../controllers/auth/verify_code.controller.js";
import { verifyJWT } from "../middlewares/verify_jwt.js";
import {
    loginValidation,
    resisterValidation,
    verifyCodeValidation
} from "../validation/user.validation.js";

const router = Router();

router.route("/register").post(resisterValidation, registerUser);
router.route("/login").post(loginValidation, loginUser);
router.route("/verify-email").post(verifyCodeValidation, verifyCode);
router.route("/refresh-token").post(refreshAccessToken);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
