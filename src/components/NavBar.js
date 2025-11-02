"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavBar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/dashboard", label: "Panel" },
    { href: "/reports", label: "Reportes" },
    { href: "/monitoring", label: "Monitoreo" },
    { href: "/ai-demo", label: "🤖 AI Demo", accent: true },
  ];

  return (
    <nav aria-label="Primary navigation" style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {links.map((l) => {
        const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
        const baseStyle = {
          color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
          padding: "6px 10px",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: isActive ? 700 : 500,
        };

        if (l.accent) {
          return (
            <Link key={l.href} href={l.href} style={{ ...baseStyle, color: "var(--color-on-primary)", background: "linear-gradient(135deg, var(--gradient-accent-start) 0%, var(--gradient-accent-end) 100%)" }} aria-current={isActive ? "page" : undefined}>
              {l.label}
            </Link>
          );
        }

        return (
          <Link key={l.href} href={l.href} style={baseStyle} aria-current={isActive ? "page" : undefined}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
