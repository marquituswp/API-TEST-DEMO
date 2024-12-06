"use client";
import { CommerceProvider } from "@/context/CommerceContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
    const pathname = usePathname();

    return (
        <CommerceProvider>
            <div className="flex h-screen">
                {/* Mostrar <aside> solo si la condición es verdadera */}

                <aside className="w-1/4 bg-gray-100 border-r border-gray-300 p-6 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">Commerces</h1>
                    <div className="w-full flex flex-col gap-2">
                        <Link
                            href="/commerces"
                            className={`${pathname === "/commerces"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            See Commerces
                        </Link>
                        <Link
                            href="/commerces/create"
                            className={`${pathname === "/commerces/create"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Create Commerces
                        </Link>
                        <Link
                            href="/commerces/edit"
                            className={`${pathname === "/commerces/edit"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Modify Commerces
                        </Link>
                        <Link
                            href="/commerces/delete"
                            className={`${pathname === "/commerces/delete"
                                ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                                : "btn"
                                }`}
                        >
                            Delete Commerces
                        </Link>
                    </div>
                </aside>

                <main className="w-3/4 p-2">{children}</main>
            </div>
        </CommerceProvider>
    );
}
