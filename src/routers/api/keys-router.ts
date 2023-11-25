import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(() => {
    // get info
  })
  .post(() => {
    // create
  })
  .put(() => {
    // import
  });

export default router;
