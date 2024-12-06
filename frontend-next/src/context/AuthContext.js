"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Obtener el token al montar el componente
        const storedToken = Cookies.get("token");
        setToken(storedToken || null);
    }, []);

    const login = (newToken) => {
        Cookies.set("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        Cookies.remove("token");
        setToken(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
