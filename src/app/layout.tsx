import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/header";
import Providers from "@/components/providers";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boutiques",
  description: "Boutiques en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppHeader />
          <main className="max-w-7xl mx-auto px-4 my-10 sm:px-6 lg:px-8">
            <Suspense fallback={<div>Loading...</div>}>
            {children}
            </Suspense>
          </main>
        </Providers>
      </body>
    </html>
  );
}
