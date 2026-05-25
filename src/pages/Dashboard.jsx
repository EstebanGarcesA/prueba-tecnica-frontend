import Sidebar from "../components/Sidebar";
import { Outlet, Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="grid min-h-screen grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="h-screen overflow-auto">
          <div className="flex min-h-full flex-col bg-slate-50 px-6 py-6">
            <header className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Tablero de control
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Gestión y analítica de productos
                </p>
              </div>
              
            </header>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;