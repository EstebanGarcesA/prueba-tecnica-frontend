import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { end_points } from "../services/api";

function getMinId(products) {
  if (products.length === 0) return 1;

  const maxId = Math.max(
    ...products.map((item) => Number(item.id)).filter((n) => !Number.isNaN(n)),
    
  );

  return maxId + 1;
}

function CreateProducts() {
  const [products, setProducts] = useState([]);
  const [minId, setMinId] = useState(1);
  const [nextId, setNextId] = useState("1");

  function loadProducts() {
    fetch(end_points.productos)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const minimum = getMinId(data);
        setMinId(minimum);
        setNextId(String(minimum));
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const id = Number(data.id);

    if (Number.isNaN(id) || id < minId) {
      Swal.fire({
        icon: "error",
        title: "ID no válido",
        text: `El ID debe ser ${minId} o mayor (el ID más alto actual es ${minId - 1}).`,
      });
      return;
    }

    const idExists = products.some((item) => String(item.id) === String(data.id));
    if (idExists) {
      Swal.fire({
        icon: "error",
        title: "ID duplicado",
        text: `Ya existe un producto con el ID ${data.id}.`,
      });
      return;
    }

    fetch(end_points.productos, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: String(data.id),
        nombre: data.nombre,
        categoria: data.categoria,
        imagen: data.imagen,
        precio: String(data.precio),
        stock: String(data.stock),
      }),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.href = "/dashboard/inventory/";
      })
      .catch((error) => console.log(error));
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
  );
}

export default CreateProducts;
