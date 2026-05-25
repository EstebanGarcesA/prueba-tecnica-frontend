import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Board from "../pages/Board";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import CreateProducts from "../pages/createProducts";
import EditProducts from "../pages/EditProducts";
import ProtectedRoute from "../pages/ProtectedRoute";

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
  },
  {
    path: "/dashboard/",
    element: <ProtectedRoute componente={<Dashboard />} />,
    children: [
      {
        path: "board/",
        element: <Board />,
      },
      {
        path: "inventory/",
        element: <Inventory />,
      },
      {
        path: "create-offer/",
        element: <CreateProducts />,
      },
      {
        path: "edit-offer/:id/",
        element: <EditProducts />,
      },
    ],
  },
]