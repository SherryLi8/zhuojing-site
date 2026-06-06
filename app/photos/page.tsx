"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../lib/constants";

const P = "/Images/Photos";

// ─── Photo grids ──────────────────────────────────────────────────────────────
const photoGrids: Record<string, { id: string; aspect: string; src: string }[]> = {
  "new-york": [
    { id: "ny1", aspect: "3/2", src: `${P}/1. New York/20220212-IMG_0614_副本.jpg` },
    { id: "ny2", aspect: "2/3", src: `${P}/1. New York/IMG_0577_副本.jpg` },
    { id: "ny3", aspect: "3/2", src: `${P}/1. New York/20220212-IMG_0612_副本.jpg` },
    { id: "ny4", aspect: "2/3", src: `${P}/1. New York/20220208-IMG_0605_副本.jpg` },
    { id: "ny5", aspect: "3/2", src: `${P}/1. New York/20220130-IMG_0287_副本.jpg` },
    { id: "ny6", aspect: "2/3", src: `${P}/1. New York/20220213-IMG_0628_副本.jpg` },
    { id: "ny7", aspect: "3/2", src: `${P}/1. New York/Cropped_副本.jpg` },
    { id: "ny8", aspect: "2/3", src: `${P}/1. New York/20220212-20220212-IMG_6925_副本.jpg` },
  ],
  "guiyang": [
    { id: "gy1", aspect: "3/2", src: `${P}/2.Guiyang/未命名-13_副本.jpg` },
    { id: "gy2", aspect: "3/2", src: `${P}/2.Guiyang/未命名-16_副本.jpg` },
    { id: "gy3", aspect: "3/2", src: `${P}/2.Guiyang/未命名-19_副本.jpg` },
    { id: "gy4", aspect: "3/2", src: `${P}/2.Guiyang/未命名-28_副本.jpg` },
    { id: "gy5", aspect: "3/2", src: `${P}/2.Guiyang/未命名-36_副本.jpg` },
  ],
  "los-angeles": [
    { id: "la1", aspect: "3/2", src: `${P}/Los Angeles/LP主图.jpg` },
    { id: "la2", aspect: "3/2", src: `${P}/Los Angeles/IMG0616-R01-002A.jpg` },
    { id: "la3", aspect: "3/2", src: `${P}/Los Angeles/IMG0617-R01-008.jpg` },
    { id: "la4", aspect: "3/2", src: `${P}/Los Angeles/IMG0617-R01-017.jpg` },
    { id: "la5", aspect: "3/2", src: `${P}/Los Angeles/IMG0617-R01-020.jpg` },
    { id: "la6", aspect: "3/2", src: `${P}/Los Angeles/IMG0617-R01-024.jpg` },
    { id: "la7", aspect: "3/2", src: `${P}/Los Angeles/IMG0617-R01-033.jpg` },
    { id: "la8", aspect: "3/2", src: `${P}/Los Angeles/IMG5461-R01-006_副本.jpg` },
  ],
  "usc": [
    { id: "usc1", aspect: "3/2", src: `${P}/USC/LP主图.JPG` },
    { id: "usc2", aspect: "3/2", src: `${P}/USC/IMG4754-R01-002A.JPG` },
    { id: "usc3", aspect: "3/2", src: `${P}/USC/IMG4754-R01-005A.JPG` },
    { id: "usc4", aspect: "3/2", src: `${P}/USC/IMG4754-R01-010A.JPG` },
    { id: "usc5", aspect: "3/2", src: `${P}/USC/IMG4754-R01-028A-2.JPG` },
    { id: "usc6", aspect: "3/2", src: `${P}/USC/IMG4754-R01-036A.JPG` },
    { id: "usc7", aspect: "3/2", src: `${P}/USC/IMG4755-R01-030.JPG` },
    { id: "usc8", aspect: "3/2", src: `${P}/USC/IMG4755-R01-034.JPG` },
    { id: "usc9", aspect: "3/2", src: `${P}/USC/IMG4755-R01-035.JPG` },
    { id: "usc10", aspect: "3/2", src: `${P}/USC/IMG4755-R01-036.JPG` },
  ],
  "yosemite": [
    { id: "yo1", aspect: "3/2", src: `${P}/Yosemite/000236660001_副本.jpg` },
    { id: "yo2", aspect: "3/2", src: `${P}/Yosemite/000236660005_副本.jpg` },
    { id: "yo3", aspect: "3/2", src: `${P}/Yosemite/000236660007_副本.jpg` },
    { id: "yo4", aspect: "3/2", src: `${P}/Yosemite/000236660009_副本.jpg` },
    { id: "yo5", aspect: "3/2", src: `${P}/Yosemite/000236660015-2_副本.jpg` },
    { id: "yo6", aspect: "3/2", src: `${P}/Yosemite/000236660015_副本.jpg` },
    { id: "yo7", aspect: "3/2", src: `${P}/Yosemite/000236660018-2_副本.jpg` },
    { id: "yo8", aspect: "3/2", src: `${P}/Yosemite/000236660019_副本.jpg` },
    { id: "yo9", aspect: "3/2", src: `${P}/Yosemite/000236660022_副本.jpg` },
    { id: "yo10", aspect: "3/2", src: `${P}/Yosemite/000236660027_副本.jpg` },
  ],
};

