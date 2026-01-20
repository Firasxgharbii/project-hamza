import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** ✅ SEO GLOBAL (Google + partage réseaux) */
export const metadata = {
  metadataBase: new URL("https://hamzamejd.com"),

  title: "Hamza Mejd – Director & Cinematographer | Official Website",
  description:
    "Official website of Hamza Mejd. Director, cinematographer and filmmaker. Watch films, explore portfolio, and contact.",

  alternates: {
    canonical: "https://hamzamejd.com",
  },

  openGraph: {
    title: "Hamza Mejd – Director & Cinematographer",
    description:
      "Official website of Hamza Mejd. Films, portfolio and contact.",
    url: "https://hamzamejd.com",
    siteName: "Hamza Mejd",
    images: [
      {
        url: "/og.jpg", // ✅ mets une image og.jpg dans /public
        width: 1200,
        height: 630,
        alt: "Hamza Mejd – Official Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hamza Mejd – Director & Cinematographer",
    description:
      "Official website of Hamza Mejd. Films, portfolio and contact.",
    images: ["/og.jpg"], // ✅ /public/og.jpg
  },

  icons: {
    icon: "/favicon.ico", // ✅ /public/favicon.ico
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // optionnel
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ NAVBAR GLOBAL */}
        <Navbar />

        {/* ✅ Contenu des pages */}
        <main style={{ paddingTop: "76px" }}>{children}</main>
      </body>
    </html>
  );
}
