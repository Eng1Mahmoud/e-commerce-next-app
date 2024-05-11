import Link from "next/link";
import { Breadcrumbs } from "./_components/Breadcrumbs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
    <Breadcrumbs/>
      {children}
    </div>
  );
}
