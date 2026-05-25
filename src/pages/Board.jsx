import { useEffect, useState } from "react";
import { end_points } from "../services/api";

const Board = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(end_points.productos)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalProductos = productos.length;
  const stockTotal = productos.reduce((acc, p) => acc + Number(p.stock || 0), 0);
  const precioPromedio =
    totalProductos > 0
      ? (
          productos.reduce((acc, p) => acc + Number(p.precio || 0), 0) /
          totalProductos
        ).toFixed(2)
      : "0.00";

  const categorias = [...new Set(productos.map((p) => p.categoria).filter(Boolean))].length;

  const topProductos = [...productos]
    .sort((a, b) => Number(b.precio) - Number(a.precio))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm text-slate-500">Cargando tablero...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Tarjetas de resumen */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard
          label="Productos"
          value={totalProductos}
          sub="en el catálogo"
          color="orange"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          }
        />
        <StatCard
          label="Stock total"
          value={stockTotal}
          sub="unidades disponibles"
          color="amber"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
          }
        />
        <StatCard
          label="Precio promedio"
          value={`$${precioPromedio}`}
          sub="por producto"
          color="red"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          }
        />
        <StatCard
          label="Categorías"
          value={categorias}
          sub="tipos de producto"
          color="orange"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          }
        />
      </section>

      {/* Tabla top productos */}
      <section className="mt-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-slate-800">Productos más costosos</p>
            <span className="rounded-full bg-orange-600/10 px-3 py-1 text-xs font-semibold text-orange-800">
              Top {topProductos.length}
            </span>
          </div>

          {topProductos.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">No hay productos aún.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-12 gap-2 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Nombre</div>
                <div className="col-span-3">Categoría</div>
                <div className="col-span-2 text-center">Stock</div>
                <div className="col-span-2 text-right">Precio</div>
              </div>
              <div className="divide-y divide-slate-100">
                {topProductos.map((p, i) => (
                  <div key={p.id} className="grid grid-cols-12 gap-2 px-4 py-3 text-sm items-center hover:bg-slate-50/70 transition">
                    <div className="col-span-1 text-slate-400 font-mono text-xs">{i + 1}</div>
                    <div className="col-span-4 font-medium text-slate-900 truncate">{p.nombre}</div>
                    <div className="col-span-3">
                      <span className="inline-block rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700 border border-orange-200/60">
                        {p.categoria || "—"}
                      </span>
                    </div>
                    <div className="col-span-2 text-center text-slate-600 font-medium">{p.stock}</div>
                    <div className="col-span-2 text-right font-bold text-orange-600">${Number(p.precio).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

function StatCard({ label, value, sub, color, icon }) {
  const colors = {
    orange: "from-orange-500/10 to-amber-500/10 text-orange-600 ring-orange-500/20",
    amber: "from-amber-500/10 to-yellow-500/10 text-amber-600 ring-amber-500/20",
    red: "from-red-500/10 to-orange-500/10 text-red-600 ring-red-500/20",
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-start gap-4">
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-tr ring-1 ${colors[color]}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

export default Board;