// ─── Series data ──────────────────────────────────────────────────────────────
const seriesData = {
  en: [
    { id: "new-york",     title: "In Between",   location: "New York",     year: "2022", count: 8,  note: "Everything happens in the margins. The threshold, the pause, the transit." },
    { id: "guiyang",      title: "Home Ground",  location: "Guiyang",      year: "2022", count: 5,  note: "The familiar made strange. A hometown seen through borrowed distance." },
    { id: "los-angeles",  title: "Silver",       location: "Los Angeles",  year: "2023", count: 8,  note: "Light that arrives sideways. Film grain as atmosphere." },
    { id: "usc",          title: "Residency",    location: "USC",          year: "2024", count: 10, note: "The institution as landscape. Weeks at a time, observed in passing." },
    { id: "yosemite",     title: "Exposure",     location: "Yosemite",     year: "2023", count: 10, note: "Scale that unmakes you. The valley holds everything it needs to." },
  ],
  zh: [
    { id: "new-york",     title: "过渡",   location: "纽约",   year: "2022", count: 8,  note: "一切都发生在边缘。阈值、停顿、过渡。" },
    { id: "guiyang",      title: "故土",   location: "贵阳",   year: "2022", count: 5,  note: "熟悉的陌生感。用借来的距离重新看一座家乡。" },
    { id: "los-angeles",  title: "银盐",   location: "洛杉矶", year: "2023", count: 8,  note: "侧面抵达的光。胶片颗粒作为氛围。" },
    { id: "usc",          title: "驻留",   location: "南加大", year: "2024", count: 10, note: "校园作为风景。几周时光，在路过中被观察。" },
    { id: "yosemite",     title: "曝光",   location: "约塞米蒂", year: "2023", count: 10, note: "令人失去尺度感的规模。山谷容纳了所需的一切。" },
  ],
};

export default function Photos() {
  const { lang } = useLang();
  const series = seriesData[lang];
  const [activeId, setActiveId] = useState("new-york");
  const activeSeries = series.find(s => s.id === activeId) ?? series[0];
  const photos = photoGrids[activeId as keyof typeof photoGrids] ?? [];

  const ui = {
    title:  lang === "en" ? "Photos"   : "摄影",
    count:  lang === "en" ? `${series.length} SERIES` : `${series.length} 个系列`,
    images: lang === "en" ? "IMAGES"   : "张",
  };

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", paddingTop: TOP_BAR_HEIGHT }}>
      <Nav />

      <div style={{
        marginLeft: NAV_WIDTH, flex: 1,
        display: "grid",
        gridTemplateColumns: `1fr 280px`,
        minHeight: "100dvh",
      }}>

        {/* ── Center: photo grid ── */}
        <div style={{ borderRight: "1px solid var(--line)", padding: "48px 48px 80px" }}>
          {/* Section header */}
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: 32, paddingBottom: 20, borderBottom: "1px solid var(--line)",
          }}>
            <h1 style={{
              fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
              fontSize: "clamp(32px,3.5vw,48px)", color: "var(--dark)",
            }}>{ui.title}</h1>
            {/* Series tabs replacing count */}
            <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
              {seriesData[lang].map(s => {
                const isActive = activeId === s.id;
                return (
                  <button key={s.id}
                    onClick={() => setActiveId(s.id)}
                    style={{
                      fontFamily: "var(--font-geist),sans-serif",
                      fontSize: 9, letterSpacing: "0.2em",
                      color: isActive ? "var(--dark)" : "var(--faint)",
                      background: "none", border: "none", cursor: "pointer",
                      borderBottom: isActive ? "1px solid var(--dark)" : "1px solid transparent",
                      paddingBottom: 2, transition: "color 0.15s",
                    }}
                  >{s.title.toUpperCase()}</button>
                );
              })}
            </div>
          </div>

          {/* Photo grid — masonry-style two-column */}
          <div style={{ columns: 2, columnGap: 10 }}>
            {photos.map((p, i) => (
              <motion.div
                key={activeId + p.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ breakInside: "avoid", marginBottom: 10, overflow: "hidden", background: "var(--placeholder)" }}
              >
                {p.src ? (
                  <img src={p.src} alt={`${activeSeries.title} ${i + 1}`}
                    style={{ width: "100%", display: "block", aspectRatio: p.aspect, objectFit: "cover" }} />
                ) : (
                  <div style={{ aspectRatio: p.aspect, background: "var(--placeholder)" }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right: series detail ── */}
        <div style={{
          position: "sticky", top: TOP_BAR_HEIGHT,
          height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
          padding: "48px 32px", overflowY: "auto",
        }}>
          <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "var(--faint)", marginBottom: 20 }}>
            {activeSeries.location.toUpperCase()} · {activeSeries.year}
          </div>
          <div style={{
            fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
            fontSize: "clamp(20px,1.8vw,26px)", color: "var(--dark)",
            lineHeight: 1.2, marginBottom: 20,
          }}>{activeSeries.title}</div>
          <p style={{
            fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
            fontSize: "clamp(13px,1.1vw,15px)", color: "var(--dim)", lineHeight: 1.75, marginBottom: 20,
          }}>{activeSeries.note}</p>
          <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)" }}>
            {activeSeries.count} {ui.images}
          </div>
        </div>

      </div>
    </div>
  );
}
