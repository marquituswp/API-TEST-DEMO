"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext"; // Importar el hook useUser

const getUserData = async (token) => {
    try {
        const { _id } = jwtDecode(token);
        const response = await fetch(`http://localhost:3000/users/`);
        if (!response.ok) throw new Error("Error fetching users");
        const users = await response.json();
        const user = users.find((user) => user._id === _id);
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export default function ProfileLayout({ children }) {
    const { token } = useAuth();
    const { userData, updateUserData } = useUser(); // Obtener updateUserData desde el contexto
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Estado local para el usuario
    const pathname = usePathname();

    useEffect(() => {
        if (token) {
            getUserData(token).then((user) => {
                setUser(user); // Seteamos el usuario localmente
                updateUserData(user); // Actualizamos los datos del usuario en el contexto
                setLoading(false);
            });
        }
    }, [token, updateUserData]); // Dependencia de updateUserData

    if (loading) return <p className="text-center text-lg">Loading Profile...</p>;
    if (!user) {
        return <p className="text-center text-red-500 text-lg">User not found</p>;
    }

    return (
        <div className="flex h-screen">
            <aside className="w-1/4 bg-gray-100 border-r border-gray-300 p-6 flex flex-col items-center">
                <Image
                    src="/perfilLogo.jpg"
                    alt="Profile Picture"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                    width={0}
                    height={0}
                />
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>

                <div className="w-full flex flex-col gap-2">
                    <Link
                        href="/profile/options/edit"
                        className={`${pathname === "/profile/options/edit"
                            ? "text-lg font-bold py-2 px-4 rounded-lg bg-gray-300 text-black"
                            : "btn"
                            }`}
                    >
                        Edit Profile
                    </Link>
                    <Link
                        href="/profile/options/delete"
                        className={`text-lg font-bold py-2 px-4 rounded-lg ${pathname === "/profile/options/delete"
                            ? "bg-gray-300 text-black"
                            : "bg-red-500 hover:bg-red-600"
                            }`}
                    >
                        Delete Account
                    </Link>
                </div>
            </aside>
            <main className="w-3/4 p-2">{children}</main>
        </div>
    );
}
