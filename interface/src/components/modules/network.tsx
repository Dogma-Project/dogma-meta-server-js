import { useContext, useEffect } from "react";
import { AppContext } from "../../context";

function Network() {
  const {
    state: { network },
    dispatch,
    apiRequest,
  } = useContext(AppContext);

  useEffect(() => {
    apiRequest("GET", "/network", {
      cb: (data) => {
        dispatch({
          type: "set",
          value: {
            network: data,
          },
        });
      },
    });
  }, []);

  return <>{JSON.stringify(network)}</>;
}

export default Network;
