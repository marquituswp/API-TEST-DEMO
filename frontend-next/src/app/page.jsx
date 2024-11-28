import Image from "next/image";
import { useDebugValue } from "react";
import WebPages from "@/components/webs/Web";
export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-20 m-10">
      <WebPages />
    </div>
  );
}
