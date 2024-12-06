"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const GetCommerces = async (token) => {
    try {
        const response = await fetch(`http://localhost:3000/comercio`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error("Error fetching commerces");
        const commerces = await response.json();
        return commerces;
    } catch (error) {
        console.error("Error fetching commerces:", error);
        return null;
    }
}

export default function SeeCommerces() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [commerces, setCommerces] = useState(null);

    useEffect(() => {
        if (token) {
            GetCommerces(token).then((commerces) => {
                setCommerces(commerces);
                setLoading(false);
            });
        }
    }, [token]);
    
    if (loading) return <p className="text-center text-lg">Loading Commerces...</p>;
    if (!commerces) {
        return <p className="text-center text-red-500 text-lg">Commerces not found</p>;
    }

    return (
        <div className="grid grid-cols-2 gap-8 p-4">
            {commerces.map((commerce, index) => (

                <Link href={`/commerces/${commerce.cif}/`} key={index}>
                    <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer">
                        <h2 className="text-xl font-semibold text-gray-800">{commerce.name}</h2>
                        <p className="text-gray-600 mt-2">{commerce.email}</p>
                        <p className="text-gray-600 mt-2">{commerce.phone}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}