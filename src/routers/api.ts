import express from "express";

import clientErrorMiddleware from "../middlewares/clientError";
import serverErrorMiddleware from "../middlewares/serverError";
import notFoundErrorMiddleware from "../middlewares/notFoundError";
// import authenticatedMiddleware from "../middlewares/authenticated";
// import authorizedMiddleware from "../middlewares/authorized";
import prefixMiddleware from "../middlewares/prefix";

import servicesRouter from "./api/services-router";
import coreRouter from "./api/core-router";
import keysRouter from "./api/keys-router";
import userRouter from "./api/user-router";
import nodeRouter from "./api/node-router";
import dhtRouter from "./api/dht-router";
import configRouter from "./api/config-router";
import networkRouter from "./api/network-router";
import mainDbsMiddleware from "../middlewares/mainDbs";

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "ok 1" }));
router.get("/info", (req, res) => res.json({ status: "ok 2" }));

// check
router.use("/core", coreRouter); // edit

// only prefix
router.use("/services", prefixMiddleware, servicesRouter);
router.use("/keys", prefixMiddleware, keysRouter);
router.use("/config", prefixMiddleware, configRouter); // add config middleware

// full dependent
router.use("/user", prefixMiddleware, mainDbsMiddleware, userRouter);
router.use("/node", prefixMiddleware, mainDbsMiddleware, nodeRouter);
router.use("/dht", prefixMiddleware, mainDbsMiddleware, dhtRouter);
router.use("/network", prefixMiddleware, mainDbsMiddleware, networkRouter);

router.use(clientErrorMiddleware);
router.use(serverErrorMiddleware);
router.use(notFoundErrorMiddleware);

export default router;
