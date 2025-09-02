import { Router } from "express";
import { deleteUser } from "../controllers/user/delete_user.controller.js";
import { getUserDetails } from "../controllers/user/get_user.controller.js";
import { getUsers } from "../controllers/user/get_users.controller.js";
import { updateAvatar } from "../controllers/user/update_avatar.controller.js";
import { UpdateRecentView } from "../controllers/user/update_recent_view.controller.js";
import { updateRote } from "../controllers/user/update_role.controller.js";
import { updataUserDetails } from "../controllers/user/update_user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    verifyAdmin,
    verifyJWT
} from "../middlewares/verify_jwt.middleware.js";
import {
    passwordValidation,
    updateUserValidation
} from "../validation/user.validation.js";

const router = Router();

router.use(verifyJWT);
router.route("/details").get(getUserDetails);

router.route("/recent-viewed-ais/:aiId").patch(UpdateRecentView);
router.route("/update").patch(updateUserValidation, updataUserDetails);
router.route("/update-avatar").patch(upload.single("avatar"), updateAvatar);

router.route("/delete").delete(passwordValidation, deleteUser);

// admin only routes
router.route("/").get(verifyAdmin, getUsers); // query params included
router.route("/update-role/:userId").get(verifyAdmin, updateRote);

export default router;
