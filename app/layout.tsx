"use client";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
