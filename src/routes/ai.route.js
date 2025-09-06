import { Router } from "express";
import { createAi } from "../controllers/ai/create_ai.controller.js";
import { deleteAi } from "../controllers/ai/delete_ai.controller.js";
import { getAi } from "../controllers/ai/get_ai.controller.js";
import { recommendation } from "../controllers/ai/recommendation.controller.js";
import { updateAi } from "../controllers/ai/update_ai.controller.js";
import { updateAiLogo } from "../controllers/ai/update_logo.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    verifyAdmin,
    verifyJWT
} from "../middlewares/verify_jwt.middleware.js";
import {
    createAiValidation,
    updateAiValidation
} from "../validation/ai.validation.js";

const router = Router();

router.use(verifyJWT);

// TODO: Populating operations
router.route("/ai/:aiId").get(getAi);
router.route("/recommendation").get(recommendation);

// Admin Only routes
router
    .route("/create")
    .post(verifyAdmin, upload.single("logo"), createAiValidation, createAi);

router.route("/update/:aiId").put(verifyAdmin, updateAiValidation, updateAi);
router
    .route("/update-logo/:aiId")
    .patch(verifyAdmin, upload.single("logo"), updateAiLogo);
router.route("/delete/:aiId").delete(verifyAdmin, deleteAi);

export default router;
