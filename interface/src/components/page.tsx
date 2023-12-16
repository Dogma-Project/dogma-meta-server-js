import SetPrefix from "./set-prefix";
import ServicesManager from "./services-manager";
import { useContext } from "react";
import { AppContext } from "../context/app-context";
import { WebsocketProvider } from "../context/ws-context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { darkTheme } from "../themes/dark";

function Page() {
  const {
    state: { prefix },
  } = useContext(AppContext);

  const theme = createTheme(darkTheme);

  return (
    <WebsocketProvider prefix={prefix}>
      <ThemeProvider theme={theme}>
        {!prefix ? (
          <SetPrefix></SetPrefix>
        ) : (
          <ServicesManager></ServicesManager>
        )}
      </ThemeProvider>
    </WebsocketProvider>
  );
}

export default Page;
