"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PAGES = [
  { label: "DESIGN", href: "/design" },
  { label: "PHOTOS", href: "/photos" },
  { label: "WORDS",  href: "/words"  },
  { label: "ABOUT",  href: "/about"  },
];

export default function PageNav() {
  const pathname = usePathname();
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
      {PAGES.map(p => {
        const isActive = pathname === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            style={{ position: "relative", textDecoration: "none", display: "inline-block", paddingBottom: 4 }}
          >
            <span style={{
              fontFamily: "var(--font-geist),sans-serif",
              fontSize: 9, letterSpacing: "0.22em",
              color: isActive ? "var(--dark)" : "var(--faint)",
              transition: "color 0.15s",
              display: "block",
            }}>{p.label}</span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: 1, background: "var(--dark)",
                transformOrigin: "left center",
              }}
            />
          </Link>
        );
      })}
    </div>
  );
}
