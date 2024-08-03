import type { Metadata } from "next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "Phinx Challange",
  description: "Next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
