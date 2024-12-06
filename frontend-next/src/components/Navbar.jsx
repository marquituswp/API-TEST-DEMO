"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
export default function Navbar() {
    const pathname = usePathname();
    const {token,logout} = useAuth();
    const tokenUser = token? jwtDecode(token) : null;
    const [menuOpen, setMenuOpen] = useState(false);
    const excludePaths = ["/auth/login", "/auth/register"];

    if (excludePaths.includes(pathname)) {
        return null; // No renderizar Navbar en rutas excluidas
    }

    return (
        <nav className="bg-gray-100 flex justify-between items-center px-20 p-3 font-bold text-black h-full w-full min-h-20 border-b-2 border-cyan-900">
            <Logo type="home" />
            <ul className="flex gap-5 items-center">
                {token ? ( // Si hay un token, mostrar menú desplegable
                    <li className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)} // Alternar el menú
                            className="btn"
                        >
                            Menu
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <ul>
                                    <li>
                                        <Link
                                            href="/profile/options/edit"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setMenuOpen(false)} // Cierra el menú
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setMenuOpen(false)} // Cierra el menú
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    {tokenUser.role[0] === "admin" && <li>
                                        <Link
                                            href="/commerces"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setMenuOpen(false)} // Cierra el menú
                                        >
                                            Commerces
                                        </Link>
                                    </li>}
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                ) : ( // Si no hay token, mostrar Login y Register
                    <>
                        <li className="btn">
                            <Link href="/auth/login">Login</Link>
                        </li>
                        <li className="btn">
                            <Link href="/auth/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
