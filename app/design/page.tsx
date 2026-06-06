"use client";
import { useState } from "react";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { TOP_BAR_HEIGHT } from "../components/TopBar";
import { useLang } from "../context/lang";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const TAG_LABELS: Record<string, Record<string, string>> = {
  en: { "brand-identity": "Brand Identity", "editorial": "Editorial", "uxui": "UX/UI", "product": "Product Design", "motion": "Motion" },
  zh: { "brand-identity": "品牌设计", "editorial": "编辑设计", "uxui": "UX/UI", "product": "产品设计", "motion": "动态" },
};

// ─── Image entry types ────────────────────────────────────────────────────────
// string = normal image
// [string, string] = side-by-side pair
// { src, cropY } = image with top/bottom crop in px
type ImageEntry = string | [string, string] | { src: string; cropY: number };

// ─── Works data ───────────────────────────────────────────────────────────────
export const works = [
  {
    num: "01", title: "Zentea",
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2024",
    note: "Tea as ritual. A brand language built from silence and ceremony.",
    img: "/Images/ZENTEA/主图.png",
    images: [
      "/Images/ZENTEA/主图.png",
      "/Images/ZENTEA/stationery.png",
      "/Images/ZENTEA/小册子.jpg",
      "/Images/ZENTEA/礼品卡.jpg",
      "/Images/ZENTEA/明信片.jpg",
      "/Images/ZENTEA/盒装.jpg",
      ["/Images/ZENTEA/Shopping%20Bag%20on%20Street%20Mockup_%E5%89%AF%E6%9C%AC.jpg", "/Images/ZENTEA/Shopping%20Bag%20on%20Street%20Mockup-2_%E5%89%AF%E6%9C%AC.jpg"] as [string, string],
      "/Images/ZENTEA/Menu%20Mockup_%E5%89%AF%E6%9C%AC.jpg",
      "/Images/ZENTEA/社媒.png",
      "/Images/ZENTEA/ZENTEA%20WEBPAGE_%E5%89%AF%E6%9C%AC.png",
      "/Images/ZENTEA/地光.png",
      "/Images/ZENTEA/Wayfinding_%E5%89%AF%E6%9C%AC.jpg",
      "/Images/ZENTEA/Window%20Banner%20Mockup_%E5%89%AF%E6%9C%AC.jpg",
    ] as ImageEntry[],
  },
  {
    num: "02", title: "Seasons",
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2022",
    note: "A flower store that changes with the light. Identity rooted in impermanence.",
    img: "/Images/Seasons/主图.jpeg",
    images: [
      "/Images/Seasons/主图.jpeg",
      "/Images/Seasons/menu.jpg",
      "/Images/Seasons/养护指南.jpg",
      "/Images/Seasons/包装.jpg",
      "/Images/Seasons/卡片1.jpg",
      "/Images/Seasons/卡片2.jpg",
      "/Images/Seasons/地广1.jpg",
      "/Images/Seasons/地广2.jpg",
      "/Images/Seasons/帆布包.jpg",
      "/Images/Seasons/网站.png",
    ] as ImageEntry[],
  },
  {
    num: "03", title: "The Period",
    tag: "editorial", tagLabel: "Editorial", year: "2025",
    note: "Typography as body politics. A typeface that refuses to apologize.",
    img: "/Images/月经体/月经体%20主图.jpg",
    images: [
      "/Images/月经体/月经体%20主图.jpg",
    ] as ImageEntry[],
    video: "/Images/月经体/motion.mp4",
  },
  {
    num: "04", title: "Salvation of Seven Deadly Sins",
    tag: "editorial", tagLabel: "Editorial", year: "2022",
    note: "Chocolate as salvation. Each sin given a flavour, a texture, a second chance.",
    img: "/Images/Chocolate/主图.jpg",
    images: [
      "/Images/Chocolate/主图.jpg",
      "/Images/Chocolate/2%20%E5%B9%B3%E9%9D%A2%E5%9B%BE.jpg",
      { src: "/Images/Chocolate/3.overview.png", cropY: 10 },
    ] as ImageEntry[],
  },
  {
    num: "05", title: "One Second",
    tag: "editorial", tagLabel: "Editorial", year: "2022",
    note: "Named for the first second of sparkling water hitting the tongue.",
    img: "/Images/One%20Second/主图.jpg",
    images: [
      "/Images/One%20Second/主图.jpg",
      "/Images/One%20Second/2-Peach%20Mock%20up%20White.jpg",
      "/Images/One%20Second/3.jpg",
    ] as ImageEntry[],
  },
  {
    num: "06", title: "Orient",
    tag: "editorial", tagLabel: "Editorial", year: "2022",
    note: "An editorial identity for a sparkling water brand. Mineral, restrained, precise.",
    img: "/Images/Orient/主图.jpeg",
    images: [
      "/Images/Orient/主图.jpeg",
      "/Images/Orient/orient2-min_%E5%89%AF%E6%9C%AC.jpeg",
      "/Images/Orient/orient3_%E5%89%AF%E6%9C%AC.jpeg",
    ] as ImageEntry[],
    pdf: "/Images/Orient/Orient%20-%20magazine_%E5%89%AF%E6%9C%AC.pdf",
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
    num: "09", title: "ICH Museum",
    tag: "uxui", tagLabel: "UX/UI", year: "2022",
    note: "Digital experience bridging living tradition and contemporary archiving.",
    img: "/Images/UToypia/主图.jpg",
    images: [
      "/Images/UToypia/主图.jpg",
      "/Images/UToypia/电脑端.png",
      "/Images/UToypia/手机端.png",
      "/Images/UToypia/社媒+工牌.jpg",
      "/Images/UToypia/T恤.png",
      "/Images/UToypia/地广.jpg",
      "/Images/UToypia/地广2.png",
      "/Images/UToypia/Future%20feature.png",
    ] as ImageEntry[],
    credits: [
      { role: "CO-DESIGNER", name: "Ash Wang", href: "http://ashwdesign.com/" },
    ],
  },
  {
    num: "10", title: "Dieter Rams Poster",
    tag: "editorial", tagLabel: "Editorial", year: "2023",
    note: "Ten principles, one composition. A tribute to a philosophy of making.",
    img: "/Images/Dieter%20Rams%20Poster/主图.jpg",
    images: [
      "/Images/Dieter%20Rams%20Poster/主图.jpg",
    ] as ImageEntry[],
  },
  {
    num: "11", title: "Anxiety Relief",
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2023",
    note: "Design as care. A visual system built around stillness and recovery.",
    img: "/Images/Anxiety%20Relief/主图.jpg",
    images: [
      "/Images/Anxiety%20Relief/主图.jpg",
      "/Images/Anxiety%20Relief/2023-03-26-11.43.40_%E5%89%AF%E6%9C%AC.png",
    ] as ImageEntry[],
  },
  {
    num: "12",
    title: "形存意减：视觉简化与语境流失",
    titleEn: "The Persistence of Form: Visual Simplification and Contextual Loss",
    tag: "editorial", tagLabel: "Editorial", year: "2025",
    note: "An ancient binding method, reinterpreted. Paper folded like scales, holding light.",
    img: "/Images/龙鳞装/主图.JPG",
    images: [
      "/Images/龙鳞装/主图.JPG",
      "/Images/龙鳞装/2.JPG",
      "/Images/龙鳞装/3.JPG",
      "/Images/龙鳞装/4.JPG",
      "/Images/龙鳞装/5.JPG",
      "/Images/龙鳞装/6.JPG",
      "/Images/龙鳞装/7.JPG",
    ] as ImageEntry[],
    credits: [
      { role: "PHOTO", name: "Rebecca (@un_coz_)", href: "https://www.instagram.com/un_coz_/" },
      { role: "", name: "小红书 @Nixuy", href: "https://xhslink.com/m/1ciUK7MvEDa" },
    ],
    writingLink: "/words",
  },
  {
    num: "13", title: "八月花神", titleEn: "August Offering",
    tag: "product", tagLabel: "Product Design", year: "2025",
    note: "A seasonal identity grounded in offering and bloom.",
    img: "/Images/八月花神/主图.png",
    images: [
      "/Images/八月花神/主图.png",
      "/Images/八月花神/2.png",
      "/Images/八月花神/3.png",
      "/Images/八月花神/4.png",
      "/Images/八月花神/5.png",
      "/Images/八月花神/盘子1_%E5%89%AF%E6%9C%AC.png",
      "/Images/八月花神/盘子2_%E5%89%AF%E6%9C%AC.png",
      "/Images/八月花神/盘子3_%E5%89%AF%E6%9C%AC.png",
      "/Images/八月花神/盘子4_%E5%89%AF%E6%9C%AC.png",
    ] as ImageEntry[],
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
      {/* Images — gallery if multiple, single placeholder if none */}
      {"images" in work && (work as typeof work & { images?: ImageEntry[] }).images?.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 28 }}>
          {((work as typeof work & { images: ImageEntry[] }).images).map((entry, i) => {
            if (Array.isArray(entry)) {
              return (
                <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <img src={entry[0]} alt={`${work.title} ${i + 1}a`} style={{ width: "50%", display: "block", objectFit: "cover", aspectRatio: "3/4" }} />
                  <img src={entry[1]} alt={`${work.title} ${i + 1}b`} style={{ width: "50%", display: "block", objectFit: "cover", aspectRatio: "3/4" }} />
                </div>
              );
            }
            if (typeof entry === "object" && "src" in entry) {
              return (
                <img key={i} src={entry.src} alt={`${work.title} ${i + 1}`}
                  style={{ width: "100%", display: "block", clipPath: `inset(${entry.cropY}px 0 ${entry.cropY}px 0)` }} />
              );
            }
            return <img key={i} src={entry} alt={`${work.title} ${i + 1}`} style={{ width: "100%", height: "auto", display: "block" }} />;
          })}
        </div>
      ) : (
        <div style={{
          width: "100%", height: "60vh",
          background: work.img ? undefined : "var(--placeholder)",
          marginBottom: 28, overflow: "hidden", flexShrink: 0,
        }}>
          {work.img && <img src={work.img} alt={work.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
        </div>
      )}

      {/* Video */}
      {"video" in work && (work as typeof work & { video?: string }).video && (
        <video
          src={(work as typeof work & { video: string }).video}
          controls
          style={{ width: "100%", display: "block", marginBottom: 6 }}
        />
      )}

      {/* Title */}
      <div style={{
        fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
        fontSize: "clamp(20px,1.8vw,26px)", color: "var(--dark)",
        lineHeight: 1.2, marginBottom: 16,
      }}>
        {lang === "en" && "titleEn" in work
          ? (work as typeof work & { titleEn: string }).titleEn
          : work.title}
      </div>

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
        {/* Credits */}
        {"credits" in work && (work as typeof work & { credits?: { role: string; name: string; href?: string }[] }).credits?.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: 24 }}>
            <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52, flexShrink: 0 }}>{c.role}</span>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)", textDecoration: "none" }}>
                {c.name} ↗
              </a>
            ) : (
              <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>{c.name}</span>
            )}
          </div>
        ))}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
        fontSize: "clamp(13px,1.1vw,15px)", color: "var(--dim)",
        lineHeight: 1.75, marginBottom: 24,
      }}>{work.note}</p>

      {/* PDF link */}
      {"pdf" in work && (work as typeof work & { pdf?: string }).pdf && (
        <a href={(work as typeof work & { pdf: string }).pdf} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "var(--dim)", textDecoration: "none", display: "inline-block", marginBottom: 8 }}>
          VIEW MAGAZINE PDF →
        </a>
      )}

      {/* Writing link */}
      {"writingLink" in work && (work as typeof work & { writingLink?: string }).writingLink && (
        <a href={(work as typeof work & { writingLink: string }).writingLink}
          style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "var(--dim)", textDecoration: "none", display: "block" }}>
          READ ESSAY →
        </a>
      )}

    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const FILTERS = [
  { key: "brand-identity", en: "Brand Identity", zh: "品牌设计" },
  { key: "editorial",      en: "Editorial",      zh: "编辑设计" },
  { key: "uxui",           en: "UX/UI",           zh: "UX/UI"   },
  { key: "product",        en: "Product",         zh: "产品设计" },
] as const;

