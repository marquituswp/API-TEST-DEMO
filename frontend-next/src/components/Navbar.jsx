"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
export default function Navbar() {
    const pathname = usePathname();

    const exludePaths = ["/auth/login", "/auth/register"];

    if (exludePaths.includes(pathname)) {
        return null;
    }
    return (
        <nav className="bg-gray-100 flex justify-between items-center px-20 p-3 font-bold text-black h-full w-full min-h-20 border-b-2 border-cyan-900">
            <Logo type="home" />
            <ul className="flex gap-5">
                <li className="btn">
                    <Link href="/auth/login">Login</Link>
                </li>
                <li className="btn">
                    <Link href="/auth/register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}