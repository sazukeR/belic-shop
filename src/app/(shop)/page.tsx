// export const revalidate = 60; // 60 segundos
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
 searchParams: Promise<{
  page?: string;
 }>;
}

export default async function Home({ searchParams }: Props) {
 return (
  <>
   <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

   <Suspense
    fallback={
     <div className="animate-pulse text-center p-10 text-xl text-gray-500">
      Cargando productos...
     </div>
    }
   >
    <ProductListContainer searchParams={searchParams} />
   </Suspense>
  </>
 );
}

async function ProductListContainer({ searchParams }: Props) {
 // const page = searchParams.page ? parseInt(searchParams.page) : 1;

 // const { products, currentPage, totalPages } =
 //  await getPaginatedProductsWithImages({ page });

 // Convertimos el parámetro a número de forma segura
 const { page } = await searchParams;

 const currentPage = page ? parseInt(page) : 1;

 const {
  products,
  currentPage: resolvedPage,
  totalPages,
 } = await getPaginatedProductsWithImages({ page: currentPage });

 if (products.length === 0) {
  redirect("/");
 }

 return (
  <>
   <ProductGrid products={products} />
   <Pagination totalPages={totalPages} />
  </>
 );
}
