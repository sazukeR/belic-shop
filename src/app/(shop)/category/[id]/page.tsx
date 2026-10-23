import { ProductGrid, Title } from "@/components";
import { ValidCategory } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
 params: Promise<{ id: ValidCategory }>;
}

export default async function CategoryByIdPage({ params }: Props) {
 const { id } = await params;

 const products = seedProducts.filter((product) => product.gender === id);

 const labels: Record<ValidCategory, string> = {
  men: "para hombres",
  women: "para mujeres",
  kid: "para niños",
  unisex: "para niños",
 };

 // if (id === "kids") notFound();

 return (
  <>
   <Title
    title={`Articulos ${labels[id]}`}
    subtitle="Todos los productos"
    className="mb-2"
   />

   <ProductGrid products={products} />
  </>
 );
}
