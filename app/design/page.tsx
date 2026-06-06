"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { TOP_BAR_HEIGHT } from "../components/TopBar";
import { useLang } from "../context/lang";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const TAG_LABELS: Record<string, Record<string, string>> = {
  en: { "brand-identity": "Brand Identity", "editorial": "Editorial", "uxui": "UX/UI", "motion": "Motion" },
  zh: { "brand-identity": "品牌设计", "editorial": "编辑设计", "uxui": "UX/UI", "motion": "动态" },
};

// ─── Works data ───────────────────────────────────────────────────────────────
export const works = [
  {
    num: "01", title: "Zentea",
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2023",
    note: "Tea as ritual. A brand language built from silence and ceremony.",
    img: "",
  },
  {
    num: "02", title: "Seasons",
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2022",
    note: "A flower store that changes with the light. Identity rooted in impermanence.",
    img: "",
  },
  {
    num: "03", title: "Steen Lab",
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2023",
    note: "Where clarity and credibility carry equal weight.",
    img: "",
  },
  {
    num: "04", title: "The Period",
    tag: "editorial", tagLabel: "Editorial", year: "2023",
    note: "A typeface that holds the weight of what comes before the full stop.",
    img: "",
  },
  {
    num: "05", title: "Salvation of Seven Deadly Sins",
    tag: "editorial", tagLabel: "Editorial", year: "2022",
    note: "Chocolate as salvation. Each sin given a flavour, a texture, a second chance.",
    img: "",
  },
  {
    num: "06", title: "One Second · Orient",
    tag: "editorial", tagLabel: "Editorial", year: "2022",
    note: "Named for the first second of sparkling water hitting the tongue.",
    img: "",
  },
  {
    num: "07", title: "Fractal Font",
    tag: "editorial", tagLabel: "Editorial", year: "2022",
    note: "Self-similarity scaled from glyph to composition.",
    img: "",
  },
  {
    num: "08", title: "Program Error",
    tag: "editorial", tagLabel: "Editorial", year: "2022",
    note: "Digital glitch as aesthetic language.",
    img: "",
  },
  {
    num: "09", title: "UToypia",
    tag: "uxui", tagLabel: "UX/UI", year: "2022",
    note: "A private creative space beyond reality — design your own toy, order it, own it.",
    img: "",
  },
  {
    num: "10", title: "ICH Museum",
    tag: "uxui", tagLabel: "UX/UI", year: "2023",
    note: "Digital experience bridging living tradition and contemporary archiving.",
    img: "",
  },
];

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ work }: { work: typeof works[0] | null }) {
  const { lang } = useLang();
  const labels = {
    empty: lang === "en" ? "HOVER A PROJECT" : "悬停查看项目",
    type:  lang === "en" ? "TYPE"  : "类型",
    year:  lang === "en" ? "YEAR"  : "年份",
    role:  lang === "en" ? "ROLE"  : "角色",
    designer: lang === "en" ? "DESIGNER" : "设计师",
  };

  if (!work) {
    return (
      <div style={{ color: "var(--faint)", fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.18em" }}>
        {labels.empty}
      </div>
    );
  }
  return (
    <div>
      {/* Image */}
      <div style={{
        width: "100%", height: "60vh",
        background: work.img ? undefined : "var(--placeholder)",
        marginBottom: 28, overflow: "hidden", flexShrink: 0,
      }}>
        {work.img && <img src={work.img} alt={work.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
        fontSize: "clamp(20px,1.8vw,26px)", color: "var(--dark)",
        lineHeight: 1.2, marginBottom: 16,
      }}>{work.title}</div>

      {/* Meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 24 }}>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52 }}>{labels.type}</span>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>{TAG_LABELS[lang][work.tag]}</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52 }}>{labels.year}</span>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>{work.year}</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52 }}>{labels.role}</span>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>{labels.designer}</span>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
        fontSize: "clamp(13px,1.1vw,15px)", color: "var(--dim)",
        lineHeight: 1.75, marginBottom: 24,
      }}>{work.note}</p>

    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Design() {
  const searchParams = useSearchParams();
  const { lang } = useLang();
  const activeFilter = searchParams.get("filter") ?? "all";
  const [hovered,  setHovered]  = useState<typeof works[0] | null>(null);
  const [selected, setSelected] = useState<typeof works[0] | null>(null);

  const activeWork = selected ?? hovered;

  const filtered = activeFilter === "all"
    ? works
    : works.filter(w => w.tag === activeFilter);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", paddingTop: TOP_BAR_HEIGHT }}>
      <Nav />

      {/* ── Three-column layout ── */}
      <div style={{
        marginLeft: NAV_WIDTH,
        flex: 1,
        display: "grid",
        gridTemplateColumns: "min(50%, 600px) 1fr",
        minHeight: "100dvh",
      }}>

        {/* ── Center: project list ── */}
        <div style={{
          borderRight: "1px solid var(--line)",
          padding: "48px 32px 80px 32px",
        }}>
          {/* Section header */}
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: 40, paddingBottom: 20,
            borderBottom: "1px solid var(--line)",
          }}>
            <h1 style={{
              fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
              fontSize: "clamp(32px,3.5vw,48px)", color: "var(--dark)",
            }}>{lang === "en" ? "Design" : "设计"}</h1>
            <span style={{
              fontFamily: "var(--font-geist),sans-serif",
              fontSize: 10, letterSpacing: "0.2em", color: "var(--faint)",
            }}>{filtered.length}{lang === "en" ? " PROJECTS" : " 个项目"}</span>
          </div>

          {/* Project rows */}
          <div>
            {filtered.map((work) => {
              const isSelected = selected?.num === work.num;
              const isDimmed = selected
                ? !isSelected
                : (hovered ? hovered.num !== work.num : false);
              return (
                <div
                  key={work.num}
                  onMouseEnter={() => setHovered(work)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(isSelected ? null : work)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "36px 1fr max-content max-content",
                    alignItems: "baseline",
                    gap: "0 32px",
                    padding: "18px 0",
                    borderBottom: "1px solid var(--line)",
                    cursor: "pointer",
                    opacity: isDimmed ? 0.15 : 1,
                    transition: "opacity 0.15s",
                  }}
                >
                  {/* Number / selection dot */}
                  <span style={{
                    fontFamily: "var(--font-geist),sans-serif",
                    fontSize: isSelected ? 16 : 9, letterSpacing: "0.2em",
                    color: isSelected ? "var(--dark)" : "var(--faint)",
                    lineHeight: 1, transition: "color 0.15s, font-size 0.15s",
                  }}>{isSelected ? "—" : work.num}</span>

                  {/* Title */}
                  <span style={{
                    fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                    fontSize: "clamp(18px,1.6vw,22px)", color: "var(--dark)",
                  }}>{work.title}</span>

                  {/* Tag */}
                  <span style={{
                    fontFamily: "var(--font-geist),sans-serif",
                    fontSize: 9, letterSpacing: "0.16em", color: "var(--faint)",
                  }}>{TAG_LABELS[lang][work.tag]}</span>

                  {/* Year */}
                  <span style={{
                    fontFamily: "var(--font-geist),sans-serif",
                    fontSize: 9, color: "var(--faint)",
                  }}>{work.year}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: detail panel ── */}
        <div style={{
          position: "sticky", top: TOP_BAR_HEIGHT,
          height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`, overflowY: "auto",
          padding: "48px 40px 48px 40px",
          display: "flex", flexDirection: "column",
        }}>
          <DetailPanel work={activeWork} />
        </div>

      </div>
    </div>
  );
}
