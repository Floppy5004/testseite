import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "Die Wurst Box – Premium-Soßen",
  description: "Feuersoße & Currysoße – Zwei Soßen für dein perfektes Grillerlebnis. Familientradition seit über 40 Jahren.",
  keywords: "Wurst Box, Currysoße, Feuersoße, Premium Soßen, Grillen, Automaten, Düren",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
