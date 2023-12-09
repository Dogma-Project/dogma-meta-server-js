import { AuthContextProvider, AppContextProvider } from "./context";
import Page from "./components/page";
import Loader from "./components/loader";

function App() {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Loader></Loader>
        <Page></Page>
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default App;
