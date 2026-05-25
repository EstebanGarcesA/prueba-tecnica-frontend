import { Link, useParams } from "react-router-dom";
import { end_points } from "../services/api";
import { useEffect, useState } from "react";

function EditProducts() {

  let { id } = useParams();
  const [products, setProducts] = useState({});
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  function fetchProducts() {
    fetch(end_points.productos + "/" + id)
      .then((response) => response.json())
      .then((data) => {
        setProducts(products);
        setNombre(data.nombre);
        setCategoria(data.categoria);
        setImagen(data.Imagen);
        setPrecio(data.precio);
        setStock(data.stock);

      });
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  function updateProducts() {
    let offer = { nombre, categoria, Imagen };
    fetch(end_points.productos + "/" + id, {
      method: "PATCH",
      body: JSON.stringify(offer),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  return (
    <section className="mt-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Crear productos</p>
            <p className="mt-1 text-sm text-slate-600">
              Completa la información del producto.
            </p>
          </div>
          <Link
            to="../inventory/"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Volver al inventario
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600" htmlFor="id">
              ID
            </label>
            <input
              id="id"
              type="number"
              name="id"
              value={nextId}
              min={minId}
              required
              onChange={(e) => setNextId(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
            <p className="text-xs text-slate-500">
              Siguiente ID disponible: {minId} ({products.length} productos en
              inventario)
            </p>
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-xs font-medium text-slate-600">
              Nombre del producto
            </label>
            <input
              type="text"
              name="nombre"
              required
              placeholder="Intelligent Rubber Table"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">
              Categoria
            </label>
            <input
              type="text"
              name="categoria"
              required
              placeholder="Industrial"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">
              URL de la foto del producto
            </label>
            <input
              type="text"
              name="imagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">
              Precio del producto
            </label>
            <input
              type="number"
              name="precio"
              required
              placeholder="5500"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">
              Stock del producto
            </label>
            <input
              type="number"
              name="stock"
              required
              placeholder="500"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-2 md:col-span-2">
            <Link
              to="../inventory/"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-800 hover:bg-slate-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Crear producto
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditProducts