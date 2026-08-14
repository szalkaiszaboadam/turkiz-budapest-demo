"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, Variants, useSpring, useMotionValue } from "framer-motion";

// --- ADATOK ---
const DISHES = [
  { name: "TÜRKIZ Mix Grill", desc: "Faszénen sült válogatás, autentikus fűszerezésű bárány- és borjúhúsokkal.", img: "/turkiz4.jpg" },
  { name: "Meze Válogatás", desc: "Klasszikus hideg mezzék: selymes humusz, muhammara, és haydari.", img: "/turkiz2.jpg" },
  { name: "Adana Kebab", desc: "Klasszikus fűszeres bárány- és borjúdarálthús nyárson.", img: "/uj_turkiz2.jpg" },
  { name: "Iskender Kebab", desc: "Fűszeres bárányhús vékony pitán, gazdag paradicsomszósszal és olvasztott vajjal.", img: "/uj_turkiz4.jpg" },
  { name: "Manti", desc: "Anatóliai húsos táskák, fokhagymás joghurttal és fűszeres vajjal nyakon öntve.", img: "/uj_turkiz1.jpg" },
  { name: "Török Kávé & Lokum", desc: "Hagyományos rézdzsezvában főzött kávé, friss pisztáciás lokummal tálalva.", img: "/turkiz1.jpg" },
  { name: "Kézműves Baklava", desc: "Házi készítésű ropogós pisztáciás baklava, eredeti maras fagylalttal.", img: "/turkiz3.jpg" }
];

const MENU_TABS = ["Mezzék", "Főételek", "Desszertek"];

const MENU_CATEGORIES = [
  [
    { name: "Hummusz Kavurma", desc: "Selymes csicseriborsó püré pirított fűszeres bárányhússal, fenyőmaggal", price: "4 200 Ft", img: "/turkiz1.jpg" },
    { name: "Muhammara", desc: "Dióval és gránátalmasziruppal gazdagított pikáns sültpaprika-krém", price: "3 500 Ft", img: "/turkiz2.jpg" },
    { name: "Haydari", desc: "Sűrű fokhagymás joghurt friss kaporral és mentával", price: "3 200 Ft", img: "/uj_turkiz1.jpg" },
    { name: "Babagannus", desc: "Füstölt padlizsánkrém tahinivel és olívaolajjal", price: "3 600 Ft", img: "/uj_turkiz2.jpg" }
  ],
  [
    { name: "Adana Kebab", desc: "Faszénen sült, klasszikus fűszeres bárány- és borjúdarálthús nyárson", price: "7 900 Ft", img: "/turkiz4.jpg" },
    { name: "Kuzu Sis", desc: "Pácolt, faszénen sült bárányhús kockák, bulgurral és grillezett zöldségekkel", price: "8 500 Ft", img: "/uj_turkiz4.jpg" },
    { name: "Tavuk Sis", desc: "Fűszeres joghurtban pácolt csirkemell nyárs", price: "6 500 Ft", img: "/vendeg1.jpg" },
    { name: "Türkiz Mix Grill", desc: "Hatalmas hústál 2 főre: Adana, bárány és csirke nyársak, bárányborda", price: "18 900 Ft", img: "/turkiz3.jpg" }
  ],
  [
    { name: "Türkiz Baklava", desc: "Házi készítésű ropogós pisztáciás baklava, eredeti maras fagylalttal", price: "3 800 Ft", img: "/vendeg2.jpg" },
    { name: "Sütlaç", desc: "Hagyományos kemencében sült török rizspuding", price: "3 200 Ft", img: "/vendeg3.jpg" },
    { name: "Künefe", desc: "Édes sajtos desszert ropogós kadayif tésztában, pisztáciával", price: "3 500 Ft", img: "/vendeg4.jpg" }
  ]
];

const REVIEWS = [
  { name: "Kovács Péter", title: "Gasztronómiai Utazó", text: "Fantasztikus ízek, mintha újra Isztambulban lennék! A báránykebab omlós, a kiszolgálás pedig kompromisszummentesen figyelmes és kifogástalan." },
  { name: "Nagy Anna", title: "Helyi Ínyenc", text: "Gyönyörű enteriőr, páratlan hangulat és a pisztáciás baklava egyszerűen zseniális. Minden részletében prémium élményt nyújtanak." },
  { name: "Tóth Gábor", title: "Üzleti Vendég", text: "Tökéletes és elegáns helyszín volt az évfordulónkhoz. A meze tál válogatása és a borkínálat felülmúlta a várakozásainkat." },
  { name: "Szabó Éva", title: "Törzsvendég", text: "Minden apró részletre kényesen odafigyelnek: az autentikus fűszerektől kezdve a vendéglátás melegségéig. A város legjobbja." },
  { name: "Varga Bence", title: "Gasztronómiai Blog", text: "Budapest legjobb török étterme, modern és tradicionális harmóniában. Az Adana kebab kötelező mindenkinek!" }
];

