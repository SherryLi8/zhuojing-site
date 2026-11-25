"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../components/TopBar";
import { useIsMobile } from "../hooks/useIsMobile";

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useOnceInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, vis } = useOnceInView();
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconXiaohongshu() {
  // Official RedNote (Xiaohongshu) mark, white on their red — same as the app icon
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#FF2442" />
      <g transform="translate(4.6,4.6) scale(0.617)" fill="#fff">
        <path d="M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972.794.794 0 0 0-.884-.618.795.795 0 0 0-.692.794c0 .101-.002.666.001.777zm-11.509 4.808c-.203.001-1.353.004-1.685.003a2.528 2.528 0 0 1-.766-.126.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124.66.01 1.32.002 1.981 0 .01 0 .02-.006.023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01a.834.834 0 0 0-.01.08c-.027.397-.038.495-.234 3.06-.012.24-.034.389-.135.607-.026.057-.033.042.003.112.046.092.681 1.523.787 1.74.008.015.011.02.017.02.008 0 .033-.026.047-.044.147-.187.268-.391.371-.606.306-.635.44-1.325.486-1.706.014-.11.021-.22.03-.33l.204-2.616.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.427 1.427 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.443.443 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293c.076.982.153 1.964.233 2.946.05.4.186 1.085.487 1.706.103.215.223.419.37.606.015.018.037.051.048.049.02-.003.742-1.642.804-1.765.036-.07.03-.055.003-.112zm3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56c-.01 0-.02.006-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.534.534 0 0 0-.02.191.46.46 0 0 0 .23.378.981.981 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.53.53 0 0 0-.023.172.465.465 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001c.01 0 .02-.006.023-.015l.575-1.28a.025.025 0 0 0-.024-.035zm-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829 0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047.001.037.465 1.064.555 1.263.01.02.03.033.051.033.157.003.767.009.938-.014.153-.02.3-.06.438-.132.3-.156.49-.419.595-.765.052-.172.075-.353.075-.533.002-2.33 0-4.66-.007-6.991a.032.032 0 0 0-.032-.032zm11.784 6.896c0-.014-.01-.021-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084-.37 0-1.11-.002-1.304 0-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036c.006.01.013.008.058.008 1.748.003 3.495.002 5.243.002.03-.001.034-.006.035-.033v-1.539zm4.177-3.43c0 .013-.007.023-.02.024-.346.006-.692.004-1.037.004-.014-.002-.022-.01-.022-.024-.005-.434-.007-.869-.01-1.303 0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015.093.025.16.107.165.204.006.431.002 1.153.001 1.153zm2.67.244a1.953 1.953 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21c0-.132-.007-.263-.025-.394a1.823 1.823 0 0 0-.153-.53 1.533 1.533 0 0 0-.677-.71 2.167 2.167 0 0 0-1-.258c-.153-.003-.567 0-.72 0-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007c-.006.006-.008.012-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128V11.19s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003c.098 0 .191.02.28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185 0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033.184.437.374.871.57 1.303a.045.045 0 0 0 .04.026c.17.005.34.002.51.003.15-.002.517.004.666-.01a2.03 2.03 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981c0-.128-.01-.254-.034-.38 0 .078-.029-.641-.724-.998z" />
      </g>
    </svg>
  );
}

function IconWechat() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.5 4C5.36 4 2 6.92 2 10.5c0 2.03 1.06 3.84 2.73 5.03L4 17.5l2.12-1.06A8.64 8.64 0 0 0 9.5 17c.34 0 .67-.02 1-.05A5.96 5.96 0 0 1 10 15c0-3.31 2.91-6 6.5-6 .18 0 .35.01.52.02C16.1 6.6 13.09 4 9.5 4zm-2 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.5 10C13.46 10 11 12.01 11 14.5S13.46 19 16.5 19c.72 0 1.4-.13 2.02-.36L20.5 20l-.72-1.8A4.43 4.43 0 0 0 22 14.5C22 12.01 19.54 10 16.5 10zm-1.75 3a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
    </svg>
  );
}

// ─── WeChat Modal ─────────────────────────────────────────────────────────────
function WechatModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(15,14,12,0.6)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg)", padding: "36px 32px 28px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          cursor: "default",
        }}
      >
        <img src="/Images/wechat.JPG" alt="WeChat QR" width={220} height={220} style={{ display: "block" }} />
        <div style={{
          fontFamily: "var(--font-geist),sans-serif", fontSize: 12,
          letterSpacing: "0.2em", color: "var(--faint)",
        }}>SCAN TO ADD · 扫码添加好友</div>
        <button onClick={onClose} style={{
          fontFamily: "var(--font-geist),sans-serif", fontSize: 12, letterSpacing: "0.16em",
          color: "var(--faint)", background: "none", border: "none", cursor: "pointer", marginTop: 4,
        }}>CLOSE ×</button>
      </motion.div>
    </motion.div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-geist),sans-serif",
      fontSize: 12, letterSpacing: "0.24em", color: "var(--dark)",
      marginBottom: 24, paddingBottom: 10,
      borderBottom: "1px solid var(--line)",
    }}>{children}</div>
  );
}

