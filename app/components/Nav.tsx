"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../lib/constants";
import { useIsMobile } from "../hooks/useIsMobile";

// ─── Shared site structure ────────────────────────────────────────────────────
export const SITE_NAV = [
  { id: "design",  href: "/design", label: { en: "Design",  zh: "设计" } },
  { id: "writing", href: "/words",  label: { en: "Writing", zh: "文字" } },
  { id: "photos",  href: "/photos", label: { en: "Photos",  zh: "摄影" } },
  { id: "art",     href: "/art",    label: { en: "Art",     zh: "艺术" } },
  { id: "about",   href: "/about",  label: { en: "About",   zh: "关于" } },
] as const;

export const NAV_WIDTH = 200; // px

// ─── Component ────────────────────────────────────────────────────────────────
export default function Nav() {
  const pathname = usePathname();
  const { lang } = useLang();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        {/* Hamburger button — above TopBar (zIndex 400) */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          style={{
            position: "fixed",
            top: Math.round((TOP_BAR_HEIGHT - 20) / 2),
            left: 16,
            zIndex: 400,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "flex-start",
          }}
        >
          <span style={{ display: "block", width: 20, height: 1, background: "var(--dark)" }} />
          <span style={{ display: "block", width: 13, height: 1, background: "var(--dark)" }} />
        </button>

        {/* Mobile menu overlay — above TopBar */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed", inset: 0, zIndex: 350,
                background: "var(--bg)",
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "flex-start",
                paddingLeft: 40, paddingBottom: 20,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  position: "absolute", top: 16, right: 20,
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-geist),sans-serif",
                  fontSize: 16, color: "var(--faint)", padding: "6px 10px",
                }}
              >✕</button>

              <nav>
                {SITE_NAV.map((cat, i) => {
                  const isActive = pathname.startsWith(cat.href);
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={cat.href}
                        onClick={() => setOpen(false)}
                        style={{ textDecoration: "none", display: "block", padding: "9px 0" }}
                      >
                        <span style={{
                          fontFamily: "var(--font-newsreader),serif",
                          fontStyle: "italic", fontWeight: 200,
                          fontSize: 32,
                          color: isActive ? "var(--dark)" : "var(--faint)",
                        }}>{cat.label[lang]}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop sidebar
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
                {/* Tick mark */}
                <div style={{
                  width: isActive ? 10 : 4,
                  height: 1,
                  background: "var(--dim)",
                  marginRight: 8,
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.22,
                  transition: "width 0.3s ease, opacity 0.3s ease",
                }} />
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