const OPENING_DAYS = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];

// --- VIP KÉPEK PONTOSAN 7 DARAB ---
const VIP_IMAGES = [1, 2, 3, 4, 5, 6, 7];

// --- PONTOSAN IGAZÍTOTT MORFÓZIS LOGÓ KOMPONENS ---
const TurkizLogo = ({ isWhite = false, isScrolled = false }: { isWhite?: boolean; isScrolled?: boolean }) => {
  const textColor = isWhite ? "#ffffff" : "#2C3E50";
  const iconColor = "#62B6C7";

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      <svg 
        viewBox="0 0 190.58 260.84" 
        className="w-full h-full transition-all duration-700 ease-[0.22,1,0.36,1] overflow-visible"
        style={{
          transform: isScrolled 
            ? "translateY(22%) scale(1.45)" 
            : "translateY(0%) scale(1)",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="transition-colors duration-700 ease-out">
          <path fill={iconColor} d="M75.71,156.35V136.84L95.4,118.05l19.68,18.79v19.51l-19.69,8Zm-39-15.69L28.52,122,43,108.6H70.81v26.32L56.48,148.6Zm39-32.06h8.9l6.61,6.84L75.71,130.25Zm23.86,6.84,6.61-6.85h8.9v21.66ZM120,134.92V108.59h27.77L162.27,122l-8.17,18.64-19.79,7.94ZM64.08,89.14l6.73,5.69v9.11H48.07ZM120,94.83l6.73-5.69,16,14.8H120Zm0-20.23V65.5h22.72l-16,14.8Zm9,10.1L149.7,65.5h19.83l9.09,19.26-9.05,19.18H149.74Zm-116.8,0L21.19,65.5H41l20.8,19.24-20.76,19.2H21.22ZM48,65.5H70.77v9.1L64,80.3ZM75.71,92.74l-9.51-8,9.47-8V65.5h11l8.64-8.93L104,65.5h11.06V76.69l9.5,8-9.47,8v11.2H104l-8.64,8.93-8.63-8.93H75.71Zm0-53.55L91.18,54l-6.61,6.84h-8.9ZM99.53,54l15.52-14.81V60.84h-8.9Zm-71-6.58,8.12-18.13,19.86-8.43,14.3,13.65V60.84H43ZM120,34.51l14.32-13.67,19.8,7.94,8.16,18.63L147.71,60.84H120ZM75.67,32.59V13.08l19.69-8,19.69,8V32.59L95.36,51.38ZM95.35,0l-7.3,3L70.77,10v17.9L57.56,15.3,39.43,23l-6.58,2.79L23,48.83l13,12H18l-1.76,3.73h0l0,.06L10,77.74l0-.06-3.21,7,3.31,7.07,7.93,16.81H36l-13,12,9.87,23.63L57.76,154l13.05-12.46v17.59l24.58,9.68L120,159.11V141.52L133,154l24.83-9.77,2.8-6.18-.12.05,7.53-17.19-13.3-12.3h18l7.93-16.8L184,84.88l-5.6-12-5.68-12h-18l13.19-12.2-10.1-23.42-6.44-2.58-18.24-7.32L120,27.91V10L102.44,2.89Z" />
          <rect fill={textColor} x="49.57" y="39.53" width="10.16" height="10.16" className="transition-colors duration-700" />
          <rect fill={textColor} x="131.71" y="39.53" width="10.16" height="10.16" className="transition-colors duration-700" />
          <rect fill={textColor} x="49.57" y="119.74" width="10.16" height="10.16" className="transition-colors duration-700" />
          <rect fill={textColor} x="131.71" y="119.74" width="10.16" height="10.16" className="transition-colors duration-700" />
          <rect fill={textColor} x="32.85" y="79.64" width="10.16" height="10.16" transform="translate(-48.79 51.63) rotate(-45)" className="transition-colors duration-700" />
          <rect fill={textColor} x="148.06" y="79.64" width="10.16" height="10.16" transform="translate(-15.05 133.1) rotate(-45)" className="transition-colors duration-700" />
          <rect fill={textColor} x="90.29" y="23.15" width="10.16" height="10.16" transform="translate(7.97 75.7) rotate(-45)" className="transition-colors duration-700" />
          <rect fill={textColor} x="90.29" y="135.55" width="10.16" height="10.16" transform="translate(-71.51 108.63) rotate(-45)" className="transition-colors duration-700" />
        </g>

        <g 
          className="transition-all duration-500 ease-[0.22,1,0.36,1]"
          style={{
            transform: isScrolled ? "translateY(30px)" : "translateY(0px)",
            opacity: isScrolled ? 0 : 1,
            pointerEvents: isScrolled ? "none" : "auto"
          }}
        >
          <text style={{fontSize: "15px", fontFamily: "GillSans, Gill Sans", letterSpacing: "0.21em"}} transform="translate(49 257.38)" fill={textColor} className="transition-colors duration-700">
            <tspan>B</tspan><tspan x="11.64" y="0">U</tspan><tspan x="25.48" y="0">D</tspan><tspan x="39.27" y="0">A</tspan><tspan x="52.41" y="0">P</tspan><tspan x="63.06" y="0">E</tspan><tspan x="73.69" y="0">S</tspan><tspan x="83.64" y="0">T</tspan>
          </text>
          <polygon fill={textColor} points="25.94 199.67 4.97 199.67 3.27 198.01 0 205.19 6.99 201.6 12.65 201.6 12.65 228.19 9.24 231.87 21.66 231.87 18.26 228.19 18.26 201.6 23.97 201.6 30.91 205.19 27.69 198.01 25.94 199.67" className="transition-colors duration-700" />
          <path fill={textColor} d="M46,199.67l-3.4,3.72v13.8q0,12.06,9.93,12.05c3.47,0,6-1,7.57-3.08s2.37-5,2.37-9v-13.8l-3.41-3.72h8.7l-3.41,3.72V217a31.08,31.08,0,0,1-.34,4.87,15.71,15.71,0,0,1-1.27,4.17,9.83,9.83,0,0,1-2.43,3.33,11.46,11.46,0,0,1-4,2.14,18,18,0,0,1-5.66.81,18.25,18.25,0,0,1-5.84-.85,11.13,11.13,0,0,1-4-2.21,10.1,10.1,0,0,1-2.37-3.41,16.56,16.56,0,0,1-1.21-4.14A30.33,30.33,0,0,1,37,217V203.39l-3.4-3.72Z" className="transition-colors duration-700" />
          <path fill={textColor} d="M72.82,199.67H85q13.56,0,13.57,8.6,0,8.41-12.29,8.88l5.8,1.24,6.81,10.16,5.61,3.32H92.27v-3.32l-7.63-11.4H81.83v11l3.41,3.68H72.82l3.4-3.68V203.48ZM85,201.6H81.83v13.66h3.08a9.06,9.06,0,0,0,5.73-1.66,6.09,6.09,0,0,0,2.14-5.15,6.22,6.22,0,0,0-2.12-5.15A8.77,8.77,0,0,0,85,201.6" className="transition-colors duration-700" />
          <polygon fill={textColor} points="110.31 203.39 106.9 199.66 119.32 199.66 115.92 203.39 115.92 213.6 116.75 214.2 128.71 202.61 128.71 199.66 138.46 199.66 130.41 203.44 120.11 213.51 124.8 213.51 134.13 228.41 140.39 231.87 127.05 231.87 127.05 228 118.95 214.66 115.92 217.65 115.92 228.19 119.32 231.87 106.9 231.87 110.31 228.19 110.31 203.39" className="transition-colors duration-700" />
          <polygon fill={textColor} points="156.21 231.87 143.79 231.87 147.2 228.19 147.2 203.39 143.79 199.67 156.21 199.67 152.81 203.39 152.81 228.19 156.21 231.87" className="transition-colors duration-700" />
          <polygon fill={textColor} points="186.48 199.67 187.22 201.14 170.61 229.98 184.46 229.98 190.58 223.54 188.14 233.15 186.62 231.87 164.72 231.87 163.94 230.44 180.55 201.6 168.54 201.6 162.42 208.04 164.86 198.38 166.33 199.67 186.48 199.67" className="transition-colors duration-700" />
          
          <rect fill={textColor} x="55.29" y="187.59" width="5.62" height="5.62" transform="translate(-117.62 96.85) rotate(-45)" className="transition-colors duration-700" />
          <rect fill={textColor} x="43.95" y="187.59" width="5.62" height="5.62" transform="translate(-120.94 88.83) rotate(-45)" className="transition-colors duration-700" />
        </g>
      </svg>
    </div>
  );
};

// --- LUXUS ANIMÁCIÓS GÖRBÉK ---
const fadeUpReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.6 } }
};

