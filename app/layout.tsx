import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Workspace Manager — Volt",
  description: "Gestión de workspace y equipo para Volt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="h-full bg-volt-charcoal text-volt-offwhite antialiased">
        {children}
      </body>
    </html>
  );
}
