import { createContext, useEffect, useRef, useState } from "react";
import { API } from "@dogma-project/core-meta/types/types";

type ContextType = {
  isReady: number;
  value: API.ApiRequest | null;
  send: (params: object) => void;
};

export const WebsocketContext = createContext<ContextType>({
  isReady: 0,
  value: null,
  send: () => {},
});

export const WebsocketProvider = (props: {
  children: React.ReactNode;
  api: number;
}) => {
  const [isReady, setIsReady] = useState(0);
  const [retries, setRetries] = useState(0);
  const [value, setVal] = useState(null);
  const { api } = props;

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (api) {
      const addr = `ws://${window.location.hostname}:${api}`;
      ws.current = new WebSocket(addr);

      ws.current.onopen = () => {
        setRetries(0);
        setIsReady(1);
      };
      ws.current.onclose = (ev) => {
        setIsReady(0);
        console.log("WS closed. Reason:", ev.code);
        if (retries <= 10) {
          setTimeout(() => {
            console.log("Reconnecting...");
            setRetries(retries + 1);
            ws.current = new WebSocket(addr);
          }, 1000);
        } else {
          setRetries(0);
          setIsReady(2); // offline mode
        }
      };
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WS", data.payload);
        setVal(data);
      };
      ws.current.onerror = (err) => {
        console.error("E", err);
        ws.current?.close();
      };
      return () => {
        ws.current?.close();
      };
    }
  }, [api]);

  const ret = {
    isReady,
    value,
    send: (params: object) => {
      if (ws.current && !!isReady) {
        ws.current.send(JSON.stringify(params));
      } else {
        console.warn("WS API is not ready");
      }
    },
  };

  return (
    <WebsocketContext.Provider value={ret}>
      {props.children}
    </WebsocketContext.Provider>
  );
};
