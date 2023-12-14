import { AppContextProvider } from "./context";
import Page from "./components/page";
import Loader from "./components/loader";

console.log("222", import.meta.env);

function App() {
  return (
    <AppContextProvider>
      <Loader></Loader>
      <Page></Page>
    </AppContextProvider>
  );
}

export default App;
