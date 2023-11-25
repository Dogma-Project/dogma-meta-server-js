import { Router } from "express";
import { getSelfNode } from "../../controllers/node";

const router = Router();

router
  .route("/")
  .get(() => {
    // get user
  })
  .post(() => {
    // create
  })
  .put(() => {
    // import
  });

router.route("/self").get(getSelfNode);

router.route("/nodes");

export default router;
