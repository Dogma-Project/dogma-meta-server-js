import { Router } from "express";
import { createKey } from "../../controllers/keys";

const router = Router();

router
  .route("/")
  .get(() => {
    // get info
  })
  .post(createKey)
  .put(() => {
    // import
  });

export default router;
