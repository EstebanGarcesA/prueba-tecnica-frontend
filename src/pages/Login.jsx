import { useState, useEffect } from "react";

const Login = () => {
  const [user, setUser] = useState("");
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
  }, []);

  function findUser() {
    let auth = users.find(
      (item) => user == item.username && password == item.password,
    );
    return auth;
  }

  function signIn(e) {
    e.preventDefault();
    if (user === "" || password === "")
      return redirectAlert(
        "Campos Vacíos",
        "El campo usuario y/o contraseña está vacío",
        "/login",
        "warning",
      );
    if (findUser()) {
      saveLocalStorage("token", generateToken());
      saveLocalStorage("user", findUser());
      redirectAlert(
        "Bienvenido al aistema",
        "Será redireccionado al dashboard",
        "/dashboard",
        "success",
      );
      return;
    }
    if (findUser() == undefined)
      return redirectAlert(
        "Error de credenciales",
        "Usuario y/o conttaseña incorrecto",
        "/login",
        "error",
      );
  }

  function Login() {
    return (
      <div className="form-login-container">
        <div className="max-w-lg w-full">
          <div style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-center text-3xl font-extrabold text-white">
                Administración de inventario
              </h2>
              <p className="mt-4 text-center text-gray-400">Inicia sesión para continuar</p>
              <form method="POST" action="#" className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm">
                  <div>
                    <label className="sr-only" htmlFor="email">Email</label>
                    <input placeholder="Email" className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required autoComplete="email" type="email" name="email" id="email" />
                  </div>
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="password">Contraseña</label>
                    <input placeholder="Contraseña" className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required autoComplete="current-password" type="password" name="password" id="password" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded" type="checkbox" name="remember-me" id="remember-me" />
                    <label className="ml-2 block text-sm text-gray-400" htmlFor="remember-me">Remember me</label>
                  </div>

                </div>
                <div>
                  <button className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit"
                    id="login"
                    name="login"
                    onClick={(e) => signIn(e)}
                  >
                    Inicar Sesión
                  </button>
                </div>
              </form>
            </div>
            <div className="px-8 py-4 bg-gray-700 text-center">
              <span className="text-gray-400">¿No tienes una cuenta?</span>
              <a className="font-medium text-indigo-500 hover:text-indigo-400" href="#"> registrarse</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

  export default Login