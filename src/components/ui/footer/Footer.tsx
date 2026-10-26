import { titleFont } from "@/config/fonts";
import Link from "next/link";

const CURRENT_YEAR = 2026;

export const Footer = () => {
 return (
  <div className="flex w-full justify-center text-xs mb-10">
   <Link href="/">
    <span className={`${titleFont.className} antialiased font-bold `}>
     Teslo{" "}
    </span>
    <span>| shop </span>
    <span>© {CURRENT_YEAR}</span>
   </Link>

   <Link href="/" className="mx-3">
    Privacidad & Legal
   </Link>

   <Link href="/" className="mx-3">
    Ubicaciones
   </Link>
  </div>
 );
};
