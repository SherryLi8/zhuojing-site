import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import { Suspense } from "react";
import { LangProvider } from "./context/lang";
import PageTransition from "./components/PageTransition";
import TopBar from "./components/TopBar";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["200"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Zhuojing Li",
  description: "Designer and visual thinker. Work across branding, type, and digital experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${newsreader.variable}`}>
      <body>
        <LangProvider>
          <TopBar />
          <Suspense>
            <PageTransition>
              {children}
            </PageTransition>
          </Suspense>
        </LangProvider>
      </body>
    </html>
  );
}
