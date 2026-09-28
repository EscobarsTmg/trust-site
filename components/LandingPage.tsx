"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUp, CircleDollarSign, Globe, Headphones, Lock, Menu, Monitor, RefreshCw, ShieldCheck, Smartphone, Sparkles, TrendingUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import WalletConnect, { WalletProvider } from "./WalletConnect";

function Mark() {
  return <svg className="brand-mark" viewBox="0 0 32 36" aria-hidden="true"><path fill="#3434ff" d="M16 1 29 5v11c0 9-7 16-13 19C10 32 3 25 3 16V5Z"/><path fill="#527bff" d="M16 1v34C10 32 3 25 3 16V5Z"/><path fill="#23baff" d="m16 16 13-11v11c0 9-7 16-13 19Z" opacity=".7"/><path d="m10 13 6 11 6-11" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
const imageDimensions: Record<string, [number, number]> = { "hero-phone": [306,405], "person-rooftop": [368,200], "person-relaxed": [368,200], "swap-phone": [368,328], "security-people": [368,304], "why-people": [368,166], chains: [326,214], earn: [325,220], perps: [338,204], memes: [326,113], "cta-phone": [255,314] };
function Picture({ name, alt, className, priority = false }: { name: string; alt: string; className?: string; priority?: boolean }) {
  const [width,height] = imageDimensions[name];
  return <Image src={`/images/virtualwallet/${name}.png`} alt={alt} width={width} height={height} sizes="(max-width: 760px) 94vw, 600px" className={className} priority={priority} />;
}
const nav = [["Cüzdan", "#wallet"], ["Piyasalar", "#assets"], ["Özellikler", "#features"], ["Geliştir", "#developers"], ["Hakkında", "#why"]];
const products = [
  { name: "Takas", icon: RefreshCw, image: "swap-phone", copy: "Tek arayüzde ağlar ve varlıklar arasında takas deneyimini keşfedin." },
  { name: "Perps", icon: TrendingUp, image: "perps", copy: "Piyasa grafiklerini ve işlem çifti görünümünü inceleyin." },
  { name: "Mem Koşusu", icon: Sparkles, image: "memes", copy: "Popüler tokenlerin görsel keşif ekranı." },
  { name: "Alış ve Satış", icon: CircleDollarSign, image: "earn", copy: "Kripto alım ve satım deneyiminin arayüz önizlemesi." },
  { name: "DApp’leri keşfedin", icon: Globe, image: "chains", copy: "Blockchain ekosistemlerini tek bir yerde keşfedin." }
];
const securityTitles = ["Anahtarlarınız. Kriptonuz.", "Yerleşik Güvenlik Tarayıcısı", "Yedekleme ve çoklu cihaz kurtarma"];
const securityCopy = [
  ["Özel anahtarlarınızı veya kurtarma kelimelerinizi istemeyiz.", "Cüzdan bağlantısını siz başlatırsınız.", "Bu arayüz işlem veya imza isteği göndermez."],
  ["Bağlantı öncesinde ziyaret ettiğiniz adresi kontrol edin.", "Harcama izni ve transfer işlevleri bu projede bulunmaz.", "Güvenlik tarayıcısı bölümü bir tasarım önizlemesidir."],
  ["Kurtarma bilgilerinizi yalnızca kendi cüzdanınızda yönetin.", "Bu site yedek veya özel anahtar saklamaz.", "Bağlantıyı istediğiniz zaman sonlandırabilirsiniz."]
];
const questions = [
  ["VirtualWallet nedir?", "Bu proje, çoklu ağ cüzdan deneyimini gösteren bağımsız bir arayüz önizlemesidir. Trust Wallet ile bağlantılı değildir. Görsellerdeki bakiyeler ve ürün özellikleri örnek içeriktir."],
  ["VirtualWallet güvenli midir?", "Bu sürüm yalnızca cüzdan bağlantısı ve adres görüntüleme içerir. Özel anahtar, kurtarma kelimesi, işlem imzası veya token harcama izni istemez."],
  ["Kripto cüzdanı nasıl edinebilirim?", "Seçtiğiniz cüzdanın resmi sitesini kullanın. Bu önizlemenin yayımlanmış bir mobil uygulaması veya tarayıcı uzantısı yoktur."],
  ["VirtualWallet ücretsiz mi?", "Bu arayüz önizlemesini kullanmak ücretsizdir ve burada zincir üzerinde işlem yapılmaz."],
  ["VirtualWallet kaç blockchain destekler?", "100+ ağ bölümü referans tasarımın tanıtım alanıdır. Bu projenin mevcut bağlantı bileşeni TRON cüzdan adresi görüntüler; diğer ağlar henüz entegre değildir."],
  ["VirtualWallet ile diğer cüzdanlar arasındaki fark nedir?", "Bu proje tam bir cüzdan uygulaması değildir. Varlık tutmaz, takas yapmaz veya stake etmez; arayüzü incelemek için hazırlanmıştır."]
];
const featureCards = [
  { icon: TrendingUp, title: "Piyasalar arası alım-satım", copy: "Takaslar, uzun vadeli işlemler, tahmin piyasaları, RWA’lar ve daha fazlası; tek bir arayüzden." },
  { icon: CircleDollarSign, title: "Nakit parayla kripto alın", copy: "Fonları bir borsa hesabına aktarmadan, entegre üçüncü taraf sağlayıcılar aracılığıyla uygulama içinde kripto alıp satın." },
  { icon: Lock, title: "Emanete dayalı olmayan", copy: "Özel anahtarlarınız hiçbir zaman cihazınızdan çıkmaz. Varlıklarınız, onları tam olarak bıraktığınız yerde durur." },
  { icon: Smartphone, title: "Emanete dayalı hesap yok", copy: "Cüzdanınız cihazınızda bulunur. Fonlarınızı hiçbir emanet hesabı tutmaz." }
];
const footerColumns: { title: string; links: string[][] }[] = [
  { title: "Cüzdan", links: [["Mobil Uygulama", "#download"],["Tarayıcı Uzantısı", "#download"]] },
  { title: "Piyasalar", links: [["Fiyatlar", "#assets"],["Dönüştürücü", "#swap"]] },
  { title: "Özellikler", links: [["Takaslar", "#swap"],["Staking", "#assets"],["NFT’ler", "#assets"],["Güvenlik", "#security"],["Kripto Al", "#features"],["RWA’lar", "#assets"],["Perps", "#assets"]] },
  { title: "Geliştir", links: [["Geliştirici Belgeleri", "info"],["Wallet Core", "info"],["DApp Gönder", "info"],["Varlık Listele", "info"],["VirtualWallet Agent Kit", "info"]] },
  { title: "Hakkında", links: [["Hakkımızda", "#why"],["Kariyer", "info"],["Basın Kiti", "info"],["Blog", "#faq"],["Sözlük", "#faq"],["İletişim", "info"]] }
];

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [security, setSecurity] = useState(0);
  const [product, setProduct] = useState(0);
  const [faq, setFaq] = useState<number | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const header = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(false); };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setMenu(false); };
    document.addEventListener("keydown", close); document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [menu]);
  const openInfo = (title: string) => { setDialogTitle(title); dialog.current?.showModal(); };
  const download = () => openInfo("VirtualWallet uygulaması");
  const feature = (item: typeof featureCards[number]) => <article className="feature-card" key={item.title}><item.icon className="line-icon" aria-hidden="true"/><h3>{item.title}</h3><p>{item.copy}</p></article>;

  return <WalletProvider><div className="page-shell">
    <a className="skip-link" href="#wallet">İçeriğe geç</a>
    <div className="env-banner">Bağımsız arayüz önizlemesi · Trust Wallet ile bağlantılı değildir. Görseller örnektir; cüzdan bağlantısı yalnızca adres görüntüler.</div>
    <header className="site-header" id="top" ref={header}>
      <a href="#top" className="brand" aria-label="VirtualWallet ana sayfa"><Mark/><span>VirtualWallet</span></a>
      <nav className="desktop-nav" aria-label="Ana menü">{nav.map(([label,href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><WalletConnect compact/><button className="download-chip desktop-download" onClick={download}>İndir</button><button className="menu-button" aria-label={menu ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X size={23}/> : <Menu size={23}/>}</button></div>
      {menu && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobil menü">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}<button onClick={() => { setMenu(false); download(); }}>İndir</button></nav>}
    </header>
    <main>
      <section id="wallet" className="hero surface-card"><div className="hero-copy"><p className="eyebrow">VIRTUALWALLET</p><h1>Kontrol ettiğiniz<br/>kripto cüzdanı</h1><p>VirtualWallet; iOS, Android ve tarayıcınız için varlıkların kontrolünü kendinizde tutma deneyimi. Çoklu ağ, takas ve Web3 özelliklerini bu arayüz önizlemesinde keşfedin.</p><div className="hero-actions"><button className="primary-button" onClick={download}>İndir</button><WalletConnect/></div><div className="hero-meta"><ShieldCheck size={16}/> Sizin cüzdanınız. Sizin kontrolünüz.</div></div><div className="hero-art"><Picture name="hero-phone" alt="Örnek cüzdan ekranı" className="hero-phone" priority/></div></section>
      <section id="features" className="section feature-overview"><h2 className="section-title centered">Kriptodaki her hamleniz.<br/>Tek uygulama.</h2><div className="feature-layout"><div className="feature-grid">{featureCards.slice(0,2).map(feature)}</div><Picture name="person-rooftop" alt="Telefonundan cüzdan kullanan kişi" className="wide-photo"/><div className="feature-grid compact-grid">{featureCards.slice(2).map(feature)}</div><Picture name="person-relaxed" alt="Telefonunu kullanan kişi" className="wide-photo"/></div></section>
      <section id="swap" className="section trade-section"><h2 className="section-title">Tek bir cüzdandan alım-satım yapın,<br className="desktop-break"/> satın alın ve keşfedin</h2><div className="trade-layout"><div id="product-preview" role="tabpanel" aria-labelledby={`product-${product}`}><Picture name={products[product].image} alt={`${products[product].name} — arayüz önizlemesi`} className={`swap-visual ${product ? "product-art" : ""}`}/></div><div className="capabilities" role="tablist" aria-label="Ürün önizlemeleri" aria-orientation="vertical">{products.map((item, index) => <button key={item.name} className={`capability ${product === index ? "active" : ""}`} id={`product-${index}`} role="tab" aria-selected={product === index} aria-controls="product-preview" tabIndex={product === index ? 0 : -1} onKeyDown={event => { if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? products.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + products.length) % products.length; setProduct(next); document.getElementById(`product-${next}`)?.focus(); } }} onClick={() => setProduct(index)}><span className="capability-icon"><item.icon size={24}/></span><span><strong>{item.name}</strong>{product === index && <small>{item.copy}</small>}</span></button>)}</div></div></section>
      <section id="security" className="section security-section"><h2 className="statement">Güvenliğin bir özellik değil,<br/>temel olduğu yer.</h2><div className="security-layout"><div><div className="security-index" aria-label="Güvenlik özellikleri">{securityTitles.map((title, index) => <button key={title} className={security === index ? "is-active" : ""} aria-pressed={security === index} aria-controls="security-card" onClick={() => setSecurity(index)}>{title}</button>)}</div><div className="security-card" id="security-card" aria-live="polite"><div className="security-card-title"><span className="status-ring" aria-hidden="true"/><h3>{securityTitles[security]}</h3></div><ul>{securityCopy[security].map(line => <li key={line}>{line}</li>)}</ul></div></div><Picture name="security-people" alt="Cüzdan güvenliği illüstrasyonu" className="wide-photo security-photo"/></div></section>
      <section id="why" className="section why-section"><h2 className="section-title">Neden VirtualWallet’ı seçmelisiniz?</h2><div className="why-layout"><div className="why-grid"><article className="why-card"><Headphones className="line-icon"/><p>İnsan odaklı destek deneyimi</p></article><article className="why-card"><Globe className="line-icon"/><p>DApp’leri ve ekosistemleri keşfedin.</p></article></div><Picture name="why-people" alt="Telefonlarını kullanan kişiler" className="wide-photo"/><div className="why-grid secondary-why"><article className="why-card"><RefreshCw className="line-icon"/><p>Çoklu blockchain deneyimi</p></article><article className="why-card"><ShieldCheck className="line-icon"/><p>Güvenlik Tarayıcısı önizlemesi</p></article></div></div></section>
      <section id="download" className="section download-section"><article className="download-card"><div className="app-icons" aria-hidden="true"><span className="mini-app wallet-mini"><Mark/></span><span className="mini-app store-mini">A</span><span className="mini-app photos-mini">✿</span><span className="mini-app mail-mini">✉</span></div><div className="download-copy"><h3>iOS ve Android’de<br/>mobil deneyim</h3><button className="primary-button" onClick={download}>Uygulamayı indir</button></div></article><article className="download-card browser-download"><div className="download-copy browser-copy"><h3>Tarayıcı uzantısı<br/>deneyimi</h3><button className="primary-button" onClick={() => openInfo("Tarayıcı uzantısı")}>Tarayıcı uzantısını edinin</button></div><div className="browser-art" aria-hidden="true"><span className="browser-pill"/><Globe size={48}/><span className="browser-shield"><Mark/></span><Monitor size={48}/><span className="browser-label">VirtualWallet</span></div></article></section>
      <section id="assets" className="section assets-section"><h2 className="section-title">Tek uygulama.<br/>Milyonlarca varlık.</h2><div className="asset-stack">{[
        ["chains", "100+ blockchain", "Bitcoin, Ethereum, Solana, BNB Smart Chain ve diğer ağlar için çoklu varlık arayüzü."],
        ["earn", "Kripto tutarak kazanın", "Desteklenen varlıklar için staking deneyimi tasarımı. Ödüller değişkendir ve garanti edilmez."],
        ["perps", "80+ uzun vadeli işlem çifti", "Piyasa grafiklerini, varlık çiftlerini ve işlem deneyimini tek bir arayüzde inceleyin."],
        ["memes", "Trend olanları keşfedin", "Kripto piyasasındaki popüler topluluk tokenleri için keşif ekranı."]
      ].map(([name,title,copy]) => <article className="asset-card" key={name}><Picture name={name} alt={title}/><div className="asset-copy"><h3>{title}</h3><p>{copy}</p><span className="preview-caption">Ürün tasarımı önizlemesi</span></div></article>)}</div></section>
      <section id="faq" className="section faq-section"><h2 className="section-title">Sorularınız mı var?</h2><div className="faq-list">{questions.map(([question,answer],index) => <div className="faq-item" key={index}><h3><button id={`question-${index}`} aria-expanded={faq === index} aria-controls={`answer-${index}`} onClick={() => setFaq(faq === index ? null : index)}>{question}<span aria-hidden="true">{faq === index ? "−" : "+"}</span></button></h3><AnimatePresence initial={false}>{faq === index && <motion.div id={`answer-${index}`} role="region" aria-labelledby={`question-${index}`} initial={{height:0, opacity:0}} animate={{height:"auto", opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reducedMotion ? 0 : .2}} className="faq-answer"><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></section>
      <section className="section final-cta"><div className="cta-copy"><h2>Kontrol ettiğiniz<br/>kripto cüzdanı</h2><p>Kontrolü ele alın.<br/>Deneyimi keşfedin.</p><button className="cta-white" onClick={download}>İndir</button><div className="ratings"><span>iOS · Android</span><span>Arayüz önizlemesi</span></div></div><Picture name="cta-phone" alt="Mobil uygulama örnek ekranı"/></section>
    </main>
    <footer className="site-footer" id="about"><a className="brand footer-brand" href="#top"><Mark/><span>VirtualWallet</span></a><div className="footer-columns">{footerColumns.map(({title,links}) => <div key={title} id={title === "Geliştir" ? "developers" : undefined}><h3>{title}</h3>{links.map(([label,href]) => href === "info" ? <button className="footer-link" key={label} onClick={() => openInfo(label)}>{label}</button> : <a key={label} href={href}>{label}</a>)}</div>)}<div className="wallet-links"><h3>Cüzdanlar</h3>{["Bitcoin","USDT","TRON","XRP","TON","Litecoin","BEP20"].map(name => <a href="#assets" key={name}>{name} Wallet</a>)}</div></div><div className="social-row">{["Telegram","Facebook","X"].map(name => <button key={name} aria-label={name} onClick={() => openInfo(name)}>{name === "Telegram" ? <ArrowRight size={18}/> : name === "Facebook" ? "f" : "𝕏"}</button>)}</div><div className="legal"><span>© VirtualWallet 2026</span>{["Gizlilik Bildirimi","Hizmet Koşulları","Çerez Bildirimi"].map(label => <button key={label} onClick={() => openInfo(label)}>{label}</button>)}</div></footer>
    <button className={`back-to-top ${showTop ? "is-visible" : ""}`} tabIndex={showTop ? 0 : -1} aria-label="Başa dön" onClick={() => { window.scrollTo({top:0, behavior:reducedMotion ? "instant" : "smooth"}); document.querySelector<HTMLAnchorElement>(".brand")?.focus({preventScroll:true}); }}><ArrowUp size={20}/></button>
    <dialog ref={dialog} className="download-dialog" aria-labelledby="dialog-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><button className="dialog-close" aria-label="Kapat" onClick={() => dialog.current?.close()}>×</button><span className="dialog-shield"><Mark/></span><h2 id="dialog-title">{dialogTitle}</h2><p>Bu bölüm arayüz önizlemesidir. Yayımlanmış bir uygulama, hizmet veya resmi bağlantı henüz eklenmedi.</p><button className="primary-button" onClick={() => dialog.current?.close()}>Tamam</button></dialog>
  </div></WalletProvider>;
}
