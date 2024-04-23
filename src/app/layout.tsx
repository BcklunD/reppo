import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Reppo",
  description: "Share your favorite receipes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return (
    <nav className="flex h-16 items-center justify-between bg-white bg-opacity-20 px-4 py-2 text-lg shadow-sm">
      <div>Reppo</div>
      <div>Sign in</div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
