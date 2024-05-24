import { Breadcrumbs } from "../../../../components/general/Breadcrumbs";

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
