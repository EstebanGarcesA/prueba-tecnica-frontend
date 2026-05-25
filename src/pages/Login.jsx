import { useState, useEffect } from "react";
import { end_points } from "../services/api";
import { redirectAlert } from "../helpers/alerts";
import {
  saveLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "../helpers/local-storage";
import { Link } from "react-router-dom";

function generateToken() {
  return crypto.randomUUID();
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [users, setUsers] = useState([]);

  function getUsers() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUsers();
    const savedEmail = getLocalStorage("remember_email");
    const savedPassword = getLocalStorage("remember_password");
    if (savedEmail && savedPassword) {
      setEmail(JSON.parse(savedEmail));
      setPassword(JSON.parse(savedPassword));
      setRemember(true);
    }
  }, []);

  function findUser() {
    return users.find(
      (item) => email === item.email && password === item.password,
    );
  }

  function signIn(e) {
    e.preventDefault();
    if (email === "" || password === "")
      return redirectAlert(
        "Campos Vacíos",
        "El campo email y/o contraseña está vacío",
        "/login",
        "warning",
      );

    const auth = findUser();
    if (auth) {
      const userSession = {
        ...auth,
        fullName: auth.name,
        role: "Usuario",
      };
      saveLocalStorage("token", generateToken());
      saveLocalStorage("user", userSession);
      if (remember) {
        saveLocalStorage("remember_email", email);
        saveLocalStorage("remember_password", password);
      } else {
        removeLocalStorage("remember_email");
        removeLocalStorage("remember_password");
      }
      redirectAlert(
        "Bienvenido al sistema",
        "Será redireccionado al dashboard",
        "/dashboard",
        "success",
      );
      return;
    }

    redirectAlert(
      "Error de credenciales",
      "Email y/o contraseña incorrecto",
      "/login",
      "error",
    );
  }

  return (
    <div className="form-login-container">
      <div className="max-w-lg w-full">
        <div
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Administración de inventario
            </h2>
            <p className="mt-4 text-center text-gray-400">
              Inicia sesión para continuar
            </p>
            <form
              onSubmit={signIn}
              className="mt-8 space-y-6"
            >
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    placeholder="Email"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    placeholder="Contraseña"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label
                    className="ml-2 block text-sm text-gray-400"
                    htmlFor="remember-me"
                  >
                    Recordarme
                  </label>
                </div>
              </div>
              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                  id="login"
                  name="login"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">¿No tienes una cuenta? </span>
            <Link
              className="font-medium text-indigo-500 hover:text-indigo-400"
              to="/register"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
