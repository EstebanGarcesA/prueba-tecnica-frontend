import { useState, useEffect } from "react";
import { end_points } from "../services/api";
import { Link } from "react-router-dom";
import { confirmAlert, generalAlert } from "../helpers/alerts";

function isImageUrl(imagen) {
  return typeof imagen === "string" && /^https?:\/\//i.test(imagen.trim());
}

function formatPrice(precio) {
  const value = Number(precio);
  if (Number.isNaN(value)) return precio;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatStock(stock) {
  const value = Number(stock);
  if (Number.isNaN(value)) return stock;
  return new Intl.NumberFormat("es-CO").format(value);
}

function ProductImage({ nombre, imagen }) {
  if (isImageUrl(imagen)) {
    return (
      <img
        src={imagen}
        alt={nombre}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-10 w-10 opacity-60"
        aria-hidden="true"
      >
        <path d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm0 1.5h15a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Zm3 3.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm8.25 0a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM6 15.75l3-3 2.25 2.25L15 12l3 3H6Z" />
      </svg>
      <span className="px-3 text-center text-xs font-medium">
        {imagen || "Sin imagen"}
      </span>
    </div>
  );
}

function Inventory() {
  const [products, setProducts] = useState([]);

  function getProducts() {
    fetch(end_points.productos)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getProducts();
  }, []);

  function deleteProducts(id) {
    confirmAlert(
      "¿Estás seguro?",
      "¡No podrás revertir esta acción!",
      "warning",
      () => {
        fetch(end_points.productos + "/" + id, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            getProducts();
            generalAlert(
              "¡Eliminado!",
              "El producto ha sido eliminado correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error al eliminar el producto:", error);
            generalAlert(
              "Error",
              "Hubo un problema al intentar eliminar el producto.",
              "error"
            );
          });
      }
    );
  }

  return (
    <section className="mt-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Inventario</p>
          <p className="mt-1 text-sm text-slate-600">
            Administra productos y revisa su información principal.
          </p>
        </div>
        <Link
          to="../create-offer/"
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 px-4 py-2 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-orange-500/15"
        >
          Crear producto
        </Link>
      </header>

      {products.length <= 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No hay productos disponibles
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-md ring-1 ring-slate-200/80 transition hover:border-slate-400 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-slate-300">
                <ProductImage nombre={item.nombre} imagen={item.imagen} />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-500/25 backdrop-blur-sm shadow-sm">
                  {item.categoria}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
                  {item.nombre}
                </h3>

                <p className="mt-2 text-xl font-extrabold text-orange-600">
                  {formatPrice(item.precio)}
                </p>

                <div className="mt-4 grid gap-2 text-sm text-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Stock</span>
                    <span className="font-medium text-slate-900">
                      {formatStock(item.stock)} unidades
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Categoría</span>
                    <span className="font-medium text-slate-900">
                      {item.categoria}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t-2 border-slate-300 pt-3">
                  <span className="text-xs text-slate-500">ID: {item.id}</span>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`../edit-offer/${item.id}/`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-orange-600 hover:border-orange-200 transition"
                      aria-label="Editar producto"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteProducts(item.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-red-600 hover:border-red-200 transition"
                      aria-label="Eliminar producto"
                    >
                      <i className="fa-solid fa-delete-left"></i>
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      aria-label="Ver producto"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
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
