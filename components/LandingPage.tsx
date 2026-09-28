"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Blocks,
  Check,
  ChevronDown,
  CircleDollarSign,
  Coins,
  Diamond,
  Download,
  ExternalLink,
  Facebook,
  Globe2,
  Hexagon,
  Layers3,
  Lock,
  Menu,
  Mountain,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Triangle,
  Wallet,
  X,
  Zap
} from "lucide-react";
import { useState } from "react";
import WalletConnect from "./WalletConnect";

const nav = [
  ["Cüzdan", "#wallet"],
  ["Piyasalar", "#markets"],
  ["Özellikler", "#features"],
  ["Geliştir", "#developers"],
  ["Hakkında", "#about"]
];

const assets = [
  { symbol: "BTC", name: "Bitcoin", amount: "0.184 BTC", value: "$6,842.16", tone: "bg-orange-500" },
  { symbol: "ETH", name: "Ethereum", amount: "2.12 ETH", value: "$4,103.80", tone: "bg-indigo-500" },
  { symbol: "USDT", name: "Tether USD", amount: "1,168 USDT", value: "$1,168.00", tone: "bg-emerald-500" },
  { symbol: "SOL", name: "Solana", amount: "2.94 SOL", value: "$366.46", tone: "bg-violet-500" }
];

const networks = [
  { name: "Bitcoin", short: "BTC", icon: Coins, tone: "text-orange-500 bg-orange-50" },
  { name: "Ethereum", short: "ETH", icon: Diamond, tone: "text-indigo-600 bg-indigo-50" },
  { name: "Solana", short: "SOL", icon: Zap, tone: "text-violet-600 bg-violet-50" },
  { name: "BNB Smart Chain", short: "BNB", icon: Blocks, tone: "text-amber-600 bg-amber-50" },
  { name: "TRON", short: "TRX", icon: Triangle, tone: "text-rose-600 bg-rose-50" },
  { name: "XRP", short: "XRP", icon: X, tone: "text-slate-700 bg-slate-100" },
  { name: "Avalanche", short: "AVAX", icon: Mountain, tone: "text-red-600 bg-red-50" },
  { name: "Polygon", short: "POL", icon: Hexagon, tone: "text-purple-600 bg-purple-50" }
];

const tabData = {
  Swaps: {
    label: "Swap",
    title: "Swap across networks",
    description: "Choose assets, compare routes, and review the exact action before confirming.",
    accent: "from-violet-500 to-indigo-600"
  },
  Perps: {
    label: "Markets",
    title: "Follow fast-moving markets",
    description: "A clean market view for prices, watchlists, charts, and open positions.",
    accent: "from-indigo-500 to-sky-500"
  },
  "Meme rush": {
    label: "Trending",
    title: "See what is moving",
    description: "A discovery surface for trending community tokens and market activity.",
    accent: "from-fuchsia-500 to-rose-500"
  },
  "Buy/Sell": {
    label: "Buy / Sell",
    title: "Simple cash-to-crypto access",
    description: "Compare integrated providers and clearly review fees before continuing.",
    accent: "from-emerald-500 to-teal-500"
  },
  "Discover DApps": {
    label: "Discover",
    title: "Explore the open web",
    description: "Browse Web3 experiences from a familiar mobile-first discovery screen.",
    accent: "from-cyan-500 to-violet-500"
  }
};

