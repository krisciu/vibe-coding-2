import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Life Pro Tips - Expert Advice for Better Living",
  description:
    "Get professional, life-changing wisdom from trusted experts that is totally legitimate and not at all terrible.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
    ],
  },
  openGraph: {
    title: "Life Pro Tips - Expert Advice",
    description:
      "Science-backed wisdom from certified experts to transform your life",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
        width: 1200,
        height: 630,
        alt: "Life Pro Tips",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
