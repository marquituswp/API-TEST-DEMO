import Link from "next/link"
export default function Logo({ type }) {

    if (type === "auth") {
        return (
            <Link href="/" className="z-10">

                <h1 className="text-4xl text-white z-10 font-bold ">IMMUNEAPI</h1>

            </Link>
        )
    } else if (type === "home") {
        return (
            <Link href="/">

                <h1 className="text-4xl font-bold ">IMMUNEAPI</h1>

            </Link>
        )
    }
}