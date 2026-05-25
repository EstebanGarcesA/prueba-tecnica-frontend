import { getLocalStorage } from "../helpers/local-storage";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ componente }) {
  let token = getLocalStorage("token");
  return token ? componente : <Navigate to="/login" />;
}

export default ProtectedRoute;