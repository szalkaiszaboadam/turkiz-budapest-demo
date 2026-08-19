"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, Variants, useSpring, useMotionValue } from "framer-motion";

// --- ADATOK STABIL DEMO KÉPEKKEL ---
const DISHES = [
  { 
    name: "TÜRKIZ Mix Grill", 
    desc: "Faszénen sült válogatás, autentikus fűszerezésű bárány- és borjúhúsokkal.", 
    info: "Válogatott prémium bárány- és borjúhúsok közvetlenül faszénen sütve, a legfinomabb anatóliai fűszerekkel marinálva. Tradicionális bulgurral és grillezett zöldségekkel tálalva.",
    img: "https://images.unsplash.com/photo-1544025162-83141f22e863?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Meze Válogatás", 
    desc: "Klasszikus hideg mezzék: selymes humusz, muhammara, és haydari.", 
    info: "Kezdje az utazást a Közel-Keletre ezzel az autentikus hidegtállal. Selymesen lágy humusz, pikáns diós muhammara és frissítő fokhagymás-mentás haydari.",
    img: "https://images.unsplash.com/photo-1628198595861-c812d1b7d598?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Adana Kebab", 
    desc: "Klasszikus fűszeres bárány- és borjúdarálthús nyárson.", 
    info: "Kézzel vágott, gazdagon fűszerezett bárány- és borjúhús keveréke, melyet széles nyárson, lassan sütünk faszén felett, hogy a szaftok tökéletesen egybeérjenek.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Iskender Kebab", 
    desc: "Fűszeres bárányhús vékony pitán, gazdag paradicsomszósszal.", 
    info: "Bursából származó legendás fogás. Vékonyra szelt, omlós bárányhús, frissen sült pita ágyon, bőséges forró paradicsomszósszal nyakon öntve.",
    img: "https://images.unsplash.com/photo-1655079862215-68a85703f848?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Manti", 
    desc: "Anatóliai húsos táskák, fokhagymás joghurttal és fűszeres vajjal.", 
    info: "Gondosan, kézzel hajtogatott apró tésztatasakok fűszeres bárányhússal töltve. Hűvös fokhagymás joghurttal és egy csipetnyi mentával ízesített forró vajjal tálalva.",
    img: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Török Kávé & Lokum", 
    desc: "Hagyományos rézdzsezvában főzött kávé, pisztáciás lokummal.", 
    info: "Forró homokon, lassan főzött, sűrű és aromás török kávé, mely mellé kézműves, ropogós pisztáciával töltött tradicionális török édességet (lokum) szolgálunk fel.",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Kézműves Baklava", 
    desc: "Ropogós pisztáciás baklava, eredeti maras fagylalttal.", 
    info: "Gaziantepből származó recept alapján. Negyven réteg hajszálvékony tészta, bőséges antepi pisztácia, forró cukorsziruppal és dondurma fagylalttal.",
    img: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=800&q=80" 
  }
];

const MENU_TABS = ["Mezzék", "Főételek", "Desszertek"];

