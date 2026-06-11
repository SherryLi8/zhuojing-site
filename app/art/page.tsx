"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { TOP_BAR_HEIGHT } from "../components/TopBar";
import { useLang } from "../context/lang";
import { useIsMobile } from "../hooks/useIsMobile";

// ─── Medium labels ────────────────────────────────────────────────────────────
const MEDIUM_LABELS: Record<string, Record<string, string>> = {
  en: { ceramic: "Ceramic", sculpture: "Sculpture", painting: "Painting", drawing: "Drawing", riso: "Risograph" },
  zh: { ceramic: "陶艺",    sculpture: "雕塑",       painting: "绘画",     drawing: "素描",   riso: "Riso 印刷" },
};

// ─── Image entry type ─────────────────────────────────────────────────────────
type ImageEntry = string | [string, string] | { src: string; cropY: number };

// ─── Art works ────────────────────────────────────────────────────────────────
const artWorks = [
  {
    num: "01", title: "Wave",
    medium: "ceramic", year: "2024",
    note: "Wave is a ceramic collection inspired by the natural patterns that emerge when pressing clay with a roller — subtle waves formed by uneven pressure. Initially, I aimed for a calm and controlled surface, but midway through the process, I grew tired of predictable perfection. Instead, I chose to embrace the wild, letting the waves take on a more expressive, untamed form. This shift transformed the collection into a reflection of movement, spontaneity, and the raw energy of creation.",
    noteZh: "Wave 是一套以陶瓷为媒介的系列，灵感来自用滚轴压制陶土时自然产生的肌理——不均匀的压力在表面留下微妙的波浪。起初，我追求平静、可控的表面；但做到一半，我开始厌倦这种可以被预期的完美。于是我选择拥抱野性，让波浪呈现出更富表现力、更不羁的形态。这一转变，让整个系列化为对运动、自发性与创作原始能量的映照。",
    img: "/Images/Waves/主图.jpg",
    images: [
      "/Images/Waves/主图.jpg",
      "/Images/Waves/IMG_0170_副本.jpg",
      "/Images/Waves/IMG_0181_副本.jpg",
      "/Images/Waves/IMG_0193_副本.jpg",
      "/Images/Waves/IMG_0202_副本.jpg",
    ] as ImageEntry[],
  },
  {
    num: "02", title: "Self Portrait Sculpture",
    medium: "sculpture", year: "2023",
    note: "",
    img: "/Images/Self-%20Portrait%20Sculpture/主图.JPG",
    images: [
      "/Images/Self-%20Portrait%20Sculpture/主图.JPG",
      "/Images/Self-%20Portrait%20Sculpture/DSCF2323_%E5%89%AF%E6%9C%AC.JPG",
      "/Images/Self-%20Portrait%20Sculpture/DSCF2329_%E5%89%AF%E6%9C%AC.JPG",
      "/Images/Self-%20Portrait%20Sculpture/DSCF2331_%E5%89%AF%E6%9C%AC.JPG",
      "/Images/Self-%20Portrait%20Sculpture/DSCF2346_%E5%89%AF%E6%9C%AC.JPG",
      "/Images/Self-%20Portrait%20Sculpture/DSCF2353_%E5%89%AF%E6%9C%AC.JPG",
    ] as ImageEntry[],
  },
  {
    num: "03", title: "消失", titleEn: "Disappearance",
    medium: "painting", year: "2024",
    note: "",
    img: "/Images/消失.JPG",
    images: ["/Images/消失.JPG"] as ImageEntry[],
  },
  {
    num: "04", title: "", titleEn: "",
    medium: "painting", year: "2024",
    note: "",
    img: "/Images/油画1.jpg",
    images: ["/Images/油画1.jpg"] as ImageEntry[],
  },
  {
    num: "04b", title: "", titleEn: "",
    medium: "painting", year: "2024",
    note: "",
    img: "/Images/油画2.jpg",
    images: ["/Images/油画2.jpg"] as ImageEntry[],
  },
  {
    num: "04c", title: "", titleEn: "",
    medium: "painting", year: "2024",
    note: "",
    img: "/Images/油画3.jpg",
    images: ["/Images/油画3.jpg"] as ImageEntry[],
  },
  {
    num: "04d", title: "", titleEn: "",
    medium: "painting", year: "2024",
    note: "",
    img: "/Images/油画4.jpeg",
    images: ["/Images/油画4.jpeg"] as ImageEntry[],
  },
  {
    num: "05", title: "素描", titleEn: "Sketches",
    medium: "drawing", year: "2024",
    note: "",
    img: "/Images/sketch1.JPG",
    images: [
      "/Images/sketch1.JPG",
      "/Images/sketch2.JPG",
      "/Images/sketch3.jpg",
    ] as ImageEntry[],
  },
  {
    num: "06", title: "Riso", titleEn: "Risograph",
    medium: "riso", year: "2024",
    note: "",
    img: "/Images/riso.jpg",
    images: ["/Images/riso.jpg"] as ImageEntry[],
  },
];

