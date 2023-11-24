import { Router } from "express";
import { setPrefixHandler, getPrefixHandler } from "../../controllers/core";

const router = Router();

router.route("/prefix").get(getPrefixHandler).post(setPrefixHandler);

export default router;
