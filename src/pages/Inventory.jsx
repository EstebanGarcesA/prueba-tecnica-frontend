import { useState, useEffect } from "react";
import { end_points } from "../services/api";
import { Link } from "react-router-dom";

function Inventory() {
  const [products, setProducts] = useState([]);

  function getProducts() {
    fetch(end_points.products)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getProducts();
  }, []);

  function deleteProducts(id) {
    fetch(end_points.productos + "/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getProducs();
      });
  }

  console.log(products);
  return (
    <section className="mt-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Ofertas</p>
          <p className="mt-1 text-sm text-slate-600">
            Administra vacantes y revisa su información principal.
          </p>
        </div>
        <Link
          to="../create-offer/"
          className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Crear oferta
        </Link>
      </header>

      {products.length <= 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No hay ofertas disponibles
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item) => (
            <article
              key={item.id}
              className="flex min-h-55 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 truncate text-sm text-slate-600">
                    {item.company} · {item.location}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-700/10">
                  {item.status ?? "open"}
                </span>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Senioridad</span>
                  <span className="font-medium text-slate-900">
                    {item.seniority}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Modalidad</span>
                  <span className="font-medium text-slate-900">
                    {item.modality}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Fecha</span>
                  <span className="font-medium text-slate-900">
                    {item.postedAt}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Rango</span>
                  <span className="font-medium text-slate-900">
                    {item.currency ?? "USD"} {item.salaryMin ?? "—"} -{" "}
                    {item.salaryMax ?? "—"}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="text-xs text-slate-500">ID: {item.id}</span>

                <div className="flex items-center gap-2">
                  <Link
                    to={`../edit-offer/${item.id}/`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-800"
                    aria-label="Editar"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteProducts(item.id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-red-700"
                    aria-label="Eliminar"
                  >
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    aria-label="Ver"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
export default Inventory;