export default function Design() {
  const { lang } = useLang();
  const [activeFilter, setActiveFilter] = useState<string>("all");
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
            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
              {/* ALL */}
              <button
                onClick={() => setActiveFilter("all")}
                style={{
                  fontFamily: "var(--font-geist),sans-serif",
                  fontSize: 9, letterSpacing: "0.2em",
                  color: activeFilter === "all" ? "var(--dark)" : "var(--faint)",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: activeFilter === "all" ? "1px solid var(--dark)" : "1px solid transparent",
                  paddingBottom: 2, transition: "color 0.15s",
                }}
              >{lang === "en" ? "ALL" : "全部"}</button>
              {FILTERS.map(f => {
                const isActive = activeFilter === f.key;
                return (
                  <button key={f.key}
                    onClick={() => setActiveFilter(isActive ? "all" : f.key)}
                    style={{
                      fontFamily: "var(--font-geist),sans-serif",
                      fontSize: 9, letterSpacing: "0.2em",
                      color: isActive ? "var(--dark)" : "var(--faint)",
                      background: "none", border: "none", cursor: "pointer",
                      borderBottom: isActive ? "1px solid var(--dark)" : "1px solid transparent",
                      paddingBottom: 2, transition: "color 0.15s",
                    }}
                  >{lang === "en" ? f.en : f.zh}</button>
                );
              })}
            </div>
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
                  }}>
                    {lang === "en" && "titleEn" in work
                      ? (work as typeof work & { titleEn: string }).titleEn
                      : work.title}
                  </span>

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
