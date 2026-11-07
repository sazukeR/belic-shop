"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, ValidSize } from "@/interfaces";

import { useState } from "react";

interface Props {
 product: Product;
}

export const AddToCart = ({ product }: Props) => {
 const [size, setSize] = useState<ValidSize | undefined>();

 return (
  <>
   {/* Selector de Tallas */}
   <SizeSelector
    selectedSize={size}
    availableSizes={product.sizes}
    onSizeChanged={(size) => setSize(size)}
   />

   {/* Selector de Cantidad */}
   <QuantitySelector quantity={2} />

   {/* Button */}
   <button className="btn-primary my-5">Agregar al carrito</button>
  </>
 );
};
