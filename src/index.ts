import express from "express";
import apiRouter from "./routers/api";
import { System } from "./core";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("interface");
});
app.use("/api", apiRouter);
app.use("/events", () => {});

app.listen(3000, () => {
  console.log("Server started");
  System.run();
});
