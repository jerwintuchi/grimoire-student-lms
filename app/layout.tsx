import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/components/providers/toaster-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grimoire",
  description: "Generated by pure magic",
  icons: {
    icon: ["/favicon.ico?v=3"],
    apple: ["/apple-touch-icon.png?v=3"],
    shortcut: ["/apple-touch-icon.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
        },
      }}>
      <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <body className={inter.className}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
