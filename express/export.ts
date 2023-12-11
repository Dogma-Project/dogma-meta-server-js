import express from "express";
import dotenv from "dotenv";
import path from "node:path";

// import corsMiddleware from "./middlewares/cors";

dotenv.config();

const app = express();
// app.use(corsMiddleware);
app.use(express.json());

const publicDir = path.join(__dirname, "/public");

type IFOptions = {
  port?: number;
  host?: string;
};

const InterfaceHost = (options: IFOptions = {}) => {
  const port = options.port || Number(process.env.VITE_PORT) || 24599;
  const host = options.host || process.env.VITE_HOST || "127.0.0.1";

  app.use("/", express.static(publicDir));

  app.listen(port, host, () => {
    console.info(
      "API",
      `Serving Dogma Meta interface on [http://${host}:${port}]`
    );
  });
};

export default InterfaceHost;
