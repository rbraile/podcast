import type { Metadata } from "next";
// context
import { PodcastProvider } from "@/context";
// styles
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PodcastProvider>{children}</PodcastProvider>
      </body>
    </html>
  );
}
