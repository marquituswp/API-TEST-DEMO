"use client"
import { UserProvider } from "@/context/UserContext";

export default function Layout({ children }) {
    return (
        <UserProvider>
            {/* El layout debe estar envuelto en el UserProvider */}
            <div className="min-h-screen">
                {children}
            </div>
        </UserProvider>
    );
}
