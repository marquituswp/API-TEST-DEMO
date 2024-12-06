"use client";
import { CommerceProvider } from "@/context/CommerceContext";
export default function Layout({ children }) {

    return (
        <CommerceProvider>
            <div className="min-h-screen">
                {children}
            </div>
        </CommerceProvider>
    );
}