// ─── Filters ──────────────────────────────────────────────────────────────────
const FILTERS = [
  { key: "ceramic",   en: "Ceramic",   zh: "陶艺" },
  { key: "sculpture", en: "Sculpture", zh: "雕塑" },
  { key: "painting",  en: "Painting",  zh: "绘画" },
  { key: "drawing",   en: "Drawing",   zh: "素描" },
  { key: "riso",      en: "Riso",      zh: "Riso" },
] as const;

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ work, onClose }: { work: typeof artWorks[0]; onClose: () => void }) {
  const { lang } = useLang();

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const displayTitle = lang === "en" && "titleEn" in work
    ? (work as typeof work & { titleEn: string }).titleEn
    : work.title;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
        zIndex: 1000, overflowY: "auto",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Close button */}
      <div style={{ position: "sticky", top: 0, display: "flex", justifyContent: "flex-end", padding: "18px 24px", flexShrink: 0, zIndex: 10 }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)", fontSize: 20, lineHeight: 1, fontFamily: "var(--font-geist),sans-serif", padding: "4px 8px" }}>
          ✕
        </button>
      </div>

      {/* Content — stop propagation so clicking images doesn't close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 780, width: "100%", margin: "0 auto", padding: "0 24px 80px" }}
      >
        {/* Images */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 32 }}>
          {(work.images ?? [work.img]).map((entry, i) => {
            if (Array.isArray(entry)) {
              return (
                <div key={i} style={{ display: "flex", gap: 6 }}>
                  <img src={entry[0]} alt={`${work.title} ${i}a`} style={{ width: "50%", display: "block", height: "auto" }} />
                  <img src={entry[1]} alt={`${work.title} ${i}b`} style={{ width: "50%", display: "block", height: "auto" }} />
                </div>
              );
            }
            if (typeof entry === "object" && "src" in entry) {
              return <img key={i} src={entry.src} alt={`${work.title} ${i}`} style={{ width: "100%", display: "block", clipPath: `inset(${entry.cropY}px 0 ${entry.cropY}px 0)` }} />;
            }
            return <img key={i} src={entry as string} alt={`${work.title} ${i}`} style={{ width: "100%", height: "auto", display: "block" }} />;
          })}
        </div>

        {/* Meta */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24 }}>
          {displayTitle && (
            <div style={{
              fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
              fontSize: "clamp(20px,1.8vw,26px)", color: "rgba(255,255,255,0.88)",
              lineHeight: 1.2, marginBottom: 16,
            }}>
              {displayTitle}
            </div>
          )}
          <div style={{ display: "flex", gap: 32, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)" }}>
                {lang === "en" ? "MEDIUM" : "媒介"}
              </span>
              <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)" }}>
                {MEDIUM_LABELS[lang][work.medium]}
              </span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)" }}>
                {lang === "en" ? "YEAR" : "年份"}
              </span>
              <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)" }}>
                {work.year}
              </span>
            </div>
          </div>
          {work.note ? (
            <p style={{
              fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
              fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75, whiteSpace: "pre-line",
            }}>
              {lang === "zh" && "noteZh" in work
                ? (work as typeof work & { noteZh: string }).noteZh
                : work.note}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Art() {
  const { lang } = useLang();
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selected, setSelected] = useState<typeof artWorks[0] | null>(null);

  const filtered = activeFilter === "all"
    ? artWorks
    : artWorks.filter(w => w.medium === activeFilter);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", paddingTop: TOP_BAR_HEIGHT }}>
      <Nav />

      <div style={{ marginLeft: isMobile ? 0 : NAV_WIDTH, flex: 1, padding: isMobile ? "48px 20px 80px" : "48px 40px 80px 40px" }}>

        {/* Header + filters */}
        <div style={{
          display: "flex", alignItems: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", gap: isMobile ? 16 : 0,
          marginBottom: 40, paddingBottom: 20, borderBottom: "1px solid var(--line)",
        }}>
          <h1 style={{
            fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
            fontSize: "clamp(32px,3.5vw,48px)", color: "var(--dark)",
          }}>{lang === "en" ? "Art" : "艺术"}</h1>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: isMobile ? "flex-start" : "flex-end" }}>
            {[{ key: "all", en: "ALL", zh: "全部" }, ...FILTERS].map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <button key={f.key}
                  onClick={() => setActiveFilter(isActive && f.key !== "all" ? "all" : f.key)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <span style={{
                    display: "inline-block", position: "relative", paddingBottom: 4,
                    fontFamily: "var(--font-geist),sans-serif",
                    fontSize: 9, letterSpacing: "0.2em",
                    color: isActive ? "var(--dark)" : "var(--faint)",
                    transition: "color 0.2s",
                  }}>
                    {"zh" in f
                      ? (lang === "en" ? (f as { key: string; en: string; zh: string }).en : (f as { key: string; en: string; zh: string }).zh)
                      : (lang === "en" ? "ALL" : "全部")}
                    <motion.div
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: 1, background: "var(--dark)", transformOrigin: "left center",
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry grid — CSS columns */}
        <div style={{ columns: isMobile ? "2 140px" : "3 280px", columnGap: 12 }}>
          {filtered.map((work) => (
            <motion.div
              key={work.num}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(work)}
              style={{
                breakInside: "avoid",
                marginBottom: 12,
                cursor: "pointer",
                position: "relative",
              }}
            >
              {work.img ? (
                <img
                  src={work.img}
                  alt={work.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              ) : (
                <div style={{ width: "100%", paddingBottom: "120%", background: "var(--placeholder)" }} />
              )}
              {/* Caption on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.58)",
                  display: "flex", flexDirection: "column",
                  justifyContent: "flex-end", padding: "14px 16px",
                }}
              >
                {(() => {
                  const t = lang === "en" && "titleEn" in work
                    ? (work as typeof work & { titleEn: string }).titleEn
                    : work.title;
                  return t ? (
                    <span style={{
                      fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                      fontSize: 14, color: "#fff", lineHeight: 1.2, marginBottom: 4,
                    }}>{t}</span>
                  ) : null;
                })()}
                <span style={{
                  fontFamily: "var(--font-geist),sans-serif", fontSize: 9,
                  letterSpacing: "0.18em", color: "rgba(255,255,255,0.75)",
                }}>
                  {MEDIUM_LABELS[lang][work.medium]}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox work={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