// --- CURSOR FOLLOW KOMPONENS A MENÜHÖZ ---
const HoverImageItem = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    if (isHovered) window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, x, y]);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-4 group cursor-pointer relative"
    >
      <div className="flex-1 pr-0 md:pr-6 mb-2 md:mb-0">
        <h3 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-[#62B6C7] transition-colors duration-300">{item.name}</h3>
        <p className="font-sans text-white/60 text-[13px] md:text-[14px] leading-relaxed">{item.desc}</p>
      </div>
      <div className="text-white font-sans font-bold tracking-[0.1em] text-[18px] md:text-[20px] whitespace-nowrap mt-2 md:mt-0">
        {item.price}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.img
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ left: xSpring, top: ySpring, x: "-50%", y: "-50%" }}
            src={item.img}
            alt={item.name}
            className="fixed w-[280px] h-[360px] object-cover z-[9999] pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 hidden md:block"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TurkizLuxury() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);
  
  const [activeDot, setActiveDot] = useState(0);
  const vipScrollRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);

  // HORIZONTAL SCROLL DINAMIKUS MÉRÉSSEL ÉS VAJPUHA "RUGÓVAL"
  const horizontalRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateRange = () => {
      if (carouselRef.current) {
        setScrollRange(carouselRef.current.scrollWidth - window.innerWidth);
      }
    };
    updateRange();
    setTimeout(updateRange, 500); 
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });
  
  // Feszesebb rugó: vajpuha görgetés, de nincs lemaradás a végén
  const smoothHorizontalProgress = useSpring(horizontalProgress, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001
  });
  const horizontalX = useTransform(smoothHorizontalProgress, [0, 1], [0, -scrollRange]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled((prev) => {
      if (latest > 40 && !prev) return true;
      if (latest <= 40 && prev) return false;
      return prev;
    });

    if (typeof window !== "undefined") {
      const heroHeight = window.innerHeight * 0.85; 
      const resSection = document.getElementById("reservation");
      let hideAtBottom = false;
      
      if (resSection) {
        if (latest + window.innerHeight > resSection.offsetTop + 200) {
          hideAtBottom = true;
        }
      }

      const shouldShow = latest > heroHeight && !hideAtBottom;
      setShowStickyBtn((prev) => (prev !== shouldShow ? shouldShow : prev));
    }
  });

  const handleVipScroll = () => {
    if (vipScrollRef.current) {
      const scrollLeft = vipScrollRef.current.scrollLeft;
      const itemWidth = vipScrollRef.current.scrollWidth / VIP_IMAGES.length;
      const dotIndex = Math.round(scrollLeft / itemWidth);
      setActiveDot(Math.min(Math.max(dotIndex, 0), VIP_IMAGES.length - 1));
    }
  };

  const handleDotClick = (index: number) => {
    if (vipScrollRef.current) {
      const itemWidth = vipScrollRef.current.scrollWidth / VIP_IMAGES.length;
      vipScrollRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
      setActiveDot(index);
    }
  };

  // --- PRELOADER ---
  useEffect(() => {
    if (typeof window !== "undefined" && window.history && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="bg-white overflow-x-clip selection:bg-[#2C3E50] selection:text-white font-sans text-[#2C3E50]">
      
      {/* --- STICKY ASZTALFOGLALÁS GOMB (Minimalista beúszás, tökéletes közép) --- */}
      <AnimatePresence>
        {showStickyBtn && (
          <motion.a 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            href="#reservation" 
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#62B6C7] text-white hover:bg-[#2C3E50] transition-colors duration-300 cursor-pointer block shadow-md"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 md:w-6 md:h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </motion.a>
        )}
      </AnimatePresence>

      {/* --- STÍLUSOK (Work Sans + Cormorant) --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Work+Sans:wght@300;400;500;600&display=swap');
        
        body, p, a, button, li, span, div, .font-sans { 
          font-family: 'Work Sans', sans-serif !important; 
          -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4, h5, h6, .font-serif { 
          font-family: 'Cormorant', serif !important;
          font-weight: 600 !important;
          letter-spacing: -0.02em;
        }
        
        html { scroll-behavior: smooth; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- PRELOADER (A logó nem villog, csak finoman elhalványul) --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9998] bg-[#0B131A] flex items-center justify-center"
          >
            <motion.div
              layoutId="main-logo"
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-[120px] h-[160px] md:w-[150px] md:h-[200px] relative pointer-events-none"
            >
              <TurkizLogo isWhite={true} isScrolled={false} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MOBIL MENÜ OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[45] bg-[#0B131A]/95 flex flex-col items-center justify-center"
          >
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center gap-8">
              {[
                { label: "Gasztronómia", href: "#about" },
                { label: "Menü", href: "#menu" },
                { label: "Rendezvények", href: "#events" },
                { label: "Vélemények", href: "#reviews" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  variants={fadeUpReveal}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-white hover:text-[#62B6C7] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ease-[0.22,1,0.36,1] ${isScrolled ? "py-2.5" : "py-6"}`}>
        <div className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-700 ease-out pointer-events-none ${isScrolled ? "opacity-0" : "opacity-100"}`} />
        <div className={`absolute inset-0 bg-white transition-opacity duration-700 ease-out pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"}`} />

        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          <div className="hidden md:flex flex-1 justify-start space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase">
            <a href="#about" className={`transition-colors duration-500 ${isScrolled ? "text-[#2C3E50] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>Gasztronómia</a>
            <a href="#menu" className={`transition-colors duration-500 ${isScrolled ? "text-[#2C3E50] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>Menü</a>
          </div>

          <div className="flex-1 md:hidden"></div>

          <div className={`relative flex-none transition-all duration-700 ease-[0.22,1,0.36,1] cursor-pointer flex items-center justify-center ${isScrolled ? "w-[55px] h-[55px] md:w-[65px] md:h-[65px]" : "w-[90px] h-[120px] md:w-[110px] md:h-[145px]"}`}>
             <motion.div 
               layoutId="main-logo" 
               transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
               className="w-full h-full flex items-center justify-center"
             >
               <TurkizLogo isWhite={!isScrolled || isMobileMenuOpen} isScrolled={isScrolled} />
             </motion.div>
          </div>
          
          <div className="hidden md:flex flex-1 justify-end space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase items-center">
            <a href="#events" className={`transition-colors duration-500 ${isScrolled ? "text-[#2C3E50] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>Rendezvények</a>
            <a href="#reviews" className={`transition-colors duration-500 ${isScrolled ? "text-[#2C3E50] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>Vélemények</a>
          </div>

          <div className="flex-1 flex justify-end md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`font-sans tracking-[0.2em] text-[11px] uppercase z-[100] transition-colors ${isScrolled && !isMobileMenuOpen ? "text-[#2C3E50]" : "text-white"}`}
            >
              {isMobileMenuOpen ? "Bezár" : "Menü"}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[92vh] lg:h-[92vh] w-full flex flex-col justify-center items-center px-4 lg:px-16 overflow-hidden bg-[#0B131A]">
        
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131A] via-black/50 to-black/35 z-10" />
          <motion.img
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: !isLoading ? 1 : 0, scale: !isLoading ? 1.05 : 1.1 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ y: heroBgY }}
            src="/turkiz1.jpg" alt="TÜRKIZ Restaurant" className="w-full h-full object-cover origin-top"
          />
        </div>

        <div className="relative z-20 max-w-[90rem] mx-auto w-full flex flex-col items-center text-center mt-20 md:mt-28 pb-28 lg:pb-16">
          <motion.div 
            initial="hidden" 
            animate={!isLoading ? "visible" : "hidden"} 
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.h1 variants={fadeUpReveal} className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-serif text-white tracking-tight leading-[1] max-w-5xl uppercase px-2 whitespace-pre-line drop-shadow-md">
              A Mediterrán<br/>Ízek Kikötője
            </motion.h1>
            
            <motion.div variants={fadeUpReveal} className="mt-10 md:mt-14">
              <a href="#reservation" className="inline-block bg-[#62B6C7] text-white px-10 py-4 uppercase font-sans tracking-[0.2em] text-[11px] md:text-[12px] font-bold hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                Asztalfoglalás
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 md:bottom-14 left-0 w-full z-20 px-6 lg:px-14">
          <motion.div 
            initial="hidden" 
            animate={!isLoading ? "visible" : "hidden"} 
            variants={staggerContainer}
            className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6"
          >
            <motion.div variants={fadeUpReveal} className="max-w-md text-center md:text-left order-2 md:order-1">
              <p className="text-white/80 font-sans text-[14px] md:text-[16px] leading-relaxed drop-shadow-sm">
                A kultúrák bölcsője által inspirált TÜRKIZ a közösségi étkezés örömét és a friss mediterrán ízvilágot hozza el Budapest belvárosába.
              </p>
            </motion.div>

            <motion.div variants={fadeUpReveal} className="order-1 md:order-2 flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-1 flex-shrink-0 shadow-sm">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                
                <span className="font-serif text-white text-3xl font-bold leading-none">4,7</span>
                <div className="flex gap-1 text-[#FABB05]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>

              <p className="text-white/80 font-sans text-[11px] uppercase tracking-[0.2em] font-medium text-center md:text-right">
                Kiváló Google Értékelések
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 1. SPECIÁLIS FOGÁSAINK - HORIZONTAL SCROLL SZEKCIÓ */}
      {/* ======================================================== */}
      <section ref={horizontalRef} className="relative h-[300vh] bg-white w-full">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          
          <motion.div 
            ref={carouselRef}
            style={{ x: horizontalX, willChange: "transform" }} 
            className="flex items-center gap-8 md:gap-14 px-6 md:px-20 w-max"
          >
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-[80vw] md:w-[32vw] flex flex-col justify-center flex-shrink-0 pr-8"
            >
              <p className="text-[#62B6C7] font-sans text-[12px] uppercase tracking-[0.3em] font-bold mb-4">
                Séfünk ajánlata
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2C3E50] tracking-tight leading-tight uppercase">
                Kivételes <br /> Fogásaink
              </h2>
            </motion.div>

            {DISHES.map((dish, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 * (idx % 3) }}
                className="w-[78vw] sm:w-[50vw] md:w-[360px] lg:w-[400px] flex flex-col group flex-shrink-0 cursor-pointer"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={dish.img} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-2xl font-serif text-[#2C3E50] uppercase tracking-wide group-hover:text-[#62B6C7] transition-colors">{dish.name}</h3>
                  <p className="text-[#577285] font-sans text-sm mt-2 leading-relaxed">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. GASZTRONÓMIA SZEKCIÓ */}
      {/* ======================================================== */}
      <section id="about" className="relative w-full py-28 lg:py-40 bg-white px-6 lg:px-16 flex justify-center border-t-0">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full aspect-[3/4] lg:aspect-square overflow-hidden shadow-2xl">
              <img src="/turkiz2.jpg" alt="Gasztronómia" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
          >
            <p className="text-[#62B6C7] font-sans text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-bold mb-4">
              Gasztronómia
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-serif text-[#2C3E50] tracking-tight leading-[1.2] mb-8 uppercase">
              Egy igazi török konyha, ahol minden érzékedet elvarázsoljuk
            </h2>
            <div className="flex flex-col gap-4 text-[#577285] font-sans text-[14px] md:text-[15px] leading-relaxed max-w-lg mx-auto lg:mx-0 text-left">
              <p>Kóstolja meg Törökország autentikus fogásait Budapest egyik legjobb török éttermében! Fedezze fel a hideg és meleg mezzéket, a különleges leveseket és a jellegzetes török italokat, élénk, aromás ízek gazdag repertoárját. Séfünk kizárólag friss alapanyagokból készíti el az étlap minden fogását, valódi keleti ízorgiát kínálva.</p>
              <p>Legyen szó romantikus vacsoráról, családi ebédről vagy üzleti találkozóról, a TÜRKIZ minden alkalomra kitűnő választás. Enteriőrünk a török kultúra díszes motívumait idézi meg a kék, türkiz és arany színek harmóniájában.</p>
              <p>A TÜRKIZ belvárosi fókuszpont, ahol pezsgés, ragyogás és hangulat várja bent és a teraszon egyaránt. Engedje, hogy magával ragadja!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MENU SZEKCIÓ */}
      <section id="menu" className="relative py-24 lg:py-40 bg-[#1C2A35] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/uj_turkiz1.jpg" alt="Background Texture" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131A] via-black/30 to-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center md:text-center text-left">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col items-start md:items-center w-full">
            
            <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[12px] font-sans tracking-[0.3em] uppercase mb-8">Kínálatunk</motion.h4>
            <motion.h2 variants={fadeUpReveal} className="text-4xl lg:text-5xl font-serif mb-6 text-white">MENÜ</motion.h2>
            <motion.p variants={fadeUpReveal} className="text-white/80 font-sans text-[15px] md:text-[18px] max-w-3xl mx-auto leading-relaxed md:leading-loose mb-12 text-left md:text-center">
              Stílusos török étterem, ahol átélheti Anatólia sokszínűségét és Törökország nosztalgikus ízeit. Hagyományos finomságok generációk óta őrzött receptjei, elegáns, klasszikus török hangulatban.
            </motion.p>
            
            <motion.div variants={fadeUpReveal} className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 w-full">
              {MENU_TABS.map((tab, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveMenuTab(idx)}
                  className={`text-[12px] md:text-[14px] font-sans tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 ${activeMenuTab === idx ? "text-white border-[#62B6C7]" : "text-white/40 border-transparent hover:text-white/80"}`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            <motion.div variants={fadeUpReveal} className="w-full max-w-3xl mx-auto mb-16 text-left min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMenuTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col gap-2 md:gap-4"
                >
                  {MENU_CATEGORIES[activeMenuTab].map((item, idx) => (
                    <HoverImageItem key={idx} item={item} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fadeUpReveal} className="w-full md:w-auto">
               <a href="#" className="inline-block bg-transparent border border-white text-white font-sans tracking-[0.15em] uppercase text-[11px] md:text-[12px] hover:bg-white hover:text-[#2C3E50] transition-colors duration-500 w-full md:w-auto text-center whitespace-nowrap px-10 md:px-14 py-4">
                Teljes Étlap Megtekintése
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- VIP / VENDÉG GALÉRIA --- */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col text-center items-center gap-4 mb-10">
            <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase font-bold">Vendégeink</motion.h4>
            <motion.h2 variants={fadeUpReveal} className="text-4xl font-serif text-[#2C3E50]">Kik jártak nálunk?</motion.h2>
            <motion.p variants={fadeUpReveal} className="text-[#577285] max-w-lg text-[14px] md:text-[15px] font-sans leading-relaxed">
              Büszkék vagyunk rá, hogy a TÜRKIZ élményt az évek során már számos hazai és nemzetközi ismert személyiség is átélte nálunk.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            className="w-full overflow-hidden relative"
          >
            <div 
              ref={vipScrollRef} 
              onScroll={handleVipScroll}
              className="w-full overflow-x-auto hide-scrollbar flex gap-4 md:gap-6 pb-4 snap-x snap-mandatory"
            >
              {VIP_IMAGES.map((item, idx) => (
                <motion.a 
                  variants={fadeUpReveal}
                  href="https://www.instagram.com/turkiz_budapest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx} 
                  className="group w-[calc((100%-16px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] h-[240px] sm:h-[300px] md:h-[380px] flex-shrink-0 snap-start relative overflow-hidden bg-gray-50 block cursor-pointer"
                >
                  {/* Instagram Hover Overlay */}
                  <div className="absolute inset-0 bg-[#0B131A]/0 group-hover:bg-[#0B131A]/40 transition-colors duration-500 z-10 flex items-center justify-center">
                    <div className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out flex flex-col items-center gap-3">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <span className="text-white font-sans text-[10px] tracking-[0.2em] uppercase font-bold">Megtekintés</span>
                    </div>
                  </div>

                  <img 
                    src={`/vendeg${item}.jpg`} 
                    alt={`VIP Guest`} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Letisztult vonalas navigáció a pöttyök helyett */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {VIP_IMAGES.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => handleDotClick(idx)}
                className={`h-[3px] transition-all duration-500 rounded-full ${activeDot === idx ? "bg-[#2C3E50] w-8" : "bg-[#2C3E50]/15 w-3 hover:bg-[#2C3E50]/30"}`}
                aria-label={`Ugrás a ${idx + 1}. vendégre`}
              />
            ))}
          </div>
          
        </div>
      </section>

      {/* RENDEZVÉNYHELYSZÍN */}
      <section id="events" className="py-24 lg:py-40 bg-white overflow-hidden border-t-0">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="w-full lg:w-5/12 flex flex-col items-start text-left">
            <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase mb-4 font-bold">Exkluzivitás</motion.h4>
            <motion.h2 variants={fadeUpReveal} className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C3E50] leading-[1.1] mb-8 uppercase tracking-tight">
              Tökéletes<br/>Helyszín Minden<br/>Alkalomra
            </motion.h2>
            <motion.p variants={fadeUpReveal} className="text-[#577285] leading-relaxed font-sans text-[15px] md:text-[16px] mb-12">
              Üzleti vacsora, évforduló vagy zártkörű esemény? A TÜRKIZ egyedi belső terei, elszeparált termei és személyre szabott vendéglátása garantálják az exkluzív és felejthetetlen élményt minden vendégünk számára.
            </motion.p>
            
            <motion.div variants={fadeUpReveal} className="flex gap-12 border-l-2 border-[#62B6C7] pl-6 mb-12">
              <div>
                <p className="text-4xl font-serif text-[#2C3E50] mb-1">40</p>
                <p className="text-[#577285] text-[10px] uppercase tracking-[0.2em] font-bold">Főig Bővíthető</p>
              </div>
              <div>
                <p className="text-4xl font-serif text-[#2C3E50] mb-1">VIP</p>
                <p className="text-[#577285] text-[10px] uppercase tracking-[0.2em] font-bold">Zártkörű Termek</p>
              </div>
            </motion.div>

            <motion.a variants={fadeUpReveal} href="#reservation" className="inline-block border border-[#2C3E50]/30 text-[#2C3E50] px-10 py-4 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-[#2C3E50] hover:text-white transition-colors duration-500">
              Ajánlatkérés
            </motion.a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-7/12 relative h-[500px] sm:h-[600px] lg:h-[700px]"
          >
            <div className="absolute top-0 right-0 w-[85%] h-[85%] overflow-hidden shadow-2xl">
              <img src="/uj_turkiz1.jpg" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" alt="Rendezvény terem" />
            </div>
            <div className="absolute bottom-0 left-0 w-[55%] h-[60%] overflow-hidden shadow-2xl border-4 border-white">
              <img src="/turkiz2.jpg" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" alt="Privát étkezés" />
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* --- VÉLEMÉNYEK SZEKCIÓ --- */}
      <section id="reviews" className="py-28 lg:py-40 bg-white overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#62B6C7] text-[12px] font-sans tracking-[0.3em] uppercase font-bold mb-4"
          >
            Vendégélmény
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-serif text-[#2C3E50] tracking-tight uppercase"
          >
            Rólunk Mondták
          </motion.h2>
        </div>
        
        <div className="relative w-full overflow-hidden flex items-center py-6">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 38, repeat: Infinity }}
            className="flex w-max gap-8 px-6"
          >
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div 
                key={idx} 
                className="w-[340px] sm:w-[400px] md:w-[450px] bg-[#0B131A] p-8 md:p-10 flex-shrink-0 flex flex-col justify-between group hover:shadow-[0_20px_50px_rgba(98,182,199,0.15)] transition-all duration-500"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1.5 text-[#FABB05] pt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-serif text-5xl text-[#62B6C7]/30 leading-none select-none group-hover:text-[#62B6C7] transition-colors">“</span>
                  </div>

                  <p className="text-white/90 font-sans text-[14px] md:text-[15.5px] leading-relaxed mb-8 font-normal">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-col">
                  <h4 className="text-white font-serif text-xl font-bold tracking-tight">{review.name}</h4>
                  <p className="text-[#62B6C7] font-sans text-[11px] uppercase tracking-[0.2em] font-bold mt-1.5">{review.title}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SÖTÉT WRAPPER (CTA + TESTVÉRÉTTEREM + LÁBLÉC) */}
      <div className="w-full bg-[#0B131A] text-white flex flex-col">

        {/* ASZTALFOGLALÁS */}
        <section id="reservation" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24">
          <div className="w-full max-w-[90rem] mx-auto px-6 lg:px-12 text-white">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpReveal} className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
              <div className="flex-1">
                <h4 className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase mb-4 md:mb-6">Kapcsolat</h4>
                <h2 className="text-4xl lg:text-5xl font-serif mb-6 md:mb-8">Várjuk Szeretettel</h2>
                <p className="text-white/80 font-sans text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-2xl text-left">
                  Budapest belvárosának nevezetes háromszögében a Kossuth Lajos tér szomszédságában található a TÜRKIZ étterem.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[13px] md:text-[14px] font-sans text-white/90">
                  <div className="text-left">
                    <p className="text-[#62B6C7] mb-2 font-semibold tracking-wider text-[10px] md:text-[11px] uppercase">Címünk</p>
                    <p className="mb-1">Elite Meat House (Türkiz Restaurant)</p>
                    <p>1051 BUDAPEST Nádor u. 36</p>
                  </div>
                  <div className="text-left">
                    <p className="text-[#62B6C7] mb-2 font-semibold tracking-wider text-[10px] md:text-[11px] uppercase">Elérhetőség</p>
                    <p className="mb-1">+36 70 366 7666</p>
                    <p>reservation@turkizrestaurant.com</p>
                    
                    <div className="flex gap-4 mt-4 text-white/60">
                      <a href="https://www.facebook.com/Turkizbudapest/" className="hover:text-white transition-colors" aria-label="Facebook">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/turkiz_budapest/" className="hover:text-white transition-colors" aria-label="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-12">
                  <a href="https://reservours.com/turkizbudapest/tablereservation?source=website" className="flex items-center justify-center px-8 py-4 bg-white text-[#2C3E50] hover:bg-[#62B6C7] hover:text-white transition-colors duration-300 w-full sm:w-auto text-center font-bold whitespace-nowrap font-sans text-[11px] tracking-[0.15em] uppercase">
                    Asztalfoglalás
                  </a>
                  <a href="https://goo.gl/maps/82ENcK2az5Rv4q4S8" className="flex items-center justify-center px-8 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-[#2C3E50] transition-colors duration-300 w-full sm:w-auto text-center whitespace-nowrap font-sans text-[11px] tracking-[0.15em] uppercase">
                    Navigáció
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-[350px] flex-shrink-0 mt-8 lg:mt-0">
                <h4 className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase mb-6 md:mb-8 text-left">Nyitvatartás</h4>
                <ul className="space-y-4 md:space-y-3 text-[15px] md:text-[16px] font-sans text-white/90">
                  {OPENING_DAYS.map((day, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{day}</span>
                      <span>12:00 - 0:00</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- TESTVÉRÉTTEREM SZEKCIÓ --- */}
        <section className="relative z-10 py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/rose1.jpg" alt="Rose Restaurant" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B131A] via-black/40 to-[#0B131A]"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} 
               whileInView={{ opacity: 1, scale: 1 }} 
               transition={{ duration: 1 }} 
               className="mb-8 max-w-[150px] md:max-w-[180px]"
             >
               <img src="/rose-logo-logo-2.png" alt="Rose" className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]" />
             </motion.div>

             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1, delay: 0.2 }} 
               className="text-white/80 text-[15px] md:text-[16px] font-sans leading-relaxed max-w-xl mb-10"
             >
               Folytassa az estét különleges signature koktélokkal és modern mezzékkel a Rose-ban.
             </motion.p>

             <motion.a 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1, delay: 0.3 }} 
               href="#" 
               className="inline-flex items-center justify-center px-10 py-4 bg-transparent border border-white/80 text-white hover:bg-white hover:text-[#2C3E50] transition-colors duration-300 uppercase tracking-[0.2em] text-[11px] whitespace-nowrap font-bold"
             >
               Felfedezem a Rose-t
             </motion.a>
          </div>
        </section>

        {/* --- LÁBLÉC --- */}
        <footer className="relative z-10 py-8 lg:py-10">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-4 w-full">
            <div className="flex gap-4 text-[11px] md:text-[12px] font-sans tracking-[0.2em] text-white/70">
              <a href="/hu" className="text-white font-bold underline underline-offset-4 whitespace-nowrap hover:text-white">HU</a>
              <span className="text-white/30">|</span>
              <a href="/en" className="transition-colors whitespace-nowrap hover:text-white">EN</a>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-8 text-[10px] md:text-[11px] font-sans tracking-[0.18em] uppercase text-white/70">
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Impresszum</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Fizetési lehetőségek</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Adatkezelési tájékoztató</a>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 text-[10px] md:text-[11px] font-sans tracking-[0.18em] uppercase text-white/50">
              <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} TÜRKIZ BUDAPEST</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}