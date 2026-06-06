"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../lib/constants";

// ─── Shared site structure ────────────────────────────────────────────────────
export const SITE_NAV = [
  {
    id: "design",
    href: "/design",
    label: { en: "Design",  zh: "设计" },
    sub: [
      { label: { en: "All",            zh: "全部"   }, filter: "all"            },
      { label: { en: "Brand Identity", zh: "品牌设计" }, filter: "brand-identity" },
      { label: { en: "Editorial",      zh: "编辑设计" }, filter: "editorial"      },
      { label: { en: "UX/UI",          zh: "UX/UI"  }, filter: "uxui"           },
      { label: { en: "Motion",         zh: "动态"    }, filter: "motion"         },
    ],
  },
  { id: "writing", href: "/words",  label: { en: "Writing", zh: "文字" } },
  {
    id: "photos",
    href: "/photos",
    label: { en: "Photos", zh: "摄影" },
    sub: [
      { label: { en: "Urban Quiet", zh: "都市之静" }, filter: "urban-quiet" },
      { label: { en: "Fieldwork",   zh: "野外考察" }, filter: "fieldwork"   },
      { label: { en: "In Between",  zh: "过渡"     }, filter: "in-between"  },
    ],
  },
  { id: "about",   href: "/about",  label: { en: "About",   zh: "关于" } },
] as const;

export const NAV_WIDTH = 200; // px

// ─── Component ────────────────────────────────────────────────────────────────
export default function Nav() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useLang();

  const activeFilter = searchParams.get("filter") ?? "all";

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
          const label    = cat.label[lang];

          return (
            <div key={cat.id} style={{ marginBottom: isActive && "sub" in cat ? 2 : 8 }}>

              {/* Top-level link — Newsreader italic */}
              <Link href={cat.href} style={{ textDecoration: "none" }}>
                <div style={{
                  fontFamily: "var(--font-newsreader),serif",
                  fontStyle: "italic", fontWeight: 200,
                  fontSize: 14,
                  color: isActive ? "var(--dark)" : "var(--faint)",
                  padding: "4px 0",
                  transition: "color 0.2s",
                }}>{label}</div>
              </Link>

              {/* Sub-nav — LP tick-mark style, only when active */}
              {"sub" in cat && isActive && (
                <div style={{ paddingLeft: 2, marginTop: 4, marginBottom: 10 }}>
                  {cat.sub.map(item => {
                    const isSubActive = activeFilter === item.filter;
                    return (
                      <Link
                        key={item.filter}
                        href={`${cat.href}?filter=${item.filter}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "4px 0",
                        }}>
                          {/* Tick — extends when active */}
                          <motion.div
                            animate={{
                              width: isSubActive ? 14 : 5,
                              opacity: isSubActive ? 1 : 0.25,
                            }}
                            transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
                            style={{
                              height: 1,
                              background: "var(--dark)",
                              flexShrink: 0,
                            }}
                          />
                          {/* Label */}
                          <motion.span
                            animate={{ opacity: isSubActive ? 1 : 0.45 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              fontFamily: "var(--font-newsreader),serif",
                              fontStyle: "italic", fontWeight: 200,
                              fontSize: 12,
                              color: "var(--dark)",
                            }}
                          >
                            {item.label[lang]}
                          </motion.span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

    </div>
  );
}
