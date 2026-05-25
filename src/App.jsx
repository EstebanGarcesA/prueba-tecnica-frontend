import { Navigate } from "react-router-dom";
import { getLocalStorage } from "./helpers/local-storage";

function App() {
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");
  const isAuthenticated = token && user && token !== "null" && user !== "null";

  return isAuthenticated ? (
    <Navigate to="/dashboard/board/" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;