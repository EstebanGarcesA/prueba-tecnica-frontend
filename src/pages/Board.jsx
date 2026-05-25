const Board = () => {
  return (
    <div>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs text-slate-500">Usuarios</p>
          <p className="mt-2 text-3xl font-semibold">8</p>
          <p className="mt-2 text-sm text-slate-600">Equipo activo</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs text-slate-500">Ofertas</p>
          <p className="mt-2 text-3xl font-semibold">5</p>
          <p className="mt-2 text-sm text-slate-600">Vacantes abiertas</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs text-slate-500">Postulantes</p>
          <p className="mt-2 text-3xl font-semibold">23</p>
          <p className="mt-2 text-sm text-slate-600">En proceso</p>
        </div>
      </section>

      <section className="mt-6 grid flex-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Tablero</p>
            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-800">
              Estado
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Revisión</p>
              <p className="mt-1 text-2xl font-semibold">12</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Entrevistas</p>
              <p className="mt-1 text-2xl font-semibold">7</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Oferta</p>
              <p className="mt-1 text-2xl font-semibold">3</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Contratado</p>
              <p className="mt-1 text-2xl font-semibold">1</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Ofertas con más postulantes</p>
            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-800">
              Top
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-12 gap-2 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-600">
              <div className="col-span-8">Oferta</div>
              <div className="col-span-4 text-right">Postulantes</div>
            </div>
            <div className="divide-y divide-slate-200">
              <div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
                <div className="col-span-8 font-medium text-slate-900">
                  Product Manager
                </div>
                <div className="col-span-4 text-right font-semibold text-blue-900">
                  34
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
                <div className="col-span-8 font-medium text-slate-900">
                  Frontend
                </div>
                <div className="col-span-4 text-right font-semibold text-blue-900">
                  21
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
                <div className="col-span-8 font-medium text-slate-900">
                  Data Analyst
                </div>
                <div className="col-span-4 text-right font-semibold text-blue-900">
                  17
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Board;