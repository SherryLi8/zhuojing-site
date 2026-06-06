"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../lib/constants";

const NY = "/Images/Photos/1. New York";

// ─── Photo grids (shared, language-independent) ───────────────────────────────
const photoGrids = {
  "urban-quiet": [
    { id: "uq1", aspect: "3/2", src: "" }, { id: "uq2", aspect: "2/3", src: "" },
    { id: "uq3", aspect: "3/2", src: "" }, { id: "uq4", aspect: "1/1", src: "" },
    { id: "uq5", aspect: "2/3", src: "" },
  ],
  "fieldwork": [
    { id: "fw1", aspect: "2/3", src: "" }, { id: "fw2", aspect: "3/2", src: "" },
    { id: "fw3", aspect: "2/3", src: "" }, { id: "fw4", aspect: "3/2", src: "" },
  ],
  "in-between": [
    { id: "ib1", aspect: "3/2", src: `${NY}/20220212-IMG_0614_副本.jpg` },
    { id: "ib2", aspect: "2/3", src: `${NY}/IMG_0577_副本.jpg` },
    { id: "ib3", aspect: "3/2", src: `${NY}/20220212-IMG_0612_副本.jpg` },
    { id: "ib4", aspect: "2/3", src: `${NY}/20220208-IMG_0605_副本.jpg` },
    { id: "ib5", aspect: "3/2", src: `${NY}/20220130-IMG_0287_副本.jpg` },
    { id: "ib6", aspect: "2/3", src: `${NY}/20220213-IMG_0628_副本.jpg` },
    { id: "ib7", aspect: "3/2", src: `${NY}/Cropped_副本.jpg` },
    { id: "ib8", aspect: "2/3", src: `${NY}/20220212-20220212-IMG_6925_副本.jpg` },
  ],
};

// ─── Series data ──────────────────────────────────────────────────────────────
const seriesData = {
  en: [
    {
      id: "urban-quiet",
      title: "Urban Quiet",
      location: "Tokyo", year: "2024",
      count: 5,
      note: "The city between moments. Searching for stillness in density.",
    },
    {
      id: "fieldwork",
      title: "Fieldwork",
      location: "Yunnan", year: "2023",
      count: 4,
      note: "Distance changes what you see. Landscapes observed, not performed.",
    },
    {
      id: "in-between",
      title: "In Between",
      location: "New York", year: "2022",
      count: 8,
      note: "Everything happens in the margins. The threshold, the pause, the transit.",
    },
  ],
  zh: [
    {
      id: "urban-quiet",
      title: "都市之静",
      location: "东京", year: "2024",
      count: 5,
      note: "城市的隙间。在密度中寻找宁静。",
    },
    {
      id: "fieldwork",
      title: "野外考察",
      location: "云南", year: "2023",
      count: 4,
      note: "距离改变你所见。被观察而非被演绎的风景。",
    },
    {
      id: "in-between",
      title: "过渡",
      location: "纽约", year: "2022",
      count: 8,
      note: "一切都发生在边缘。阈值、停顿、过渡。",
    },
  ],
};

export default function Photos() {
  const { lang } = useLang();
  const series = seriesData[lang];
  const [activeId, setActiveId] = useState("urban-quiet");
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
