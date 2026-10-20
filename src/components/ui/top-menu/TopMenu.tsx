import Link from "next/link";
import { titleFont } from "@/config/fonts";

import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

export default function TopMenu() {
 return (
  <nav className="flex justify-between px-5 items-center w-full">
   {/* logo */}
   <div>
    <Link href="/">
     <span className={`${titleFont.className} antialiased font-bold`}>
      Belic
     </span>
     <span> | Shop</span>
    </Link>
   </div>

   <div className="hidden md:block">
    <Link
     href={"/category/men"}
     className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
    >
     Hombres
    </Link>
    <Link
     href={"/category/women"}
     className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
    >
     Mujeres
    </Link>
    <Link
     href={"/category/kids"}
     className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
    >
     Niños
    </Link>
   </div>

   {/* search, cart, menu */}
   <div className="flex items-center">
    <Link href="/search" className="mx-2">
     <IoSearchOutline className="w-5 h-5 " />
    </Link>

    <Link href="/cart" className="mx-2">
     <div className="relative">
      <span className="absolute text-xs px-1 rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
       3
      </span>

      <IoCartOutline className="w-5 h-5" />
     </div>
    </Link>

    <button className="m-2 p-2 cursor-pointer rounded-md transition-all hover:bg-gray-100">
     Menú
    </button>
   </div>
  </nav>
 );
}