const faqItems = [
  {
    q: "VirtualWallet nedir?",
    a: "Kripto varlıklarınızı görüntülemek, saklamak, takas işlemlerini yönetmek ve Web3 uygulamalarını keşfetmek için tasarlanmış kişisel dijital cüzdan arayüzüdür."
  },
  {
    q: "VirtualWallet güvenli midir?",
    a: "Özel anahtarlar cihazınızda kalacak şekilde self-custody mantığına göre tasarlanmıştır. Bağlantı ekranı kullanıcı onayı olmadan transfer veya token harcama yetkisi oluşturmaz."
  },
  {
    q: "Kripto cüzdanı nasıl edinebilirim?",
    a: "Mobil uygulama veya tarayıcı uzantısı üzerinden yeni bir cüzdan oluşturabilir ya da desteklenen bir cüzdanı bağlayabilirsiniz."
  },
  {
    q: "VirtualWallet ücretsiz mi?",
    a: "Arayüzü indirmek ve kullanmak ücretsiz olabilir. Blockchain üzerinde yapılan işlemlerde ilgili ağın işlem ücretleri uygulanabilir."
  },
  {
    q: "VirtualWallet kaç blockchain destekler?",
    a: "Arayüz, Bitcoin, Ethereum, Solana, BNB Smart Chain ve TRON gibi popüler ağlar dahil 100'den fazla ağ için genişletilebilir bir yapı sunar."
  },
  {
    q: "VirtualWallet ile diğer cüzdanlar arasındaki fark nedir?",
    a: "Tek arayüzde çoklu ağ görünümü, swap deneyimi, güvenlik kontrolleri ve kullanıcı kontrolüne odaklanan sade bir ürün yapısı sunar."
  }
];

function Logo() {
  return (
    <a href="#" className="inline-flex items-center gap-2.5 font-bold tracking-tight text-slate-950">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
        <ShieldCheck className="h-5 w-5" />
      </span>
      <span className="text-[17px]">VirtualWallet</span>
    </a>
  );
}

function PhoneMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "relative mx-auto w-[260px]" : "relative mx-auto w-[292px] sm:w-[320px]"}>
      <div className="absolute -inset-16 -z-10 rounded-full bg-gradient-to-br from-violet-400/25 via-indigo-300/15 to-sky-300/25 blur-3xl" />
      <div className="phone-bezel rounded-[3rem] border-[7px] border-slate-950 bg-slate-950 p-2">
        <div className="relative overflow-hidden rounded-[2.48rem] bg-[#f7f7fb]">
          <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-slate-950" />
          <div className="min-h-[570px] px-5 pb-5 pt-11 text-slate-950">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span className="h-2 w-4 rounded-sm border border-slate-900" />
                <span className="h-2 w-2 rounded-full bg-slate-900" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Main wallet</p>
                <p className="mt-1 text-sm font-bold">VirtualWallet</p>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm">
                <Search className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium text-slate-500">Total balance</p>
              <h3 className="mt-2 text-[32px] font-bold tracking-[-0.04em]">$12,480.42</h3>
              <p className="mt-1 text-xs font-semibold text-emerald-600">+$226.18 today</p>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2">
              {[
                [Send, "Send"],
                [Download, "Receive"],
                [CircleDollarSign, "Buy"],
                [RefreshCw, "Swap"]
              ].map(([Icon, label]) => {
                const I = Icon as typeof Send;
                return (
                  <div key={String(label)} className="flex flex-col items-center gap-2">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
                      <I className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600">{String(label)}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex items-center justify-between">
              <span className="text-sm font-bold">Assets</span>
              <span className="text-[11px] font-semibold text-violet-600">Manage</span>
            </div>

            <div className="mt-2 space-y-1">
              {assets.map((asset) => (
                <div key={asset.symbol} className="flex items-center gap-3 rounded-2xl px-1 py-2.5">
                  <div className={"grid h-10 w-10 place-items-center rounded-full text-[11px] font-bold text-white " + asset.tone}>
                    {asset.symbol.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold">{asset.name}</p>
                    <p className="mt-0.5 text-[10px] text-slate-500">{asset.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{asset.value}</p>
                    <p className="mt-0.5 text-[10px] text-emerald-600">+2.4%</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-around border-t border-slate-200 pt-4 text-slate-400">
              <Wallet className="h-5 w-5 text-violet-600" />
              <TrendingUp className="h-5 w-5" />
              <Globe2 className="h-5 w-5" />
              <Smartphone className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  center = false
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">{eyebrow}</span>
      ) : null}
      <h2 className="mt-3 text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{copy}</p>
      ) : null}
    </div>
  );
}

function ProductTabs() {
  const [active, setActive] = useState<keyof typeof tabData>("Swaps");
  const current = tabData[active];

  return (
    <div className="mt-12 grid gap-7 lg:grid-cols-[0.84fr_1.16fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-soft">
        {(Object.keys(tabData) as Array<keyof typeof tabData>).map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={
              "flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-sm font-semibold transition " +
              (active === tab
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950")
            }
          >
            <span>{tab}</span>
            <ArrowRight className={"h-4 w-4 transition " + (active === tab ? "translate-x-0" : "-translate-x-1 opacity-40")} />
          </button>
        ))}
      </div>

      <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-violet-100 bg-[#f4f1ff] p-7 shadow-soft sm:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 grid h-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          >
            <div>
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-violet-700 shadow-sm">
                {current.label}
              </span>
              <h3 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-slate-950">{current.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{current.description}</p>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">VirtualWallet</p>
                  <p className="mt-1 text-sm font-bold">{current.label}</p>
                </div>
                <Sparkles className="h-5 w-5 text-violet-600" />
              </div>
              <div className={"mt-6 h-32 rounded-2xl bg-gradient-to-br " + current.accent + " p-5 text-white"}>
                <div className="flex h-full items-end gap-2">
                  {[31, 47, 39, 66, 52, 78, 62, 88, 71, 94].map((height, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-full bg-white/45"
                      style={{ height: height + "%" }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["BTC", "ETH", "SOL"].map((item) => (
                  <div key={item} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-semibold text-slate-400">{item}</p>
                    <p className="mt-1 text-xs font-bold">+{item === "BTC" ? "2.4" : item === "ETH" ? "3.1" : "4.7"}%</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="relative mx-auto grid aspect-square max-w-[520px] place-items-center">
      <div className="security-orbit absolute h-[92%] w-[92%] rounded-full" />
      <div className="security-orbit absolute h-[70%] w-[70%] rounded-full" />
      <div className="security-orbit absolute h-[48%] w-[48%] rounded-full" />
      <div className="absolute h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute h-[78%] w-[78%] rounded-full border border-dashed border-violet-300/70"
      />
      <div className="relative grid h-44 w-44 place-items-center rounded-[2.5rem] border border-white/80 bg-white/80 shadow-2xl shadow-violet-500/20 backdrop-blur-xl">
        <div className="grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/30">
          <ShieldCheck className="h-12 w-12" />
        </div>
        <motion.div
          animate={{ y: [-54, 54, -54] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="scan-line absolute left-5 right-5 h-px"
        />
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
      {faqItems.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-lg font-bold tracking-[-0.02em] text-slate-950">{item.q}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0">
                <ChevronDown className="h-5 w-5 text-slate-500" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 text-sm leading-7 text-slate-600 sm:text-base">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="overflow-hidden bg-transparent text-slate-950">
      <div className="border-b border-amber-200/70 bg-amber-50/85 px-4 py-2 text-center text-[11px] font-medium leading-5 text-amber-900 sm:text-xs">
        Cüzdan ve WalletConnect için siteyi HTTPS ile açın. HTTP ortamında tarayıcı eklentilerinden kaynaklanan inpage.js uyarıları görülebilir.
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <WalletConnect compact />
            <a
              href="#download"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white sm:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-100 bg-white sm:hidden"
            >
              <div className="space-y-1 px-5 py-5">
                {nav.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {label}
                  </a>
                ))}
                <div className="grid gap-2 pt-3">
                  <WalletConnect />
                  <a href="#download" className="inline-flex h-12 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                    Download
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <section id="wallet" className="relative soft-grid">
        <div className="absolute left-[10%] top-[18%] h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute right-[8%] top-[24%] h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />

        <div className="relative mx-auto grid min-h-[790px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Self-custody, made simple
            </span>

            <h1 className="mt-7 text-[56px] font-bold leading-[0.95] tracking-[-0.065em] text-slate-950 sm:text-7xl lg:text-[88px]">
              The crypto wallet you control
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              VirtualWallet is a self-custody crypto wallet for iOS, Android, and your browser.
              Keep private keys on your device while you manage assets and explore Web3 across 100+ blockchains.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#download"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
              <WalletConnect />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                ["App Store", "4.7"],
                ["Google Play", "4.6"]
              ].map(([store, score]) => (
                <div key={store} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-white">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{store}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-sm font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {score}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Everything in one place"
          title="Every move in crypto. One app."
          copy="A calm, modern interface for managing assets, discovering networks, reviewing actions, and moving between the tools you use most."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white md:min-h-[390px]">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="relative z-10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <TrendingUp className="h-5 w-5" />
              </span>
              <h3 className="mt-24 text-3xl font-bold tracking-[-0.04em]">Trade across markets</h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
                Swaps, market tools, token discovery, RWAs and more from one consistent interface.
              </p>
            </div>
            <div className="absolute bottom-7 right-7 flex items-end gap-2 opacity-70">
              {[30, 48, 38, 66, 54, 82, 68, 94].map((height, i) => (
                <span key={i} className="w-4 rounded-full bg-violet-400" style={{ height }} />
              ))}
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-[#f3efff] p-8 md:min-h-[390px]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-violet-700 shadow-sm">
              <CircleDollarSign className="h-5 w-5" />
            </span>
            <h3 className="mt-24 text-3xl font-bold tracking-[-0.04em]">Buy crypto with cash</h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
              Compare integrated providers and review rates and fees in one simple flow.
            </p>
            <div className="absolute right-7 top-7 rounded-3xl border border-white/80 bg-white/70 p-5 shadow-xl backdrop-blur">
              <p className="text-[10px] font-semibold text-slate-400">You pay</p>
              <p className="mt-2 text-2xl font-bold">$1,000</p>
              <div className="my-3 h-px bg-slate-100" />
              <p className="text-[10px] font-semibold text-slate-400">You receive</p>
              <p className="mt-2 text-sm font-bold">0.0147 BTC</p>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 md:min-h-[430px]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-700">
              <Lock className="h-5 w-5" />
            </span>
            <h3 className="mt-8 text-3xl font-bold tracking-[-0.04em]">Non-custodial by design</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Your private keys stay on your device. Your assets stay under your control.
            </p>
            <div className="absolute bottom-0 right-0 h-[48%] w-[58%] rounded-tl-[4rem] bg-gradient-to-br from-violet-200 via-indigo-100 to-sky-100">
              <div className="absolute bottom-4 left-1/2 h-28 w-24 -translate-x-1/2 rounded-[2rem] bg-slate-950 shadow-2xl" />
              <div className="absolute bottom-16 left-[42%] h-24 w-16 rotate-[-18deg] rounded-full bg-[#e2b99b]" />
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 md:min-h-[430px]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-700">
              <Smartphone className="h-5 w-5" />
            </span>
            <h3 className="mt-8 text-3xl font-bold tracking-[-0.04em]">No custodial account</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Your wallet lives on your device. No custodial account holds your funds.
            </p>
            <div className="absolute bottom-8 right-7 w-44 rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400">Wallet status</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 text-violet-600" />
                <div>
                  <p className="text-xs font-bold">Self-custody</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">Device controlled</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <ProductTabs />
      </section>

      <section id="security" className="bg-slate-950 py-24 text-white lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Security foundation</span>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Where security isn’t a feature, it’s the foundation.
            </h2>
            <div className="mt-9 space-y-4">
              {[
                "Your private keys stay only on your device.",
                "Only you can access your wallet.",
                "You always approve every transaction."
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-300 sm:text-base">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-violet-500/20 text-violet-300">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <ShieldCheck className="h-5 w-5 text-violet-300" />
                <h3 className="mt-5 text-base font-bold">Security Scanner built-in</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Clear warnings and action review before you continue.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <Layers3 className="h-5 w-5 text-sky-300" />
                <h3 className="mt-5 text-base font-bold">Backups and recovery</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">A recovery-ready product layout designed for multiple devices.</p>
              </div>
            </div>
          </div>

          <SecurityVisual />
        </div>
      </section>

      <section id="markets" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Networks"
          title="100+ blockchains integrated"
          copy="One consistent wallet surface across major networks, with room to expand as new ecosystems grow."
          center
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {networks.map(({ name, short, icon: Icon, tone }) => (
            <div key={name} className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className={"mx-auto grid h-12 w-12 place-items-center rounded-full " + tone}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-xs font-bold text-slate-950">{short}</p>
              <p className="mt-1 truncate text-[10px] text-slate-400">{name}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f4f1ff] p-7">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-violet-700 shadow-sm">
                <Coins className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold text-violet-700">Staking</span>
            </div>
            <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em]">Earn by holding crypto</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">A clear dashboard for supported staking and reward information.</p>
            <div className="mt-8 rounded-3xl bg-white p-5 shadow-lg">
              <p className="text-[10px] font-semibold text-slate-400">Estimated rewards</p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold">4.8%</span>
                <span className="text-xs font-bold text-emerald-600">APY</span>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                <TrendingUp className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold text-violet-300">Markets</span>
            </div>
            <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em]">80+ market pairs</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">Track price action and watchlists with a compact mobile-first chart view.</p>
            <div className="mt-8 flex h-28 items-end gap-1.5">
              {[30, 46, 38, 60, 54, 68, 58, 76, 69, 88, 77, 94].map((height, i) => (
                <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-violet-700 to-violet-400" style={{ height: height + "%" }} />
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-600">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold text-rose-600">Trending</span>
            </div>
            <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em]">Trade what is trending</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">A visual discovery grid for tokens getting attention across supported networks.</p>
            <div className="mt-7 grid grid-cols-4 gap-2">
              {["MOON", "DOG", "PEPE", "FROG", "CAT", "MEME", "WAVE", "NOVA"].map((token, i) => (
                <div
                  key={token}
                  className="grid aspect-square place-items-center rounded-2xl bg-gradient-to-br from-slate-50 to-violet-50 text-[9px] font-black text-slate-700"
                >
                  {token.slice(0, 2)}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="download" className="px-5 py-16 sm:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-700 via-indigo-700 to-slate-950 px-6 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
          <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">Download</span>
              <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                Your wallet, wherever you go.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-violet-100/80 sm:text-base">
                Use the same familiar experience on mobile and browser, with your wallet connection always under your control.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["iOS", "Android", "Browser extension"].map((item) => (
                  <a key={item} href="#" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5">
                    <Download className="h-4 w-4" />
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <PhoneMockup compact />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." center />
        <FAQ />
      </section>

      <footer id="about" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(5,1fr)]">
            <div>
              <Logo />
              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
                A modern self-custody wallet interface built around clarity, control, and multi-network access.
              </p>
              <div className="mt-5 flex gap-2">
                <a href="#" aria-label="X" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 hover:text-slate-950">
                  <X className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 hover:text-slate-950">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            {[
              ["Cüzdan", ["Mobil Uygulama", "Tarayıcı Uzantısı"]],
              ["Piyasalar", ["Fiyatlar", "Dönüştürücü"]],
              ["Özellikler", ["Takaslar", "Staking", "NFT’ler", "Güvenlik", "Kripto Al", "RWA’lar", "Perps"]],
              ["Geliştir", ["Geliştirici Belgeleri", "Wallet Core", "DApp Gönder", "Varlık Listele", "VirtualWallet Agent Kit"]],
              ["Hakkında", ["Hakkımızda", "Kariyer", "Basın Kiti", "Blog", "Sözlük", "İletişim"]]
            ].map(([title, links]) => (
              <div key={String(title)} id={title === "Geliştir" ? "developers" : undefined}>
                <p className="text-sm font-bold text-slate-950">{String(title)}</p>
                <div className="mt-4 space-y-3">
                  {(links as string[]).map((link) => (
                    <a key={link} href="#" className="block text-xs leading-5 text-slate-500 transition hover:text-slate-950">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-slate-200 pt-9">
            <div>
              <p className="text-sm font-bold text-slate-950">Cüzdanlar</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {["Bitcoin Wallet", "USDT Wallet", "TRON Wallet", "XRP Wallet", "TON Wallet", "Litecoin Wallet", "BEP20 Wallet"].map((item) => (
                  <a key={item} href="#" className="text-xs text-slate-500 hover:text-slate-950">{item}</a>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-5 border-t border-slate-100 pt-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-4">
                <span>© VirtualWallet 2026</span>
                <a href="#">Gizlilik Bildirimi</a>
                <a href="#">Hizmet Koşulları</a>
                <a href="#">Çerez Bildirimi</a>
              </div>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center self-start rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-1 sm:self-auto"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
