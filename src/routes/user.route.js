import { Router } from "express";
import { updateAvatar } from "../controllers/user/update_avatar.controller.js";
import { updataUserDetails } from "../controllers/user/update_user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/verify_jwt.middleware.js";
import {
    imageValidation,
    updateUserValidation
} from "../validation/user.validation.js";

const router = Router();

router.use(verifyJWT);
router.route("/update").patch(updateUserValidation, updataUserDetails);

router
    .route("/update-avatar")
    .patch(upload.single("avatar"), imageValidation, updateAvatar);

export default router;
