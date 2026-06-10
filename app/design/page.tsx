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
    noteZh: "当生活越转越快，人们重新渴望慢、稳定与安住。Zentea 由此而来。它信奉\"禅茶一味\"，把禅与茶并置，让\"喝茶\"重新成为一种日常的修行。品牌语言从\"留白\"生长，仪式感靠节制传达。每一次冲泡，都是一段被放慢的时间。\n\nZENTEA 以六大茶类为线索，重组全球精品茶的风味秩序。10 款代表性茶叶覆盖六大茶类，提供两种规格：袋装，面向日常；盒装，用于收藏与礼赠。\n\n色彩系统沿六大茶类的发酵梯度展开，构建出一组连续色阶——把茶类与风味层级翻译成可被识别的视觉结构，也让整个系列保持一致、可延展。",
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
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2023",
    note: "Seasons is a flower shop. The concept begins with watching flowers bloom and fade — where blossoming and withering are themselves the shape of time.\n\nThe name comes from the turning of the seasons: in every one of them, something is in bloom. Buying flowers is usually treated as an accessory to holidays and relationships. Seasons redefines it as a form of everyday self-care. The inspiration is the opening line of Mrs Dalloway — \"Mrs. Dalloway said she would buy the flowers herself.\" The brand wants to say to every woman: flowers needn't wait for someone to give them; you can buy them for yourself, to please yourself.\n\nWhat it stands for is a free, independent life. The tone throughout is elegant, relaxed, and quiet — never loud. Visually it's positioned as a contemporary take on Art Deco: drawing on its geometry and proportion, then simplified and brought up to date.",
    noteZh: "Seasons 是一间花店，概念始于\"观花开花落，体会生命的循环\"——盛放与凋零，本身就是时间的形状。\n\n品牌名源于四季流转：每一季，都有花在开。买花，常被当作节日与关系的附属。Seasons 把它重新定义为一种日常的自我照料。灵感来自《达洛维夫人》的开篇——\"Mrs. Dalloway said she would buy the flowers herself.\" 品牌想对每一个女性说：花不必等谁来送，你可以买给自己、取悦自己。\n\n它倡导的是一种自由而独立的生活。整体调性优雅、松弛，不喧哗。视觉定位为当代化的装饰艺术（Art Deco）：参考其几何结构与比例，再作简化与现代处理。",
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
    noteZh: "The Period 是一套实验性展示字体，由一组意料之外的配对构成——人的双腿，与卫生巾。它延伸自我此前关于经痛的项目《The Moon Going Through My Body》，从可触摸的 2.5D 转向纯数字媒介，继续把月经当作一种既身体、也社会的经验来探讨。\n\n字体追问的是结构——无论排版的还是文化的——能否透过身体经验被重新想象。双腿构成竖向的笔画，卫生巾成为横向的连接，最终得到一套既顽皮又带锋芒的字母表。\n\n关于生理期的公共讨论越来越多，但\"卫生巾与身体之间的物理关系\"仍常被略过。字体是一种日常的语言，或许能以更轻松、友好的方式进入这个话题。整套字体被设计成一个可扩展的字族：血在不同变体间逐渐累积、溢出，像字重一样可以度量——让排版系统同时承载身体节奏的递进。",
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
    note: "Fractal Font is a type experiment that extends from my previous project, Program Error. The inspiration came from the rich textures that emerged during that process — particularly the layered, glitch-like surfaces generated through code.\n\nI extracted and refined these textures into visual modules, then pushed them further through iterative design and generative scripting in Processing. The result is a complete type system that embraces unpredictability, texture, and digital fragmentation — where each character feels more like a living, shifting form than a static letter.\n\nThis project follows a learning by doing approach, embracing all the possibilities that arise during the design process. It helped me deeply understand what learning by doing truly means and shifted the way I approach design — moving from fixed outcomes to open-ended exploration.\n\nThe final typeface was used in a silkscreen-printed poster for the USC Roski Graduate Program's 2025 Open House.",
    noteZh: "Fractal Font 是延伸自我此前项目 Program Error 的字体实验。灵感来自那个过程中涌现出的丰富纹理——尤其是通过代码生成的那些层叠的、故障感的表面。\n\n我将这些纹理提取和提炼为视觉模块，再经由 Processing 中的迭代设计与生成脚本进一步发展，最终构建出一套完整的字体系统，拥抱不可预测性、纹理感与数字碎片化——每个字符都更像一种活的、变动的形态，而非静止的字母。\n\n这个项目遵循\"做中学\"的理念，拥抱设计过程中涌现的一切可能性。它帮助我深入理解了\"做中学\"的真正含义，也改变了我对待设计的方式——从追求固定结果转向开放式探索。\n\n最终字体被应用于 USC Roski 研究生项目 2025 年开放日的丝网印刷海报。",
    img: "",
  },
  {
    num: "08", title: "Program Error",
    tag: "creative", tagLabel: "Creative", year: "2022",
    note: "Program Error is an experimental fractal typography project created during Ramon Tejada's workshop. Inspired by the textured surface of a Marshall speaker, I developed eight sets of modular forms that evolved iteratively. Using Processing, I generated eight experimental typefaces, exploring texture variations, color shifts, and unexpected shapes — some even resembling small animals.\n\nThis project embraces uncertainty and the open-ended nature of process-driven design, allowing forms to emerge organically through exploration and play.",
    noteZh: "Program Error 是在 Ramon Tejada 的工作坊中创作的实验性分形字体项目。灵感来自 Marshall 音箱表面的纹理，我发展出八组模块化形态，并以迭代方式逐步演化。通过 Processing，我生成了八套实验性字体，探索纹理变化、色彩转换与意外形态——其中一些甚至形似小动物。\n\n这个项目拥抱不确定性与过程导向设计的开放性，让形态在探索与游戏中自然生长。",
    img: "",
  },
  {
    num: "09", title: "ICH Museum",
    tag: "uxui", tagLabel: "UX/UI", year: "2024",
    tagDisplay: "Branding · UX/UI",
    tagDisplayZh: "品牌 · 交互",
    note: "ICH Museum is a platform-scale online museum of intangible cultural heritage, bringing immersive experience and a sustainable archive into one — so that heritage with no fixed form can be both watched immersively and preserved, searched, and carried forward in a systematic way.\n\nDigital tools are reshaping how culture is transmitted: content platforms widen its reach, immersive technology expands what an experience can be, and the public is increasingly willing to explore culture as an everyday interest. Yet existing projects tend to stall in three places: information is fragmented; they are watch-only, making sustained participation hard; and intangible heritage is shown as a finished object rather than a living process still unfolding. The demand is real; what's missing is a system to connect it all.\n\nICH Museum lets a single platform carry four things at once: preservation (digital archiving and an entry system), understanding (learning paths that lower the threshold), participation (moving from watching to interactive exploration), and connection (cross-entry links woven into a cultural network).\n\nThe main flow is direct: users enter, explore entries through categories and filters, and read on the entry page; the system then uses related recommendations to connect entries and draw users back. Immersive entry sets up ICH context first; curated guidance gives a clear way in; a classification structure keeps entries extensible; filters and unified cards raise retrieval efficiency.\n\nThe survival of intangible heritage depends on its continued happening and participation. The platform adds an Events calendar updated in real time with ICH activities around the world; VR offers a more embodied way to experience distant cultures, carrying online immersion toward offline practice — a sustainable path of participation.\n\nVisually, the system deliberately avoids regionalized decoration and symbolic appropriation, using a neutral International Typographic Style to carry diverse cultural content. The typeface is Helvetica Now Display; color stays black-and-white. The core symbol is a \"cultural window\": a horizontal rectangular frame — a metaphor for the display window and an echo of the cross-regional tools within ICH practice itself.",
    noteZh: "ICH Museum 是一座平台级的非遗线上博物馆，把\"沉浸式体验\"与\"可持续档案\"合为一体，让无形的文化遗产，既能被沉浸地观看，也能被系统地保存、检索与延续。\n\n数字化正在重塑文化传播：内容平台扩大了覆盖面，沉浸技术提升了体验的可能，公众也越来越愿意把文化当作一种日常兴趣持续探索。但现有项目普遍卡在三处：信息碎片化，缺少体系化的理解路径；以\"看\"为主，难以形成持续参与；非遗被当成一件\"成物\"来展示，而非一个仍在发生的活态过程。需求真实存在，缺的是一个把它们接起来的系统。\n\nICH Museum 用一个平台同时承担四件事：保存（数字化归档与条目体系）、理解（建立学习路径、降低门槛）、参与（从观看走向互动探索）、连接（跨条目关联，织成一张文化网络）。\n\n主流程很直接：用户进入后，在集合页以分类与筛选探索条目，在条目页完成阅读；系统再以关联推荐，实现跨条目的联通与回流。沉浸式入口先建立非遗语境，推荐导览给出明确的理解入口，分类结构保证条目可扩展，筛选与卡片提升检索效率。\n\n非遗的延续依赖持续的发生与参与。平台新增 Events 活动日历，实时更新世界各地正在进行的非遗活动，用户可发现并参与工作坊；VR 为\"远方的文化\"提供更具身体感的体验，把线上沉浸引向线下实践，形成可持续的参与路径。\n\n视觉上，刻意避开地域化装饰与符号挪用，以中性的国际主义设计风格承载多元文化内容。字体选用 Helvetica Now Display，色彩以黑白降低地域性。核心符号是一个\"文化窗口\"：横向长方形框体，既是展示窗口的隐喻，也呼应非遗实践里跨地域的传统工具——宣纸的抄纸框、织机的框架。",
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
    noteZh: "Anxiety Relief（焦虑缓释）是一套从当代健康焦虑出发的实验字体。如今，补剂与营养片被大量服用，渐渐变成一种日常化的\"健康管理仪式\"。很多时候，它们提供的并不只是身体层面的改善，更是一种心理上的缓解——对疾病、疲惫，与不够健康的生活方式的缓解。本项目把\"药丸\"当作一种视觉语言，用它来描述人处于健康焦虑中的状态。",
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
    tag: "editorial", tagLabel: "Editorial", year: "2025–2026",
    tagDisplay: "Editorial",
    tagDisplayZh: "出版物",
    note: "Clarifying visual structures does not necessarily imply an enrichment of symbolic meaning. When symbols are translated into easily readable visual structures, the original contextual depth tends to be diluted in the process.\n\nThe project grew out of an uncertainty about my own design identity: my cultural upbringing took place in China, my design training in the United States. Contemporary Chinese visual design leans toward heavy symbolization — a single motif is asked to stand for an entire cultural identity; the design I learned in the US leans toward the International Style: restraint, clear hierarchy, grid order. Caught between the two, I began to ask: is contemporary design truly understanding culture, or merely using it? The book's central claim is that design cannot be a neutral conduit that merely passes culture along — it is a site where cultural meaning is re-inscribed. When a symbol is translated into a more readable visual structure, its original contextual depth tends to be diluted: the form remains, but meaning leaks away along the way. I call this process the re-inscription of cultural meaning — an ongoing act of selection, transformation, and reconstruction.\n\nThe research borrows a set of concepts as lenses: Geertz's notion of culture as a public system of meaning; Stuart Hall's representation and encoding/decoding; Saussure's signifier/signified; Barthes's myth and second-order meaning; Benjamin's \"translation as transformation\" and mechanical reproduction; Venuti's domestication/foreignization; Baudrillard's simulacra; Bourdieu's taste and cultural capital; Kress & van Leeuwen's grammar of visual design. In the Chinese context, I use the saying \"Seeing a mountain as a mountain; seeing a mountain not as a mountain; seeing a mountain still as a mountain\" to describe how the same form yields different layers of meaning according to the viewer's context.\n\nThe book is grounded in practice-based research: design practice itself is treated as a primary mode of knowledge production, not the after-the-fact application of theory. The problem comes before the framework — beginning from uncertainties in practice, closing in through a cycle of make → reflect → introduce theory → revise. I am both researcher and practitioner, taking my cross-cultural \"in-between\" position as the starting point of the method.\n\nThe work began with an assumption — that simplification equals greater clarity and legibility. Practice quickly overturned it. As I kept paring traditional patterns down, they drifted toward a generic geometric vocabulary — no longer local, yet not truly arrived in the contemporary either. I came to realize that my preference for \"clarity and order,\" shaped by US training, was not neutral: it was pushing Chinese symbols toward homogenization. The question shifted from \"how to make this more modern\" to \"what is simplification itself doing — when a symbol is compressed into a more efficient form, does it also lose the complexity through which meaning is generated?\"\n\nI chose the crane — a symbol of layered, accumulated meaning: a bird in the natural world → Daoist immortality and longevity → the literati ideal of lofty solitude → the rank badge of first-rank civil officials in the Ming and Qing → and, in the modern era, at once auspicious, a death metaphor (\"riding the crane westward\"), and a flattened generic marker of \"the East.\" I abandoned the traditional line drawing — itself already compressed by history — and turned to digital painting: starting from photographs of real red-crowned cranes, building a volume close to nature, then stripping detail away layer by layer. For the pose I chose the moment between takeoff and ascent — a forward-shifting center of gravity, direction unresolved.\n\nColor is a variable for tuning the intensity of recognition — Qihei (lacquer black), Yubai (jade white), Tenghuang (vine yellow), Danhuo, Qingbai, Hedinghong. Two are deliberate semantic traps. Qingbai is not the crane's actual plumage; laid over the warm tones like a glaze, it reminds the viewer that this crane has long been defined by culture, projected upon by wish and imagination. Hedinghong, in today's Chinese, is first of all the name of a deadly poison — a color name derived from the crane's red crown that drifted into a word for \"poison\" — yet once translated or read as an ordinary color name, that death metaphor instantly collapses. This collapse — change the context, and the meaning changes — is exactly what the book sets out to observe.\n\nLonglin zhuang sits between the scroll and the codex, its pages adhered in staggered, overlapping layers that resemble dragon scales — today, almost a \"peripheral tradition.\" Its way of being read: turning is not page by page but a continuous lifting, pushing, and settling of layer upon layer, turning \"gradual change\" into the act of viewing itself — the crane's form moves from complex to simple as the pages turn, and that simplification happens only when the reader physically drives it; simplification ceases to be the designer's decision alone and becomes a jointly enacted process.\n\nThe book sets the two languages in parallel: Chinese is set vertically in Shoujin-ti (Slender Gold Script), English horizontally in Goudy Old Style. Both unfold right-to-left — for readers used to reading left-to-right, the direction is itself a slight resistance, deliberately slowing both languages. Both typefaces are \"writing from moments of transition\": Shoujin-ti was born within Song court power and labeled a \"script of a fallen dynasty\" after the fall of Northern Song; Goudy was born when mechanical typesetting was maturing yet still kept the proportions of the hand. The front and back of each page run in opposite directions: on the front, the image moves from complex to simple; on the back, text and illustration accumulate from simple to complex — understanding cannot be completed on one side; it has to be built by turning back and forth.\n\nLooking back over all these decisions exposes another layer: the judgments I treated as \"structural stability\" or \"skeleton first\" came not only from the object, but from the cultural training that has long shaped me. While revealing how meaning is lost, I was also producing a new order of meaning. So this book is less a conclusion than a reminder: behind every design decision that looks natural, it is worth asking one more time why, and being aware of which cultural structure one is drawing on.",
    noteZh: "视觉结构的清晰化，并不必然意味着符号意义的充盈。当符号被转译为易读的视觉结构，其原有的语境厚度也会随之被稀释。\n\n项目源自我对自己设计身份的困惑：我的文化教养在中国完成，设计训练在美国完成。中国当代视觉设计倾向高度符号化——一个母题就要代表一整个文化身份；而我在美国所学的设计偏向国际主义的克制、清晰层级与网格秩序。当我发现自己夹在两者之间时，我开始追问：当代设计究竟是在理解文化，还是只是在使用文化？本书的核心主张是：设计不能只是中立地传递文化的\"传声筒\"，设计应该是文化意义被再书写的现场。当符号被转译成更易读的视觉结构，它原有的语境厚度往往随之被稀释——形被留下，意义却在途中流失。我把这一过程命名为\"文化意义再书写\"：一个持续选择、转化、重构的过程。\n\n研究借一组概念作为透镜：克利福德·格尔茨的\"文化即公共的意义系统\"；斯图亚特·霍尔的表征与编码/解码；费尔迪南·德·索绪尔的能指/所指；罗兰·巴特的神话与二级意义；瓦尔特·本雅明的\"翻译即转化\"与机械复制；劳伦斯·韦努蒂的归化/异化；让·鲍德里亚的拟像；皮埃尔·布尔迪厄的品味与文化资本；冈特·克瑞斯与西奥·范·勒文的视觉语法。中文语境里，我用\"见山是山，见山不是山，见山还是山\"来描述同一形式如何随观看者的语境生出不同的意义层。\n\n本书建立在实践导向研究之上：把设计实践本身当作首要的知识生产方式，而非理论的事后应用。问题先于框架——从实践中的困惑出发，在\"做→反思→引入理论→修正\"的循环里逐步逼近。我既是研究者也是实践者，把自己跨文化的居间位置当作方法的起点。\n\n作品始于一个假设：简化＝更清晰、更易懂。但实践很快推翻了它。当我把传统纹样不断抽简，它们并没有被\"翻译\"进新的视觉语言，而是漂向通用的几何词汇——既不再是本地的，也没真正进入当代，停在一种土不土、洋不洋的悬置状态。我由此意识到，那套被美式训练塑造的\"清晰、秩序\"偏好并不中立，它正把中国符号推向同质化。问题于是从\"如何更现代\"转向\"简化本身在做什么：当符号被压成更高效的形式，是否也丢掉了生成意义的复杂性？\"\n\n我选择仙鹤——一个语义层层累积的符号：自然之鸟 → 道家求仙与长寿 → 文人的孤高清远 → 明清一品文官补子的等级标识 → 现代既是吉祥、又是\"驾鹤西去\"的死亡隐喻、也被简化成泛化的\"东方\"标记。正因为它在简化中仍能保留清晰的比例轴与轮廓骨架，被削去的语义层才变得可被感知。我放弃了本身已被历史压缩过的传统白描，改用数字绘画：从真实丹顶鹤的照片出发，先建立接近自然的体量，再逐层剥除细节。姿态取\"起飞与腾飞之间\"的瞬间——重心前移、方向未定的张力。\n\n色彩是调节\"识别强度\"的变量——漆黑、玉白、藤黄、丹雘、青白、鹤顶红。其中两处是有意埋的语义机关：青白并非丹顶鹤真实的羽色，像釉一样覆在暖色之上，提醒观者这只鹤不是生物摄影里的鹤，而是被文化长期定义、被祝愿与想象投射过的鹤；而背景的鹤顶红，在今天的中文里首先是一味剧毒之名，一旦被翻译或当成普通色名来读，这层死亡隐喻就瞬间塌缩——\"语境一变、意义就变\"的这种塌缩，正是整本书要观察的现象。\n\n龙鳞装介于卷轴与册页之间，页面层层错位叠贴、形如龙鳞，在今天近乎一种\"边缘的传统\"。它把\"渐变\"变成了观看动作本身——鹤的形态随翻页由繁到简，而简化必须由读者亲手推动才会发生；简化于是不再是设计者单方面的决定，而成为被共同完成的过程。\n\n全书双语并置：中文用瘦金体竖排，英文用 Goudy Old Style 横排。二者都沿龙鳞装自右向左展开——对习惯从左读起的人，这方向本身就是一道轻微阻力。两款字体都诞生在旧秩序与新秩序交错的节点，文字本身也成了\"文化权力与历史再语境化\"的可视线索。页面正反两面构成相反推进：正面图像由繁到简，背面文字与插画由简到繁——理解无法在单面完成，必须靠来回翻动建立。\n\n回看所有决策，暴露出另一层问题：那些被我当作\"结构稳定\"\"骨架优先\"的判断，既来自对象，也来自我长期受训的文化背景。在揭示意义如何流失的同时，我也在制造一种新的意义秩序。所以这本书与其说是结论，不如说是一种提醒：在每一个看似自然的设计决定背后，都值得再多问一句\"为什么\"，并意识到自己正在调用哪一套文化结构。",
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
    sourceLink: { href: "https://hiiibrand.com/winners/1b00c0e23d7f47dea1f6bef3aa624d68", label: "HIIIBRAND AWARDS 2026 →", labelZh: "Hiiibrand Awards 2026 →" },
    writingLink: "/words",
  },
  {
    num: "13", title: "八月花神", titleEn: "August Offering",
    tag: "product", tagLabel: "Product Design", year: "2026",
    note: "August Offering is a gift set of cultural products drawn from the Palace Museum collection. Its source is a Qing-dynasty opera robe: a green satin robe embroidered with osmanthus, jade rabbits, and gilt \"ball-flower\" roundels — the August Flower-Deity robe — a garment worn only once a year. Each Mid-Autumn, the Qing court staged chengying performances: ritual operas mounted by the palace troupe on imperial command, with a fixed repertoire, fixed roles, and fixed costumes. The August Flower-Deity robe is what the Flower Deity wears in the final act of that program, as she ascends the tower of the immortals — a ceremonial garment that belongs to the night of Mid-Autumn alone, to the final act alone, to the role of the Flower Deity alone.\n\nChengying (承应) is a Qing court term: to fulfill a command and meet the occasion, as custom requires. That logic — once a year, for this moment alone — sits exactly with the spirit of Mid-Autumn itself: the mooncake eaten once a year, the reunion longed for once a year, the chengying opera performed once a year. The gift set rewrites chengying (承应) as chengyue (承月) — receiving the moonlight, bearing reunion. It is itself a seasonal gift given once a year, just as the robe is worn once a year; but the plates inside it can be used again and again in daily life.\n\nAnd the plate is the moon. A round plate is already the form of the full moon: one, two, or four set out on the table, each one reads as fullness — a meaning the object's form carries on its own.\n\nIn pattern, three core elements are drawn from the robe — its overall palette, the osmanthus and jade rabbit, and the eight-lobed ruyi cartouche; the garment's original decorative language is kept, and rearranged into the composition of a round plate. In material, there is a quiet act of translation, turning silk thread into mother-of-pearl: the robe's three-tone blue silk becomes abalone-shell inlay; the white silk of the rabbit becomes white-lip pearl-shell inlay. The sheen once embroidered onto an opera costume, in a different material, settles back onto an object.\n\nA robe worn once a year — a fullness you can set on the table, year after year.",
    noteZh: "August Offering（八月花神）是一组以故宫藏品为源的文创礼盒。源头是一件清代戏服：绿色缎绣桂花玉兔金皮球花纹\"八月花神衣\"，一件一年只穿一次的衣服。清宫每逢中秋设\"承应戏\"：宫廷戏班奉旨为中秋定制的仪式性演出，有固定的剧目、角色与服装。八月花神衣，正是这套承应戏最后一幕里、花神登仙楼时所穿——专属于中秋之夜、专属于最终一幕、专属于花神一角的仪式之衣。\n\n\"承应\"是清宫词汇，意为按惯例承命应节。这种\"一年一次、专属此刻\"的仪式逻辑，恰好与中秋的气质相合：月饼一年吃一次，团圆一年盼一次，承应戏一年演一次。礼盒由此把\"承应\"转写为\"承月\"——承接月光，承载团圆。它本身是一年一度的节令之礼，如同戏服一年只穿一次；但盒中的盘子，可以在日常里反复使用。\n\n而盘，即是月。圆盘本就是圆月的形态：一只、两只、四只摆在桌上，都是\"圆满\"——这是器物形态自带的文化语义。\n\n纹样上，从花神衣中提取三组核心元素——整体配色、桂花与玉兔、八合如意开光框；保留原衣的装饰语言，重新编排进圆盘构图。材质上做了一层巧妙的转译，把丝线翻译成螺钿：花神衣的三蓝丝线，对应鲍鱼壳螺钿；白兔身上的白丝线，对应白蝶贝螺钿。原本绣在戏服上的光泽，换一种材料，落回到了器物上。\n\n戏服一年穿一次，圆满可以年年端上桌。",
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
    tag: "creative", tagLabel: "Creative", year: "2025",
    note: "Menstrual pain is commonly acknowledged as discomfort, but for those who haven't experienced it, the true sensation is difficult to imagine. To bridge this gap, I created a series of 2.5D visual posters that depict the different types of menstrual pain. I then assembled these individual pieces into a large infographic, offering a comprehensive and impactful representation of the experience. By visualizing menstrual pain, this project aims to foster empathy and understanding, while celebrating the strength embedded in the menstrual cycle.\n\nTo further enrich the project, I designed a booklet titled The Moon Going Through My Body, which poetically expresses the sensations of menstrual pain. The booklet highlights how menstruation is not merely a symbol of weakness but also of strength, resilience, and the unique power women demonstrate throughout their cycles.\n\n2.5D Posters: Visual representations of various forms of menstrual pain, giving shape and texture to an otherwise intangible experience. Infographic: A large-scale compilation of all the posters, creating a striking and cohesive visual narrative. Booklet: A poetic exploration of menstrual pain, shifting the perception from weakness to a testament of resilience.",
    noteZh: "经痛常被认定为\"不适\"，但对未曾亲历的人而言，它真实的感受难以想象。为了弥合这一鸿沟，我制作了一系列 2.5D 视觉海报，描绘不同类型的经痛，再将其整合为一张大型信息图，呈现这段经历的全貌与冲击力。通过视觉化经痛，本项目旨在激发共情与理解，同时颂扬月经周期中蕴含的力量。\n\n为进一步丰富项目，我设计了一本名为《The Moon Going Through My Body》的手册，以诗意的语言表达经痛的感受。手册着力传达：月经不只是软弱的象征，更是力量、韧性与女性独特能量的体现。\n\n2.5D 海报：对各类经痛的视觉化呈现，为这段难以言说的体验赋予形态与质感。信息图：所有海报的大型汇集，构成震撼而完整的视觉叙事。手册：对经痛的诗意探索，将这段经历从软弱的标签转化为韧性的见证。",
    img: "",
  },
  {
    num: "16", title: "'Twenty-Four Solar Terms of 2025'", titleEn: "'Twenty-Four Solar Terms of 2025'",
    tag: "editorial", tagLabel: "Editorial", year: "2025",
    tagDisplay: "Movie Calendar Postcards",
    tagDisplayZh: "电影日历明信片",
    note: "The Twenty-Four Solar Terms are an essential part of the traditional Chinese calendar, dividing the year based on the sun's movement. Each term reflects seasonal changes, agricultural activities, and cultural traditions.\n\nThis set of 2025 Twenty-Four Solar Terms Calendar Postcards, designed for Beijing HugoEast Media Co., serves as both a tribute to this ancient system and a unique record of cinema. Each postcard corresponds to a solar term, documenting 24 films HugoEast introduced from overseas over the past year and recommending them to the public. The design captures the passage of time and the memory of films, making each postcard not only a time marker but also an echo of cinematic experiences.",
    noteZh: "二十四节气是中国传统历法不可或缺的一部分，以太阳运动为基础，将一年划分为二十四个节点。每个节气折射出时节变换、农事活动与文化传统。\n\n这套《2025年二十四节气电影日历明信片》受北京好有才文化传媒有限公司委托设计，既是对这一古老历法体系的致敬，也是一份独特的电影记忆留存。每张明信片对应一个节气，记录了好有才过去一年从海外引进的 24 部影片，并将它们推荐给公众。设计捕捉时间流逝与电影记忆，使每张明信片不仅成为时间的刻度，也成为观影体验的回响。",
    img: "",
  },
  {
    num: "17", title: "Self Portrait Sculpture", titleEn: "Self Portrait Sculpture",
    tag: "creative", tagLabel: "Creative", year: "2023",
    note: "",
    img: "",
  },
  {
    num: "18", title: "Steen Lab", titleEn: "Steen Lab",
    tag: "brand-identity", tagLabel: "Brand Identity", year: "2023",
    tagDisplay: "Visual Identity",
    tagDisplayZh: "品牌视觉",
    note: "Steen Lab, led by microbial ecologist Dr. Andrew Steen at the University of Tennessee, explores how heterotrophic microbes influence the carbon cycle and the transformation of organic matter in aquatic environments. Their work blends environmental science, data modeling, and a deep belief in open science.\n\nThis identity project transforms the lab's philosophy into a visual system rooted in curiosity and evolution. The logo, inspired by molecular diagrams and ripple patterns, forms a shifting S — evoking connection, rationality, and openness to change. The bright orange node breaks symmetry, symbolizing the spark of discovery that drives research forward.\n\nThe brand system is modular and human-centered. From digital interface to scientific poster, it invites both experts and curious minds into the lab's world — redefining scientific communication as transparent, inclusive, and alive.\n\nCollaboration with Claire Dong and Cyrus Wang.",
    noteZh: "Steen Lab 由田纳西大学微生物生态学家 Andrew Steen 博士领导，专注于研究异养微生物如何影响碳循环，以及水生环境中有机物的转化过程。他们的工作融合了环境科学、数据建模与对开放科学的深切信念。\n\n这套视觉识别项目将实验室的理念转化为一套根植于好奇心与进化的视觉系统。标志灵感来自分子结构图与涟漪图案，构成一个流动的 S 形——唤起连接、理性与对变化的开放。鲜亮的橙色节点打破对称，象征推动研究前行的发现之火花。\n\n品牌系统模块化、以人为中心。从数字界面到科研海报，它邀请专家与好奇者共同进入实验室的世界——重新定义科学传播：透明、包容、有生命力。\n\n与 Claire Dong、Cyrus Wang 合作完成。",
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
            : (work as typeof work & { sourceLink: { href: string; label: string; labelZh: string } }).sourceLink.label}
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
