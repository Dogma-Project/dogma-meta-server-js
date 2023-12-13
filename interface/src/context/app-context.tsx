import { createContext, useReducer } from "react";
import { C_Event, C_System } from "@dogma-project/constants-meta";
import getApiPort from "../helpers/getApiPort";

// import { API_PATH } from "../const";

type AdditionalParams = {
  params?: object;
  cb?: (data: object | unknown[]) => void;
};

class AppState {
  prefix: string = "";
  prefixes: string[] = [];
  services: {
    service: C_Event.Type.Service;
    state: C_System.States;
  }[] = [];
  busy: boolean = true;
  loading: boolean = false;
  network: unknown[] = [];
  online: boolean = false;
}

type action = {
  type: string;
  value: object;
};

type request = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  additional?: AdditionalParams
) => void;

type ContextType = {
  state: AppState;
  dispatch: React.Dispatch<action>;
  managerRequest: request;
};

const defaultValue = new AppState();

const busy = {
  type: "set",
  value: {
    busy: true,
  },
};

const unbusy = {
  type: "set",
  value: {
    busy: false,
  },
};

export const AppContext = createContext<ContextType>({
  state: defaultValue,
  dispatch: () => null,
  managerRequest: () => null,
});

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const tasksReducer = (state: AppState, action: action) => {
    switch (action.type) {
      case "set": {
        return { ...state, ...action.value };
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  };

  const [state, dispatch] = useReducer(tasksReducer, defaultValue);

  const managerRequest = (
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    additional?: AdditionalParams
  ) => {
    dispatch(busy);
    const query: RequestInit = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: undefined,
    };
    if (additional && additional.params) {
      query.body = JSON.stringify(additional.params);
    }

    const apiport = getApiPort();

    const API_PATH = apiport
      ? `${window.location.protocol}//${window.location.hostname}:${apiport}`
      : "/api";

    fetch(API_PATH + path, query)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(unbusy);
        if (additional && additional.cb) {
          additional.cb(data || {});
        }
      })
      .catch((err) => {
        dispatch(unbusy);
        console.error(err); // add handler
      });
  };

  return (
    <AppContext.Provider value={{ state, managerRequest, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
