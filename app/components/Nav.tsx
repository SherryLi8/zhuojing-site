"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../lib/constants";

// ─── Shared site structure ────────────────────────────────────────────────────
export const SITE_NAV = [
  { id: "design",  href: "/design", label: { en: "Design",  zh: "设计" } },
  { id: "writing", href: "/words",  label: { en: "Writing", zh: "文字" } },
  { id: "photos",  href: "/photos", label: { en: "Photos",  zh: "摄影" } },
  { id: "about",   href: "/about",  label: { en: "About",   zh: "关于" } },
] as const;

export const NAV_WIDTH = 200; // px

// ─── Component ────────────────────────────────────────────────────────────────
export default function Nav() {
  const pathname = usePathname();
  const { lang } = useLang();

  return (
    <div style={{
      position: "fixed", left: 0, top: TOP_BAR_HEIGHT, bottom: 0,
      width: NAV_WIDTH, zIndex: 50,
      display: "flex", flexDirection: "column", justifyContent: "center",
      paddingLeft: 24,
      background: "var(--bg)",
      borderRight: "1px solid var(--line)",
    }}>

      <nav>
        {SITE_NAV.map(cat => {
          const isActive = pathname.startsWith(cat.href);
          const label = cat.label[lang];
          return (
            <Link key={cat.id} href={cat.href} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "5px 0" }}>
                {/* Tick mark — longer + opaque when active */}
                <div style={{
                  width: isActive ? 10 : 4,
                  height: 1,
                  background: "var(--dim)",
                  marginRight: 8,
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.22,
                  transition: "width 0.3s ease, opacity 0.3s ease",
                }} />
                {/* Label — always visible; active=dark, inactive=faint */}
                <span style={{
                  fontFamily: "var(--font-newsreader),serif",
                  fontStyle: "italic", fontWeight: 200,
                  fontSize: 13,
                  color: isActive ? "var(--dark)" : "var(--faint)",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}>{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
