import express from "express";
import dotenv from "dotenv";
import path from "node:path";

// import corsMiddleware from "./middlewares/cors";

dotenv.config();

const app = express();
// app.use(corsMiddleware);
app.use(express.json());

const publicDir = path.join(__dirname, "/public");

type ApiOptions = {
  apiport?: number;
  apihost?: string;
  static?: string;
};

const InterfaceHost = (options: ApiOptions = {}) => {
  const port =
    options.apiport ||
    Number(process.env.VITE_PORT) ||
    Number(process.env.HEADLESS_PORT) ||
    24600;
  const host = options.apihost || process.env.HEADLESS_HOST || "127.0.0.1";

  app.use("/", express.static(options.static || publicDir));

  app.listen(port, host, () => {
    console.info(
      "API",
      `Serving Dogma Meta interface on [http://${host}:${port}]`
    );
  });
};

export default InterfaceHost;
