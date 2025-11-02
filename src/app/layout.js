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
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "linear-gradient(90deg, rgba(10,10,10,0.6), rgba(0,0,0,0.4))",
          color: "#fff",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 16 }}>Cruz Roja Colombiana</span>
          </div>
          <nav aria-label="Primary navigation">
            <a href="/" style={{ color: "#cfcfcf", marginRight: 14 }}>Inicio</a>
            <a href="/dashboard" style={{ color: "#cfcfcf", marginRight: 14 }}>Panel</a>
            <a href="/reports" style={{ color: "#cfcfcf", marginRight: 14, fontWeight: 700 }}>Reportes</a>
            <a href="/monitoring" style={{ color: "#cfcfcf" }}>Monitoreo</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
