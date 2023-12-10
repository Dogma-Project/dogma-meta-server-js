import { Router } from "express";
import { getNetwork } from "../../controllers/network";

const router = Router();

router.route("/").get(getNetwork);

export default router;
