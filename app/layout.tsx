import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matheus Ferreira | Escritório de Advocacia",
  description:
    "Técnica, Firmeza e Estratégia. Soluções jurídicas empresariais e criminais de excelência para pessoas e corporações em todo o Brasil.",
  keywords: [
    "Matheus Ferreira",
    "Matheus Ferreira Escritório de Advocacia",
    "advogado BH",
    "direito empresarial",
    "direito criminal",
    "consultoria jurídica",
    "soluções jurídicas",
    "advocacia Belo Horizonte",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${cormorant.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-[#07090e] text-[#f1f5f9] font-sans antialiased selection:bg-[#2563eb] selection:text-white overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
