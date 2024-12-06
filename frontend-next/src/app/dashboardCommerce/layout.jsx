"use client";
import { CommerceProvider } from "@/context/CommerceContext";

// Componente para el layout de las opciones del comercio
export default function Layout({ children }) {

    return (
        <CommerceProvider>
            <div className="min-h-screen">
                {children}
            </div>
        </CommerceProvider>
    );
}
