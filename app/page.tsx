"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  motion, AnimatePresence,
  useSpring, useMotionValue, useScroll,
} from "framer-motion";
import { useLang } from "./context/lang";
import { TOP_BAR_HEIGHT } from "./components/TopBar";

// ─── Cursor ───────────────────────────────────────────────────────────────────
function Cursor() {
  const x = useMotionValue(-200), y = useMotionValue(-200);
  const sx = useSpring(x, { damping: 20, stiffness: 600, mass: 0.2 });
  const sy = useSpring(y, { damping: 20, stiffness: 600, mass: 0.2 });
  useEffect(() => {
    const fn = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);
  return <motion.div style={{
    position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999,
    width: 14, height: 14, borderRadius: "50%", background: "var(--dim)",
    translateX: sx, translateY: sy, x: "-50%", y: "-50%",
  }}/>;
}

// ─── Left progress (exact fromanother style) ──────────────────────────────────
// fromanother: left side vertical, each item = "01 — Label"
// Active: full opacity + dash extended; others: dimmed
const NAV_ITEMS = [
  { num: "01", label: "" },
  { num: "02", label: "About" },
  { num: "03", label: "Work" },
  { num: "04", label: "Photos" },
  { num: "05", label: "Writing" },
  { num: "06", label: "Index" },
];

function SideNav({ active }: { active: number }) {
  return (
    <div style={{
      position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)",
      zIndex: 100, pointerEvents: "none",
      display: "flex", flexDirection: "column",
    }}>
      {NAV_ITEMS.map((item, i) => {
        const isAct = i === active;
        return (
          <motion.div
            key={i}
            style={{
              display: "flex", alignItems: "center",
              padding: "4px 0",
              fontFamily: "var(--font-geist),sans-serif",
              fontSize: 8, letterSpacing: "0.18em", color: "var(--dim)",
              whiteSpace: "nowrap",
            }}
          >
            <motion.div
              animate={{ width: isAct ? 10 : 4, opacity: isAct ? 1 : 0.15 }}
              transition={{ duration: 0.35 }}
              style={{ height: 1, background: "var(--dim)", marginRight: 6, flexShrink: 0 }}
            />
            <motion.span
              animate={{ opacity: isAct ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.num}{item.label ? ` ${item.label}` : ""}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Masked line ──────────────────────────────────────────────────────────────
function ML({ text, delay = 0, s }: { text: string; delay?: number; s?: React.CSSProperties }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div style={s} initial={{ y: "105%" }} animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >{text}</motion.div>
    </div>
  );
}

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(thr = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: thr });
    obs.observe(el); return () => obs.disconnect();
  }, [thr]);
  return { ref, vis };
}

// ─── Spinning wheel ───────────────────────────────────────────────────────────
function Wheel({ size = 108, text = "DESIGN · WORDS · PHOTOS · ABOUT · " }: { size?: number; text?: string }) {
  const r = size / 2 - 10;
  const d = `M ${size/2},${size/2} m -${r},0 a ${r},${r} 0 1,1 ${r*2},0 a ${r},${r} 0 1,1 -${r*2},0`;
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <defs><path id="wp" d={d}/></defs>
        <text style={{ fontSize: 7.5, fill: "var(--faint)", letterSpacing: "0.14em", fontFamily: "var(--font-geist),sans-serif" }}>
          <textPath href="#wp">{text}</textPath>
        </text>
      </svg>
    </motion.div>
  );
}

// ─── Cursor scatter image pools ───────────────────────────────────────────────
// Section 01 — design / work images
const CURSOR_IMAGES = [
  "/Images/ZENTEA/主图.png",
  "/Images/ZENTEA/盒装.jpg",
  "/Images/Seasons/主图.jpeg",
  "/Images/Seasons/帆布包.jpg",
  "/Images/Chocolate/主图.jpg",
  "/Images/Orient/主图.jpeg",
  "/Images/龙鳞装/2.JPG",
  "/Images/八月花神/主图.png",
  "/Images/Photos/1. New York/Featured.jpg",
  "/Images/Photos/2.Guiyang/LP.jpg",
  "/Images/Photos/Los Angeles/LP主图.jpg",
  "/Images/Photos/Yosemite/000236660001_副本.jpg",
  "/Images/Photos/USC/LP主图.JPG",
];

// Section 02 — personal / life photos
const PROFILE_CURSOR_IMAGES = [
  "/Images/About-Profile.JPG",
  "/Images/Profile/IMG_2962.JPG",
  "/Images/Profile/IMG_3792.jpg",
  "/Images/Profile/IMG_3793.jpg",
  "/Images/Profile/IMG_3794.jpg",
  "/Images/Profile/IMG_3796.jpg",
  "/Images/Profile/IMG_3812.jpg",
  "/Images/Profile/IMG_4042.JPG",
  "/Images/Profile/IMG_4043.JPG",
  "/Images/Profile/IMG_4046.JPG",
  "/Images/Profile/beauty_1750087225962.JPG",
  "/Images/Profile/classicu%202025-09-23%20011810.147.JPG",
  "/Images/Profile/dfuns%202026-05-09%201856434AD1BDEC6164.JPG",
  "/Images/Profile/dfuns%202026-05-28%202341187B7F3AC34DEC.JPG",
  "/Images/Profile/dqs%202025-05-15%20180936.798.JPG",
  "/Images/Profile/dqs%202026-05-14%2023030190C30BFD1532.JPG",
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const works = [
  {
    title: "Zentea", category: "Branding", categoryZh: "品牌设计", year: "2024",
    note: "Tea and stillness, one taste.",
    noteZh: "禅茶一味",
    img: "/Images/ZENTEA/主图.png",
    lpImages: [
      "/Images/ZENTEA/主图.png",
      "/Images/ZENTEA/stationery.png",
      "/Images/ZENTEA/盒装.jpg",
      "/Images/ZENTEA/社媒.png",
    ],
  },
  {
    title: "Seasons", category: "Branding", categoryZh: "品牌设计", year: "2022",
    note: "Flowers for yourself, season after season.",
    noteZh: "一季一花，都送给自己。",
    img: "/Images/Seasons/主图.jpeg",
    lpImages: [
      "/Images/Seasons/主图.jpeg",
      "/Images/Seasons/帆布包.jpg",
      "/Images/Seasons/地广1.jpg",
      "/Images/Seasons/menu.jpg",
    ],
  },
  {
    title: "The Period", category: "Typography", categoryZh: "字体设计", year: "2025",
    note: "Some letters bleed.",
    noteZh: "有些字，会洇血。",
    img: "/Images/月经体/月经体%20主图.jpg",
    lpImages: ["/Images/月经体/月经体%20主图.jpg"],
  },
];

const P = "/Images/Photos";
const photos = [
  { id: "new-york",    title: "New York",    titleZh: "纽约",      series: "In Between",  seriesZh: "过渡",   year: "2022", img: `${P}/1. New York/Featured.jpg` },
  { id: "guiyang",     title: "Guiyang",     titleZh: "贵阳",      series: "Home Ground", seriesZh: "故土",   year: "2022", img: `${P}/2.Guiyang/LP.jpg` },
  { id: "los-angeles", title: "Los Angeles", titleZh: "洛杉矶",    series: "Silver",      seriesZh: "银盐",   year: "2023", img: `${P}/Los Angeles/LP主图.jpg` },
  { id: "usc",         title: "USC",         titleZh: "南加大",    series: "Residency",   seriesZh: "驻留",   year: "2024", img: `${P}/USC/LP主图.JPG` },
  { id: "yosemite",    title: "Yosemite",    titleZh: "约塞米蒂",  series: "Exposure",    seriesZh: "曝光",   year: "2023", img: `${P}/Yosemite/000236660001_副本.jpg` },
];

const writings = [
  { title: "Reinscription of Cultural Meaning Through Design", titleZh: "以设计重写文化意义", tag: "Thesis",  tagZh: "论文", date: "2024", href: "https://digitallibrary.usc.edu/asset-management/2A3BF1M2SUNBE", pub: true },
  { title: "以观看为方法",                                       titleZh: "以观看为方法",       tag: "随笔",   tagZh: "随笔", date: "2025", href: "#", pub: false },
  { title: "On Designing for Silence",                         titleZh: "为沉默而设计",       tag: "Essay",  tagZh: "随笔", date: "2025", href: "#", pub: false },
  { title: "Branding as Translation",                          titleZh: "品牌即翻译",         tag: "Essay",  tagZh: "随笔", date: "2024", href: "#", pub: false },
];

const awards = [
  { award: "Gold",                 org: "Graphis New Talent Annual", year: "2023", project: "Seasons" },
  { award: "Silver",               org: "Graphis New Talent Annual", year: "2023", project: "Salvation of Seven Deadly Sins" },
  { award: "Honorable Mention ×2", org: "Graphis New Talent Annual", year: "2023", project: "One Second · Orient" },
  { award: "Shortlist",            org: "TDC Young Ones",            year: "2023", project: "UToypia" },
];

// Sub-sections: Work=3, Photos=5, Writing=1 → total 9 × 100vh
const SUBS_CONFIG = [
  { key: "Work",    slots: 3 },
  { key: "Photos",  slots: 5 },
  { key: "Writing", slots: 1 },
];
const TOTAL_SLOTS = SUBS_CONFIG.reduce((a, c) => a + c.slots, 0); // 9

// ─── Big sticky content block ─────────────────────────────────────────────────
// fromanother: one huge sticky container, left = sub-nav, right = content
// background barely moves, ONLY text/content cross-fades
function ContentBlock({ onSectionChange }: { onSectionChange: (idx: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const [sub, setSub] = useState(0);
  const [workIdx, setWorkIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [hovWrite, setHovWrite] = useState<number|null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const handleScroll = useCallback((v: number) => {
    const slot = Math.min(v * TOTAL_SLOTS, TOTAL_SLOTS - 0.001);
    // Work = 0-2, Photos = 3-7, Writing = 8
    if (slot < 3) {
      setSub(0);
      setWorkIdx(Math.min(Math.floor(slot), works.length - 1));
      onSectionChange(2);
    } else if (slot < 8) {
      setSub(1);
      setPhotoIdx(Math.min(Math.floor(slot - 3), photos.length - 1));
      onSectionChange(3);
    } else {
      setSub(2);
      onSectionChange(4);
    }
  }, [onSectionChange]);

  useEffect(() => scrollYProgress.on("change", handleScroll), [scrollYProgress, handleScroll]);

  const contentStyle: React.CSSProperties = {
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center",
    padding: "0 8vw 0 18vw",
  };

  return (
    <div ref={ref} style={{ height: `${TOTAL_SLOTS * 100}vh`, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

        {/* Content — cross-fades between sub-sections */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>

          {/* ── Work ── photos-style: text left, large image right ── */}
          <AnimatePresence mode="wait">
            {sub === 0 && (
              <motion.div key={`work-${workIdx}`}
                style={{ ...contentStyle, justifyContent: "space-between", alignItems: "center", gap: "4vw" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
              >
                {/* Left: metadata */}
                <div style={{ flexShrink: 0, maxWidth: 280 }}>
                  <div style={{ fontSize: 8, letterSpacing: "0.28em", color: "var(--faint)", fontFamily: "var(--font-geist),sans-serif", marginBottom: 24 }}>
                    {String(workIdx + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")} &nbsp; {lang === "zh" ? works[workIdx].categoryZh : works[workIdx].category}
                  </div>
                  <div style={{ fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200, fontSize: "clamp(32px,3.8vw,56px)", color: "var(--dark)", lineHeight: 1.05, marginBottom: 6 }}>
                    {works[workIdx].title}
                  </div>
                  <div style={{ fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200, fontSize: "clamp(13px,1.1vw,15px)", color: "var(--dim)", lineHeight: 1.7, marginBottom: 28 }}>
                    {lang === "zh" ? works[workIdx].noteZh : works[workIdx].note}
                  </div>
                  <Link href={`/design?project=${works[workIdx].title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`} style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--dim)", fontFamily: "var(--font-geist),sans-serif" }}>
                    {lang === "zh" ? "查看项目 →" : "VIEW PROJECT →"}
                  </Link>
                </div>

                {/* Right: hero image — natural proportions, no crop */}
                <motion.div
                  key={`wimg-${workIdx}`}
                  initial={{ opacity: 0, clipPath: "inset(6% 0 6% 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ flexShrink: 0 }}
                >
                  {works[workIdx].img ? (
                    <img src={works[workIdx].img} alt={works[workIdx].title}
                      style={{
                        maxHeight: "calc(100vh - 100px)",
                        maxWidth: "52vw",
                        width: "auto",
                        height: "auto",
                        display: "block",
                      }} />
                  ) : (
                    <div style={{ width: "40vw", height: "60vh", background: "var(--placeholder)" }} />
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* ── Photos ── */}
            {sub === 1 && (
              <AnimatePresence mode="wait">
                <motion.div key={`photo-${photoIdx}`}
                  style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 8vw 0 18vw" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
                >
                  {/* Left: metadata */}
                  <div style={{ flexShrink: 0, width: 148, marginRight: "5vw" }}>
                    <div style={{
                      fontSize: 8, letterSpacing: "0.28em", color: "var(--faint)",
                      fontFamily: "var(--font-geist),sans-serif", marginBottom: 28,
                    }}>
                      {String(photoIdx + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                      fontSize: "clamp(20px,2vw,28px)", color: "var(--dark)",
                      lineHeight: 1.1, marginBottom: 12,
                    }}>{lang === "zh" ? photos[photoIdx].titleZh : photos[photoIdx].title}</div>
                    <div style={{
                      fontSize: 8, letterSpacing: "0.24em", color: "var(--faint)",
                      fontFamily: "var(--font-geist),sans-serif", marginBottom: 36,
                    }}>{lang === "zh" ? photos[photoIdx].seriesZh : photos[photoIdx].series.toUpperCase()}</div>
                    <Link href={`/photos?series=${photos[photoIdx].id}`} style={{
                      fontSize: 9, letterSpacing: "0.2em", color: "var(--dim)",
                      fontFamily: "var(--font-geist),sans-serif",
                    }}>{lang === "zh" ? "查看全部 →" : "VIEW ALL →"}</Link>
                  </div>
                  {/* Right: image — natural proportions, no crop */}
                  <motion.div
                    key={`img-${photoIdx}`}
                    initial={{ clipPath: "inset(6% 0 6% 0)" }}
                    animate={{ clipPath: "inset(0% 0 0% 0)" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ flexShrink: 0, maxHeight: "72vh", display: "flex", alignItems: "center" }}
                  >
                    {photos[photoIdx].img ? (
                      <img
                        src={photos[photoIdx].img}
                        alt={photos[photoIdx].title}
                        style={{ maxHeight: "72vh", maxWidth: "46vw", width: "auto", height: "auto", display: "block" }}
                      />
                    ) : (
                      <div style={{ height: "60vh", width: "32vw", background: "var(--placeholder)" }} />
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* ── Writing ── */}
            {sub === 2 && (
              <motion.div key="writing" style={contentStyle}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
              >
                <div style={{ width: "100%" }}>
                  {writings.map((w, i) => (
                    <motion.a key={i}
                      href={w.pub ? w.href : undefined}
                      target={w.pub && w.href.startsWith("http") ? "_blank" : undefined}
                      rel={w.pub && w.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onMouseEnter={() => setHovWrite(i)}
                      onMouseLeave={() => setHovWrite(null)}
                      animate={{ opacity: hovWrite !== null && hovWrite !== i ? 0.1 : w.pub ? 1 : 0.3 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "grid", gridTemplateColumns: "1fr 88px",
                        alignItems: "baseline", padding: "26px 0",
                        borderTop: i === 0 ? "none" : "1px solid var(--line)",
                        cursor: w.pub ? "pointer" : "default",
                        textDecoration: "none",
                      }}
                    >
                      <span style={{
                        fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                        fontSize: "clamp(18px,1.7vw,24px)", color: "var(--dark)", lineHeight: 1.3,
                      }}>
                        {lang === "zh" ? w.titleZh : w.title}
                        {w.pub && <span style={{ fontSize: 11, marginLeft: 8, color: "var(--faint)", fontStyle: "normal" }}>↗</span>}
                      </span>
                      <span style={{ fontSize: 8, letterSpacing: "0.18em", color: "var(--faint)", fontFamily: "var(--font-geist),sans-serif", textTransform: "uppercase" }}>{lang === "zh" ? w.tagZh : w.tag}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}


          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// ─── Index / Final screen ─────────────────────────────────────────────────────
const indexLinks = [
  { label: "Design",  desc: "Identity · Type · Image",  href: "/design" },
  { label: "Writing", desc: "Essays · Research · 随笔",  href: "/words"  },
  { label: "Photos",  desc: "Quiet observations",        href: "/photos" },
  { label: "About",   desc: "Who I am, how I work",      href: "/about"  },
];

function FinalNav() {
  const [hov, setHov] = useState<string|null>(null);
  return (
    <div style={{ width: "100%", padding: "0 8vw 0 18vw" }}>
      <div>
        {indexLinks.map(({ label, desc, href }) => {
          const isAct = hov === label;
          const isDim = hov !== null && !isAct;
          return (
            <Link key={label} href={href}
              onMouseEnter={() => setHov(label)} onMouseLeave={() => setHov(null)}
              style={{ display: "block", textDecoration: "none" }}
            >
              <motion.div
                animate={{ opacity: isDim ? 0.1 : 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex", alignItems: "baseline", justifyContent: "space-between",
                  padding: "20px 0", borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "2.5vw" }}>
                  <span style={{
                    fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                    fontSize: "clamp(26px,2.8vw,40px)", color: "var(--dark)",
                  }}>{label}</span>
                  <span style={{
                    fontFamily: "var(--font-geist),sans-serif", fontSize: 9,
                    letterSpacing: "0.18em", color: "var(--faint)",
                  }}>{desc}</span>
                </div>
                <motion.span
                  animate={{ opacity: isAct ? 1 : 0, x: isAct ? 0 : -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 11, color: "var(--dim)" }}
                >→</motion.span>
              </motion.div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const { lang } = useLang();
  const [phase, setPhase]   = useState<"zh"|"both">("zh");
  const [topVis, setTopVis] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState(0);

  // ── Cursor scatter images ──
  const [cursorImgs, setCursorImgs] = useState<{id:number;x:number;y:number;src:string;rot:number}[]>([]);
  const cursorIdRef = useRef(0);
  const lastSpawnRef = useRef({x:-999,y:-999});

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("both"), 1700);
    const t2 = setTimeout(() => setTopVis(true),  3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Arrow disappears on first scroll
  useEffect(() => {
    const fn = () => { if (window.scrollY > 40) setScrolled(true); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Cursor scatter: section 0 = design images, section 1 = profile images
  useEffect(() => {
    if (!topVis) return;
    const fn = (e: MouseEvent) => {
      if (activeNav !== 0 && activeNav !== 1) return;
      const pool = activeNav === 0 ? CURSOR_IMAGES : PROFILE_CURSOR_IMAGES;
      const dx = e.clientX - lastSpawnRef.current.x;
      const dy = e.clientY - lastSpawnRef.current.y;
      if (dx*dx + dy*dy < 57600) return; // ~240px threshold
      lastSpawnRef.current = { x: e.clientX, y: e.clientY };
      const src = pool[Math.floor(Math.random() * pool.length)];
      const rot = (Math.random() - 0.5) * 14;
      const id = ++cursorIdRef.current;
      setCursorImgs(prev => [...prev.slice(-5), { id, x: e.clientX, y: e.clientY, src, rot }]);
      setTimeout(() => setCursorImgs(prev => prev.filter(img => img.id !== id)), 1600);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [topVis, activeNav]);

  // Track active section for sidenav
  useEffect(() => {
    const sections = document.querySelectorAll("[data-sec]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveNav(Number((e.target as HTMLElement).dataset.sec));
      });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const ps: React.CSSProperties = {
    fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
    fontSize: "clamp(22px,2.8vw,42px)", color: "var(--dim)", display: "block",
  };

  return (
    <>
      <Cursor/>
      <SideNav active={activeNav}/>

      {/* Cursor scatter images — fixed, above everything */}
      <AnimatePresence>
        {cursorImgs.map(img => (
          <motion.img
            key={img.id}
            src={img.src}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 0.88, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              left: img.x - 90,
              top: img.y - 70,
              width: 180,
              height: "auto",
              pointerEvents: "none",
              zIndex: 9000,
              transform: `rotate(${img.rot}deg)`,
            }}
          />
        ))}
      </AnimatePresence>
      <div style={{ cursor: "none" }}>

        {/* 01 — POEM */}
        <section data-sec="0" style={{
          height: "100vh", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--bg)", overflow: "hidden",
          paddingTop: TOP_BAR_HEIGHT,
        }}>

          {/* Poem */}
          <div style={{ textAlign: "center", marginBottom: "6vh" }}>
            <AnimatePresence mode="wait">
              {lang === "zh" ? (
                <motion.div key="zh" initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
                  style={{ lineHeight: 1.55 }}
                >
                  <ML text="以我观物，"        delay={0.1}  s={ps}/>
                  <ML text="故物皆著我之色彩。" delay={0.45} s={ps}/>
                </motion.div>
              ) : (
                <motion.div key="en" initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
                  style={{ lineHeight: 1.55 }}
                >
                  <ML text="A world,"                        delay={0.1}  s={ps}/>
                  <ML text="built through my way of seeing." delay={0.45} s={ps}/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Arrow — fades out on scroll */}
          <motion.div
            animate={{ opacity: scrolled ? 0 : topVis ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", bottom: 44, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}
          >
            <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                <path d="M1 1L16 16L31 1" stroke="var(--faint)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          </motion.div>
        </section>

        {/* 02 — ABOUT */}
        <section data-sec="1" style={{
          height: "100vh", display: "flex", alignItems: "center",
          padding: "0 10vw 0 18vw", background: "var(--bg)",
        }}>
          <AboutBlock/>
        </section>

        {/* 03–07 — BIG STICKY CONTENT BLOCK */}
        <ContentBlock onSectionChange={setActiveNav}/>

        {/* 06 — INDEX */}
        <section data-sec="5" style={{
          minHeight: "100vh", background: "var(--bg)", position: "relative",
          display: "flex", flexDirection: "column", justifyContent: "center",
          cursor: "none", borderTop: "1px solid var(--line)",
        }}>
          <FinalNav/>
          {/* Copyright pinned to bottom */}
          <div style={{
            position: "absolute", bottom: 28, left: 0, right: 0,
            padding: "0 8vw 0 18vw",
            fontFamily: "var(--font-geist),sans-serif", fontSize: 9,
            letterSpacing: "0.15em", color: "var(--faint)",
          }}>
            © 2026 · ZHUOJING LI
          </div>
        </section>

      </div>
    </>
  );
}

// ─── About block ──────────────────────────────────────────────────────────────
const aboutContent = {
  en: {
    name: "Zhuojing Li",
    lines: [
      "A designer who never quite settled into a single medium.",
      "The idea leads; the medium follows.",
      "Design is my honest way of looking at the world.",
    ],
  },
  zh: {
    name: "李卓璟",
    lines: [
      "一个始终没在单一媒介里安顿下来的设计师。",
      "想法先行，媒介是手段。",
      "归根结底，做设计是我诚实地注视世界的方式。",
    ],
  },
};

function AboutBlock() {
  const { ref, vis } = useInView(0.3);
  const { lang } = useLang();
  const c = aboutContent[lang];

  return (
    <div ref={ref} style={{ maxWidth: 680 }}>
      <div style={{ overflow: "hidden", marginBottom: 24 }}>
        <motion.div
          style={{ fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontSize: "clamp(40px,5vw,72px)", color: "var(--dark)", lineHeight: 1.05 }}
          initial={{ y: "105%" }} animate={vis ? { y: "0%" } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >{c.name}</motion.div>
      </div>

      <div style={{ marginBottom: 40 }}>
        {c.lines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <motion.p
              style={{
                fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                fontSize: "clamp(16px,1.8vw,24px)", lineHeight: 1.65, color: "var(--dim)",
                margin: 0,
              }}
              initial={{ y: "110%" }} animate={vis ? { y: "0%" } : {}}
              transition={{ duration: 0.75, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            >{line}</motion.p>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={vis ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Link href="/about" style={{
          fontFamily: "var(--font-geist),sans-serif",
          fontSize: 10, letterSpacing: "0.18em", color: "var(--dim)",
        }}>{lang === "zh" ? "完整简介 →" : "FULL BIO →"}</Link>
      </motion.div>
    </div>
  );
}
