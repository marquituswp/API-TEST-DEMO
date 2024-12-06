"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCommerce } from "@/context/CommerceContext";

// Componente para el layout de las opciones del comercio
export default function Layout({ children }) {
    const {logoutCommerce} = useCommerce(); // Obtener la función de logout commerce
    const router = useRouter(); // Hook para redirigir a otras rutas
    const pathname = usePathname(); // Hook para obtener la ruta actual

    // Función para hacer logout
    const handleLogout = async () => {
        try {
            await logoutCommerce(); // Hace logout
            router.push("/commerces"); // Redirige a la ruta de ver todos los comercios
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
            <div className="flex h-screen">

                <aside className="w-1/4 bg-gray-100 border-r border-gray-300 p-6 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">Commerces</h1>
                    <div className="w-full flex flex-col gap-2">

                        {/* Opciones de crear Web */}
                        <Link
                            href="/dashboardCommerce/options"
                            className={`${pathname === "/dashboardCommerce/options"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Create Web
                        </Link>

                        {/* Opcion de eliminar Web */}
                        <Link
                            href="/dashboardCommerce/options/deleteWeb"
                            className={`${pathname === "/dashboardCommerce/options/deleteWeb"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Delete Web
                        </Link>

                        {/* Opcion de actualizar Web */}
                        <Link
                            href="/dashboardCommerce/options/updateWeb"
                            className={`${pathname === "/dashboardCommerce/options/updateWeb"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Update Web
                        </Link>

                        {/* Opcion de ver usuarios interesados */}
                        <Link
                            href="/dashboardCommerce/options/seeUsers"
                            className={`${pathname === "/dashboardCommerce/options/seeUsers"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            See Users Interested in your City
                        </Link>

                        {/* Opcion de subir imagen o texto */}
                        <Link
                            href="/dashboardCommerce/options/uploadImage"
                            className={`${pathname === "/dashboardCommerce/options/uploadImage"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Upload Image or Texts
                        </Link>

                        {/* Botón de logout Commerce */}
                        <button
                            className={"btn bg-red-500 hover:bg-red-600"}
                            onClick={handleLogout}
                        >
                            LogOut
                        </button>
                    </div>
                </aside>

                <main className="w-3/4 p-2">{children}</main>
            </div>
        </>
    );
}
