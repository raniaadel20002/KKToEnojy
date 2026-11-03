import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./providers";
import { ScrollToTop } from "@/src/components/scroll-to-top";

export const metadata: Metadata = {
  title: "KKToEnojy",
  description:
    "Curated tours and travel experiences for memorable journeys in Hurghada, Egypt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <ScrollToTop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
