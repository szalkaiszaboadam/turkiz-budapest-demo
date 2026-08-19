"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, Variants, useSpring, useMotionValue } from "framer-motion";

// --- ROSE ADATOK ---
const DISHES = [
  { 
    name: "Rose Signature", 
    desc: "A ház ikonikus koktélja prémium ginnel, rózsavízzel és friss málnával.", 
    info: "Lágy, virágos jegyek és frissítő citrusok tökéletes harmóniája. Kézműves rózsavízzel és ehető virágszirmokkal tálalva a tökéletes eleganciáért.",
    img: "/1.jpg" 
  },
  { 
    name: "Smoked Negroni", 
    desc: "Klasszikus Negroni egy csipetnyi füsttel és érlelt fűszerekkel.", 
    info: "A hagyományos receptet tölgyfa füsttel bolondítjuk meg, ami mély, karakteres ízvilágot kölcsönöz az italnak. Igazi ínyenceknek.",
    img: "/2.jpg" 
  },
  { 
    name: "Truffle Labneh", 
    desc: "Szarvasgombás krémsajt pirított pisztáciával és gránátalmával.", 
    info: "Selymesen lágy, házi készítésű labneh, melyet prémium szarvasgomba olajjal, ropogós pisztáciával és friss gránátalmamagokkal teszünk felejthetetlenné.",
    img: "/3.jpg" 
  },
  { 
    name: "Spicy Margarita", 
    desc: "Tequila alapú frissítő egy csipetnyi jalapeño pikánsságával.", 
    info: "A citrusos frissességet és a prémium tequilát egy leheletnyi jalapeño chili teszi izgalmassá. Sós-fűszeres peremmel tálalva.",
    img: "/4.jpg" 
  },
  { 
    name: "Bosphorus Breeze", 
    desc: "Vodka, uborka, menta és bodza – a nyári éjszaka íze.", 
    info: "Könnyed, ropogós és végtelenül frissítő. Az uborka és a menta hűsítő hatását a bodza édeskés virágossága egészíti ki.",
    img: "/5.jpg" 
  },
  { 
    name: "Kacsa Rillette Meze", 
    desc: "Lassan sült kacsahús ropogós pitával és füge lekvárral.", 
    info: "Omlós, fűszeres kacsahús, melyet édes-pikáns füge lekvárral és frissen sült, meleg anatóliai pitával kínálunk megosztásra az italok mellé.",
    img: "/6.jpg" 
  },
  { 
    name: "Espresso Martini", 
    desc: "Sötét, krémes és energikus – prémium vodka és friss espresso.", 
    info: "Az este beindítója. Gondosan kiválasztott, frissen pörkölt kávéból készült espresso, selymes kávélikőr és tiszta vodka tökéletes aránya.",
    img: "/7.jpg" 
  }
];

const MENU_TABS = ["Signature Koktélok", "Modern Mezzék", "Klasszikusok"];

const MENU_CATEGORIES = [
  [
    { name: "Rose Signature", desc: "Prémium gin, kézműves rózsavíz, licsi, friss málna", price: "4 500 Ft", img: "/1.jpg" },
    { name: "Anatolian Sour", desc: "Whiskey, friss citrom, narancsvirág hab, szömörce", price: "4 200 Ft", img: "/2.jpg" },
    { name: "Spicy Pomegranate", desc: "Mezcal, gránátalma szirup, jalapeño, lime", price: "4 600 Ft", img: "/3.jpg" },
    { name: "Smoked Old Fashioned", desc: "Bourbon, angostura, bükkfa füst, narancshéj", price: "4 800 Ft", img: "/4.jpg" }
  ],
  [
    { name: "Truffle Labneh", desc: "Selymes krémsajt, szarvasgomba olaj, pirított pisztácia", price: "3 800 Ft", img: "/5.jpg" },
    { name: "Spicy Muhammara", desc: "Pikáns diós-sültpaprika krém, gránátalma, ropogós pita", price: "3 500 Ft", img: "/6.jpg" },
    { name: "Calamari Ceviche", desc: "Grillezett tintahal, citrusos-korianderes marinád", price: "4 900 Ft", img: "/7.jpg" },
    { name: "Beef Tartare", desc: "Bélszín tatár anatóliai fűszerekkel, fürjtojás", price: "5 200 Ft", img: "/1.jpg" }
  ],
  [
    { name: "Negroni", desc: "Gin, Campari, édes vermut – a klasszikus recept", price: "3 900 Ft", img: "/2.jpg" },
    { name: "Espresso Martini", desc: "Vodka, kávélikőr, friss espresso", price: "4 100 Ft", img: "/3.jpg" },
    { name: "Moscow Mule", desc: "Prémium vodka, gyömbérsör, friss lime", price: "3 800 Ft", img: "/4.jpg" }
  ]
];

