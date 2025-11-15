import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Crucible - Crossword Puzzle Creator",
  description: "Create and share crossword puzzles",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Crucible - Crossword Puzzle Creator",
    description: "Create and share crossword puzzles",
    url: "https://cruciblepuzzles.com",
    siteName: "Crucible",
    images: [
      {
        url: "https://cruciblepuzzles.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crucible Crossword Puzzle Creator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crucible - Crossword Puzzle Creator",
    description: "Create and share crossword puzzles",
    images: ["https://cruciblepuzzles.com/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Crucible",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}