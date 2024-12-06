import Link from "next/link"
// Componente que muestra el logo en funcion de la página
export default function Logo({ type }) {

    // Si el tipo es "auth", se muestra el logo con un enlace a la página principal
    if (type === "auth") {
        return (
            <Link href="/" className="z-10">

                <h1 className="text-4xl text-white z-10 font-bold ">IMMUNEAPI</h1>

            </Link>
        )

        // Si el tipo es "home", se muestra el logo con un enlace a la página principal
    } else if (type === "home") {
        return (
            <Link href="/">

                <h1 className="text-4xl font-bold ">IMMUNEAPI</h1>

            </Link>
        )
    }
}