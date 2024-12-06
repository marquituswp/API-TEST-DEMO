"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";


const CommerceContext = createContext();

// Hook para usar el contexto de comercio
export const useCommerce = () => {
    const context = useContext(CommerceContext);
    if (!context) {
        throw new Error("useCommerce must be used within a CommerceProvider");
    }
    return context;
};

// Proveedor del contexto de comercio
export const CommerceProvider = ({ children }) => {
    const [commerceData, setCommerceData] = useState(null); // Datos del comercio
    const [tokenCommerce, setTokenCommerce] = useState(null); // Token del comercio

    // Cargar token y datos desde las cookies al montar el componente
    useEffect(() => {
        const storedTokenCommerce = Cookies.get("token_commerce");
        const storedCommerceData = Cookies.get("commerce_data");

        setTokenCommerce(storedTokenCommerce || null); // Guardar token en el estado
        setCommerceData(storedCommerceData ? JSON.parse(storedCommerceData) : null); // Guardar datos del comercio en el estado
    }, []);

    // Guardar token en cookies
    const loginCommerce = (token) => {
        Cookies.set("token_commerce", token);
        setTokenCommerce(token);
    };

    // Guardar datos del comercio en cookies
    const updateCommerceData = (newCommerceData) => {
        Cookies.set("commerce_data", JSON.stringify(newCommerceData));
        setCommerceData(newCommerceData);
    };

    // Eliminar token y datos del comercio de las cookies
    const logoutCommerce = () => {
        Cookies.remove("token_commerce");
        Cookies.remove("commerce_data");
        setTokenCommerce(null);
        setCommerceData(null);
    };

    // Pasar los datos del comercio, el token y las funciones de login y logout al contexto
    return (
        <CommerceContext.Provider
            value={{
                commerceData,
                tokenCommerce,
                loginCommerce,
                updateCommerceData,
                logoutCommerce,
            }}
        >
            {children}
        </CommerceContext.Provider>
    );
};
