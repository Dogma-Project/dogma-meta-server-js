import { createContext, useReducer } from "react";

const defaultAuthState: object = {};

type action = {
  type: string;
  value: object;
};

type ContextType = {
  state: typeof defaultAuthState;
  dispatch: React.Dispatch<action>;
};

export const AuthContext = createContext<ContextType>({
  state: defaultAuthState,
  dispatch: () => null,
});

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const tasksReducer = (state: typeof defaultAuthState, action: action) => {
    switch (action.type) {
      case "set": {
        return { ...state, ...action.value };
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  };

  const [state, dispatch] = useReducer(tasksReducer, defaultAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
