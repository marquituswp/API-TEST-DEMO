"use client"
import SignUp from "@/components/SignUp";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <SignUp />
      <div>
        <p>¿No tienes una cuenta?</p>
        <Link href={"/"}>
          Login
        </Link>
      </div>
    </>

  );

}