const EVENTS = [
  {
    title: "Deep House & Cocktails",
    year: "2026",
    month: "AUG",
    day: "14",
    desc: "Indítsa a hétvégét a város legjobb lemezlovasaival és limitált kiadású nyári koktéljainkkal a pultnál.",
    img: "/turkiz2.jpg"
  },
  {
    title: "Ladies Night",
    year: "2026",
    month: "AUG",
    day: "21",
    desc: "Exkluzív este hölgyeknek. Minden Signature Rose koktél mellé ajándék desszert meze válogatással kedveskedünk.",
    img: "/turkiz1.jpg"
  },
  {
    title: "Guest Bartender: Luigi Rossi",
    year: "2026",
    month: "AUG",
    day: "28",
    desc: "Olaszország egyik legnevesebb mixere érkezik hozzánk egyetlen estére, egyedi itallappal és flair show-val.",
    img: "/turkiz3.jpg"
  },
  {
    title: "End of Summer Party",
    year: "2026",
    month: "SZEP",
    day: "04",
    desc: "Búcsúztassuk együtt a nyarat egy hatalmas bulival, élő DJ szettel és prémium pezsgő kóstolóval.",
    img: "/rose1.jpg"
  }
];

const REVIEWS = [
  { name: "Kovács Péter", title: "Koktél Rajongó", text: "A Rose Signature koktél valami elképesztő! A hangulat utánozhatatlan, a zene pedig pont olyan hangerőn szól, hogy még lehessen beszélgetni." },
  { name: "Nagy Anna", title: "Helyi Ínyenc", text: "A szarvasgombás labneh és egy jó Negroni – ez a tökéletes péntek este receptje. A dizájn egyszerűen lélegzetelállító." },
  { name: "Tóth Gábor", title: "Törzsvendég", text: "Vacsora a Türkizben, utána átültünk a Rose-ba pár italra. Zseniális koncepció, a kiszolgálás pedig itt is kompromisszummentes." },
  { name: "Szabó Éva", title: "Gasztronómiai Utazó", text: "Budapest legjobb koktélbárja! A bartenderek igazi művészek, minden ital egy külön történetet mesél el az éjszakában." },
  { name: "Varga Bence", title: "Éjszakai Élet Blog", text: "Exkluzív, mégis laza. A deep house szettek tökéletesen passzolnak a modern mezzékhez és a füstölt italokhoz." }
];

const OPENING_HOURS = [
  { days: "Hétfő", hours: "Zárva" },
  { days: "Kedd", hours: "Zárva" },
  { days: "Szerda", hours: "Zárva" },
  { days: "Csütörtök", hours: "18:00 – 01:00" },
  { days: "Péntek", hours: "18:00 – 02:00" },
  { days: "Szombat", hours: "18:00 – 02:00" },
  { days: "Vasárnap", hours: "18:00 – 00:00" }
];

const VIP_IMAGES = [
  { id: 1, url: "https://www.instagram.com/rose_budapest/" },
  { id: 2, url: "https://www.instagram.com/rose_budapest/" },
  { id: 3, url: "https://www.instagram.com/rose_budapest/" },
  { id: 4, url: "https://www.instagram.com/rose_budapest/" },
  { id: 5, url: "https://www.instagram.com/rose_budapest/" },
  { id: 6, url: "https://www.instagram.com/rose_budapest/" },
  { id: 7, url: "https://www.instagram.com/rose_budapest/" },
  { id: 8, url: "https://www.instagram.com/rose_budapest/" }
];

// --- PONTOSAN IGAZÍTOTT MORFÓZIS LOGÓ KOMPONENS (TÜRKIZ) ---
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

// --- LUXUS RUGÓS ANIMÁCIÓS GÖRBÉK ---
const fadeUpReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.6 } }
};

const logoTransition = {
  type: "spring" as const, 
  stiffness: 100,
  damping: 25,
  mass: 1,
};

