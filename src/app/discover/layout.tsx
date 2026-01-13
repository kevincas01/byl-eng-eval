import Navbar from "@/components/Navbar";

export default function DiscoverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      <main className="my-10">{children}</main>
    </>
  );
}
