import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Garapin.id - Web Development Agency",
  description: "Dari Ide Menjadi Website Profesional. Jasa pembuatan website untuk UMKM, perusahaan, dan instansi.",
  icons: {
    icon: ["/favicon.ico", "/icon-32.png", "/icon-16.png"],
    apple: "/icon-180.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}