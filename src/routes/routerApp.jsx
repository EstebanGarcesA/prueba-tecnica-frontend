import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";

export let routerApp = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]