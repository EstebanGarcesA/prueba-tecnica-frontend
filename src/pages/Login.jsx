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
      {/* Contenedor central flotante con efectos de profundidad */}
      <div className="max-w-md w-full px-4 z-10">
        <div
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(249, 115, 22, 0.04)",
          }}
          className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden transform transition duration-500 hover:scale-[1.01]"
        >
          <div className="p-8">
            {/* Icono corporativo llamativo en degradado cálido */}
            <div className="flex justify-center mb-6">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 shadow-lg shadow-orange-500/20 ring-4 ring-orange-500/10">
                <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-4.5 w-4.5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
              />
            </svg>
              </div>
            </div>

            <h2 className="text-center text-2xl font-bold tracking-tight text-white">
              Administración de Inventario
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Inicia sesión para continuar al panel de control
            </p>

            <form onSubmit={signIn} className="mt-8 space-y-5">
              <div className="space-y-4 rounded-md">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    placeholder="Email corporativo"
                    className="appearance-none block w-full px-4 py-3 border border-slate-700 bg-slate-800/80 text-white rounded-xl placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition sm:text-sm"
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    placeholder="Contraseña"
                    className="appearance-none block w-full px-4 py-3 border border-slate-700 bg-slate-800/80 text-white rounded-xl placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition sm:text-sm"
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
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-700 bg-slate-800 rounded transition cursor-pointer"
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label
                    className="ml-2 block text-sm text-slate-400 cursor-pointer select-none"
                    htmlFor="remember-me"
                  >
                    Recordarme
                  </label>
                </div>
              </div>

              <div>
                <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 cursor-pointer"
                  type="submit"
                  id="login"
                  name="login"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-5 bg-slate-950/40 border-t border-slate-800/80 text-center">
            <span className="text-sm text-slate-400">¿No tienes una cuenta? </span>
            <Link
              className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
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
