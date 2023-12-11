import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context";
import SetPrefix from "./set-prefix";
import ServicesManager from "./services-manager";

function Page() {
  const [prefix, setPrefix] = useState<string | undefined>();

  return (
    <>
      {!prefix ? (
        <SetPrefix setPrefix={setPrefix}></SetPrefix>
      ) : (
        <ServicesManager></ServicesManager>
      )}
    </>
  );
}

export default Page;
