import SetPrefix from "./set-prefix";
import ServicesManager from "./services-manager";
import { useContext } from "react";
import { AppContext } from "../context/app-context";
import { WebsocketProvider } from "../context/ws-context";

function Page() {
  const {
    state: { prefix, api },
  } = useContext(AppContext);

  return (
    <>
      {!prefix ? (
        <SetPrefix></SetPrefix>
      ) : (
        <WebsocketProvider api={api}>
          <ServicesManager></ServicesManager>
        </WebsocketProvider>
      )}
    </>
  );
}

export default Page;
