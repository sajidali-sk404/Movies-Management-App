import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MovieNest",
  description: "Movie Streaming app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-gray-800 dark:text-white transition-colors duration-300`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
