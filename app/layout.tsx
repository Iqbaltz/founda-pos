"use client";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const applicationName = process.env.NEXT_PUBLIC_APPLICATION_NAME || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{applicationName}</title>
      </head>
      <body className={cn("font-sans", fontSans.variable)}>
        <ProgressBar
          height="4px"
          color="#fffd00"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
