import { Router } from "express";
import { getSelfUser } from "../../controllers/user";

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

router.route("/self").get(getSelfUser);

router.route("/friends");

export default router;
