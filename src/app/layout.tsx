import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simplifier - Understand anything in seconds",
  description: "Get clear, concise, and expert-verified breakdowns of any topic instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#fafafa] min-h-screen flex flex-col text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
