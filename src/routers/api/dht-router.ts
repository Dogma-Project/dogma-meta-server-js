import { Router } from "express";
import { getAll, announce } from "../../controllers/dht";

const router = Router();

router.route("/").get(getAll).post(announce);

export default router;
