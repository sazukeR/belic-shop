"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, ValidSize } from "@/interfaces";

import { useState } from "react";

interface Props {
 product: Product;
}

export const AddToCart = ({ product }: Props) => {
 const [size, setSize] = useState<ValidSize | undefined>();
 const [quantity, setQuantity] = useState<number>(1);
 const [posted, setPosted] = useState<boolean>(false);

 const addToCart = () => {
  setPosted(true);

  if (!size) return;

  console.log({ size, quantity });
 };

 return (
  <>
   {posted && !size && (
    <span className="mt-2 text-red-500 fade-in">
     Debe seleccionar una talla*
    </span>
   )}

   {/* Selector de Tallas */}
   <SizeSelector
    selectedSize={size}
    availableSizes={product.sizes}
    onSizeChanged={(size) => setSize(size)}
   />

   {/* Selector de Cantidad */}
   <QuantitySelector
    quantity={quantity}
    onQuantityChanged={(quantity) => setQuantity(quantity)}
   />

   {/* Button */}
   <button onClick={() => addToCart()} className="btn-primary my-5">
    Agregar al carrito
   </button>
  </>
 );
};
