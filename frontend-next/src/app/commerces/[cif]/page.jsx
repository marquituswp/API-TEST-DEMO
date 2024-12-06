"use client"
import CommerceDetails from "@/components/commerces/CommerceDetails";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCommerce } from "@/context/CommerceContext";

// Función que obtiene los datos de un comercio
const getCommerce = async (cif, token) => {
    try{
        const response = await fetch(`http://localhost:3000/comercio/${cif}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const commerce = await response.json();
        return commerce;
    }catch(error){
        console.error("Error fetching commerce:", error);
        return null;
    }
    
};

export default function CommercePages() {
    const {updateCommerceData} = useCommerce(); // Hook para actualizar los datos del comercio
    const { token } = useAuth(); // Hook para obtener el token de autenticación
    const { cif } = useParams(); // Hook para obtener el cif del comercio
    const [commerce, setCommerce] = useState(null); // Estado para almacenar los datos del comercio
    const [loading, setLoading] = useState(true); // Estado para indicar si se están cargando los datos del comercio

    useEffect(() => {
        if (token) {
            getCommerce(cif, token).then((data) => {
                setCommerce(data); // Almacenamos los datos del comercio en el estado
                updateCommerceData(data); // Actualizamos los datos del comercio en el contexto
                setLoading(false); // Indicamos que se han cargado los datos del comercio
            });
        }
    }, [token, cif,updateCommerceData]);

    // Mostramos un mensaje de carga mientras se obtienen los datos del comercio
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-500">Cargando los detalles del comercio...</p>
            </div>
        );
    }

    // Mostramos un mensaje de error si no se han podido obtener los datos del comercio
    if (!commerce) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-700 text-2xl font-bold">Error al cargar los detalles del comercio.</p>
            </div>
        );
    }

    // Mostramos los detalles del comercio
    return (
        <>
            <CommerceDetails commerce={commerce} />
        </>
    );
}
