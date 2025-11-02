"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavBar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/dashboard", label: "Panel" },
    { href: "/alerts", label: "Alertas" },
    { href: "/reports", label: "Reportes" },
    { href: "/monitoring", label: "Monitoreo" },
    { href: "/ai-demo", label: "🤖 AI Demo", accent: true },
  ];

  return (
    <nav aria-label="Primary navigation" className="navBar">
      {links.map((l) => {
        const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
        const classes = ["btn"];
        if (l.accent) classes.push("btn-primary");
        if (isActive) classes.push("navItemActive");

        return (
          <Link key={l.href} href={l.href} className={classes.join(" ")} aria-current={isActive ? "page" : undefined}>
            {l.label}
            {l.href === "/alerts" && <span className="navAlertDot" aria-hidden="true" />}
          </Link>
        );
      })}
    </nav>
  );
}
