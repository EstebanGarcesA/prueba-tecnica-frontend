import { getLocalStorage } from "../helpers/local-storage";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ componente }) {
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");

  // Validación robusta de token y usuario
  const isAuthenticated = token && user && token !== "null" && user !== "null";

  return isAuthenticated ? componente : <Navigate to="/login" replace />;
}

export default ProtectedRoute;