// --- CURSOR FOLLOW KOMPONENS A SÖTÉT MENÜHÖZ ---
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
      className="flex flex-col justify-between items-start py-5 md:py-6 group cursor-pointer relative transition-all duration-500 hover:pl-4"
    >
      <div className="flex justify-between items-start w-full mb-2">
        <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-[#E7918A] transition-colors duration-300 pr-4">{item.name}</h3>
        <div className="text-[#E7918A] font-sans font-bold tracking-[0.1em] text-[16px] md:text-[18px] whitespace-nowrap mt-1">
          {item.price}
        </div>
      </div>
      <p className="font-sans text-white/60 text-[13px] md:text-[14px] leading-relaxed max-w-[90%] transition-colors duration-300 group-hover:text-white/80">{item.desc}</p>

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
            className="fixed w-[280px] h-[360px] object-cover z-[9999] pointer-events-none drop-shadow-[0_30px_60px_rgba(231,145,138,0.15)] hidden md:block rounded-sm"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function RoseLuxury() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);
  
  const [activeEvent, setActiveEvent] = useState(0);

  // --- PARALLAX HOOKS ---
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 1000], ["0%", "15%"]);

  const eventsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: eventsScrollYProgress } = useScroll({
    target: eventsRef,
    offset: ["start end", "end start"]
  });
  const eventsBgY = useTransform(eventsScrollYProgress, [0, 1], ["-10%", "10%"]);

  const turkizRef = useRef<HTMLElement>(null);
  const { scrollYProgress: turkizScrollYProgress } = useScroll({
    target: turkizRef,
    offset: ["start end", "end start"]
  });
  const turkizBgY = useTransform(turkizScrollYProgress, [0, 1], ["-10%", "10%"]);

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

  // --- AUTOMATIKUS ESEMÉNY LÉPTETÉS ---
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % EVENTS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const nextEvent = () => setActiveEvent((prev) => (prev + 1) % EVENTS.length);
  const prevEvent = () => setActiveEvent((prev) => (prev - 1 + EVENTS.length) % EVENTS.length);

  // --- 1. PRELOADER: Inicializálás és felgörgetés ---
  useEffect(() => {
    if (typeof window !== "undefined" && window.history && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // --- 2. PRELOADER: Görgetés JS blokkolás ---
  useEffect(() => {
    if (!isLoading) return;

    const preventDefault = (e: any) => e.preventDefault();
    const preventDefaultForScrollKeys = (e: any) => {
      if (["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventDefaultForScrollKeys, { passive: false });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventDefaultForScrollKeys);
      clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <div className="bg-[#050505] overflow-x-clip selection:bg-white selection:text-[#050505] font-sans text-white">
      
      {/* --- GOLYÓÁLLÓ FONT BEÁLLÍTÁS (Dark Mode) --- */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{__html: `
        html { overflow-y: scroll; scroll-behavior: smooth; background-color: #050505; }
        
        * {
           -webkit-font-smoothing: antialiased;
        }

        /* GLOBÁLIS FONTOK KIKÉNYSZERÍTÉSE */
        body, p, a, button, li, span, div, .font-sans { 
          font-family: 'Work Sans', sans-serif !important; 
        }

        h1, h2, h3, h4, h5, h6, .font-serif { 
          font-family: 'Cormorant', serif !important;
        }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- PRELOADER SÖTÉT HÁTTÉR --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-bg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9997] bg-[#050505]"
          />
        )}
      </AnimatePresence>

      {/* --- PRELOADER KÉPI LOGÓ (Kicsit kisebb arany középút: 300px/150px) --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              layoutId="main-logo-container"
              transition={logoTransition}
              className="w-[220px] h-[110px] md:w-[300px] md:h-[150px]"
            >
              <img src="/rose-logo-logo-2.png" alt="Rose" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STICKY ASZTALFOGLALÁS GOMB (ROSE SZÍN, ÁRNYÉK NÉLKÜL) --- */}
      <AnimatePresence>
        {showStickyBtn && (
          <motion.a 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            href="https://www.sevenrooms.com/explore/rosemezecocktailbar/reservations/create/search/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E7918A] text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer block"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 md:w-6 md:h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </motion.a>
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
            className="fixed inset-0 z-[45] bg-[#050505]/95 flex flex-col items-center justify-center"
          >
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center gap-8">
              {[
                { label: "Koktélok & Mezzék", href: "#about" },
                { label: "Kínálatunk", href: "#menu" },
                { label: "Miért Mi?", href: "#why-us" },
                { label: "Események", href: "#events" },
                { label: "Vélemények", href: "#reviews" },
                { label: "Kapcsolat", href: "#reservation" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  variants={fadeUpReveal}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-white hover:text-[#E7918A] transition-colors uppercase tracking-widest"
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
        <div className={`absolute inset-0 bg-[#050505]/90 backdrop-blur-md transition-opacity duration-700 ease-out pointer-events-none border-b border-white/5 ${isScrolled ? "opacity-100" : "opacity-0"}`} />

        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          <div className="hidden md:flex flex-1 justify-start space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase font-medium">
            <a href="#menu" className="text-white/90 hover:text-[#E7918A] transition-colors duration-500">Kínálatunk</a>
            <a href="#events" className="text-white/90 hover:text-[#E7918A] transition-colors duration-500">Események</a>
          </div>

          <div className="flex-1 md:hidden"></div>

          {/* DINAIMKUS LOGÓ KONTÉNER A NAVBARBAN */}
          <div className={`relative flex-none transition-all duration-700 ease-[0.22,1,0.36,1] cursor-pointer flex items-center justify-center ${isScrolled ? "w-[50px] h-[50px] md:w-[60px] md:h-[60px]" : "w-[220px] h-[110px] md:w-[300px] md:h-[150px]"}`}>
             {!isLoading && (
               <motion.div 
                 layoutId="main-logo-container" 
                 transition={logoTransition}
                 className="relative w-full h-full flex items-center justify-center"
               >
                 <img 
                   src="/rose-logo-logo-2.png" 
                   alt="Rose Full" 
                   className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} 
                 />
                 <img 
                   src="/rose-logo-logo-1.png" 
                   alt="Rose Icon" 
                   className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} 
                 />
               </motion.div>
             )}
          </div>
          
          <div className="hidden md:flex flex-1 justify-end space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase font-medium items-center">
            <a href="#reviews" className="text-white/90 hover:text-[#E7918A] transition-colors duration-500">Vélemények</a>
            <a href="#reservation" className="text-white hover:text-[#E7918A] transition-colors duration-500">Kapcsolat</a>
          </div>

          <div className="flex-1 flex justify-end md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="font-sans tracking-[0.2em] text-[11px] uppercase z-[100] transition-colors text-white"
            >
              {isMobileMenuOpen ? "Bezár" : "Menü"}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen lg:min-h-screen w-full flex flex-col justify-center items-center px-4 lg:px-16 overflow-hidden bg-[#050505]">
        
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent z-10" />
          <motion.img
            initial={{ opacity: 0 }} 
            animate={{ opacity: !isLoading ? 1 : 0 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ y: heroBgY, scale: 1.15 }}
            src="/rose1.jpg" alt="ROSE Cocktail Bar" className="w-full h-full object-cover origin-top"
          />
        </div>

        <div className="relative z-20 max-w-[90rem] mx-auto w-full flex flex-col items-center text-center mt-20 md:mt-28 pb-32 lg:pb-24">
          <motion.div 
            initial="hidden" 
            animate={!isLoading ? "visible" : "hidden"} 
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.h1 variants={fadeUpReveal} className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-serif text-white tracking-tight leading-[1] max-w-5xl px-2 whitespace-pre-line drop-shadow-md uppercase">
              AZ ESTÉK<br/>ÚJ DIMENZIÓJA
            </motion.h1>
            
            {/* DUPLA CTA GOMBOK (NINCS RAGYOGÁS) */}
            <motion.div variants={fadeUpReveal} className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-12 md:mt-16">
              <a 
                href="https://www.sevenrooms.com/explore/rosemezecocktailbar/reservations/create/search/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#E7918A] text-white px-10 py-4 uppercase font-sans tracking-[0.2em] text-[11px] md:text-[12px] font-bold hover:bg-white hover:text-black transition-colors duration-300 min-w-[220px] text-center"
              >
                Asztalfoglalás
              </a>
              <a 
                href="https://qr1.tabpadmenu.com/rosebudapest/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white/50 text-white px-10 py-4 uppercase font-sans tracking-[0.2em] text-[11px] md:text-[12px] font-bold hover:bg-white hover:text-black transition-colors duration-300 min-w-[220px] text-center"
              >
                Itallap Megtekintése
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 md:bottom-14 left-0 w-full z-20 px-6 lg:px-14">
          <motion.div 
            initial="hidden" 
            animate={!isLoading ? "visible" : "hidden"} 
            variants={staggerContainer}
            className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6"
          >
            <motion.div variants={fadeUpReveal} className="max-w-md text-center md:text-left order-2 md:order-1">
              <p className="text-white/80 font-sans text-[14px] md:text-[16px] leading-relaxed drop-shadow-sm">
                Prémium signature koktélok, modern mezzék és utánozhatatlan éjszakai lüktetés a Parlament szomszédságában.
              </p>
            </motion.div>

            {/* GOOGLE ÉRTÉKELÉS (LETISZTULT FADE HOVER) */}
            <motion.a 
               href="https://www.google.com/search?sca_esv=cf5c3a640caff83a&cs=1&sxsrf=APpeQnss4SbUY-3vnl12kc1bF5BFZ16QGw:1787136963955&q=ROSE+SHISHA+%26COCKTAIL+BAR+V%C3%A9lem%C3%A9nyek&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIyNjY3NTUzNrA0NLO0NLM0tzDawMj4ilEtyD_YVSHYwzPYw1FBzdnf2TvE0dNHwckxSCHs8Mqc1NzDK_MqU7MXsRKpEACz4COEawAAAA&rldimm=337556309169969782&tbm=lcl&hl=hu-HU&sa=X&ved=2ahUKEwjG75f_w6yWAxUKSvEDHUliJ6QQ9fQKegQIFRAG&biw=1280&bih=832&dpr=1#" 
               target="_blank" 
               rel="noopener noreferrer" 
               variants={fadeUpReveal} 
               className="order-1 md:order-2 flex flex-col items-center md:items-end gap-1.5 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-white text-[28px] md:text-3xl font-bold leading-none">4,7</span>
                <div className="flex gap-1 text-[#E7918A]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2.5 mt-1">
                 <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center p-[6px] md:p-[7px] flex-shrink-0 shadow-md">
                   <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                   </svg>
                 </div>
                 <p className="text-white/80 font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium text-center md:text-right">
                   300+ Google értékelés
                 </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 1. KÍNÁLATUNK / ÉTLAP - HORIZONTAL SCROLL (DOBOZOK NÉLKÜL) */}
      {/* ======================================================== */}
      <section id="menu" ref={horizontalRef} className="relative h-[300vh] bg-[#050505] w-full">
        {/* LÁGY ROSE GLOW A HÁTTÉRBEN */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(231,145,138,0.03),_transparent_70%)] pointer-events-none" />
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
              className="w-[80vw] md:w-[32vw] flex flex-col justify-center items-start flex-shrink-0 pr-8"
            >
              <motion.h4 className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
                Kínálatunk
              </motion.h4>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight uppercase mb-8">
                SIGNATURE <br /> KOKTÉLOK
              </h2>
              <motion.a 
                 href="https://qr1.tabpadmenu.com/rosebudapest/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-block border border-white/30 text-white px-10 py-4 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-[#E7918A] hover:border-[#E7918A] transition-colors duration-500 w-max"
              >
                Teljes Itallap Megtekintése
              </motion.a>
            </motion.div>

            {DISHES.map((dish, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 * (idx % 3) }}
                className="w-[85vw] sm:w-[50vw] md:w-[450px] lg:w-[550px] flex flex-col group flex-shrink-0 cursor-pointer"
              >
                {/* DOBOZ NÉLKÜLI KÉP */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
                  <img 
                    src={dish.img} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-[#050505]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex flex-col justify-center items-center p-8 backdrop-blur-sm">
                     <p className="text-white/95 text-center font-sans text-[14px] md:text-[15px] leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                       {dish.info}
                     </p>
                  </div>
                </div>
                
                <div className="mt-8 transition-transform duration-500 group-hover:pl-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wide group-hover:text-[#E7918A] transition-colors">{dish.name}</h3>
                  <p className="text-white/50 font-sans text-[14px] md:text-[15px] mt-2 leading-relaxed">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. GASZTRONÓMIA SZEKCIÓ (DARK THEME) */}
      {/* ======================================================== */}
      <section id="about" className="relative w-full py-28 lg:py-40 bg-[#050505] px-6 lg:px-16 flex justify-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full aspect-[3/4] lg:aspect-square overflow-hidden shadow-2xl bg-[#111111] border border-white/5">
              <div className="absolute inset-0 bg-black/10 z-10" />
              <img src="/rose8.jpg" alt="Rose Koktélok" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
          >
            <motion.h4 className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
              Koktélok & Mezzék
            </motion.h4>
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-serif text-white tracking-tight leading-[1.2] mb-8">
              Ahol a prémium italok és a modern anatóliai ízek találkoznak
            </h2>
            <div className="flex flex-col gap-4 text-white/70 font-sans text-[14px] md:text-[15px] leading-relaxed max-w-lg mx-auto lg:mx-0 text-left">
              <p>A ROSE több, mint egy bár – egy élmény, ahol az éjszaka minden érzékét egyszerre szólítjuk meg. Signature koktéljainkat szenvedéllyel és szakértelemmel készítjük, hogy az ízek tökéletes harmóniáját nyújtsák a pohárban.</p>
              <p>Italaink mellé séfünk olyan modern, megosztható mezzéket (kis tányéros fogásokat) álmodott meg, melyek kiegészítik és felerősítik a prémium párlatok karakterét. Laza elegancia, lüktető deep house ritmusok és egy társaság, amellyel az este sosem ér véget.</p>
              <p>A ROSE a tökéletes választás a vacsora utáni levezetéshez, vagy az éjszaka stílusos beindításához a belváros szívében.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ÚJ "MIÉRT MI?" SZEKCIÓ (VONALAK NÉLKÜL, KIFEJEZETTEBB HÁTTÉRREL) --- */}
      <section id="why-us" className="relative py-28 lg:py-40 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            src="/rose4.jpg" 
            alt="Background Texture" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[#050505]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
        </div>

        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="text-center flex flex-col items-center mb-24">
            <motion.h4 variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
              Miért Mi?
            </motion.h4>
            <motion.h2 variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-tight">
              A TÖKÉLETESSÉG RÉSZLETEI
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12">
             <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-start text-left relative">
                <div className="text-[#E7918A] font-serif text-5xl md:text-6xl mb-6 font-light">01</div>
                <h3 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">Kézműves Koktélok</h3>
                <p className="text-white/60 font-sans text-[14px] md:text-[15px] leading-relaxed">
                  Nemzedékeken átívelő technikák és modern mixológia találkozása. Prémium párlatok, házi szirupok és infúziók minden pohárban.
                </p>
             </motion.div>
             
             <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-start text-left relative">
                <div className="text-[#E7918A] font-serif text-5xl md:text-6xl mb-6 font-light">02</div>
                <h3 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">Modern Mezzék</h3>
                <p className="text-white/60 font-sans text-[14px] md:text-[15px] leading-relaxed">
                  Nem csak az italokra fókuszálunk. Laza, megosztható anatóliai ínyencfalatjaink tökéletesen kísérik az éjszaka ritmusát.
                </p>
             </motion.div>
             
             <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-start text-left relative">
                <div className="text-[#E7918A] font-serif text-5xl md:text-6xl mb-6 font-light">03</div>
                <h3 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">Exkluzív Atmoszféra</h3>
                <p className="text-white/60 font-sans text-[14px] md:text-[15px] leading-relaxed">
                  A budapesti éjszaka új fénypontja. Elbűvölő dizájn, kényelmes lounge és pezsgő ritmusok garantálják a prémium élményt.
                </p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* --- VIP / VENDÉG GALÉRIA (VONALAK NÉLKÜL) --- */}
      <section className="pt-24 pb-32 lg:pt-32 lg:pb-40 bg-[#050505] overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-center">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col text-center items-center gap-4 mb-16">
            <motion.h4 variants={fadeUpReveal} className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
              Vendégeink
            </motion.h4>
            <motion.h2 variants={fadeUpReveal} className="text-4xl md:text-5xl font-serif text-white uppercase">
              KIK JÁRTAK NÁLUNK?
            </motion.h2>
            <motion.p variants={fadeUpReveal} className="text-white/60 max-w-xl text-[14px] md:text-[15px] font-sans leading-relaxed mt-4">
              Büszkék vagyunk rá, hogy a ROSE élményt az évek során már számos hazai és nemzetközi ismert személyiség is átélte nálunk.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            /* SZELLŐSEBB GRID, NINCS KERET */
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full mb-16"
          >
            {VIP_IMAGES.map((item, idx) => (
              <motion.a 
                variants={fadeUpReveal}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx} 
                className="group aspect-square relative overflow-hidden bg-[#111111] block cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#E7918A]/0 group-hover:bg-[#E7918A]/20 transition-colors duration-500 z-10 flex items-center justify-center">
                  <div className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out flex flex-col items-center gap-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/20 z-0" />
                <img 
                  src={`/rose-vendeg${item.id}.jpg`} 
                  alt={`VIP Guest ${idx + 1}`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
              </motion.a>
            ))}
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            href="https://www.instagram.com/rose_budapest/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/30 text-white px-12 py-4 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-[#E7918A] hover:border-[#E7918A] transition-colors duration-500"
          >
            Kövessen minket Instagramon
          </motion.a>

        </div>
      </section>

      {/* --- RENDEZVÉNYEK SZEKCIÓ (PARALLAX ANIMÁCIÓVAL ÉS SZÉLES ALSÓ SÁVVAL) --- */}
      <section id="events" ref={eventsRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden flex flex-col min-h-screen">
        <div className="absolute inset-0 w-full h-full bg-[#050505]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeEvent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              src={EVENTS[activeEvent].img}
              className="absolute inset-0 w-full h-full object-cover origin-center"
              style={{ y: eventsBgY, scale: 1.15 }}
              alt="Esemény háttér"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/70 to-[#050505]/20 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent z-0"></div>
        </div>

        <div className="relative z-10 w-full flex-grow flex flex-col justify-center">
          
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12 w-full flex flex-col items-start text-left">
            <motion.h4 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5"
            >
              Események
            </motion.h4>
            
            <div className="flex flex-col justify-center w-full">
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEvent}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                       {/* KEREKÍTÉS NÉLKÜLI (SHARP) DÁTUM DOBOZ */}
                       <div className="bg-[#E7918A] text-white flex flex-col items-center justify-center w-[100px] h-[100px] md:w-[120px] md:h-[120px] shadow-lg flex-shrink-0">
                         <span className="text-[12px] md:text-[14px] uppercase font-bold tracking-widest opacity-90 mb-1">{EVENTS[activeEvent].year}</span>
                         <span className="text-4xl md:text-5xl font-serif font-bold leading-none mb-1">{EVENTS[activeEvent].day}</span>
                         <span className="text-[12px] md:text-[13px] uppercase font-bold tracking-[0.25em]">{EVENTS[activeEvent].month}</span>
                       </div>
                       <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] tracking-tight drop-shadow-md">
                         {EVENTS[activeEvent].title}
                       </h2>
                    </div>

                    <p className="text-white/80 leading-relaxed font-sans text-[15px] md:text-[17px] max-w-lg drop-shadow-md">
                      {EVENTS[activeEvent].desc}
                    </p>
                    
                    <div className="flex gap-4 mt-8 mb-12">
                       <button onClick={prevEvent} className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
                       </button>
                       <button onClick={nextEvent} className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
                       </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* TELJES SZÉLESSÉGŰ ALSÓ SÁV */}
          <div className="w-full px-6 lg:px-12 mt-10">
            <div className="flex flex-col md:flex-row flex-wrap justify-between gap-y-8 w-full">
              {EVENTS.map((evt, idx) => (
                 <button
                    key={idx}
                    onClick={() => setActiveEvent(idx)}
                    className={`flex items-start gap-4 transition-all duration-500 ${activeEvent === idx ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
                 >
                    <div className={`w-1.5 h-1.5 mt-2.5 rounded-full transition-colors ${activeEvent === idx ? 'bg-[#E7918A]' : 'bg-transparent'}`} />
                    <div className="flex flex-col items-start text-left">
                      <span className={`text-[12px] md:text-[14px] uppercase tracking-[0.2em] font-bold mb-1.5 ${activeEvent === idx ? 'text-[#E7918A]' : 'text-white/70'}`}>
                        {evt.year}. {evt.month} {evt.day}.
                      </span>
                      <span className="text-[18px] md:text-[22px] font-serif text-white">{evt.title}</span>
                    </div>
                 </button>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* --- VÉLEMÉNYEK SZEKCIÓ (KÁRTYÁK NÉLKÜL, HATALMAS IDÉZŐJELLEL) --- */}
      <section id="reviews" className="py-28 lg:py-40 bg-[#050505] overflow-hidden relative">
        {/* LÁGY ROSE GLOW A HÁTTÉRBEN */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(231,145,138,0.06),_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 mb-20 text-center">
          <motion.h4 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5"
          >
            Vélemények
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-serif text-white tracking-tight uppercase"
          >
            RÓLUNK MONDTÁK
          </motion.h2>
        </div>
        
        <div className="relative z-10 w-full overflow-hidden flex items-center py-6">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 95, repeat: Infinity }}
            className="flex w-max gap-16 md:gap-24 px-6"
          >
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div 
                key={idx} 
                /* DOBZ ÉS KERET NÉLKÜL, SZABADON LEBEGŐ TEXT */
                className="w-[85vw] sm:w-[500px] md:w-[600px] flex-shrink-0 flex flex-col justify-between relative"
              >
                {/* HATALMAS HÁTTÉR IDÉZŐJEL */}
                <div className="absolute -top-12 -left-6 font-serif text-[150px] leading-none text-[#E7918A] opacity-10 select-none pointer-events-none">
                  “
                </div>

                <div className="relative z-10">
                  <div className="flex gap-2 text-[#E7918A] mb-8">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/80 font-sans text-[18px] md:text-[22px] leading-relaxed mb-10 font-normal italic">
                    "{review.text}"
                  </p>
                </div>
                <div className="relative z-10 flex flex-col">
                  <h4 className="text-white font-serif text-2xl font-bold tracking-tight">{review.name}</h4>
                  <p className="text-[#E7918A] font-sans text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-bold mt-1.5">{review.title}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SÖTÉT WRAPPER (KAPCSOLAT + TESTVÉRÉTTEREM + LÁBLÉC) */}
      <div className="w-full bg-[#050505] text-white flex flex-col">

{/* --- KAPCSOLAT SZEKCIÓ (VONALAK NÉLKÜLI RÁCS) --- */}
        <section id="reservation" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 bg-[#0A0A0A]">
          <div className="w-full max-w-[90rem] mx-auto px-6 lg:px-12 text-white">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col items-center">
              
              <div className="flex flex-col items-center text-center mb-16 w-full">
                <motion.h4 variants={fadeUpReveal} className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
                  Kapcsolat
                </motion.h4>
                <motion.h2 variants={fadeUpReveal} className="text-4xl lg:text-5xl font-serif mb-6 md:mb-8 uppercase">VÁRJUK SZERETETTEL</motion.h2>
                <motion.p variants={fadeUpReveal} className="text-white/60 font-sans text-[14px] md:text-[15px] leading-relaxed max-w-4xl text-center">
                  Budapest belvárosának nevezetes háromszögében a Nádor-Vécsey- Báthory utcát körülölelő Vértanúk terénél, a Kossuth Lajos tér szomszédságában található a ROSE étterem. Az 5. kerület szívében, a Parlamenttől néhány méterre, a Lánchídtól 8 perc sétára, a Hősök terétől 5 perc metró útra, a budapesti nemzetközi repülőtértől 15 perc autóútra.
                </motion.p>
              </div>

              <motion.div variants={fadeUpReveal} className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8 w-full max-w-6xl mt-8">
                
                <div className="flex-1 flex flex-col items-center text-center w-full">
                  <p className="mb-6 font-serif text-3xl text-white tracking-wide">Címünk</p>
                  <p className="mb-1 font-sans text-[15px] text-white/70">Elite Meat House</p>
                  <p className="mb-1 font-sans text-[15px] text-white/70">(ROSE Bar)</p>
                  <p className="mb-10 font-sans text-[15px] text-white/90 font-medium">1051 BUDAPEST Nádor u. 36</p>
                  <a href="https://goo.gl/maps/82ENcK2az5Rv4q4S8" target="_blank" rel="noopener noreferrer" className="inline-block border border-white/30 text-white px-10 py-4 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-white hover:text-black transition-colors duration-300">
                    Navigáció
                  </a>
                </div>

                <div className="flex-1 flex flex-col items-center text-center w-full">
                  <p className="mb-6 font-serif text-3xl text-white tracking-wide">Nyitvatartás</p>
                  <ul className="space-y-3 text-[14px] md:text-[15px] font-sans text-white/60 w-full max-w-[250px]">
                    <li className="flex justify-between"><span>Hétfő</span><span className="text-white/90">12:00 – 24:00</span></li>
                    <li className="flex justify-between"><span>Kedd</span><span className="text-white/90">12:00 – 24:00</span></li>
                    <li className="flex justify-between"><span>Szerda</span><span className="text-white/90">12:00 – 24:00</span></li>
                    <li className="flex justify-between"><span>Csütörtök</span><span className="text-white/90">12:00 – 24:00</span></li>
                    <li className="flex justify-between"><span>Péntek</span><span className="text-white/90">12:00 – 24:00</span></li>
                    <li className="flex justify-between"><span>Szombat</span><span className="text-white/90">12:00 – 24:00</span></li>
                    <li className="flex justify-between"><span>Vasárnap</span><span className="text-white/90">12:00 – 24:00</span></li>
                  </ul>
                </div>

                <div className="flex-1 flex flex-col items-center text-center w-full">
                  <p className="mb-6 font-serif text-3xl text-white tracking-wide">Elérhetőség</p>
                  <p className="mb-6 font-sans text-[15px] text-white/90">+36 70 615 5540</p>
                  
                  {/* KÖZÖSSÉGI MÉDIA IKONOK */}
                  <div className="flex gap-5 mb-10 text-white/70">
                    <a href="https://www.facebook.com/p/Rose-Budapest-61557349107966/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E7918A] transition-colors" aria-label="Facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="https://www.instagram.com/rose_budapest/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E7918A] transition-colors" aria-label="Instagram">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                  </div>

                  <a 
                    href="https://www.sevenrooms.com/explore/rosemezecocktailbar/reservations/create/search/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#E7918A] text-white px-10 py-4 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_10px_20px_rgba(231,145,138,0.2)]"
                  >
                    Asztalfoglalás
                  </a>
                </div>

              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- TESTVÉRÉTTEREM SZEKCIÓ (TÜRKIZT AJÁNLJUK) --- */}
        <section ref={turkizRef} className="relative z-10 py-16 lg:py-24 overflow-hidden min-h-[40vh] flex items-center bg-[#050505]">
          <div className="absolute inset-0 z-0">
            <motion.img 
              src="/turkiz1.jpg" 
              alt="Türkiz Restaurant" 
              className="w-full h-full object-cover origin-center" 
              style={{ y: turkizBgY, scale: 1.15 }}
            />
            <div className="absolute inset-0 bg-black/70 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10"></div>
          </div>
          
          <div className="relative z-20 max-w-2xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center justify-center text-center">
             
             {/* KISEBB TÜRKIZ LOGÓ SZÖVEG HELYETT (SVG Komponens) */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1 }} 
               viewport={{once: true}}
               className="mb-8 w-[90px] h-[120px] md:w-[120px] md:h-[160px] drop-shadow-xl"
             >
               <TurkizLogo isWhite={true} isScrolled={false} />
             </motion.div>

             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1, delay: 0.2 }} 
               viewport={{once: true}}
               className="text-white/80 font-sans text-[14px] md:text-[15px] leading-relaxed mb-8 drop-shadow-md max-w-xl"
             >
               Kezdje az estét egy autentikus anatóliai vacsorával a TÜRKIZ étteremben, mielőtt átadná magát a ROSE utánozhatatlan éjszakai hangulatának.
             </motion.p>

             <motion.a 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1, delay: 0.3 }} 
               viewport={{once: true}}
               href="/" 
               className="inline-flex items-center justify-center px-10 py-4 border border-white/30 bg-transparent text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-[0.2em] text-[11px] md:text-[12px] whitespace-nowrap font-bold"
             >
               Felfedezem a Türkizt
             </motion.a>
          </div>
        </section>

        {/* --- LÁBLÉC --- */}
        <footer className="relative z-10 py-8 lg:py-10 bg-[#050505]">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-4 w-full">
            {/* <div className="flex gap-4 text-[11px] md:text-[12px] font-sans tracking-[0.2em] text-white/70">
              <a href="/hu" className="text-white font-bold underline underline-offset-4 whitespace-nowrap hover:text-white">HU</a>
              <span className="text-white/30">|</span>
              <a href="/en" className="transition-colors whitespace-nowrap hover:text-white">EN</a>
            </div> */}
            
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-8 text-[10px] md:text-[11px] font-sans tracking-[0.18em] uppercase text-white/70 w-full xl:w-auto xl:justify-start">
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Impresszum</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Fizetési lehetőségek</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Adatkezelési tájékoztató</a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-end gap-3 text-[10px] md:text-[11px] font-sans tracking-[0.18em] uppercase text-white/30 w-full xl:w-auto">
              <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} ROSE BAR BUDAPEST</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}