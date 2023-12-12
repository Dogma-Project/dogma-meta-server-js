import express from "express";
import dotenv from "dotenv";
import path from "node:path";

// import corsMiddleware from "./middlewares/cors";
import portMiddleware from "./middlewares/port";
import { CLIENT_STATUSES } from "./constants";

dotenv.config();

const app = express();
// app.use(corsMiddleware);
app.use(express.json());

const publicDir = path.join(__dirname, "/public");

type IFOptions = {
  ifport: number;
  host?: string;
};

const InterfaceHost = (options: IFOptions) => {
  const port = options.ifport;
  const host = options.host || process.env.VITE_HOST || "127.0.0.1"; // edit

  app.use("/", portMiddleware, express.static(publicDir));
  app.all("/api", function (req, res) {
    if (global.apiport) {
      res.redirect(307, `http://${host}:${global.apiport}`);
    } else {
      res.status(CLIENT_STATUSES.NOT_FOUND).json({
        message: "API port not set",
      });
    }
  });

  app.listen(port, host, () => {
    console.info(
      "API",
      `Serving Dogma Meta interface on [http://${host}:${port}]`
    );
  });
};

export default InterfaceHost;