// Serve Next.js-optimized copies of the multi-MB originals so pages load fast
const optSrc = (src: string, w = 1200) => {
  let clean = src;
  try { clean = decodeURIComponent(src); } catch { /* keep as-is */ }
  return `/_next/image?url=${encodeURIComponent(clean)}&w=${w}&q=75`;
};

// ─── Content data ─────────────────────────────────────────────────────────────
const data = {
  en: {
    name: "Zhuojing Li",
    tagline: "BRAND IDENTITY · PACKAGING · UI/UX",
    bio: "A multidisciplinary designer. Born in Guiyang, China, trained in New York and Los Angeles, now based in Shenzhen. The idea comes first; the medium follows. Design is my honest way of looking at the world.",
    workTitle: "WORK EXPERIENCE",
    projectsTitle: "PROJECTS",
    educationTitle: "EDUCATION",
    recognitionTitle: "RECOGNITION",
    contactTitle: "CONTACT",
    work: [
      {
        org: "SlashVibe",
        role: "Product Designer, Founding Team",
        period: "Sep 2026 — present",
        desc: "Designer on the founding team of an AI hardware startup. Branding, UI/UX, and packaging across all touchpoints — a physical controller that brings AI agents onto the desk. Kickstarter launched Nov 2026, funded on day one, Project We Love.",
      },
      {
        org: "Beijing Shangchao Creative Souvenirs Development Co., Ltd.",
        role: "Product Designer",
        period: "Jun 2026 — Jul 2026",
        desc: "Developing visual concepts and product design for Palace Museum–licensed cultural merchandise. Translating imperial collection imagery into contemporary consumer products — pattern, proportion, and colour adapted for mass-market appeal.",
      },
      {
        org: "NocFree",
        role: "Lead Visual Designer",
        period: "2025 – 2026",
        desc: "Led visual design for a Kickstarter campaign — building page systems, product narrative, and conversion-oriented layouts. E-commerce visuals for Amazon and Korean markets, brand website UI/UX, social media content. Involved in packaging structure, liner design, and factory communication.",
      },
    ],
    projects: [
      {
        org: "Twentysix Interactive",
        role: "Brand Identity",
        period: "2025",
        desc: "Logo system and motion identity for an interactive narrative game studio. Built around the numeral 26 — static and animated versions, bilingual application standards.",
      },
      {
        org: "HugoEast China",
        role: "Brand & Merchandise Design",
        period: "2024 – 2025",
        desc: "Film merchandise and cultural creative products for an independent film distributor.",
      },
    ],
    education: [
      {
        deg: "MFA",
        major: "Design and Visual Communications",
        school: "University of Southern California",
        period: "2024 – 2026",
        note: null,
      },
      {
        deg: "BFA",
        major: "Web Page, Digital/Multimedia and Information Resources Design",
        school: "School of Visual Arts, New York",
        period: "2021 – 2024",
        note: "Silas H. Rhodes Scholarship",
      },
    ],
    recognition: [
      "Graphis New Talent — Gold · Silver · Honorable Mention, 2023",
      "VAND Design Award — Nominee, 2025",
      "Guizhou Tourism & Entrepreneurship Competition — Silver, 2025",
      "CGDA Visual Communication Design Award — Finalist, Student Group, 2026",
    ],
    emailLabel: "EMAIL",
    igLabel: "INSTAGRAM",
    xhsLabel: "XIAOHONGSHU",
    wcLabel: "WECHAT",
    wcSub: "Click to scan",
  },
  zh: {
    name: "李卓璟",
    tagline: "品牌设计 · 包装设计 · UI/UX",
    bio: "跨媒介设计师。生于贵阳，中国，求学于纽约与洛杉矶，现居深圳。想法先行，媒介随后。做设计是我诚实地注视世界的方式。",
    workTitle: "工作经历",
    projectsTitle: "项目经历",
    educationTitle: "教育背景",
    recognitionTitle: "荣誉与奖项",
    contactTitle: "联系方式",
    work: [
      {
        org: "SlashVibe",
        role: "产品设计师，初创团队",
        period: "2026年9月 — 至今",
        desc: "AI 硬件初创团队的设计师，负责品牌、UI/UX、包装与众筹全链路。产品是一款把 AI agent 带回桌面的实体控制器，Kickstarter 2026 年 11 月上线，首日达标并获选 Project We Love。",
      },
      {
        org: "北京尚潮创意纪念品开发有限公司",
        role: "产品设计师",
        period: "2026年6月 — 2026年7月",
        desc: "为故宫博物院授权文创商品开发视觉概念与产品设计。将故宫藏品图像转化为当代消费产品，在图案、比例与色彩的适配中面向大众市场。",
      },
      {
        org: "NocFree",
        role: "视觉设计主导",
        period: "2025 – 2026",
        desc: "主导众筹活动视觉设计，搭建页面系统、产品叙事与转化导向版式。负责亚马逊及韩国市场电商视觉、品牌官网UI/UX迭代与社交媒体内容。参与包装结构、内衬设计及工厂沟通。",
      },
    ],
    projects: [
      {
        org: "二十六游戏工作室",
        role: "品牌视觉",
        period: "2025",
        desc: "为互动叙事游戏工作室设计标志系统与动态标志。围绕数字「26」构建，含静态与动态版本及中英双语应用规范。",
      },
      {
        org: "北京和观映像文化传媒",
        role: "品牌与文创产品设计",
        period: "2024 – 2025",
        desc: "为独立电影发行公司设计电影周边文创产品及相关视觉物料。",
      },
    ],
    education: [
      {
        deg: "设计硕士",
        major: "设计与视觉传播（Design and Visual Communications）",
        school: "南加州大学",
        period: "2024 – 2026",
        note: null,
      },
      {
        deg: "设计学士",
        major: "网页、数字/多媒体与信息资源设计（Web Page, Digital/Multimedia and Information Resources Design）",
        school: "纽约视觉艺术学院",
        period: "2021 – 2024",
        note: "Silas H. Rhodes 奖学金",
      },
    ],
    recognition: [
      "Graphis 新锐人才奖 — 金奖 · 银奖 · 优秀奖，2023",
      "VAND Design Award — 提名，2025",
      "贵州省旅游创业大赛 — 银奖，2025",
      "CGDA 视觉传达设计奖 — 学生组入围奖，2026",
    ],
    emailLabel: "邮箱",
    igLabel: "Instagram",
    xhsLabel: "小红书",
    wcLabel: "微信",
    wcSub: "点击扫码",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  const { lang } = useLang();
  const isMobile = useIsMobile();
  const c = data[lang];
  const [wechatOpen, setWechatOpen] = useState(false);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", paddingTop: TOP_BAR_HEIGHT }}>
      <Nav />
      <AnimatePresence>{wechatOpen && <WechatModal onClose={() => setWechatOpen(false)} />}</AnimatePresence>

      <main style={{
        marginLeft: isMobile ? 0 : NAV_WIDTH,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        minHeight: "100dvh",
      }}>

        {/* Left: portrait */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(8% 0 8% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: isMobile ? "relative" : "sticky",
            top: TOP_BAR_HEIGHT,
            height: isMobile ? "55vw" : `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "24px 20px" : "48px 40px",
          }}
        >
          <img src={optSrc("/Images/profile/IMG_2962.JPG", 800)} alt="Zhuojing Li"
            style={{ maxHeight: "100%", maxWidth: "100%", width: "auto", height: "auto", display: "block", objectFit: "contain" }} />
        </motion.div>

        {/* Right: content */}
        <div style={{ padding: isMobile ? "40px 24px 80px" : "80px 60px 100px 64px" }}>

          {/* Name */}
          <div style={{ overflow: "hidden", marginBottom: 20 }}>
            <motion.h1
              initial={{ y: "105%" }} animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                fontSize: "clamp(38px,4vw,60px)", color: "var(--dark)", lineHeight: 1.05,
              }}
            >{c.name}</motion.h1>
          </div>

          <FadeUp delay={0.1}>
            <p style={{
              fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
              fontSize: "clamp(18px,1.45vw,22px)", lineHeight: 1.8, color: "var(--dim)",
              maxWidth: 460, marginBottom: 56,
            }}>{c.bio}</p>
          </FadeUp>

          {/* Work Experience */}
          <FadeUp delay={0.22}>
            <div style={{ marginBottom: 48 }}>
              <SLabel>{c.workTitle}</SLabel>
              {c.work.map((e, i) => (
                <div key={i} style={{
                  paddingBottom: 28, marginBottom: 28,
                  borderBottom: i < c.work.length - 1 ? "1px solid var(--line)" : "none",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                    <span style={{
                      fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                      fontSize: "clamp(17px,1.3vw,20px)", color: "var(--dark)",
                    }}>{e.org}</span>
                    <span style={{
                      fontFamily: "var(--font-geist),sans-serif", fontSize: 12,
                      letterSpacing: "0.12em", color: "var(--faint)", flexShrink: 0, marginLeft: 16,
                    }}>{e.period}</span>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-geist),sans-serif", fontSize: 12,
                    letterSpacing: "0.16em", color: "var(--faint)", marginBottom: 12,
                  }}>{e.role.toUpperCase()}</div>
                  <p style={{
                    fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                    fontSize: "clamp(15px,1.1vw,17px)", color: "var(--dim)", lineHeight: 1.75, maxWidth: 440,
                  }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Projects */}
          <FadeUp delay={0.28}>
            <div style={{ marginBottom: 64 }}>
              <SLabel>{c.projectsTitle}</SLabel>
              {c.projects.map((p, i) => (
                <div key={i} style={{ padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                        fontSize: "clamp(17px,1.3vw,20px)", color: "var(--dark)",
                      }}>{p.org}</span>
                      <span style={{
                        fontFamily: "var(--font-geist),sans-serif", fontSize: 12,
                        letterSpacing: "0.14em", color: "var(--faint)",
                      }}>{p.role.toUpperCase()}</span>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-geist),sans-serif", fontSize: 12,
                      letterSpacing: "0.1em", color: "var(--faint)", flexShrink: 0, marginLeft: 16,
                    }}>{p.period}</span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                    fontSize: "clamp(15px,1.05vw,17px)", color: "var(--dim)", lineHeight: 1.7, maxWidth: 440,
                  }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Education */}
          <FadeUp delay={0.34}>
            <div style={{ marginBottom: 48 }}>
              <SLabel>{c.educationTitle}</SLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {c.education.map((e, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <span style={{
                        fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                        fontSize: "clamp(19px,1.5vw,23px)", color: "var(--dark)",
                      }}>{e.school}</span>
                      <span style={{
                        fontFamily: "var(--font-geist),sans-serif", fontSize: 12,
                        letterSpacing: "0.1em", color: "var(--faint)",
                      }}>{e.period}</span>
                    </div>
                    <div style={{
                      fontFamily: "var(--font-geist),sans-serif", fontSize: 13,
                      letterSpacing: "0.08em", color: "var(--dim)", marginBottom: 3,
                    }}>{e.deg}</div>
                    <div style={{
                      fontFamily: "var(--font-geist),sans-serif", fontSize: 12,
                      color: "var(--faint)", lineHeight: 1.5,
                    }}>{e.major}</div>
                    {e.note && (
                      <div style={{
                        fontFamily: "var(--font-geist),sans-serif", fontSize: 12,
                        color: "var(--faint)", borderLeft: "2px solid var(--line)",
                        paddingLeft: 10, marginTop: 8,
                      }}>{e.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Recognition */}
          <FadeUp delay={0.38}>
            <div style={{ marginBottom: 48 }}>
              <SLabel>{c.recognitionTitle}</SLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.recognition.map((r, i) => (
                  <div key={i} style={{
                    fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                    fontSize: "clamp(16px,1.2vw,18px)", color: "var(--dim)", lineHeight: 1.5,
                  }}>{r}</div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Contact */}
          <FadeUp delay={0.42}>
            <div>
              <SLabel>{c.contactTitle}</SLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <a href="mailto:sherrylisherry8@gmail.com" style={{ textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 12, letterSpacing: "0.2em", color: "var(--faint)", marginBottom: 5 }}>{c.emailLabel}</div>
                  <div style={{ fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontSize: "clamp(16px,1.2vw,18px)", color: "var(--dim)" }}>sherrylisherry8@gmail.com</div>
                </a>
                <a href="https://www.instagram.com/jingfinity_/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 12, letterSpacing: "0.2em", color: "var(--faint)", marginBottom: 6 }}>{c.igLabel}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, color: "var(--dim)" }}>
                    <IconInstagram />
                    <span style={{ fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontSize: "clamp(16px,1.2vw,18px)" }}>@jingfinity_</span>
                  </div>
                </a>
                <a href="https://xhslink.com/m/3zIvelzABOD" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 12, letterSpacing: "0.2em", color: "var(--faint)", marginBottom: 6 }}>{c.xhsLabel}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, color: "var(--dim)" }}>
                    <IconXiaohongshu />
                    <span style={{ fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontSize: "clamp(16px,1.2vw,18px)" }}>@jingfinity_</span>
                  </div>
                </a>
                <button onClick={() => setWechatOpen(true)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                  <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 12, letterSpacing: "0.2em", color: "var(--faint)", marginBottom: 6 }}>{c.wcLabel}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, color: "var(--dim)" }}>
                    <IconWechat />
                    <span style={{ fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontSize: "clamp(16px,1.2vw,18px)" }}>{c.wcSub}</span>
                  </div>
                </button>
              </div>
            </div>
          </FadeUp>

        </div>
      </main>
    </div>
  );
}
