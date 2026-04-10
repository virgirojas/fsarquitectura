import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Francisco Silva Arquitectura",
  description: "Estudio de arquitectura especializado en proyectos residenciales y comerciales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
