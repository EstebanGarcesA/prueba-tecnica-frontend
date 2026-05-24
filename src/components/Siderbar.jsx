import { redirectAlert } from "../helpers/alerts"
import { getLocalStorage, removeLocalStorage } from "../helpers/local-storage"
import { Link } from "react-router-dom"

function Siderbar() {
  let user = JSON.parse(getLocalStorage("user"))
  let initials = user.fullName.split(" ").map((item) => item[0]).join("")
  function logout() {
    removeLocalStorage("user")
    redirectAlert("Cerrando Sesion", "Será redireccionado al login", "/login", "info")
  }
  return (
    (
    <aside className="flex h-screen flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/10 ring-1 ring-blue-700/15">
            <span className="text-sm font-semibold text-blue-800">{initials}</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-blue-900">{user.fullName}</p>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-3 py-4 text-sm">
        <Link to="board/" className="cursor-pointer rounded-xl bg-blue-50 px-3 py-2 font-medium text-blue-800 ring-1 ring-blue-700/10">
          Tablero
        </Link>
        <Link to="offers/" className="cursor-pointer rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50">Ofertas</Link>
        <Link to="candidates/" className="cursor-pointer rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50">Postulantes</Link>

        <button
          onClick={logout}
          type="button"
          className="mt-auto w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-blue-800 hover:bg-slate-50"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
  )
}

export default Siderbar