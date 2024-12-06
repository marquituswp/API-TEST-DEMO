"use client"
import CommerceDetails from "@/components/commerces/CommerceDetails";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCommerce } from "@/context/CommerceContext";
const getCommerce = async (cif, token) => {
    const response = await fetch(`http://localhost:3000/comercio/${cif}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const commerce = await response.json();
    return commerce;
};

export default function CommercePages() {
    const {updateCommerceData} = useCommerce();
    const { token } = useAuth();
    const { cif } = useParams();
    const [commerce, setCommerce] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            getCommerce(cif, token).then((data) => {
                setCommerce(data);
                updateCommerceData(data);
                setLoading(false);
            });
        }
    }, [token, cif,updateCommerceData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-500">Cargando los detalles del comercio...</p>
            </div>
        );
    }

    if (!commerce) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-red-500">Error al cargar los detalles del comercio.</p>
            </div>
        );
    }

    return (
        <>
            <CommerceDetails commerce={commerce} />
        </>
    );
}
