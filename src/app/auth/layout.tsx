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

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <main className="min-h-screen bg-black antialiased">
   <div className="min-h-screen flex flex-col">{children}</div>
  </main>
 );
}
