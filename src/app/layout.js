import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Algorythm",
  description: "Plataforma Geoespacial para la Resiliencia Climática Urbana en Soacha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 16 }}>Cruz Roja Colombiana</span>
          </div>
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}
