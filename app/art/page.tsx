"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { TOP_BAR_HEIGHT } from "../components/TopBar";
import { useLang } from "../context/lang";

// ─── Medium labels ────────────────────────────────────────────────────────────
const MEDIUM_LABELS: Record<string, Record<string, string>> = {
  en: { ceramic: "Ceramic", sculpture: "Sculpture", painting: "Painting" },
  zh: { ceramic: "陶艺",    sculpture: "雕塑",       painting: "绘画"     },
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
    img: "",
  },
];

// ─── Filters ──────────────────────────────────────────────────────────────────
const FILTERS = [
  { key: "ceramic",   en: "Ceramic",   zh: "陶艺" },
  { key: "sculpture", en: "Sculpture", zh: "雕塑" },
  { key: "painting",  en: "Painting",  zh: "绘画" },
] as const;

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ work }: { work: typeof artWorks[0] | null }) {
  const { lang } = useLang();

  if (!work) {
    return (
      <div style={{ color: "var(--faint)", fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.18em" }}>
        {lang === "en" ? "CLICK TO VIEW" : "点击查看"}
      </div>
    );
  }

  return (
    <div>
      {/* Images */}
      {"images" in work && (work as typeof work & { images?: ImageEntry[] }).images?.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 28 }}>
          {(work as typeof work & { images: ImageEntry[] }).images.map((entry, i) => {
            if (Array.isArray(entry)) {
              return (
                <div key={i} style={{ display: "flex", gap: 6 }}>
                  <img src={entry[0]} alt={`${work.title} ${i + 1}a`} style={{ width: "50%", display: "block", objectFit: "cover", aspectRatio: "3/4" }} />
                  <img src={entry[1]} alt={`${work.title} ${i + 1}b`} style={{ width: "50%", display: "block", objectFit: "cover", aspectRatio: "3/4" }} />
                </div>
              );
            }
            if (typeof entry === "object" && "src" in entry) {
              return <img key={i} src={entry.src} alt={`${work.title} ${i + 1}`} style={{ width: "100%", display: "block", clipPath: `inset(${entry.cropY}px 0 ${entry.cropY}px 0)` }} />;
            }
            return <img key={i} src={entry} alt={`${work.title} ${i + 1}`} style={{ width: "100%", height: "auto", display: "block" }} />;
          })}
        </div>
      ) : (
        <div style={{ width: "100%", height: "60vh", background: work.img ? undefined : "var(--placeholder)", marginBottom: 28, overflow: "hidden" }}>
          {work.img && <img src={work.img} alt={work.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
        </div>
      )}

      {/* Title */}
      <div style={{
        fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
        fontSize: "clamp(20px,1.8vw,26px)", color: "var(--dark)",
        lineHeight: 1.2, marginBottom: 16,
      }}>
        {work.title}
      </div>

      {/* Meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 24 }}>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52 }}>
            {lang === "en" ? "MEDIUM" : "媒介"}
          </span>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>
            {MEDIUM_LABELS[lang][work.medium]}
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52 }}>
            {lang === "en" ? "YEAR" : "年份"}
          </span>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>
            {work.year}
          </span>
        </div>
      </div>

      {/* Description */}
      {work.note ? (
        <p style={{
          fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
          fontSize: "clamp(13px,1.1vw,15px)", color: "var(--dim)",
          lineHeight: 1.75, whiteSpace: "pre-line",
        }}>
          {lang === "zh" ? work.noteZh || work.note : work.note}
        </p>
      ) : null}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Art() {
  const { lang } = useLang();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hovered,  setHovered]  = useState<typeof artWorks[0] | null>(null);
  const [selected, setSelected] = useState<typeof artWorks[0] | null>(null);

  const filtered = activeFilter === "all"
    ? artWorks
    : artWorks.filter(w => w.medium === activeFilter);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", paddingTop: TOP_BAR_HEIGHT }}>
      <Nav />

      <div style={{
        marginLeft: NAV_WIDTH, flex: 1,
        display: "grid",
        gridTemplateColumns: "min(50%, 600px) 1fr",
        minHeight: "100dvh",
      }}>

        {/* ── Left: list ── */}
        <div style={{ borderRight: "1px solid var(--line)", padding: "48px 32px 80px 32px" }}>
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 40, paddingBottom: 20, borderBottom: "1px solid var(--line)",
          }}>
            <h1 style={{
              fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
              fontSize: "clamp(32px,3.5vw,48px)", color: "var(--dark)",
            }}>{lang === "en" ? "Art" : "艺术"}</h1>

            {/* Filters */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
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
                      {"zh" in f ? (lang === "en" ? (f as { key: string; en: string; zh: string }).en : (f as { key: string; en: string; zh: string }).zh) : (lang === "en" ? "ALL" : "全部")}
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

          {/* Rows */}
          <div>
            {filtered.map((work) => {
              const isSelected = selected?.num === work.num;
              const isDimmed = selected ? !isSelected : (hovered ? hovered.num !== work.num : false);
              return (
                <div
                  key={work.num}
                  onMouseEnter={() => setHovered(work)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(isSelected ? null : work)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "36px 1fr max-content",
                    alignItems: "baseline", gap: "0 32px",
                    padding: "18px 0", borderBottom: "1px solid var(--line)",
                    cursor: "pointer",
                    opacity: isDimmed ? 0.15 : 1, transition: "opacity 0.15s",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-geist),sans-serif",
                    fontSize: isSelected ? 16 : 9, letterSpacing: "0.2em",
                    color: isSelected ? "var(--dark)" : "var(--faint)",
                    lineHeight: 1, transition: "color 0.15s, font-size 0.15s",
                  }}>{isSelected ? "—" : work.num}</span>

                  <span style={{
                    fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                    fontSize: "clamp(18px,1.6vw,22px)", color: "var(--dark)",
                  }}>{work.title}</span>

                  <span style={{
                    fontFamily: "var(--font-geist),sans-serif",
                    fontSize: 9, letterSpacing: "0.16em", color: "var(--faint)",
                  }}>{MEDIUM_LABELS[lang][work.medium]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: detail panel ── */}
        <div style={{
          position: "sticky", top: TOP_BAR_HEIGHT,
          height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
          overflowY: "auto", padding: "48px 40px 80px",
        }}>
          <DetailPanel work={selected} />
        </div>

      </div>
    </div>
  );
}
