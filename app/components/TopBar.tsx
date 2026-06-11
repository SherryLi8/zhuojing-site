"use client";
import Link from "next/link";
import { useLang } from "../context/lang";
import { TOP_BAR_HEIGHT } from "../lib/constants";
import { useIsMobile } from "../hooks/useIsMobile";
export { TOP_BAR_HEIGHT }; // re-export so existing imports still work

export default function TopBar() {
  const { lang, toggle } = useLang();
  const isMobile = useIsMobile();

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: TOP_BAR_HEIGHT, zIndex: 300,
      background: "var(--bg)", borderBottom: "1px solid var(--line)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "0 20px 0 52px" : "0 40px",
    }}>
      {/* Left: name + badge — optically aligned */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-newsreader),serif",
            fontWeight: 200, fontSize: 13, letterSpacing: "0.14em",
            color: "var(--dark)", lineHeight: 1,
          }}>
            Zhuojing Li
          </span>
        </Link>
        {!isMobile && <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 9, letterSpacing: "0.12em", color: "var(--dim)",
          border: "1px solid var(--line)", borderRadius: 20,
          padding: "3px 9px", fontFamily: "var(--font-geist),sans-serif",
          verticalAlign: "middle", position: "relative", top: "-1px",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "#7aab7a", display: "inline-block", flexShrink: 0,
          }}/>
          OPEN TO FREELANCE
        </span>}
      </div>

      {/* Right: language toggle */}
      <button onClick={toggle} style={{
        fontFamily: "var(--font-geist),sans-serif",
        fontSize: 11, letterSpacing: "0.1em",
        color: "var(--faint)", border: "1px solid var(--line)", borderRadius: 2,
        padding: "4px 10px", background: "none", cursor: "pointer",
      }}>
        <span style={{ color: lang === "en" ? "var(--dark)" : "var(--faint)" }}>EN</span>
        <span style={{ margin: "0 5px", color: "var(--line)" }}>/</span>
        <span style={{ color: lang === "zh" ? "var(--dark)" : "var(--faint)" }}>中文</span>
      </button>
    </div>
  );
}
