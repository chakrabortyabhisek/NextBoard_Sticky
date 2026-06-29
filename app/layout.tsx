import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "reactflow/dist/style.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { ThemeScript } from "./components/ThemeScript";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextBoard_Sticky | The modern visual way to organize your ideas",
  description:
    "Collect, organize and develop your ideas into beautiful sticky boards that help you think visually. NextBoard_Sticky is the perfect tool for creative professionals.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Toaster theme="system" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
