import { redirectAlert } from "../helpers/alerts"
import { getLocalStorage, removeLocalStorage } from "../helpers/local-storage"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

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
    <aside className="flex h-screen flex-col border-r border-slate-200 bg-white overflow-hidden">

      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 shadow-md shadow-orange-500/15">
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
          <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            ECOMMERCE
          </span>
        </div>
      </div>


      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-red-500/10 to-orange-500/10 ring-1 ring-orange-500/20 shadow-inner">
            <span className="text-sm font-extrabold text-orange-700">{initials}</span>
          </div>
          <div className="leading-tight">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Sesión activa</p>
            <p className="text-sm font-bold text-slate-800 leading-normal">{user.fullName}</p>
            <p className="text-xs font-semibold text-orange-600">{user.role}</p>
          </div>
        </div>
      </div>


      <nav className="flex flex-col gap-2 px-3 py-4 text-sm">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Menú principal</p>
        <Link
          to=""
          className="flex items-center gap-3 cursor-pointer rounded-xl bg-orange-50/60 px-3 py-2.5 font-bold text-orange-700 ring-1 ring-orange-500/10 hover:bg-orange-50 hover:text-orange-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 opacity-80">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
          </svg>
          <span>Tablero</span>
        </Link>
        <Link
          to="inventory/"
          className="flex items-center gap-3 cursor-pointer rounded-xl bg-orange-50/60 px-3 py-2.5 font-bold text-orange-700 ring-1 ring-orange-500/10 hover:bg-orange-50 hover:text-orange-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 opacity-80">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <span>Inventario</span>
        </Link>
      </nav>

      <div className="mx-3 border-t border-slate-100 pt-4">
        <p className="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Acciones rápidas</p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="create-offer/"
            className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center hover:bg-orange-50 hover:border-orange-200/70 transition group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-slate-400 group-hover:text-orange-600 transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 group-hover:text-orange-700 transition leading-tight">Nuevo producto</span>
          </Link>
        </div>
      </div>

      {/* Cerrar sesión */}
      <div className="mt-auto px-3 pb-5 pt-4">
        <button
          onClick={logout}
          type="button"
          className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-200/60 transition flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
  )
}

export default Sidebar


