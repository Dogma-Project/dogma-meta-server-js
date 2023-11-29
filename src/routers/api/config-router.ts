import { Router } from "express";
import { getConfig, setConfig } from "../../controllers/config";

const router = Router();

router.route("/").get(getConfig).put(setConfig);

export default router;
