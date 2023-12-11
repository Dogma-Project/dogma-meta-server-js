import RunManager from "@dogma-project/core-meta";
import InterfaceHost from "./export";

InterfaceHost({
  port: 29314,
});
RunManager(Number(process.env.VITE_PORT) || 29315);
