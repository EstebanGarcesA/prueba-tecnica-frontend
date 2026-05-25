import { redirectAlert } from "../helpers/alerts"
import { getLocalStorage, removeLocalStorage } from "../helpers/local-storage"
import { Link } from "react-router-dom"

function Sidebar() {
  const user = JSON.parse(getLocalStorage("user")) || {};
  const initials = user.fullName 
    ? user.fullName.split(" ").map((item) => item[0]).join("") 
    : "";

  function logout() {
    removeLocalStorage("user");
    removeLocalStorage("token");
    redirectAlert("Cerrando Sesion", "Será redireccionado al login", "/login", "info");
  }
  return (
    (
    <aside className="flex h-screen flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-red-500/10 to-orange-500/10 ring-1 ring-orange-500/20">
            <span className="text-sm font-bold text-orange-700">{initials}</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-slate-800">{user.fullName}</p>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-3 py-4 text-sm">
        <Link to="" className="cursor-pointer rounded-xl bg-orange-50/60 px-3 py-2 font-semibold text-orange-700 ring-1 ring-orange-500/10 hover:bg-orange-50 hover:text-orange-800 transition">
          Tablero
        </Link>
        <Link to="inventory/" className="cursor-pointer rounded-xl bg-orange-50/60 px-3 py-2 font-semibold text-orange-700 ring-1 ring-orange-500/10 hover:bg-orange-50 hover:text-orange-800 transition">
          Inventario
        </Link>

        <button
          onClick={logout}
          type="button"
          className="mt-auto w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-200/60 transition"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
  )
}

export default Sidebar