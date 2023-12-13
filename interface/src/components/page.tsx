import SetPrefix from "./set-prefix";
import ServicesManager from "./services-manager";
import { useContext } from "react";
import { AppContext } from "../context/app-context";

function Page() {
  const {
    state: { prefix },
  } = useContext(AppContext);

  return (
    <>
      {!prefix ? <SetPrefix></SetPrefix> : <ServicesManager></ServicesManager>}
    </>
  );
}

export default Page;
