import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";

const seedProducts = initialData.products;

interface Props {
 params: Promise<{ gender: string }>;
}

interface Props {
 searchParams: Promise<{
  page?: string;
 }>;
}

export default async function CategoryByIdPage({
 params,
 searchParams,
}: Props) {
 const { gender } = await params;

 // const products = seedProducts.filter((product) => product.gender === id);

 const { page } = await searchParams;

 const currentPage = page ? parseInt(page) : 1;

 const {
  products,
  currentPage: resolvedPage,
  totalPages,
 } = await getPaginatedProductsWithImages({
  page: currentPage,
  gender: gender as Gender,
 });

 if (products.length === 0) {
  redirect(`/gender/${gender}`);
 }

 const labels: Record<string, string> = {
  men: "para hombres",
  women: "para mujeres",
  kid: "para niños",
  unisex: "para niños",
 };

 // if (id === "kids") notFound();

 return (
  <>
   <Title
    title={`Articulos ${labels[gender]}`}
    subtitle="Todos los productos"
    className="mb-2"
   />

   <ProductGrid products={products} />

   <Pagination totalPages={totalPages} />
  </>
 );
}
