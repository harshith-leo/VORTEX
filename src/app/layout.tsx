import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Do App | Modern Task Management",
  description: "A sleek, minimal productivity application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-transparent text-foreground transition-colors duration-300`}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        >
          <source src="/Jarvis_Animation_For_Website_Background.mp4" type="video/mp4" />
        </video>
        {/* Glassmorphism gradient overlay for readability across themes */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background/70 backdrop-blur-sm transition-colors duration-300 pointer-events-none" />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
