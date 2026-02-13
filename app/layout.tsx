import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/lib/MusicContext";
import MusicController from "@/components/MusicController";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "For Her 🤍",
  description: "A special journey crafted with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        <MusicProvider>
          <MusicController />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
