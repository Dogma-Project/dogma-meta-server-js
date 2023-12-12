import RunManager from "@dogma-project/core-meta";
import InterfaceHost from "./export";

declare global {
  var apiport: number;
}

RunManager(Number(process.env.VITE_PORT) || 29315)
  .then((port) => {
    global.apiport = port || 0;
    InterfaceHost({ ifport: 29314 });
  })
  .catch((err) => {
    //
  });
