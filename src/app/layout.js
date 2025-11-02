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
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 16 }}>Cruz Roja Colombiana</span>
          </div>
          <nav aria-label="Primary navigation">
            <a href="/" style={{ color: "var(--color-text-secondary)", marginRight: 14 }}>Inicio</a>
            <a href="/dashboard" style={{ color: "var(--color-text-secondary)", marginRight: 14 }}>Panel</a>
            <a href="/reports" style={{ color: "var(--color-text-secondary)", marginRight: 14 }}>Reportes</a>
            <a href="/monitoring" style={{ color: "var(--color-text-secondary)", marginRight: 14 }}>Monitoreo</a>
            <a href="/ai-demo" style={{ color: "var(--color-on-primary)", background: "linear-gradient(135deg, var(--gradient-accent-start) 0%, var(--gradient-accent-end) 100%)", padding: "4px 12px", borderRadius: "4px" }}>🤖 AI Demo</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
