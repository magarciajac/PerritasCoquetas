import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PatitasCoquetas ✨ - Collares Personalizados para Perros",
  description: "Collares personalizados para perros, diseñados con amor. Crea un diseño único para tu mascota amada con colores personalizados y letras cuidadosamente seleccionadas.",
  openGraph: {
    title: "PatitasCoquetas ✨ - Collares Personalizados para Perros",
    description: "Collares personalizados para perros, diseñados con amor. Crea un diseño único para tu mascota amada con colores personalizados y letras cuidadosamente seleccionadas.",
    images: [{ url: "/images/material%20/Logo.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
