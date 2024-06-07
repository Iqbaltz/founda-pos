import ProgressBarProvider from "@/components/progressbar-provider";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
