"use client";

import Link from "next/link";
import { titleFont } from "@/config/fonts";

import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useCartStore, useUIStore } from "@/store";
import { useEffect, useState } from "react";

export const TopMenu = () => {
 const openSideMenu = useUIStore((state) => state.openSideMenu);
 const totalItemsInCart = useCartStore((state) => state.getTotalItems());

 const [loaded, setLoaded] = useState<boolean>(false);

 useEffect(() => {
  setLoaded(true);
 }, []);

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
     href={"/gender/men"}
     className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
    >
     Hombres
    </Link>
    <Link
     href={"/gender/women"}
     className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
    >
     Mujeres
    </Link>
    <Link
     href={"/gender/kid"}
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
      {loaded && totalItemsInCart > 0 && (
       <span className="absolute text-xs px-1 rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
        {totalItemsInCart}
       </span>
      )}

      <IoCartOutline className="w-5 h-5" />
     </div>
    </Link>

    <button
     className="m-2 p-2 cursor-pointer rounded-md transition-all hover:bg-gray-100"
     onClick={openSideMenu}
    >
     Menú
    </button>
   </div>
  </nav>
 );
};
