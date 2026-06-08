"use client";
// v2
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav, { NAV_WIDTH } from "../components/Nav";
import { TOP_BAR_HEIGHT } from "../components/TopBar";
import { useLang } from "../context/lang";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const TAG_LABELS: Record<string, Record<string, string>> = {
  en: { "brand-identity": "Branding", "editorial": "Editorial", "typography": "Typography", "packaging": "Packaging", "uxui": "UX/UI", "product": "Product", "creative": "Creative", "motion": "Motion" },
  zh: { "brand-identity": "品牌设计", "editorial": "出版物设计", "typography": "字体设计", "packaging": "包装设计", "uxui": "交互设计", "product": "产品设计", "creative": "创意设计", "motion": "动态" },
};

// ─── Helper: break title at first colon ───────────────────────────────────────
function renderBreakTitle(t: string): React.ReactNode {
  const i = t.indexOf(': ');
  if (i !== -1) return <>{t.slice(0, i + 1)}<br/>{t.slice(i + 2)}</>;
  const j = t.indexOf('：');
  if (j !== -1) return <>{t.slice(0, j + 1)}<br/>{t.slice(j + 1)}</>;
  return <>{t}</>;
}

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
    note: "As life spins faster, people find themselves longing again for slowness, stability, and repose. Zentea comes from that. It believes Zen and tea are of one taste, placing the two side by side so that drinking tea becomes a daily practice again. The brand language grows out of negative space; its sense of ritual is carried by restraint rather than decoration. Every brew is a stretch of time, deliberately slowed.\n\nZENTEA takes the six tea categories as its through-line, reordering the flavors of fine teas from around the world. Ten representative teas cover the six categories, in two formats: pouches for everyday buying, boxes for collecting and gifting.\n\nThe color system unfolds along the fermentation gradient of the six categories, building a continuous scale — translating tea type and flavor level into a recognizable visual structure, and keeping the whole series consistent and extensible.",
    noteZh: "当生活越转越快，人们重新渴望慢、稳定与安住。Zentea 由此而来。它信奉"禅茶一味"，把禅与茶并置，让"喝茶"重新成为一种日常的修行。品牌语言从"留白"生长，仪式感靠节制传达。每一次冲泡，都是一段被放慢的时间。\n\nZENTEA 以六大茶类为线索，重组全球精品茶的风味秩序。10 款代表性茶叶覆盖六大茶类，提供两种规格：袋装，面向日常；盒装，用于收藏与礼赠。\n\n色彩系统沿六大茶类的发酵梯度展开，构建出一组连续色阶——把茶类与风味层级翻译成可被识别的视觉结构，也让整个系列保持一致、可延展。",
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
    note: "Seasons is a flower shop. The concept begins with watching flowers bloom and fade — where blossoming and withering are themselves the shape of time.\n\nThe name comes from the turning of the seasons: in every one of them, something is in bloom. Buying flowers is usually treated as an accessory to holidays and relationships. Seasons redefines it as a form of everyday self-care. The inspiration is the opening line of Mrs Dalloway — \"Mrs. Dalloway said she would buy the flowers herself.\" The brand wants to say to every woman: flowers needn't wait for someone to give them; you can buy them for yourself, to please yourself.\n\nWhat it stands for is a free, independent life. The tone throughout is elegant, relaxed, and quiet — never loud. Visually it's positioned as a contemporary take on Art Deco: drawing on its geometry and proportion, then simplified and brought up to date.",
    noteZh: "Seasons 是一间花店，概念始于"观花开花落，体会生命的循环"——盛放与凋零，本身就是时间的形状。\n\n品牌名源于四季流转：每一季，都有花在开。买花，常被当作节日与关系的附属。Seasons 把它重新定义为一种日常的自我照料。灵感来自《达洛维夫人》的开篇——\"Mrs. Dalloway said she would buy the flowers herself.\" 品牌想对每一个女性说：花不必等谁来送，你可以买给自己、取悦自己。\n\n它倡导的是一种自由而独立的生活。整体调性优雅、松弛，不喧哗。视觉定位为当代化的装饰艺术（Art Deco）：参考其几何结构与比例，再作简化与现代处理。",
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
    tag: "typography", tagLabel: "Typography", year: "2025",
    note: "The Period is an experimental display typeface built from an unlikely pairing — human legs and sanitary pads. It extends an earlier project of mine on menstrual pain, The Moon Going Through My Body, moving from a tactile 2.5D format into a purely digital medium, and continuing to treat menstruation as an experience that is at once bodily and social.\n\nThe typeface asks whether structure — typographic or cultural — can be reimagined through bodily experience. Legs form the vertical strokes; pads become the horizontal connectors. What results is an alphabet that is at once playful and pointed.\n\nPublic conversation around menstruation keeps growing, yet the physical relationship between a pad and the body is still often passed over. A typeface is an everyday language; perhaps it can enter the subject in a lighter, friendlier way. The whole face is built as an expandable family: blood gradually accumulates and overflows across the variants — measurable, like weight — so the type system carries the progression of the body's own rhythm.",
    noteZh: "The Period 是一套实验性展示字体，由一组意料之外的配对构成——人的双腿，与卫生巾。它延伸自我此前关于经痛的项目《The Moon Going Through My Body》，从可触摸的 2.5D 转向纯数字媒介，继续把月经当作一种既身体、也社会的经验来探讨。\n\n字体追问的是结构——无论排版的还是文化的——能否透过身体经验被重新想象。双腿构成竖向的笔画，卫生巾成为横向的连接，最终得到一套既顽皮又带锋芒的字母表。\n\n关于生理期的公共讨论越来越多，但"卫生巾与身体之间的物理关系"仍常被略过。字体是一种日常的语言，或许能以更轻松、友好的方式进入这个话题。整套字体被设计成一个可扩展的字族：血在不同变体间逐渐累积、溢出，像字重一样可以度量——让排版系统同时承载身体节奏的递进。",
    img: "/Images/月经体/月经体%20主图.jpg",
    images: [
      "/Images/月经体/月经体%20主图.jpg",
    ] as ImageEntry[],
    video: "/Images/月经体/motion.mp4",
  },
  {
    num: "04", title: "Salvation of Seven Deadly Sins",
    tag: "packaging", tagLabel: "Packaging", year: "2022",
    award: "Graphis New Talent — Silver, 2023",
    awardZh: "Graphis New Talent 银奖 2023",
    note: "Sweet, silken chocolate is salvation for the small sin everyone carries. Salvation of Seven Deadly Sins is a full packaging set built around the seven sins — pride, greed, lust, envy, gluttony, wrath, sloth — one chocolate for each. Chocolate has always stood for temptation and excess, yet it's also the most everyday of comforts. The packaging rests on that paradox: sin and absolution, temptation and solace, each the lining of the other. To eat one is both to confess and to be forgiven.",
    noteZh: "甜而丝滑的巧克力，是每个人心底那点「罪」的救赎。Salvation of Seven Deadly Sins 以七宗罪为线索，设计了一整套巧克力包装——傲慢、贪婪、色欲、嫉妒、暴食、暴怒、懒惰，每一宗罪，对应一颗巧克力。巧克力本就是诱惑与放纵的代名词，却也是最日常的慰藉。包装因此立在这层悖论之上：罪与赦免、诱惑与安慰，互为表里。吃下它，既是认罪，也是被原谅。",
    img: "/Images/Chocolate/主图.jpg",
    images: [
      "/Images/Chocolate/主图.jpg",
      "/Images/Chocolate/2%20%E5%B9%B3%E9%9D%A2%E5%9B%BE.jpg",
      { src: "/Images/Chocolate/3.overview.png", cropY: 10 },
    ] as ImageEntry[],
  },
  {
    num: "05", title: "One Second",
    tag: "packaging", tagLabel: "Packaging", year: "2023",
    award: "Graphis New Talent — Honorable Mention, 2023",
    awardZh: "Graphis New Talent 荣誉提名 2023",
    note: "The name One Second comes from the first second the sparkling water meets your mouth — the instant the bubbles burst on the tongue. It's about an unhurried way of living: don't rush to swallow; stay in the moment you're in.",
    noteZh: "One Second 的名字，来自气泡水入口的第一秒，气泡在舌尖炸开的那一瞬。品牌想传递一种松弛的生活态度：别急着咽下，沉浸在当下这一刻。",
    img: "/Images/One%20Second/主图.jpg",
    images: [
      "/Images/One%20Second/主图.jpg",
      "/Images/One%20Second/2-Peach%20Mock%20up%20White.jpg",
      "/Images/One%20Second/3.jpg",
    ] as ImageEntry[],
  },
  {
    num: "06", title: "Orient",
    tag: "editorial", tagLabel: "Editorial", year: "2023",
    award: "Graphis New Talent — Honorable Mention, 2023",
    awardZh: "Graphis New Talent 荣誉提名 2023",
    note: "Orient is a digital magazine devoted to a new generation of contemporary Chinese architecture. Readers can subscribe and read it on the iPad. Orient wants to give the word \"the Orient\" a different set of images — not only upturned eaves, gardens, and a China reduced to symbols, but the architecture happening now: concrete, geometry, scale, and negative space. To read it is to come to know \"the Orient\" anew.",
    noteZh: "Orient 是一本电子杂志，专注于介绍新一代的当代中国建筑。读者可订阅，并在 iPad 上阅读。Orient 想替「东方」这个词换一批图像——不只是飞檐、园林与符号化的中国，也是正在发生的当代建筑：混凝土、几何、尺度与留白。阅读它，是一次重新认识「东方」的过程。",
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
    tag: "typography", tagLabel: "Typography", year: "2022",
    note: "Self-similarity scaled from glyph to composition.",
    img: "",
  },
  {
    num: "08", title: "Program Error",
    tag: "creative", tagLabel: "Creative", year: "2022",
    note: "Digital glitch as aesthetic language.",
    img: "",
  },
  {
    num: "09", title: "ICH Museum",
    tag: "uxui", tagLabel: "UX/UI", year: "2022",
    tagDisplay: "Branding · UX/UI",
    tagDisplayZh: "品牌 · 交互",
    note: "ICH Museum is a platform-scale online museum of intangible cultural heritage, bringing immersive experience and a sustainable archive into one — so that heritage with no fixed form can be both watched immersively and preserved, searched, and carried forward in a systematic way.\n\nDigital tools are reshaping how culture is transmitted: content platforms widen its reach, immersive technology expands what an experience can be, and the public is increasingly willing to explore culture as an everyday interest. Yet existing projects tend to stall in three places: information is fragmented; they are watch-only, making sustained participation hard; and intangible heritage is shown as a finished object rather than a living process still unfolding. The demand is real; what's missing is a system to connect it all.\n\nICH Museum lets a single platform carry four things at once: preservation (digital archiving and an entry system), understanding (learning paths that lower the threshold), participation (moving from watching to interactive exploration), and connection (cross-entry links woven into a cultural network).\n\nThe main flow is direct: users enter, explore entries through categories and filters, and read on the entry page; the system then uses related recommendations to connect entries and draw users back. Immersive entry sets up ICH context first; curated guidance gives a clear way in; a classification structure keeps entries extensible; filters and unified cards raise retrieval efficiency.\n\nThe survival of intangible heritage depends on its continued happening and participation. The platform adds an Events calendar updated in real time with ICH activities around the world; VR offers a more embodied way to experience distant cultures, carrying online immersion toward offline practice — a sustainable path of participation.\n\nVisually, the system deliberately avoids regionalized decoration and symbolic appropriation, using a neutral International Typographic Style to carry diverse cultural content. The typeface is Helvetica Now Display; color stays black-and-white. The core symbol is a \"cultural window\": a horizontal rectangular frame — a metaphor for the display window and an echo of the cross-regional tools within ICH practice itself.",
    noteZh: "ICH Museum 是一座平台级的非遗线上博物馆，把"沉浸式体验"与"可持续档案"合为一体，让无形的文化遗产，既能被沉浸地观看，也能被系统地保存、检索与延续。\n\n数字化正在重塑文化传播：内容平台扩大了覆盖面，沉浸技术提升了体验的可能，公众也越来越愿意把文化当作一种日常兴趣持续探索。但现有项目普遍卡在三处：信息碎片化，缺少体系化的理解路径；以"看"为主，难以形成持续参与；非遗被当成一件"成物"来展示，而非一个仍在发生的活态过程。需求真实存在，缺的是一个把它们接起来的系统。\n\nICH Museum 用一个平台同时承担四件事：保存（数字化归档与条目体系）、理解（建立学习路径、降低门槛）、参与（从观看走向互动探索）、连接（跨条目关联，织成一张文化网络）。\n\n主流程很直接：用户进入后，在集合页以分类与筛选探索条目，在条目页完成阅读；系统再以关联推荐，实现跨条目的联通与回流。沉浸式入口先建立非遗语境，推荐导览给出明确的理解入口，分类结构保证条目可扩展，筛选与卡片提升检索效率。\n\n非遗的延续依赖持续的发生与参与。平台新增 Events 活动日历，实时更新世界各地正在进行的非遗活动，用户可发现并参与工作坊；VR 为"远方的文化"提供更具身体感的体验，把线上沉浸引向线下实践，形成可持续的参与路径。\n\n视觉上，刻意避开地域化装饰与符号挪用，以中性的国际主义设计风格承载多元文化内容。字体选用 Helvetica Now Display，色彩以黑白降低地域性。核心符号是一个"文化窗口"：横向长方形框体，既是展示窗口的隐喻，也呼应非遗实践里跨地域的传统工具——宣纸的抄纸框、织机的框架。",
    img: "/Images/ICH/主图.jpg",
    images: [
      "/Images/ICH/主图.jpg",
      "/Images/ICH/电脑端.png",
      "/Images/ICH/手机端.png",
      "/Images/ICH/社媒%2B工牌.jpg",
      "/Images/ICH/T恤.png",
      "/Images/ICH/地广.jpg",
      "/Images/ICH/地广2.png",
      "/Images/ICH/Future%20feature.png",
    ] as ImageEntry[],
  },
  {
    num: "10", title: "Dieter Rams Poster",
    tag: "editorial", tagLabel: "Editorial", year: "2023",
    note: "A poster series, working through Dieter Rams' Ten Principles of Good Design one by one.",
    noteZh: "一套海报，逐条诠释 Dieter Rams 的「好设计十原则」。",
    img: "/Images/Dieter%20Rams%20Poster/主图.jpg",
    images: [
      "/Images/Dieter%20Rams%20Poster/主图.jpg",
    ] as ImageEntry[],
  },
  {
    num: "11", title: "Anxiety Relief",
    tag: "typography", tagLabel: "Typography", year: "2023",
    note: "Anxiety Relief is an experimental typeface that begins with contemporary health anxiety. Supplements and vitamins are now taken in great quantities, slowly becoming a daily \"ritual of health management.\" Often what they offer isn't only physical improvement but psychological relief — from illness, from fatigue, from the sense of living unhealthily. The project treats the pill as a visual language, using it to describe the state of being anxious about one's health.",
    noteZh: "Anxiety Relief（焦虑缓释）是一套从当代健康焦虑出发的实验字体。如今，补剂与营养片被大量服用，渐渐变成一种日常化的"健康管理仪式"。很多时候，它们提供的并不只是身体层面的改善，更是一种心理上的缓解——对疾病、疲惫，与不够健康的生活方式的缓解。本项目把"药丸"当作一种视觉语言，用它来描述人处于健康焦虑中的状态。",
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
      { role: "PHOTO", name: "Rebecca", href: "https://www.instagram.com/un_coz_/", name2: "小红书 @Nixuy", href2: "https://xhslink.com/m/1ciUK7MvEDa" },
    ],
    writingLink: "/words",
  },
  {
    num: "13", title: "八月花神", titleEn: "August Offering",
    tag: "product", tagLabel: "Product Design", year: "2025",
    note: "August Offering is a gift set of cultural products drawn from the Palace Museum collection. Its source is a Qing-dynasty opera robe: a green satin robe embroidered with osmanthus, jade rabbits, and gilt \"ball-flower\" roundels — the August Flower-Deity robe — a garment worn only once a year. Each Mid-Autumn, the Qing court staged chengying performances: ritual operas mounted by the palace troupe on imperial command, with a fixed repertoire, fixed roles, and fixed costumes. The August Flower-Deity robe is what the Flower Deity wears in the final act of that program, as she ascends the tower of the immortals — a ceremonial garment that belongs to the night of Mid-Autumn alone, to the final act alone, to the role of the Flower Deity alone.\n\nChengying (承应) is a Qing court term: to fulfill a command and meet the occasion, as custom requires. That logic — once a year, for this moment alone — sits exactly with the spirit of Mid-Autumn itself: the mooncake eaten once a year, the reunion longed for once a year, the chengying opera performed once a year. The gift set rewrites chengying (承应) as chengyue (承月) — receiving the moonlight, bearing reunion. It is itself a seasonal gift given once a year, just as the robe is worn once a year; but the plates inside it can be used again and again in daily life.\n\nAnd the plate is the moon. A round plate is already the form of the full moon: one, two, or four set out on the table, each one reads as fullness — a meaning the object's form carries on its own.\n\nIn pattern, three core elements are drawn from the robe — its overall palette, the osmanthus and jade rabbit, and the eight-lobed ruyi cartouche; the garment's original decorative language is kept, and rearranged into the composition of a round plate. In material, there is a quiet act of translation, turning silk thread into mother-of-pearl: the robe's three-tone blue silk becomes abalone-shell inlay; the white silk of the rabbit becomes white-lip pearl-shell inlay. The sheen once embroidered onto an opera costume, in a different material, settles back onto an object.\n\nA robe worn once a year — a fullness you can set on the table, year after year.",
    noteZh: "August Offering（八月花神）是一组以故宫藏品为源的文创礼盒。源头是一件清代戏服：绿色缎绣桂花玉兔金皮球花纹"八月花神衣"，一件一年只穿一次的衣服。清宫每逢中秋设"承应戏"：宫廷戏班奉旨为中秋定制的仪式性演出，有固定的剧目、角色与服装。八月花神衣，正是这套承应戏最后一幕里、花神登仙楼时所穿——专属于中秋之夜、专属于最终一幕、专属于花神一角的仪式之衣。\n\n"承应"是清宫词汇，意为按惯例承命应节。这种"一年一次、专属此刻"的仪式逻辑，恰好与中秋的气质相合：月饼一年吃一次，团圆一年盼一次，承应戏一年演一次。礼盒由此把"承应"转写为"承月"——承接月光，承载团圆。它本身是一年一度的节令之礼，如同戏服一年只穿一次；但盒中的盘子，可以在日常里反复使用。\n\n而盘，即是月。圆盘本就是圆月的形态：一只、两只、四只摆在桌上，都是"圆满"——这是器物形态自带的文化语义。\n\n纹样上，从花神衣中提取三组核心元素——整体配色、桂花与玉兔、八合如意开光框；保留原衣的装饰语言，重新编排进圆盘构图。材质上做了一层巧妙的转译，把丝线翻译成螺钿：花神衣的三蓝丝线，对应鲍鱼壳螺钿；白兔身上的白丝线，对应白蝶贝螺钿。原本绣在戏服上的光泽，换一种材料，落回到了器物上。\n\n戏服一年穿一次，圆满可以年年端上桌。",
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
    sourceLink: { href: "https://www.dpm.org.cn/collection/music/233230.html", label: "VIEW SOURCE OBJECT →", labelZh: "查看故宫馆藏原件 →" },
  },
  {
    num: "14", title: "UToypia",
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2023",
    award: "TDC Young Ones — Shortlist, 2023",
    awardZh: "TDC Young Ones 入围 2023",
    note: "",
    img: "",
  },
  {
    num: "15", title: "The Moon Going Through My Body",
    tag: "creative", tagLabel: "Creative", year: "2023",
    note: "",
    img: "",
  },
];

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ work }: { work: typeof works[0] | null }) {
  const { lang } = useLang();
  const labels = {
    empty: lang === "en" ? "CLICK TO VIEW" : "点击查看设计",
    type:  lang === "en" ? "TYPE"  : "类型",
    year:  lang === "en" ? "YEAR"  : "年份",
    role:  lang === "en" ? "ROLE"  : "角色",
    award: lang === "en" ? "AWARD" : "奖项",
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
          style={{ width: "100%", display: "block", marginBottom: 28 }}
        />
      )}

      {/* Title */}
      <div style={{
        fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
        fontSize: "clamp(20px,1.8vw,26px)", color: "var(--dark)",
        lineHeight: 1.2, marginBottom: 16,
      }}>
        {renderBreakTitle(lang === "en" && "titleEn" in work
          ? (work as typeof work & { titleEn: string }).titleEn
          : work.title)}
      </div>

      {/* Meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 24 }}>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52 }}>{labels.type}</span>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>
            {lang === "zh" && "tagDisplayZh" in work
              ? (work as typeof work & { tagDisplayZh: string }).tagDisplayZh
              : "tagDisplay" in work
              ? (work as typeof work & { tagDisplay: string }).tagDisplay
              : TAG_LABELS[lang][work.tag]}
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52 }}>{labels.year}</span>
          <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>{work.year}</span>
        </div>
        {/* Award */}
        {"award" in work && (
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52, flexShrink: 0 }}>{labels.award}</span>
            <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>
              {lang === "zh" && "awardZh" in work
                ? (work as typeof work & { awardZh: string }).awardZh
                : (work as typeof work & { award: string }).award}
            </span>
          </div>
        )}
        {/* Credits */}
        {"credits" in work && (work as typeof work & { credits?: { role: string; name: string; href?: string; name2?: string; href2?: string }[] }).credits?.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: 24 }}>
            <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--faint)", width: 52, flexShrink: 0 }}>{c.role}</span>
            <div style={{ display: "flex", gap: 12, flexWrap: "nowrap", alignItems: "baseline" }}>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)", textDecoration: "none" }}>
                  {c.name} ↗
                </a>
              ) : (
                <span style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--dim)" }}>{c.name}</span>
              )}
              {c.href2 && (
                <a href={c.href2} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--faint)", textDecoration: "none" }}>
                  {c.name2} ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-newsreader),serif", fontWeight: 200,
        fontSize: "clamp(13px,1.1vw,15px)", color: "var(--dim)",
        lineHeight: 1.75, marginBottom: 24, whiteSpace: "pre-line",
      }}>
        {lang === "zh" && "noteZh" in work
          ? (work as typeof work & { noteZh: string }).noteZh
          : work.note}
      </p>

      {/* Source link */}
      {"sourceLink" in work && (work as typeof work & { sourceLink?: { href: string; label: string; labelZh: string } }).sourceLink && (
        <a href={(work as typeof work & { sourceLink: { href: string; label: string; labelZh: string } }).sourceLink.href}
          target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "var(--dim)", textDecoration: "none", display: "inline-block", marginBottom: 8 }}>
          {lang === "zh"
            ? (work as typeof work & { sourceLink: { href: string; label: string; labelZh: string } }).sourceLink.labelZh
            : (work as typeof work & { sourceLink: { href: string; label: string; labelZh: string } }).sourceLink.label} ↗
        </a>
      )}

      {/* PDF link */}
      {"pdf" in work && (work as typeof work & { pdf?: string }).pdf && (
        <a href={(work as typeof work & { pdf: string }).pdf} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "var(--dim)", textDecoration: "none", display: "inline-block", marginBottom: 8 }}>
          {lang === "zh" ? "查看杂志 PDF →" : "VIEW MAGAZINE PDF →"}
        </a>
      )}

      {/* Writing link */}
      {"writingLink" in work && (work as typeof work & { writingLink?: string }).writingLink && (
        <a href={(work as typeof work & { writingLink: string }).writingLink}
          style={{ fontFamily: "var(--font-geist),sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "var(--dim)", textDecoration: "none", display: "block" }}>
          {lang === "zh" ? "阅读文章 →" : "READ ESSAY →"}
        </a>
      )}

    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// Row 1: ALL, Branding, Editorial, Packaging — Row 2: Typography, UX/UI, Product, Creative
const FILTERS = [
  { key: "brand-identity", en: "Branding",   zh: "品牌设计" },
  { key: "editorial",      en: "Editorial",  zh: "出版物设计" },
  { key: "packaging",      en: "Packaging",  zh: "包装设计" },
  { key: "typography",     en: "Typography", zh: "字体设计" },
  { key: "uxui",           en: "UX/UI",      zh: "交互设计" },
  { key: "product",        en: "Product",    zh: "产品设计" },
  { key: "creative",       en: "Creative",   zh: "创意设计" },
] as const;

export default function Design() {
  const { lang } = useLang();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hovered,  setHovered]  = useState<typeof works[0] | null>(null);
  const [selected, setSelected] = useState<typeof works[0] | null>(null);

  // Pre-select project from URL param ?project=zentea
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("project");
    if (!slug) return;
    const match = works.find(w =>
      w.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === slug
    );
    if (match) setSelected(match);
  }, []);

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
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 40, paddingBottom: 20,
            borderBottom: "1px solid var(--line)",
          }}>
            <h1 style={{
              fontFamily: "var(--font-newsreader),serif", fontStyle: "italic", fontWeight: 200,
              fontSize: "clamp(32px,3.5vw,48px)", color: "var(--dark)",
            }}>{lang === "en" ? "Design" : "设计"}</h1>
            {/* Filter tabs — 4-col grid → exactly 2 rows of 4 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, max-content)", gap: "4px 14px" }}>
              {[{ key: "all", en: "ALL", zh: "全部" } as const, ...FILTERS].map((f) => {
                const isActive = activeFilter === f.key;
                return (
                  <button key={f.key}
                    onClick={() => setActiveFilter(isActive && f.key !== "all" ? "all" : f.key)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, outline: "none" }}
                  >
                    <span style={{
                      display: "inline-block", position: "relative", paddingBottom: 4,
                      fontFamily: "var(--font-geist),sans-serif",
                      fontSize: 9, letterSpacing: "0.2em",
                      color: isActive ? "var(--dark)" : "var(--faint)",
                      transition: "color 0.2s",
                    }}>
                      {"en" in f ? (lang === "en" ? f.en : f.zh) : (lang === "en" ? "ALL" : "全部")}
                      <motion.div
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          height: 1, background: "var(--dark)",
                          transformOrigin: "left center",
                        }}
                      />
                    </span>
                  </button>
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
                    gridTemplateColumns: "36px 1fr max-content",
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
                    {renderBreakTitle(lang === "en" && "titleEn" in work
                      ? (work as typeof work & { titleEn: string }).titleEn
                      : work.title)}
                  </span>

                  {/* Tag */}
                  <span style={{
                    fontFamily: "var(--font-geist),sans-serif",
                    fontSize: 9, letterSpacing: "0.16em", color: "var(--faint)",
                  }}>
                    {lang === "zh" && "tagDisplayZh" in work
                      ? (work as typeof work & { tagDisplayZh: string }).tagDisplayZh
                      : "tagDisplay" in work
                      ? (work as typeof work & { tagDisplay: string }).tagDisplay
                      : TAG_LABELS[lang][work.tag]}
                  </span>

                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: detail panel — fade transition on change ── */}
        <div style={{
          position: "sticky", top: TOP_BAR_HEIGHT,
          height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`, overflowY: "auto",
          padding: "48px 40px 48px 40px",
          display: "flex", flexDirection: "column",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWork?.num ?? "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: [0.25, 0, 0, 1] }}
              style={{ flex: 1 }}
            >
              <DetailPanel work={activeWork} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
