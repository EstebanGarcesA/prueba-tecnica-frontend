import { useState } from "react";
import { end_points } from "../services/api";
import { redirectAlert } from "../helpers/alerts";
import { Link } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!fullName || !email || !username || !password) {
      return redirectAlert(
        "Campos incompletos",
        "Por favor completa todos los campos.",
        "/register",
        "warning"
      );
    }

    if (password.length < 6) {
      return redirectAlert(
        "Contraseña muy corta",
        "La contraseña debe tener al menos 6 caracteres.",
        "/register",
        "warning"
      );
    }

    setLoading(true);

    try {

      const res = await fetch(end_points.users);
      const users = await res.json();

      const emailExists = users.some((u) => u.email === email);
      const usernameExists = users.some((u) => u.username === username);

      if (emailExists) {
        setLoading(false);
        return redirectAlert(
          "Email ya registrado",
          "Ya existe una cuenta con ese correo electrónico.",
          "/register",
          "error"
        );
      }

      if (usernameExists) {
        setLoading(false);
        return redirectAlert(
          "Usuario ya en uso",
          "Ese nombre de usuario ya está registrado.",
          "/register",
          "error"
        );
      }


      const createRes = await fetch(end_points.users, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          username,
          password,
        }),
      });

      if (!createRes.ok) throw new Error("Error al crear usuario");

      redirectAlert(
        "¡Cuenta creada!",
        "Tu cuenta ha sido registrada exitosamente. Inicia sesión para continuar.",
        "/login",
        "success"
      );
    } catch {
      setLoading(false);
      redirectAlert(
        "Error inesperado",
        "No se pudo completar el registro. Intenta de nuevo.",
        "/register",
        "error"
      );
    }
  }

  const inputClass =
    "appearance-none block w-full px-4 py-3 border border-slate-700 bg-slate-800/80 text-white rounded-xl placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition sm:text-sm";

  return (
    <div className="form-login-container">
      <div className="max-w-md w-full px-4 z-10">
        <div
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(249, 115, 22, 0.04)",
          }}
          className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden transform transition duration-500 hover:scale-[1.01]"
        >
          <div className="p-8">
     
            <div className="flex justify-center mb-6">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 shadow-lg shadow-orange-500/20 ring-4 ring-orange-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-center text-2xl font-bold tracking-tight text-white">
              Crear cuenta
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Completa los datos para registrarte
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-4">
             
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="fullName">
                  Nombre completo
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Ej: Esteban Garces"
                  className={inputClass}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

          
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="register-email">
                  Correo electrónico
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="correo@ejemplo.com"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

          
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="username">
                  Usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="Ej: Egarces"
                  className={inputClass}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="register-password">
                  Contraseña
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Mínimo 6 caracteres"
                  className={inputClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="register-submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Registrando...
                    </span>
                  ) : (
                    "Crear cuenta"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="px-8 py-5 bg-slate-950/40 border-t border-slate-800/80 text-center">
            <span className="text-sm text-slate-400">¿Ya tienes una cuenta? </span>
            <Link
              className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
              to="/login"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;