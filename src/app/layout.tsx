
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Hind_Siliguri } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.variable} antialiased`}>
        <ToastProvider />
        <div className="flex min-h-screen flex-col bg-[#f0f5f0]">
          <Suspense
            fallback={
              <header
                aria-hidden="true"
                className="h-[153px] border-b border-[#e1e8e1] bg-white/95"
              />
            }
          >
            <Navbar />
          </Suspense>
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
