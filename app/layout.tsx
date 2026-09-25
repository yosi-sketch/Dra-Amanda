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
  title: "Dra. Amanda Ferraz | Advocacia em Belo Horizonte",
  description:
    "Advocacia humanizada em Belo Horizonte. Atendimento em Direito de Família e Consumidor com clareza, atenção e responsabilidade.",
  keywords: [
    "Dra. Amanda Ferraz",
    "Amanda Ferraz Advogada",
    "advogada Belo Horizonte",
    "direito de família",
    "direito do consumidor",
    "divórcio",
    "pensão alimentícia",
    "advogada Belo Horizonte",
    "Serasa",
    "advocacia Belo Horizonte",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#f7f4ed] text-[#2b261e] font-sans antialiased selection:bg-[#80643d] selection:text-white overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