const MENU_CATEGORIES = [
  [
    { name: "Hummusz Kavurma", desc: "Selymes csicseriborsó püré pirított fűszeres bárányhússal, fenyőmaggal", price: "4 200 Ft", img: "https://images.unsplash.com/photo-1637775297495-2244a04d2077?auto=format&fit=crop&w=800&q=80" },
    { name: "Muhammara", desc: "Dióval és gránátalmasziruppal gazdagított pikáns sültpaprika-krém", price: "3 500 Ft", img: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80" },
    { name: "Haydari", desc: "Sűrű fokhagymás joghurt friss kaporral és mentával", price: "3 200 Ft", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80" },
    { name: "Babagannus", desc: "Füstölt padlizsánkrém tahinivel és olívaolajjal", price: "3 600 Ft", img: "https://images.unsplash.com/photo-1572350727142-6e2eb9036f01?auto=format&fit=crop&w=800&q=80" }
  ],
  [
    { name: "Adana Kebab", desc: "Faszénen sült, klasszikus fűszeres bárány- és borjúdarálthús nyárson", price: "7 900 Ft", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" },
    { name: "Kuzu Sis", desc: "Pácolt, faszénen sült bárányhús kockák, bulgurral és grillezett zöldségekkel", price: "8 500 Ft", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80" },
    { name: "Tavuk Sis", desc: "Fűszeres joghurtban pácolt csirkemell nyárs", price: "6 500 Ft", img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80" },
    { name: "Türkiz Mix Grill", desc: "Hatalmas hústál 2 főre: Adana, bárány és csirke nyársak, bárányborda", price: "18 900 Ft", img: "https://images.unsplash.com/photo-1544025162-83141f22e863?auto=format&fit=crop&w=800&q=80" }
  ],
  [
    { name: "Türkiz Baklava", desc: "Házi készítésű ropogós pisztáciás baklava, eredeti maras fagylalttal", price: "3 800 Ft", img: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=800&q=80" },
    { name: "Sütlaç", desc: "Hagyományos kemencében sült török rizspuding", price: "3 200 Ft", img: "https://images.unsplash.com/photo-1626002047814-722137910972?auto=format&fit=crop&w=800&q=80" },
    { name: "Künefe", desc: "Édes sajtos desszert ropogós kadayif tésztában, pisztáciával", price: "3 500 Ft", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80" }
  ]
];

// --- PONTOSAN 4 ESEMÉNY, CSAK A LÉNYEGES DÁTUMOS INFÓKKAL ---
const EVENTS = [
  {
    title: "Élőzenei Akusztikus Est",
    year: "2026",
    month: "AUG",
    day: "14",
    desc: "Lazuljon el a hét végén kellemes, élő akusztikus gitárzene és mediterrán atmoszféra mellett.",
    img: "/turkiz2.jpg"
  },
  {
    title: "Foci Közvetítés Élőben",
    year: "2026",
    month: "AUG",
    day: "22",
    desc: "Szurkoljon kedvenc csapatának óriáskivetítőn, jéghideg csapolt sörök és fergeteges hangulat kíséretében.",
    img: "/turkiz1.jpg"
  },
  {
    title: "Török Kulináris Hétvége",
    year: "2026",
    month: "AUG",
    day: "29",
    desc: "Séfünk különleges menüvel készül, amely Törökország rejtett régióinak legkiválóbb ízeit mutatja be.",
    img: "/turkiz3.jpg"
  },
  {
    title: "Török Borkóstoló Est",
    year: "2026",
    month: "SZEP",
    day: "05",
    desc: "Fedezze fel Anatólia legkiválóbb borait egy exkluzív kóstoló keretében, szakértő sommelier vezetésével.",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
  }
];

const REVIEWS = [
  { name: "Kovács Péter", title: "Gasztronómiai Utazó", text: "Fantasztikus ízek, mintha újra Isztambulban lennék! A báránykebab omlós, a kiszolgálás pedig kompromisszummentesen figyelmes és kifogástalan." },
  { name: "Nagy Anna", title: "Helyi Ínyenc", text: "Gyönyörű enteriőr, páratlan hangulat és a pisztáciás baklava egyszerűen zseniális. Minden részletében prémium élményt nyújtanak." },
  { name: "Tóth Gábor", title: "Üzleti Vendég", text: "Tökéletes és elegáns helyszín volt az évfordulónkhoz. A meze tál válogatása és a borkínálat felülmúlta a várakozásainkat." },
  { name: "Szabó Éva", title: "Törzsvendég", text: "Minden apró részletre kényesen odafigyelnek: az autentikus fűszerektől kezdve a vendéglátás melegségéig. A város legjobbja." },
  { name: "Varga Bence", title: "Gasztronómiai Blog", text: "Budapest legjobb török étterme, modern és tradicionális harmóniában. Az Adana kebab kötelező mindenkinek!" }
];

// RÉSZLETES NYITVATARTÁS A KAPCSOLAT SZEKCIÓHOZ
const NEW_OPENING_DAYS = [
  { day: "Hétfő", time: "12:00 – 0:00" },
  { day: "Kedd", time: "12:00 – 0:00" },
  { day: "Szerda", time: "12:00 – 0:00" },
  { day: "Csütörtök", time: "12:00 – 0:00" },
  { day: "Péntek", time: "12:00 – 0:00" },
  { day: "Szombat", time: "12:00 – 0:00" },
  { day: "Vasárnap", time: "12:00 – 0:00" }
];

// PONTOSAN 8 KÉP A GRIDHEZ
const VIP_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8];

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
      className="flex flex-col justify-between items-start border-b border-white/10 py-5 md:py-6 group cursor-pointer relative transition-colors duration-300 hover:border-white/30"
    >
      <div className="flex justify-between items-start w-full mb-2">
        <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-[#62B6C7] transition-colors duration-300 pr-4">{item.name}</h3>
        <div className="text-[#62B6C7] font-sans font-bold tracking-[0.1em] text-[16px] md:text-[18px] whitespace-nowrap mt-1">
          {item.price}
        </div>
      </div>
      <p className="font-sans text-white/60 text-[13px] md:text-[14px] leading-relaxed max-w-[90%]">{item.desc}</p>

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
            className="fixed w-[280px] h-[360px] object-cover z-[9999] pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/20 hidden md:block"
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
  
  const [activeEvent, setActiveEvent] = useState(0);

  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);

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

  // --- AUTOMATIKUS ESEMÉNY LÉPTETÉS (15 másodperc) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % EVENTS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // ESEMÉNY LAPOZÓK
  const nextEvent = () => setActiveEvent((prev) => (prev + 1) % EVENTS.length);
  const prevEvent = () => setActiveEvent((prev) => (prev - 1 + EVENTS.length) % EVENTS.length);

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
      
      {/* --- STÍLUSOK --- */}
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

      {/* --- STICKY ASZTALFOGLALÁS GOMB --- */}
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

      {/* --- PRELOADER --- */}
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
                { label: "Események", href: "#events" },
                { label: "Vélemények", href: "#reviews" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  variants={fadeUpReveal}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-white hover:text-[#62B6C7] transition-colors uppercase tracking-widest"
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
             {!isLoading && (
               <motion.div 
                 layoutId="main-logo" 
                 transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                 className="w-full h-full flex items-center justify-center"
               >
                 <TurkizLogo isWhite={!isScrolled || isMobileMenuOpen} isScrolled={isScrolled} />
               </motion.div>
             )}
          </div>
          
          <div className="hidden md:flex flex-1 justify-end space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase items-center">
            <a href="#events" className={`transition-colors duration-500 ${isScrolled ? "text-[#2C3E50] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>Események</a>
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
      <section className="relative min-h-screen lg:min-h-screen w-full flex flex-col justify-center items-center px-4 lg:px-16 overflow-hidden bg-[#0B131A]">
        
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

        <div className="relative z-20 max-w-[90rem] mx-auto w-full flex flex-col items-center text-center mt-20 md:mt-28 pb-32 lg:pb-24">
          <motion.div 
            initial="hidden" 
            animate={!isLoading ? "visible" : "hidden"} 
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            {/* HERO UPPERCASE */}
            <motion.h1 variants={fadeUpReveal} className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-serif text-white tracking-tight leading-[1] max-w-5xl px-2 whitespace-pre-line drop-shadow-md uppercase">
              A MEDITERRÁN<br/>ÍZEK KIKÖTŐJE
            </motion.h1>
            
            {/* DUPLA CTA GOMBOK */}
            <motion.div variants={fadeUpReveal} className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-12 md:mt-16">
              <a href="#reservation" className="inline-block bg-[#62B6C7] text-white px-10 py-4 uppercase font-sans tracking-[0.2em] text-[11px] md:text-[12px] font-bold hover:bg-white hover:text-[#2C3E50] transition-colors duration-300 min-w-[220px] text-center">
                Asztalfoglalás
              </a>
              <a href="#menu" className="inline-block border border-white/50 text-white px-10 py-4 uppercase font-sans tracking-[0.2em] text-[11px] md:text-[12px] font-bold hover:bg-white hover:text-[#2C3E50] transition-colors duration-300 min-w-[220px] text-center">
                Étlap Megtekintése
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
                A kultúrák bölcsője által inspirált TÜRKIZ a közösségi étkezés örömét és a friss mediterrán ízvilágot hozza el Budapest belvárosába.
              </p>
            </motion.div>

            {/* ÚJ GOOGLE ÉRTÉKELÉS BLOKK - KATTINTHATÓ LINKKÉNT */}
            <motion.a 
               href="https://goo.gl/maps/82ENcK2az5Rv4q4S8" 
               target="_blank" 
               rel="noopener noreferrer" 
               variants={fadeUpReveal} 
               className="order-1 md:order-2 flex flex-col items-center md:items-end gap-1.5 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-white text-[28px] md:text-3xl font-bold leading-none group-hover:text-[#FABB05] transition-colors duration-300">4,7</span>
                <div className="flex gap-1 text-[#FABB05]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2.5 mt-1">
                 {/* TÖKÉLETESEN KÖZÉPRE IGAZÍTOTT GOOGLE LOGÓ */}
                 <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center p-[6px] md:p-[7px] flex-shrink-0 shadow-md transform group-hover:scale-110 transition-transform duration-300">
                   <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                   </svg>
                 </div>
                 <p className="text-white/80 font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium text-center md:text-right group-hover:text-white transition-colors duration-300">
                   1 200+ Google értékelés
                 </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 1. SPECIALITÁSAINK - HORIZONTAL SCROLL */}
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
              {/* 100% EGYSÉGES BADGE */}
              <p className="text-[#62B6C7] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
                Specialitásaink
              </p>
              {/* SZEKCIÓ CÍM (UPPERCASE) */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2C3E50] tracking-tight leading-tight uppercase">
                KIVÉTELES <br /> FOGÁSAINK
              </h2>
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
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0B131A] shadow-md">
                  <div className="absolute inset-0 bg-black/10 z-10" />
                  <img 
                    src={dish.img} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-[#0B131A]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex flex-col justify-center items-center p-8 backdrop-blur-sm">
                     <p className="text-white/95 text-center font-sans text-[14px] md:text-[15px] leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                       {dish.info}
                     </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-2xl md:text-3xl font-serif text-[#2C3E50] uppercase tracking-wide group-hover:text-[#62B6C7] transition-colors">{dish.name}</h3>
                  <p className="text-[#577285] font-sans text-[14px] md:text-[15px] mt-2 leading-relaxed">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. GASZTRONÓMIA SZEKCIÓ (CÍM NEM UPPERCASE KIVÉTEL) */}
      {/* ======================================================== */}
      <section id="about" className="relative w-full py-28 lg:py-40 bg-white px-6 lg:px-16 flex justify-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full aspect-[3/4] lg:aspect-square overflow-hidden shadow-2xl bg-[#0B131A]">
              <div className="absolute inset-0 bg-black/10 z-10" />
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
            {/* 100% EGYSÉGES BADGE */}
            <motion.h4 className="text-[#62B6C7] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
              Gasztronómia
            </motion.h4>
            {/* CÍM (NEM UPPERCASE KIVÉTEL!) */}
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-serif text-[#2C3E50] tracking-tight leading-[1.2] mb-8">
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

      {/* --- ÚJ MENÜ SZEKCIÓ --- */}
      <section id="menu" className="relative py-28 lg:py-40 bg-[#1C2A35] overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0B131A]">
          <img src="/uj_turkiz1.jpg" alt="Background Texture" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131A] via-[#0B131A]/80 to-[#0B131A]/40"></div>
        </div>

        <div className="relative z-10 max-w-[75rem] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          
          {/* 100% EGYSÉGES BADGE */}
          <motion.h4 variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#62B6C7] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
            Kínálatunk
          </motion.h4>
          {/* SZEKCIÓ CÍM (UPPERCASE) */}
          <motion.h2 variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-white uppercase tracking-tight">
            KIVÉTELES ÍZEK
          </motion.h2>
          <motion.p variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/70 font-sans text-[14px] md:text-[15px] leading-relaxed mb-12 max-w-2xl">
            Stílusos török étterem, ahol átélheti Anatólia sokszínűségét és Törökország nosztalgikus ízeit. Hagyományos finomságok generációk óta őrzött receptjei, elegáns hangulatban.
          </motion.p>
          
          <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-6 md:gap-10 w-full mb-16">
            {MENU_TABS.map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveMenuTab(idx)}
                className={`text-[12px] md:text-[14px] font-sans tracking-[0.2em] uppercase font-bold transition-all duration-300 pb-2 border-b-2 ${activeMenuTab === idx ? "text-[#62B6C7] border-[#62B6C7]" : "text-white/40 border-transparent hover:text-white/80"}`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Ételek */}
          <div className="w-full max-w-4xl min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenuTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-10 text-left"
              >
                {MENU_CATEGORIES[activeMenuTab].map((item, idx) => (
                  <HoverImageItem key={idx} item={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16">
             <a href="#" className="inline-block border border-white/30 text-white px-12 py-4 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-[#62B6C7] hover:border-[#62B6C7] transition-colors duration-500 whitespace-nowrap">
              Teljes Étlap
            </a>
          </motion.div>

        </div>
      </section>

      {/* --- VIP / VENDÉG GALÉRIA --- */}
      <section className="pt-24 pb-32 lg:pt-32 lg:pb-40 bg-white overflow-hidden border-t border-[#2C3E50]/10">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-center">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col text-center items-center gap-4 mb-16">
            {/* 100% EGYSÉGES BADGE */}
            <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
              Vendégeink
            </motion.h4>
            {/* SZEKCIÓ CÍM (UPPERCASE) */}
            <motion.h2 variants={fadeUpReveal} className="text-4xl md:text-5xl font-serif text-[#2C3E50] uppercase">
              KIK JÁRTAK NÁLUNK?
            </motion.h2>
            <motion.p variants={fadeUpReveal} className="text-[#577285] max-w-xl text-[14px] md:text-[15px] font-sans leading-relaxed mt-4">
              Büszkék vagyunk rá, hogy a TÜRKIZ élményt az évek során már számos hazai és nemzetközi ismert személyiség is átélte nálunk.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full mb-16"
          >
            {VIP_IMAGES.map((item, idx) => (
              <motion.a 
                variants={fadeUpReveal}
                href="https://www.instagram.com/turkiz_budapest/"
                target="_blank"
                rel="noopener noreferrer"
                key={idx} 
                className="group aspect-square relative overflow-hidden bg-gray-50 block cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#0B131A]/0 group-hover:bg-[#0B131A]/60 transition-colors duration-500 z-10 flex items-center justify-center">
                  <div className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out flex flex-col items-center gap-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="text-white font-sans text-[10px] tracking-[0.2em] uppercase font-bold">Megtekintés</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/5 z-0" />
                <img 
                  src={`/vendeg${item}.jpg`} 
                  alt={`VIP Guest ${idx + 1}`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </motion.a>
            ))}
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            href="https://www.instagram.com/turkiz_budapest/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-[#2C3E50]/30 text-[#2C3E50] px-12 py-4 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-[#2C3E50] hover:text-white transition-colors duration-500"
          >
            Kövessen minket Instagramon
          </motion.a>

        </div>
      </section>

      {/* --- RENDEZVÉNYEK SZEKCIÓ (ÚJ ALSÓ SÁVOS ELRENDEZÉS, LETISZTULT TIPOGRÁFIA) --- */}
      <section id="events" className="relative py-24 lg:py-32 bg-[#0B131A] overflow-hidden flex flex-col">
        <div className="absolute inset-0 w-full h-full bg-[#0B131A]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeEvent}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              src={EVENTS[activeEvent].img}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Esemény háttér"
            />
          </AnimatePresence>
          {/* Sötét maszk: bal oldalon nagyon sötét, hogy olvasható legyen a fő szöveg, alul is sötét az alsó sáv miatt */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B131A]/95 via-[#0B131A]/50 to-[#0B131A]/10 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131A]/90 to-transparent z-0"></div>
        </div>

        {/* Fő tartalom (Bal oldalon) */}
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 w-full flex-grow flex flex-col justify-center">
          <div className="w-full lg:w-3/5 flex flex-col items-start text-left pt-10">
            {/* 100% EGYSÉGES BADGE */}
            <motion.h4 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#62B6C7] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5"
            >
              Események
            </motion.h4>
            
            <div className="min-h-[220px] flex flex-col justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* CÍM ÉS DÁTUM EGY SORBAN (Aspect-Square négyzet naptárral) */}
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                     <div className="bg-[#62B6C7] text-white flex flex-col items-center justify-center w-[100px] h-[100px] md:w-[120px] md:h-[120px] aspect-square shadow-lg flex-shrink-0">
                       <span className="text-[12px] md:text-[14px] uppercase font-bold tracking-widest opacity-90 mb-1">{EVENTS[activeEvent].year}</span>
                       <span className="text-4xl md:text-5xl font-serif font-bold leading-none mb-1">{EVENTS[activeEvent].day}</span>
                       <span className="text-[12px] md:text-[13px] uppercase font-bold tracking-[0.25em]">{EVENTS[activeEvent].month}</span>
                     </div>
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] tracking-tight drop-shadow-md">
                       {EVENTS[activeEvent].title}
                     </h2>
                  </div>

                  <p className="text-white/90 leading-relaxed font-sans text-[15px] md:text-[17px] max-w-lg drop-shadow-md">
                    {EVENTS[activeEvent].desc}
                  </p>
                  
                  {/* NYILAK (Léptetők CSAK EZEK LAPOZNAK) */}
                  <div className="flex gap-4 mt-10">
                     <button onClick={prevEvent} className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0B131A] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
                     </button>
                     <button onClick={nextEvent} className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0B131A] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
                     </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- AZ ÖSSZES ESEMÉNY KIJELZÉSE EGY LETISZTULT ALSÓ SÁVBAN (NEM KATTINTHATÓ) --- */}
        <div className="relative z-10 w-full mt-24 border-t border-white/10 pt-8">
           <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-6 px-6 lg:px-12">
              {EVENTS.map((evt, idx) => (
                 <div
                    key={idx}
                    className={`flex flex-col items-start transition-opacity duration-700 w-full ${activeEvent === idx ? 'opacity-100' : 'opacity-40'}`}
                 >
                    {/* Felső kijelölő vonal az aktív elemen */}
                    <div className="h-[2px] w-8 mb-4 relative">
                      {activeEvent === idx && (
                        <motion.div layoutId="activeLine" className="absolute top-0 left-0 w-full h-full bg-[#62B6C7]" />
                      )}
                    </div>
                    <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold mb-2 ${activeEvent === idx ? 'text-[#62B6C7]' : 'text-white'}`}>
                      {evt.year} {evt.month} {evt.day}
                    </span>
                    <span className={`text-[16px] md:text-[18px] font-serif tracking-wide leading-snug ${activeEvent === idx ? 'text-white' : 'text-white/90'}`}>
                      {evt.title}
                    </span>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- VÉLEMÉNYEK SZEKCIÓ (VONAL NÉLKÜL, HOVER NÉLKÜL) --- */}
      <section id="reviews" className="py-28 lg:py-40 bg-white overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-16 text-center">
          {/* 100% EGYSÉGES BADGE */}
          <motion.h4 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#62B6C7] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5"
          >
            Vendégélmény
          </motion.h4>
          {/* SZEKCIÓ CÍM (UPPERCASE) */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-serif text-[#2C3E50] tracking-tight uppercase"
          >
            RÓLUNK MONDTÁK
          </motion.h2>
        </div>
        
        <div className="relative w-full overflow-hidden flex items-center py-6">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            /* LASSABB ANIMÁCIÓ (95s) */
            transition={{ ease: "linear", duration: 95, repeat: Infinity }}
            className="flex w-max gap-8 md:gap-12 px-6"
          >
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div 
                key={idx} 
                /* HOVER ÉS VONALAK NÉLKÜL */
                className="w-[85vw] sm:w-[500px] md:w-[600px] bg-[#0B131A] p-10 md:p-14 flex-shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-2 text-[#FABB05] pt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-serif text-6xl md:text-7xl text-[#62B6C7]/30 leading-none select-none">“</span>
                  </div>
                  <p className="text-white/90 font-sans text-[16px] md:text-[18px] leading-relaxed mb-10 font-normal">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-6 flex flex-col">
                  <h4 className="text-white font-serif text-2xl font-bold tracking-tight">{review.name}</h4>
                  <p className="text-[#62B6C7] font-sans text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-bold mt-1.5">{review.title}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SÖTÉT WRAPPER (KAPCSOLAT + ROSE + LÁBLÉC EGYBEOLVASZTVA) */}
      <div className="w-full bg-[#0B131A] text-white flex flex-col">

        {/* --- KIEGYENSÚLYOZOTT, KÖZÉPRE IGAZÍTOTT 3-OSZLOPOS KAPCSOLAT SZEKCIÓ --- */}
        <section id="reservation" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24">
          <div className="w-full max-w-[90rem] mx-auto px-6 lg:px-12 text-white">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col items-center">
              
              {/* Középső Fejléc */}
              <div className="flex flex-col items-center text-center mb-16 w-full">
                {/* 100% EGYSÉGES BADGE */}
                <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5">
                  Kapcsolat
                </motion.h4>
                {/* SZEKCIÓ CÍM (UPPERCASE) */}
                <motion.h2 variants={fadeUpReveal} className="text-4xl lg:text-5xl font-serif mb-6 md:mb-8 uppercase">VÁRJUK SZERETETTEL</motion.h2>
                <motion.p variants={fadeUpReveal} className="text-white/80 font-sans text-[14px] md:text-[15px] leading-relaxed max-w-4xl text-center">
                  Budapest belvárosának nevezetes háromszögében a Nádor-Vécsey- Báthory utcát körülölelő Vértanúk terénél, a Kossuth Lajos tér szomszédságában található a TÜRKIZ étterem. Az 5. kerület szívében, a Parlamenttől néhány méterre, a Lánchídtól 8 perc sétára, a Hősök terétől 5 perc metró útra, a budapesti nemzetközi repülőtértől 15 perc autóútra.
                </motion.p>
              </div>

              {/* 3-Oszlopos Tiszta Rács (Dobozok és vonalak nélkül) */}
              <motion.div variants={fadeUpReveal} className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 w-full max-w-6xl mt-8">
                
                {/* 1. Oszlop: Cím */}
                <div className="flex-1 flex flex-col items-center text-center w-full">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 text-[#62B6C7]">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <p className="mb-2 font-serif text-2xl text-white tracking-wide">Címünk</p>
                  <p className="mb-1 font-sans text-[15px] text-white/70">Elite Meat House</p>
                  <p className="mb-1 font-sans text-[15px] text-white/70">(Türkiz Restaurant)</p>
                  <p className="mb-8 font-sans text-[15px] text-white/90 font-medium">1051 BUDAPEST Nádor u. 36</p>
                  <a href="https://goo.gl/maps/82ENcK2az5Rv4q4S8" className="inline-block border border-white/30 text-white px-8 py-3 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                    Navigáció
                  </a>
                </div>

                {/* 2. Oszlop: Nyitvatartás */}
                <div className="flex-1 flex flex-col items-center text-center w-full">
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 text-[#62B6C7]">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <p className="mb-6 font-serif text-2xl text-white tracking-wide">Nyitvatartás</p>
                  <ul className="space-y-3 text-[14px] md:text-[15px] font-sans text-white/70 w-full max-w-[250px]">
                    {NEW_OPENING_DAYS.map((slot, idx) => (
                      <li key={idx} className="flex justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0">
                        <span>{slot.day}</span>
                        <span>{slot.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Oszlop: Elérhetőség */}
                <div className="flex-1 flex flex-col items-center text-center w-full">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 text-[#62B6C7]">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <p className="mb-6 font-serif text-2xl text-white tracking-wide">Elérhetőség</p>
                  <p className="mb-2 font-sans text-[15px] text-white/90">+36 70 366 7666</p>
                  <p className="mb-8 font-sans text-[14px] text-white/70">reservation@turkizrestaurant.com</p>
                  
                  <div className="flex gap-5 mb-8 text-white/70">
                    <a href="https://www.facebook.com/Turkizbudapest/" className="hover:text-white transition-colors" aria-label="Facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="https://www.instagram.com/turkiz_budapest/" className="hover:text-white transition-colors" aria-label="Instagram">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                  </div>

                  <a href="https://reservours.com/turkizbudapest/tablereservation?source=website" className="inline-block bg-[#62B6C7] text-white px-8 py-3 uppercase font-sans tracking-[0.15em] text-[11px] font-bold hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                    Asztalfoglalás
                  </a>
                </div>

              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- ROSE SZEKCIÓ (Kisebb, középre zárt, lágy átmenettel, Nagyobb logó) --- */}
        <section className="relative z-10 py-16 lg:py-24 overflow-hidden min-h-[40vh] flex items-center bg-[#0B131A]">
          <div className="absolute inset-0 z-0">
            <img src="/rose1.jpg" alt="Rose Restaurant" className="w-full h-full object-cover opacity-100" />
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            {/* LÁGY FADE MASZK alul-felül, EGYBEOLVASZTVA */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B131A] via-transparent to-[#0B131A] z-10"></div>
          </div>
          
          <div className="relative z-20 max-w-2xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center justify-center text-center">
             <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1 }} 
               viewport={{once: true}}
             >
               {/* NAGYOBB LOGÓ */}
               <img src="/rose-logo-logo-2.png" alt="Rose" className="w-40 md:w-56 object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] mb-6" />
             </motion.div>

             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1, delay: 0.2 }} 
               viewport={{once: true}}
               className="text-white/95 text-[14px] md:text-[15px] font-sans leading-relaxed mb-8 drop-shadow-md max-w-xl"
             >
               Folytassa az estét különleges signature koktélokkal és modern mezzékkel a Rose-ban. Tapasztalja meg a prémium bárélményt közvetlenül a TÜRKIZ mellett.
             </motion.p>

             <motion.a 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1, delay: 0.3 }} 
               viewport={{once: true}}
               href="#" 
               className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#0B131A] hover:bg-[#62B6C7] hover:text-white transition-colors duration-300 uppercase tracking-[0.2em] text-[11px] md:text-[12px] whitespace-nowrap font-bold shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
             >
               Felfedezem a Rose-t
             </motion.a>
          </div>
        </section>

        {/* --- LÁBLÉC --- */}
        <footer className="relative z-10 py-8 lg:py-10 bg-[#0B131A]">
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