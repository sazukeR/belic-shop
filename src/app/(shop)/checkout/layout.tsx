import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const session = await auth.api.getSession({
  headers: await headers(),
 });

 // console.log({ session });

 if (!session?.user) {
  redirect("/auth/login?redirectTo=/checkout/");
 }

 return <>{children}</>;
}
