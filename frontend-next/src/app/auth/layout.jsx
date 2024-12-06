// Layout para páginas de autenticación
import Image from "next/image";
import Logo from "@/components/Logo";
export default function LayoutAuth({ children }) {
  return (
    <>
      <nav className="bg-transparent mb-4 flex z-10 justify-start items-center px-20 p-3 font-bold text-black w-full min-h-20 border-b-2 absolute top-0 h-2 border-none">
        <Logo type="auth" /> 
      </nav>
      <div className="grid grid-cols-2 h-screen relative">

        <div className="col-span-2 absolute inset-0">
          <Image src="/fondoAuth.jpg" alt="fondoAuth" className="object-cover w-full h-full" objectFit="cover" fill quality={100} priority />
        </div>
        <div className="col-start-2 z-10 flex items-center justify-center">
          {children}
        </div>
      </div>
    </>

  );
}

