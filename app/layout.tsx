import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_APPLICATION_NAME,
  description: "Simple Point of Sale Application",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192x192.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="./icon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn("font-sans", fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
