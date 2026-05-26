# 🛒 Panel Administrativo de E-Commerce — Gestión de Inventario

> Dashboard administrativo que permite a los administradores de una tienda en línea gestionar su catálogo de productos: crear, visualizar, editar y eliminar artículos del inventario en tiempo real.

🔗 **Demo en vivo:** [prueba-tecnica-frontend-sooty.vercel.app](https://prueba-tecnica-frontend-sooty.vercel.app)

---

## 📋 Descripción del Proyecto

Este proyecto es un **panel de control (Dashboard)** desarrollado para el área administrativa de una tienda en línea. Su objetivo principal es brindar a los administradores una interfaz intuitiva y funcional para gestionar el catálogo de productos que se muestran a los clientes.

### Funcionalidades principales

- 🔐 **Autenticación simulada** — Login con validación de credenciales y persistencia de sesión mediante `localStorage`.
- 📦 **Listado de productos** — Visualización del inventario completo obtenido desde una API mockeada.
- ➕ **Crear producto** — Formulario para agregar nuevos productos al catálogo.
- ✏️ **Editar producto** — Modificación de los datos de un producto existente.
- 🗑️ **Eliminar producto** — Eliminación con confirmación mediante alerta interactiva.
- 🔔 **Notificaciones** — Retroalimentación visual al usuario con SweetAlert2 en cada operación CRUD.
- 🚪 **Cierre de sesión** — Logout que limpia la sesión del `localStorage` y redirige al login.

---

## 🧰 Stack Tecnológico

| Categoría                   | Tecnología                                  | Versión       |
|-----------------------------|---------------------------------------------|---------------|
| **Framework**               | React.js (inicializado con Vite)            | ^19.2.6       |
| **Build Tool**              | Vite                                        | ^8.0.12       |
| **Enrutamiento**            | react-router-dom                            | ^7.15.1       |
| **Estado y ciclo de vida**  | React Hooks (`useState`, `useEffect`)       | —             |
| **Alertas e interacciones** | SweetAlert2                                 | ^11.26.25     |
| **Estilos**                 | Tailwind CSS                                | ^4.3.0        |
| **Persistencia de sesión**  | LocalStorage (simulada)                     | —             |
| **Despliegue**              | Vercel                                      | —             |
| **Control de versiones**    | Git + GitHub                                | —             |

---

## 🌐 API Mockeada

Los datos se consumen desde una API REST simulada alojada en **MockAPI**:

| Recurso       | URL                                                                 |
|---------------|---------------------------------------------------------------------|
| **Base URL**  | `https://6a13b32d6c7db8aac0534877.mockapi.io/api/`                 |
| **Productos** | `https://6a13b32d6c7db8aac0534877.mockapi.io/api/producto`         |
| **Usuarios**  | `https://6a13b32d6c7db8aac0534877.mockapi.io/api/users`            |

---

## 🚀 Instalación y ejecución local

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

### Pasos

**1. Clonar el repositorio**

```bash
git clone https://github.com/EstebanGarcesA/prueba-tecnica-frontend.git
cd prueba-tecnica-frontend
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Ejecutar en modo desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)

### Scripts disponibles

| Comando           | Descripción                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo     |
| `npm run build`   | Genera el build de producción        |
| `npm run preview` | Previsualiza el build de producción  |
| `npm run lint`    | Ejecuta el linter ESLint             |

---

## 📁 Estructura del Proyecto

```
prueba-tecnica-frontend/
├── public/
├── src/
│   ├── components/       # Componentes reutilizables 
│   ├── helpers/          # Funciones utilitarias y llamadas a la API
│   ├── pages/            # Vistas principales (Login, Dashboard, etc.)
│   ├── App.jsx           # Configuración de rutas con react-router-dom
│   └── main.jsx          # Punto de entrada de la aplicación
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 👤 Autor

**Esteban Garcés A.**  
[github.com/EstebanGarcesA](https://github.com/EstebanGarcesA)