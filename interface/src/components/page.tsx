import SetPrefix from "./set-prefix";
import ServicesManager from "./services-manager";
import { useContext } from "react";
import { AppContext } from "../context/app-context";
import { WebsocketProvider } from "../context/ws-context";

function Page() {
  const {
    state: { prefix },
  } = useContext(AppContext);

  return (
    <WebsocketProvider prefix={prefix}>
      {!prefix ? <SetPrefix></SetPrefix> : <ServicesManager></ServicesManager>}
    </WebsocketProvider>
  );
}

export default Page;
