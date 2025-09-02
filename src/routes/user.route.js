import { Router } from "express";
import { updataUserDetails } from "../controllers/user/update_user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/verify_jwt.middleware.js";
import { updateUserValidation } from "../validation/user.validation.js";

const router = Router();

router.use(verifyJWT);
router
    .route("/update")
    .patch(upload.single("avatar"), updateUserValidation, updataUserDetails);

export default router;
