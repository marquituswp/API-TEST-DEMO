"use client";
// Componente que muestra los usuarios interesados en la web
import { useEffect, useState } from "react";
import { useCommerce } from "@/context/CommerceContext";

export default function UsersInterested({ token, handleBack }) {
    const { tokenCommerce } = useCommerce(); // Token del comercio
    const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
    const [users, setUsers] = useState(null); // Usuarios interesados en la web

    // Petición GET a la API para obtener los usuarios interesados en la web
    useEffect(() => {
        try {
            fetch(`http://localhost:3000/web/users`, {
                headers: {
                    Authorization: `Bearer ${tokenCommerce}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "USERS_INTERESTED:") {
                        setErrorMessage("");
                        setUsers(data.emails); // Guardamos los usuarios interesados
                    } else {
                        setErrorMessage("NO_USERS");
                    }
                })
                .catch(() => setErrorMessage("NO_USERS"));
        } catch {
            setUsers(null);
        }
    }, [tokenCommerce]);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                Interested Users
            </h2>
            <div className="mt-4">  

                {/* Si hay usuarios interesados, los mostramos en una lista, si no, mostramos un mensaje de error */}
                {users ? (
                    <ul className="space-y-2">
                        {users.map((user, index) => (
                            <li
                                key={index}
                                className="py-2 px-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition"
                            >
                                {user}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mb-4 text-red-700 text-2xl font-bold text-center">{errorMessage}</div>
                )}
            </div>
        </div>
    );
}
