import { Footer } from "@/src/components/footer";
import { ThemeProvider } from "@/src/components/theme-provider";
import { ImageKitProvider } from "@imagekit/next";
import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header/header";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Metadata (without viewport)
export const metadata: Metadata = {
  title: "VeloCiti - AI-Powered Car Marketplace",
  description:
    "Experience the future of automotive commerce with AI auto-fill, image generation, and intelligent search.",
  keywords:
    "AI cars, car marketplace, artificial intelligence, auto selling, car buying",
  authors: [{ name: "VeloCiti Team" }],
};

// Viewport (separate export)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-inter antialiased">
        <ThemeProvider>
          <ImageKitProvider
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
          >
            <Header />

            {children}
            <Toaster />
            <Footer />
          </ImageKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
