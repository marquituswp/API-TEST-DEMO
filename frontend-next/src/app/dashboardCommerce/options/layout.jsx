"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCommerce } from "@/context/CommerceContext";
export default function Layout({ children }) {
    const {logoutCommerce} = useCommerce();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await logoutCommerce(); // Asegúrate de esperar si logoutCommerce es asincrónico
            router.push("/commerces"); // Redirige a la ruta deseada
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
                        <Link
                            href="/dashboardCommerce/options"
                            className={`${pathname === "/dashboardCommerce/options"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Create Web
                        </Link>
                        <Link
                            href="/dashboardCommerce/options/deleteWeb"
                            className={`${pathname === "/dashboardCommerce/options/deleteWeb"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Delete Web
                        </Link>
                        <Link
                            href="/dashboardCommerce/options/updateWeb"
                            className={`${pathname === "/dashboardCommerce/options/updateWeb"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Update Web
                        </Link>
                        <Link
                            href="/dashboardCommerce/options/seeUsers"
                            className={`${pathname === "/dashboardCommerce/options/seeUsers"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            See Users Interested in your City
                        </Link>
                        <Link
                            href="/dashboardCommerce/options/uploadImage"
                            className={`${pathname === "/dashboardCommerce/options/uploadImage"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Upload Image or Texts
                        </Link>
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
