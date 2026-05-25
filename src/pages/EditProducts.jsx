import { Link, useParams, useNavigate } from "react-router-dom";
import { end_points } from "../services/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        setProducts(data);
        setNombre(data.nombre || "");
        setCategoria(data.categoria || "");
        setImagen(data.imagen || "");
        setPrecio(data.precio || 0);
        setStock(data.stock || 0);
      })
      .catch((error) => console.error("Error al cargar el producto:", error));
  }

  useEffect(() => {
    fetchProducts();
  }, [id]);

  function updateProducts() {
    const offer = {
      nombre,
      categoria,
      imagen,
      precio: String(precio),
      stock: String(stock)
    };

    fetch(end_points.productos + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(offer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Producto actualizado",
          text: "El producto se ha actualizado correctamente.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/dashboard/inventory/");
        });
      })
      .catch((error) => {
        console.error("Error al actualizar producto:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar el producto.",
        });
      });
  }

  return (
    <section className="mt-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Editar producto</p>
            <p className="mt-1 text-sm text-slate-600">
              Ajusta la información del producto.
            </p>
          </div>
          <Link
            to="../inventory/"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Volver al inventario
          </Link>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">ID</label>
            <input
              type="text"
              placeholder="1"
              value={id}
              disabled
              className="cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 opacity-70 outline-none"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-xs font-medium text-slate-600">
              Nombre del producto
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Intelligent Rubber Table"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">
              Categoría
            </label>
            <input
              type="text"
              name="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
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
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
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
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
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
              value={stock}
              onChange={(e) => setStock(e.target.value)}
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
              onClick={updateProducts}
              type="button"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditProducts;