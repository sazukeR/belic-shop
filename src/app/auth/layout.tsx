// export default function AuthLayout({
//  children,
// }: {
//  children: React.ReactNode;
// }) {
//  return (
//   <main className="flex justify-center">
//    <div className="w-full sm:w-[350px] px-10">{children}</div>
//   </main>
//  );
// }

import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 const session = await auth.api.getSession({
  headers: await headers(),
 });

 // console.log({ session });

 if (session?.user) {
  redirect("/");
 }

 return (
  <main className="min-h-screen bg-black antialiased">
   <div className="min-h-screen flex flex-col">{children}</div>
  </main>
 );
}
