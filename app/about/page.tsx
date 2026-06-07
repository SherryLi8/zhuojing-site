"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../components/TopBar";

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
          fontFamily: "var(--font-geist),sans-serif", fontSize: 10,
          letterSpacing: "0.2em", color: "var(--faint)",
        }}>SCAN TO ADD · 扫码添加好友</div>
        <button onClick={onClose} style={{
          fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.16em",
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
      fontSize: 10, letterSpacing: "0.24em", color: "var(--dark)",
      marginBottom: 24, paddingBottom: 10,
      borderBottom: "1px solid var(--line)",
    }}>{children}</div>
  );
}

// ─── Content data ─────────────────────────────────────────────────────────────
const data = {
  en: {
    name: "Zhuojing Li",
    tagline: "BRAND IDENTITY · PACKAGING · UI/UX",
    bio: "Designer working in brand identity, packaging, and digital experience. Raised in Guiyang, trained in New York and Los Angeles — interested in what happens when design moves between cultures and languages.",
    workTitle: "WORK EXPERIENCE",
    projectsTitle: "PROJECTS",
    educationTitle: "EDUCATION",
    recognitionTitle: "RECOGNITION",
    contactTitle: "CONTACT",
    work: [
      {
        org: "Beijing Shangchao Creative Souvenirs Development Co., Ltd.",
        role: "Product Designer",
        period: "Jun 2026 — present",
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
        org: "SlashVibe",
        role: "Designer, Founding Team",
        period: "2026",
        desc: "Branding, UI/UX, and packaging across all touchpoints. Part of the founding team on the design side — collaborated with one additional designer throughout.",
      },
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
    ],
    emailLabel: "EMAIL",
    igLabel: "INSTAGRAM",
    wcLabel: "WECHAT",
    wcSub: "Click to scan",
  },
  zh: {
    name: "李卓璟",
    tagline: "品牌设计 · 包装设计 · UI/UX",
    bio: "设计师，贵阳人。在纽约读完本科，在洛杉矶读硕士。主要做品牌设计、包装和UI/UX。对视觉如何在不同文化之间流动与转译这件事一直有兴趣。",
    workTitle: "工作经历",
    projectsTitle: "项目经历",
    educationTitle: "教育背景",
    recognitionTitle: "荣誉与奖项",
    contactTitle: "联系方式",
    work: [
      {
        org: "北京尚潮创意纪念品开发有限公司",
        role: "产品设计师",
        period: "2026年6月 — 至今",
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
        org: "SlashVibe",
        role: "设计师，初创团队",
        period: "2026",
        desc: "作为初创团队设计方向成员，负责品牌标识、UI/UX 与包装的全链路设计，与另一名设计师协作完成。",
      },
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
    ],
    emailLabel: "邮箱",
    igLabel: "Instagram",
    wcLabel: "微信",
    wcSub: "点击扫码",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  const { lang } = useLang();
  const c = data[lang];
  const [wechatOpen, setWechatOpen] = useState(false);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", paddingTop: TOP_BAR_HEIGHT }}>
      <Nav />
      <AnimatePresence>{wechatOpen && <WechatModal onClose={() => setWechatOpen(false)} />}</AnimatePresence>

      <main style={{
        marginLeft: NAV_WIDTH,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100dvh",
      }}>

        {/* Left: portrait */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(8% 0 8% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "sticky", top: TOP_BAR_HEIGHT,
            height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "48px 40px",
          }}
        >
          <img src="/Images/About-Profile.JPG" alt="Zhuojing Li"
            style={{ maxHeight: "100%", maxWidth: "100%", width: "auto", height: "auto", display: "block", objectFit: "contain" }} />
        </motion.div>

        {/* Right: content */}
        <div style={{ padding: "80px 60px 100px 64px" }}>

          {/* Name */}
          <div style={{ overflow: "hidden", marginBottom: 20 }}>
            <motion.h1
              initial={{ y: "105%" }} animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
                fontSize: "clamp(36px,4vw,58px)", color: "var(--dark)", lineHeight: 1.05,
              }}
            >{c.name}</motion.h1>
          </div>

          <FadeUp delay={0.1}>
            <p style={{
              fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
              fontSize: "clamp(16px,1.45vw,20px)", lineHeight: 1.8, color: "var(--dim)",
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
                      fontSize: "clamp(15px,1.3vw,18px)", color: "var(--dark)",
                    }}>{e.org}</span>
                    <span style={{
                      fontFamily: "var(--font-geist),sans-serif", fontSize: 10,
                      letterSpacing: "0.12em", color: "var(--faint)", flexShrink: 0, marginLeft: 16,
                    }}>{e.period}</span>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-geist),sans-serif", fontSize: 10,
                    letterSpacing: "0.16em", color: "var(--faint)", marginBottom: 12,
                  }}>{e.role.toUpperCase()}</div>
                  <p style={{
                    fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                    fontSize: "clamp(13px,1.1vw,15px)", color: "var(--dim)", lineHeight: 1.75, maxWidth: 440,
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
                        fontSize: "clamp(15px,1.3vw,18px)", color: "var(--dark)",
                      }}>{p.org}</span>
                      <span style={{
                        fontFamily: "var(--font-geist),sans-serif", fontSize: 10,
                        letterSpacing: "0.14em", color: "var(--faint)",
                      }}>{p.role.toUpperCase()}</span>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-geist),sans-serif", fontSize: 10,
                      letterSpacing: "0.1em", color: "var(--faint)", flexShrink: 0, marginLeft: 16,
                    }}>{p.period}</span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
                    fontSize: "clamp(13px,1.05vw,15px)", color: "var(--dim)", lineHeight: 1.7, maxWidth: 440,
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
                        fontSize: "clamp(15px,1.3vw,18px)", color: "var(--dark)",
                      }}>{e.deg}</span>
                      <span style={{
                        fontFamily: "var(--font-geist),sans-serif", fontSize: 10,
                        letterSpacing: "0.1em", color: "var(--faint)",
                      }}>{e.period}</span>
                    </div>
                    <div style={{
                      fontFamily: "var(--font-geist),sans-serif", fontSize: 11,
                      letterSpacing: "0.08em", color: "var(--dim)", marginBottom: 3,
                    }}>{e.school}</div>
                    <div style={{
                      fontFamily: "var(--font-geist),sans-serif", fontSize: 10,
                      color: "var(--faint)", lineHeight: 1.5,
                    }}>{e.major}</div>
                    {e.note && (
                      <div style={{
                        fontFamily: "var(--font-geist),sans-serif", fontSize: 10,
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
                    fontSize: "clamp(14px,1.2vw,16px)", color: "var(--dim)", lineHeight: 1.5,
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
                  <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "var(--faint)", marginBottom: 5 }}>{c.emailLabel}</div>
                  <div style={{ fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontSize: "clamp(14px,1.2vw,16px)", color: "var(--dim)" }}>sherrylisherry8@gmail.com</div>
                </a>
                <a href="https://www.instagram.com/jingfinity_/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "var(--faint)", marginBottom: 6 }}>{c.igLabel}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, color: "var(--dim)" }}>
                    <IconInstagram />
                    <span style={{ fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontSize: "clamp(14px,1.2vw,16px)" }}>@jingfinity_</span>
                  </div>
                </a>
                <button onClick={() => setWechatOpen(true)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                  <div style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "var(--faint)", marginBottom: 6 }}>{c.wcLabel}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, color: "var(--dim)" }}>
                    <IconWechat />
                    <span style={{ fontFamily: "var(--font-newsreader),serif", fontWeight: 200, fontSize: "clamp(14px,1.2vw,16px)" }}>{c.wcSub}</span>
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
