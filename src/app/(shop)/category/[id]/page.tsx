import { notFound } from "next/navigation";

interface Props {
 params: Promise<{ id: string }>;
}

export default async function CategoryByIdPage({ params }: Props) {
 const { id } = await params;

 if (id === "kids") notFound();

 return (
  <div>
   <h1>Category by id Page: {id}</h1>
  </div>
 );
}
