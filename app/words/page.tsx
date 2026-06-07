"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../components/TopBar";

const DETAIL_WIDTH = 280;

const entries = {
  en: [
    {
      id: "thesis",
      title: "Reinscription of Cultural Meaning Through Design",
      date: "2024", tag: "Thesis",
      href: "https://digitallibrary.usc.edu/asset-management/2A3BF1M2SUNBE",
      external: true, published: true,
      desc: "How designed objects accumulate, carry, and transform cultural memory across time and context.",
    },
    {
      id: "seeing",
      title: "以观看为方法",
      date: "Apr 2025", tag: "Essay",
      href: "#", external: false, published: false,
      desc: "On looking as a practice — not passive, not neutral, not innocent.",
    },
    {
      id: "silence",
      title: "On Designing for Silence",
      date: "Feb 2025", tag: "Essay",
      href: "#", external: false, published: false,
      desc: "What design chooses not to say. The negative space between intention and reception.",
    },
    {
      id: "translation",
      title: "Branding as Translation",
      date: "Nov 2024", tag: "Essay",
      href: "#", external: false, published: false,
      desc: "A brand is always a translation — something is gained, something is lost, something new is made.",
    },
    {
      id: "type",
      title: "Type as Voice",
      date: "Jul 2024", tag: "Essay",
      href: "#", external: false, published: false,
      desc: "The typeface speaks before you read a word. On how letterforms carry affect, class, and accent.",
    },
  ],
  zh: [
    {
      id: "thesis",
      title: "以设计重写文化意义",
      date: "2024", tag: "论文",
      href: "https://digitallibrary.usc.edu/asset-management/2A3BF1M2SUNBE",
      external: true, published: true,
      desc: "设计物如何在时间与语境中积累、携带并转化文化记忆。",
    },
    {
      id: "seeing",
      title: "以观看为方法",
      date: "2025年4月", tag: "随笔",
      href: "#", external: false, published: false,
      desc: "观看作为一种实践——不被动，不中立，不无辜。",
    },
    {
      id: "silence",
      title: "为沉默而设计",
      date: "2025年2月", tag: "随笔",
      href: "#", external: false, published: false,
      desc: "设计选择不说什么。意图与接受之间的负空间。",
    },
    {
      id: "translation",
      title: "品牌即翻译",
      date: "2024年11月", tag: "随笔",
      href: "#", external: false, published: false,
      desc: "品牌永远是一种翻译——有所获，有所失，有所新生。",
    },
    {
      id: "type",
      title: "字体作为声音",
      date: "2024年7月", tag: "随笔",
      href: "#", external: false, published: false,
      desc: "字体在你读出第一个字之前就已经在说话了。",
    },
  ],
};

export default function Words() {
  const { lang } = useLang();
  const list = entries[lang];
  const [hovered, setHovered] = useState<typeof list[0] | null>(null);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", paddingTop: TOP_BAR_HEIGHT }}>
      <Nav />

      <div style={{
        marginLeft: NAV_WIDTH, flex: 1,
        display: "grid",
        gridTemplateColumns: `1fr ${DETAIL_WIDTH}px`,
        minHeight: "100dvh",
      }}>

        {/* ── Center: article list ── */}
        <div style={{ borderRight: "1px solid var(--line)", padding: "48px 48px 80px" }}>
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: 40, paddingBottom: 20, borderBottom: "1px solid var(--line)",
          }}>
            <h1 style={{
              fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
              fontSize: "clamp(32px,3.5vw,48px)", color: "var(--dark)",
            }}>{lang === "en" ? "Writing" : "文字"}</h1>
            <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "var(--faint)" }}>
              {list.filter(e => e.published).length}{lang === "en" ? " PUBLISHED" : " 已发表"}
            </span>
          </div>

          {/* Column header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 80px",
            padding: "10px 0", borderBottom: "1px solid var(--line)",
            fontFamily: "var(--font-geist),sans-serif",
            fontSize: 9, letterSpacing: "0.22em", color: "var(--faint)",
          }}>
            <span>{lang === "en" ? "TITLE" : "标题"}</span>
            <span>{lang === "en" ? "TYPE" : "分类"}</span>
          </div>

          {list.map((entry) => {
            const Tag = entry.published ? "a" : "div";
            const isDim = hovered && hovered.id !== entry.id;
            const baseOpacity = entry.published ? 1 : 0.5;
            return (
              <motion.div
                key={entry.id}
                onMouseEnter={() => setHovered(entry)}
                onMouseLeave={() => setHovered(null)}
                animate={{ opacity: isDim ? 0.15 : baseOpacity }}
                transition={{ duration: 0.2 }}
              >
                <Tag
                  {...(entry.published ? {
                    href: entry.href,
                    target: entry.external ? "_blank" : undefined,
                    rel: entry.external ? "noopener noreferrer" : undefined,
                  } : {})}
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 80px",
                    alignItems: "baseline", gap: "0 12px",
                    padding: "22px 0", borderBottom: "1px solid var(--line)",
                    cursor: entry.published ? "pointer" : "default",
                    textDecoration: "none",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                    fontSize: "clamp(17px,1.5vw,21px)", color: "var(--dark)", lineHeight: 1.2,
                  }}>
                    {entry.title}
                    {entry.external && entry.published &&
                      <span style={{ fontSize: 12, marginLeft: 7, color: "var(--faint)", fontStyle: "normal" }}>↗</span>
                    }
                  </span>
                  <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.16em", color: "var(--faint)" }}>
                    {entry.published ? entry.tag : (lang === "en" ? "COMING SOON" : "敬请期待")}
                  </span>
                </Tag>
              </motion.div>
            );
          })}

          <div style={{ marginTop: 36, fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontStyle: "italic", fontSize: 13, color: "var(--faint)" }}>
            {lang === "en" ? "Dimmed pieces are in progress or not yet released." : "暗色条目仍在写作中，尚未发表。"}
          </div>
        </div>

        {/* ── Right: detail panel ── */}
        <div style={{ position: "sticky", top: TOP_BAR_HEIGHT, height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`, padding: "48px 32px", overflowY: "auto" }}>
          {/* Detail content — animated on hover change */}
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.25, 0, 0, 1] }}
              >
                <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "var(--faint)", marginBottom: 20 }}>
                  {hovered.tag.toUpperCase()} · {hovered.date}
                </div>
                <div style={{
                  fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                  fontSize: "clamp(18px,1.6vw,22px)", color: "var(--dark)",
                  lineHeight: 1.25, marginBottom: 20,
                }}>{hovered.title}</div>
                <p style={{
                  fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "var(--dim)", lineHeight: 1.75,
                }}>{hovered.desc}</p>
                {hovered.published && (
                  <a href={hovered.href} target={hovered.external ? "_blank" : undefined}
                    rel={hovered.external ? "noopener noreferrer" : undefined}
                    style={{ display: "block", marginTop: 24, fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "var(--faint)", textDecoration: "none", borderBottom: "1px solid var(--line)", paddingBottom: 2, width: "fit-content" }}>
                    READ →
                  </a>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.18em", color: "var(--faint)" }}
              >
                HOVER AN ENTRY
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
