"use client"
import Link from "next/link";
import Login from "@/components/Login";

export default function Home() {
  return (
    <>
      <Login />
      <div>
        <p>¿Ya tienes una cuenta?</p>
        <Link href={"/signup"}>
          SignUp
        </Link>
      </div>

    </>


  );

}
