import { Router } from "express";
import { getServices } from "../../controllers/services";

const router = Router();

router.route("/").get(getServices);

export default router;
