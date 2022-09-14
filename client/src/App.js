import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./context/Auth";
import { BrowserRouter } from "react-router-dom";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  return (
    <AuthProvider>
      <BrowserRouter>
        {code ? <Dashboard code={code} /> : <Login />}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
