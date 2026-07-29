"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion";

// --- NYELVI SZÓTÁR ---
const translations = {
  HU: {
    nav: { gastro: "Gasztronómia", menu: "Menü", gallery: "Galéria", res: "Asztalfoglalás" },
    hero: {
      title: "A Mediterrán\nÍzek Kikötője",
      desc: "Fedezze fel Anatólia gazdag gasztronómiai örökségét és a modern mediterrán konyha páratlan eleganciáját, egyenesen Budapest történelmi szívéből. Ahol a hagyomány kompromisszumot nem tűrő eleganciával párosul."
    },
    about: {
      tag: "Gasztronómia",
      title: "Egy igazi török konyha, ahol minden érzékedet elvarázsoljuk.",
      subtitle: "Kóstolja meg Törökország autentikus fogásait Budapest egyik legjobb török éttermében!",
      p1: "Fedezze fel a hideg és meleg mezzéket, a különleges ízvilágot képviselő leveseket, a jellegzetes török italokat! Tapasztalja meg az autentikus török ételek frissességét és vitalitását, élénk, aromás és ízekkel teli repertoárunkat! Török séfünk kizárólag a legfrissebb alapanyagokat felhasználva biztosítja, hogy étlapunkon szereplő minden étel egy keleti ízorgia legyen.",
      p2: "Legyen szó romantikus vacsoráról, nagy családi ebédről, üzleti találkozóról vagy baráti beszélgetésről, a TÜRKIZ mindegyik alkalomra kitűnő választás, hiszen olyan sokszínű, mint minden egyes találkozás.",
      p3: "Az enteriőr megidézi a török kultúrára jellemző díszes motívumokat, a kék, türkiz és arany színek kombinációja megidézi a török kultúra impozáns formavilágát. A TÜRKIZ egy belvárosi fókuszpont a pezsgés, a ragyogás, a belső légkör és a kinti terasz bűvölete. Engedje, hogy magával ragadja!"
    },
    dishes: {
      tag: "Specialitások",
      title: "Kiemelt Fogásaink",
      desc: "Kóstolja meg séfünk által megálmodott, prémium alapanyagokból készült specialitásainkat, amelyek a keleti ízvilág legjavát képviselik.",
      items: [
        { name: "TÜRKIZ Mix Grill", desc: "Faszénen sült válogatás, autentikus fűszerezésű bárány- és borjúhúsokkal." },
        { name: "Meze Válogatás", desc: "Klasszikus hideg mezzék: selymes humusz, muhammara, és haydari." },
        { name: "Kézműves Részletek", desc: "Minden fogás és a környezetünk is a török kézművesség előtt tiszteleg." }
      ]
    },
    menu: {
      tag: "Kínálatunk",
      title: "MENÜ",
      desc: "Stílusos török étterem a mindennapokra. Élje át az anatóliai élet sokszínűségét Törökország nosztalgikus ízei mellett! Garantáljuk, hogy az egész család imádni fogja.",
      btn: "Teljes Étlap Megtekintése"
    },
    menuPreview: [
      { name: "Hummusz Kavurma", desc: "Selymes csicseriborsó püré pirított fűszeres bárányhússal, fenyőmaggal", price: "4 200 Ft" },
      { name: "Adana Kebab", desc: "Faszénen sült, klasszikus fűszeres bárány- és borjúdarálthús nyárson", price: "7 900 Ft" },
      { name: "Türkiz Baklava", desc: "Házi készítésű ropogós pisztáciás baklava, eredeti maras fagylalttal", price: "3 800 Ft" }
    ],
    gallery: {
      tag: "Környezet",
      title: "Atmoszféra",
      desc: "Merüljön el a TÜRKIZ egyedi atmoszférájában. Elegáns belső tereink és gondosan megkomponált fogásaink önmagukért beszélnek."
    },
    vip: {
      tag: "Vendégeink",
      title: "Kik jártak nálunk?",
      desc: "Büszkék vagyunk rá, hogy a TÜRKIZ élményt az évek során már számos hazai és nemzetközi ismert személyiség is átélte nálunk."
    },
    contact: {
      tag: "Kapcsolat",
      title: "Várjuk Szeretettel",
      desc: "Budapest belvárosának nevezetes háromszögében a Nádor-Vécsey-Báthory utcát körülölelő Vértanúk terénél, a Kossuth Lajos tér szomszédságában található a TÜRKIZ étterem.",
      addressLabel: "Címünk",
      contactLabel: "Elérhetőség",
      btnRes: "Asztalfoglalás",
      btnNav: "Navigáció",
      hoursTitle: "Nyitvatartás",
      days: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"]
    },
    sister: {
      title: "Rose Meze & Cocktail Bar",
      desc: "Folytassa az estét különleges signature koktélokkal és modern mezzékkel a Rose-ban, ahol az éjszaka új értelmet nyer.",
      btn: "Felfedezem a Rose-t"
    },
    footer: {
      imprint: "Impresszum",
      payment: "Fizetési lehetőségek",
      privacy: "Adatkezelési tájékoztató",
      rights: "TÜRKIZ BUDAPEST",
      madeBy: "Készítette a"
    }
  },
  EN: {
    nav: { gastro: "Gastronomy", menu: "Menu", gallery: "Gallery", res: "Reservation" },
    hero: {
      title: "The Harbor of\nMediterranean Flavors",
      desc: "Discover the rich gastronomic heritage of Anatolia and the unmatched elegance of modern Mediterranean cuisine, straight from the historical heart of Budapest. Where tradition meets uncompromising elegance."
    },
    about: {
      tag: "Gastronomy",
      title: "A true Turkish kitchen where all your senses will be enchanted.",
      subtitle: "Taste the authentic dishes of Turkey in one of Budapest's best Turkish restaurants!",
      p1: "Discover hot and cold mezes, soups representing unique flavors, and characteristic Turkish beverages! Experience the freshness and vitality of authentic Turkish cuisine through our vibrant, aromatic, and flavorful repertoire. Our Turkish chef uses only the freshest ingredients to ensure every dish is an oriental feast of flavors.",
      p2: "Whether it is a romantic dinner, a large family lunch, a business meeting, or a friendly chat, TÜRKIZ is an excellent choice for any occasion, as diverse as every single encounter.",
      p3: "The interior evokes the ornate motifs typical of Turkish culture; the combination of blue, turquoise, and gold colors summons its imposing design world. TÜRKIZ is a downtown focal point, combining the charm of vibrancy, glamour, an intimate indoor atmosphere, and a lively outdoor terrace. Let yourself be captivated!"
    },
    dishes: {
      tag: "Specialties",
      title: "Signature Dishes",
      desc: "Taste our chef's specialties, made from premium ingredients representing the very best of oriental flavors.",
      items: [
        { name: "TÜRKIZ Mix Grill", desc: "Charcoal-grilled selection with authentically seasoned lamb and veal." },
        { name: "Meze Selection", desc: "Classic cold mezes: silky hummus, muhammara, and haydari." },
        { name: "Artisanal Details", desc: "Every dish and our surroundings pay homage to Turkish craftsmanship." }
      ]
    },
    menu: {
      tag: "Our Selection",
      title: "MENU",
      desc: "A stylish Turkish restaurant for everyday life. Experience the diversity of Anatolian life alongside the nostalgic flavors of Turkey! We guarantee the whole family will love it.",
      btn: "View Full Menu"
    },
    menuPreview: [
      { name: "Hummus Kavurma", desc: "Silky chickpea puree with roasted spicy lamb and pine nuts", price: "4 200 Ft" },
      { name: "Adana Kebab", desc: "Charcoal-grilled spicy minced lamb and veal on a skewer", price: "7 900 Ft" },
      { name: "Türkiz Baklava", desc: "Homemade crispy pistachio baklava with maras ice cream", price: "3 800 Ft" }
    ],
    gallery: {
      tag: "Environment",
      title: "Atmosphere",
      desc: "Immerse yourself in the unique atmosphere of TÜRKIZ. Our elegant interiors and carefully composed dishes speak for themselves."
    },
    vip: {
      tag: "Our Guests",
      title: "Who Visited Us?",
      desc: "We are proud that the TÜRKIZ experience has been enjoyed by many well-known personalities over the years."
    },
    contact: {
      tag: "Contact",
      title: "We Look Forward to Welcoming You",
      desc: "TÜRKIZ restaurant is located in the famous triangle of downtown Budapest at Vértanúk tere, bordered by Nádor, Vécsey, and Báthory streets.",
      addressLabel: "Our Address",
      contactLabel: "Contact Info",
      btnRes: "Reservation",
      btnNav: "Navigation",
      hoursTitle: "Opening Hours",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    sister: {
      title: "Rose Meze & Cocktail Bar",
      desc: "Continue your evening with signature cocktails and modern mezes at Rose, where the night takes on a new meaning.",
      btn: "Discover Rose"
    },
    footer: {
      imprint: "Imprint",
      payment: "Payment Options",
      privacy: "Privacy Policy",
      rights: "TÜRKIZ BUDAPEST",
      madeBy: "Created by"
    }
  }
};

type Language = "HU" | "EN";

// --- SZÍNES LOGÓ KOMPONENS ---
const TurkizLogo = ({ isWhite = false, isScrolled = false }: { isWhite?: boolean; isScrolled?: boolean }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center transition-all duration-700 ${isWhite ? "brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]" : ""}`}>
      <svg 
        className={`absolute inset-0 w-full h-full origin-top transition-all duration-500 ease-in-out ${isScrolled ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"}`}
        viewBox="0 0 190.58 260.84" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`.cls-2{fill:#62b6c7;}.cls-3,.cls-5{fill:#577285;}.cls-5{font-size:15px;font-family:GillSans, Gill Sans;}.cls-6{letter-spacing:0.21em;}.cls-7{letter-spacing:0.22em;}.cls-8{letter-spacing:0.17em;}.cls-9{letter-spacing:0.21em;}.cls-10{letter-spacing:0.2em;}.cls-11{letter-spacing:0.21em;}.cls-12{letter-spacing:0.21em;}`}</style>
        </defs>
        <path className="cls-2" d="M75.71,156.35V136.84L95.4,118.05l19.68,18.79v19.51l-19.69,8Zm-39-15.69L28.52,122,43,108.6H70.81v26.32L56.48,148.6Zm39-32.06h8.9l6.61,6.84L75.71,130.25Zm23.86,6.84,6.61-6.85h8.9v21.66ZM120,134.92V108.59h27.77L162.27,122l-8.17,18.64-19.79,7.94ZM64.08,89.14l6.73,5.69v9.11H48.07ZM120,94.83l6.73-5.69,16,14.8H120Zm0-20.23V65.5h22.72l-16,14.8Zm9,10.1L149.7,65.5h19.83l9.09,19.26-9.05,19.18H149.74Zm-116.8,0L21.19,65.5H41l20.8,19.24-20.76,19.2H21.22ZM48,65.5H70.77v9.1L64,80.3ZM75.71,92.74l-9.51-8,9.47-8V65.5h11l8.64-8.93L104,65.5h11.06V76.69l9.5,8-9.47,8v11.2H104l-8.64,8.93-8.63-8.93H75.71Zm0-53.55L91.18,54l-6.61,6.84h-8.9ZM99.53,54l15.52-14.81V60.84h-8.9Zm-71-6.58,8.12-18.13,19.86-8.43,14.3,13.65V60.84H43ZM120,34.51l14.32-13.67,19.8,7.94,8.16,18.63L147.71,60.84H120ZM75.67,32.59V13.08l19.69-8,19.69,8V32.59L95.36,51.38ZM95.35,0l-7.3,3L70.77,10v17.9L57.56,15.3,39.43,23l-6.58,2.79L23,48.83l13,12H18l-1.76,3.73h0l0,.06L10,77.74l0-.06-3.21,7,3.31,7.07,7.93,16.81H36l-13,12,9.87,23.63L57.76,154l13.05-12.46v17.59l24.58,9.68L120,159.11V141.52L133,154l24.83-9.77,2.8-6.18-.12.05,7.53-17.19-13.3-12.3h18l7.93-16.8L184,84.88l-5.6-12-5.68-12h-18l13.19-12.2-10.1-23.42-6.44-2.58-18.24-7.32L120,27.91V10L102.44,2.89Z"></path>
        <rect fill="currentColor" x="49.57" y="39.53" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="131.71" y="39.53" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="49.57" y="119.74" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="131.71" y="119.74" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="32.85" y="79.64" width="10.16" height="10.16" transform="translate(-48.79 51.63) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="148.06" y="79.64" width="10.16" height="10.16" transform="translate(-15.05 133.1) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="90.29" y="23.15" width="10.16" height="10.16" transform="translate(7.97 75.7) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="90.29" y="135.55" width="10.16" height="10.16" transform="translate(-71.51 108.63) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <text className="cls-5" transform="translate(49 257.38)" fill={isWhite ? "#ffffff" : "#577285"}><tspan className="cls-6">B</tspan><tspan className="cls-7" x="11.64" y="0">U</tspan><tspan className="cls-8" x="25.48" y="0">D</tspan><tspan className="cls-9" x="39.27" y="0">A</tspan><tspan className="cls-10" x="52.41" y="0">P</tspan><tspan className="cls-11" x="63.06" y="0">E</tspan><tspan className="cls-12" x="73.69" y="0">S</tspan><tspan x="83.64" y="0">T</tspan></text>
        <polygon fill="currentColor" points="25.94 199.67 4.97 199.67 3.27 198.01 0 205.19 6.99 201.6 12.65 201.6 12.65 228.19 9.24 231.87 21.66 231.87 18.26 228.19 18.26 201.6 23.97 201.6 30.91 205.19 27.69 198.01 25.94 199.67" className={isWhite ? "text-white" : "text-[#577285]"}></polygon>
        <path fill="currentColor" d="M46,199.67l-3.4,3.72v13.8q0,12.06,9.93,12.05c3.47,0,6-1,7.57-3.08s2.37-5,2.37-9v-13.8l-3.41-3.72h8.7l-3.41,3.72V217a31.08,31.08,0,0,1-.34,4.87,15.71,15.71,0,0,1-1.27,4.17,9.83,9.83,0,0,1-2.43,3.33,11.46,11.46,0,0,1-4,2.14,18,18,0,0,1-5.66.81,18.25,18.25,0,0,1-5.84-.85,11.13,11.13,0,0,1-4-2.21,10.1,10.1,0,0,1-2.37-3.41,16.56,16.56,0,0,1-1.21-4.14A30.33,30.33,0,0,1,37,217V203.39l-3.4-3.72Z" className={isWhite ? "text-white" : "text-[#577285]"}></path>
        <path fill="currentColor" d="M72.82,199.67H85q13.56,0,13.57,8.6,0,8.41-12.29,8.88l5.8,1.24,6.81,10.16,5.61,3.32H92.27v-3.32l-7.63-11.4H81.83v11l3.41,3.68H72.82l3.4-3.68V203.48ZM85,201.6H81.83v13.66h3.08a9.06,9.06,0,0,0,5.73-1.66,6.09,6.09,0,0,0,2.14-5.15,6.22,6.22,0,0,0-2.12-5.15A8.77,8.77,0,0,0,85,201.6" className={isWhite ? "text-white" : "text-[#577285]"}></path>
        <polygon fill="currentColor" points="110.31 203.39 106.9 199.66 119.32 199.66 115.92 203.39 115.92 213.6 116.75 214.2 128.71 202.61 128.71 199.66 138.46 199.66 130.41 203.44 120.11 213.51 124.8 213.51 134.13 228.41 140.39 231.87 127.05 231.87 127.05 228 118.95 214.66 115.92 217.65 115.92 228.19 119.32 231.87 106.9 231.87 110.31 228.19 110.31 203.39" className={isWhite ? "text-white" : "text-[#577285]"}></polygon>
        <polygon fill="currentColor" points="156.21 231.87 143.79 231.87 147.2 228.19 147.2 203.39 143.79 199.67 156.21 199.67 152.81 203.39 152.81 228.19 156.21 231.87" className={isWhite ? "text-white" : "text-[#577285]"}></polygon>
        <polygon fill="currentColor" points="186.48 199.67 187.22 201.14 170.61 229.98 184.46 229.98 190.58 223.54 188.14 233.15 186.62 231.87 164.72 231.87 163.94 230.44 180.55 201.6 168.54 201.6 162.42 208.04 164.86 198.38 166.33 199.67 186.48 199.67" className={isWhite ? "text-white" : "text-[#577285]"}></polygon>
        <rect fill="currentColor" x="55.29" y="187.59" width="5.62" height="5.62" transform="translate(-117.62 96.85) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="43.95" y="187.59" width="5.62" height="5.62" transform="translate(-120.94 88.83) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
      </svg>
      {/* CSAK IKON LOGÓ */}
      <svg 
        className={`absolute inset-0 w-full h-full origin-center transition-all duration-500 ease-in-out ${isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-125 pointer-events-none"}`}
        viewBox="0 0 190.58 160" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`.cls-2{fill:#62b6c7;}.cls-3{fill:#577285;}`}</style>
        </defs>
        <path className="cls-2" d="M75.71,156.35V136.84L95.4,118.05l19.68,18.79v19.51l-19.69,8Zm-39-15.69L28.52,122,43,108.6H70.81v26.32L56.48,148.6Zm39-32.06h8.9l6.61,6.84L75.71,130.25Zm23.86,6.84,6.61-6.85h8.9v21.66ZM120,134.92V108.59h27.77L162.27,122l-8.17,18.64-19.79,7.94ZM64.08,89.14l6.73,5.69v9.11H48.07ZM120,94.83l6.73-5.69,16,14.8H120Zm0-20.23V65.5h22.72l-16,14.8Zm9,10.1L149.7,65.5h19.83l9.09,19.26-9.05,19.18H149.74Zm-116.8,0L21.19,65.5H41l20.8,19.24-20.76,19.2H21.22ZM48,65.5H70.77v9.1L64,80.3ZM75.71,92.74l-9.51-8,9.47-8V65.5h11l8.64-8.93L104,65.5h11.06V76.69l9.5,8-9.47,8v11.2H104l-8.64,8.93-8.63-8.93H75.71Zm0-53.55L91.18,54l-6.61,6.84h-8.9ZM99.53,54l15.52-14.81V60.84h-8.9Zm-71-6.58,8.12-18.13,19.86-8.43,14.3,13.65V60.84H43ZM120,34.51l14.32-13.67,19.8,7.94,8.16,18.63L147.71,60.84H120ZM75.67,32.59V13.08l19.69-8,19.69,8V32.59L95.36,51.38ZM95.35,0l-7.3,3L70.77,10v17.9L57.56,15.3,39.43,23l-6.58,2.79L23,48.83l13,12H18l-1.76,3.73h0l0,.06L10,77.74l0-.06-3.21,7,3.31,7.07,7.93,16.81H36l-13,12,9.87,23.63L57.76,154l13.05-12.46v17.59l24.58,9.68L120,159.11V141.52L133,154l24.83-9.77,2.8-6.18-.12.05,7.53-17.19-13.3-12.3h18l7.93-16.8L184,84.88l-5.6-12-5.68-12h-18l13.19-12.2-10.1-23.42-6.44-2.58-18.24-7.32L120,27.91V10L102.44,2.89Z"></path>
        <rect fill="currentColor" x="49.57" y="39.53" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="131.71" y="39.53" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="49.57" y="119.74" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="131.71" y="119.74" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="32.85" y="79.64" width="10.16" height="10.16" transform="translate(-48.79 51.63) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="148.06" y="79.64" width="10.16" height="10.16" transform="translate(-15.05 133.1) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="90.29" y="23.15" width="10.16" height="10.16" transform="translate(7.97 75.7) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="90.29" y="135.55" width="10.16" height="10.16" transform="translate(-71.51 108.63) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
      </svg>
    </div>
  );
};

// --- LUXUS ANIMÁCIÓS GÖRBÉK ---
const fadeUpReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  }
};

// --- VENDÉGEINK SZÁMA ÉS VÉGTELENÍTETT TÖMB ---
const VIP_COUNT = 7;
const VIP_IMAGES = [1, 2, 3, 4, 5, 6, 7];
const TOTAL_SETS = 10;
const allVips = Array(TOTAL_SETS).fill(VIP_IMAGES).flat(); // Rengeteg kép az észrevétlen végtelen hurokhoz

export default function TurkizLuxury() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Language>("HU");
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollY } = useScroll();
  const vipScrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const t = translations[lang];

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    else if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- AUTOMATA GÖRGETÉS ÉS VÉGTELEN HUROK LOGIKA ---
  const getScrollConfig = () => {
    if (vipScrollRef.current && vipScrollRef.current.children.length > 0) {
      const firstCard = vipScrollRef.current.children[0] as HTMLElement;
      const gap = typeof window !== "undefined" && window.innerWidth >= 768 ? 24 : 16;
      return firstCard.offsetWidth + gap;
    }
    return 200; // Biztonsági fallback
  };

  const handleScroll = () => {
    if (!vipScrollRef.current) return;
    const itemWidth = getScrollConfig();
    const index = Math.round(vipScrollRef.current.scrollLeft / itemWidth);
    
    // Frissítjük az aktív pöttyöt (0-6)
    setActiveDot(index % VIP_COUNT);
    
    // Végtelen hurok - ha a sorozat vége felé vagy az eleje felé érünk, észrevétlenül visszaugrunk a közepére
    if (index >= VIP_COUNT * 8) {
      vipScrollRef.current.style.scrollBehavior = 'auto';
      vipScrollRef.current.scrollLeft -= VIP_COUNT * 4 * itemWidth;
      setTimeout(() => {
        if (vipScrollRef.current) vipScrollRef.current.style.scrollBehavior = 'smooth';
      }, 50);
    } else if (index <= VIP_COUNT * 2) {
      vipScrollRef.current.style.scrollBehavior = 'auto';
      vipScrollRef.current.scrollLeft += VIP_COUNT * 4 * itemWidth;
      setTimeout(() => {
        if (vipScrollRef.current) vipScrollRef.current.style.scrollBehavior = 'smooth';
      }, 50);
    }
  };

  // Automatikus léptetés
  useEffect(() => {
    const interval = setInterval(() => {
      if (vipScrollRef.current) {
        const itemWidth = getScrollConfig();
        vipScrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }, 3000); // <-- ITT TUDOD LASSÍTANI A LÉPÉST (pl. 4000 = 4 másodperc)
    return () => clearInterval(interval);
  }, []);

  // Inicializáláskor beállítjuk a görgetőt a középső szettre
  useEffect(() => {
    if (vipScrollRef.current) {
      const itemWidth = getScrollConfig();
      vipScrollRef.current.style.scrollBehavior = 'auto';
      vipScrollRef.current.scrollLeft = VIP_COUNT * 4 * itemWidth;
      setTimeout(() => {
        if (vipScrollRef.current) vipScrollRef.current.style.scrollBehavior = 'smooth';
      }, 50);
    }
  }, []);

  const handleDotClick = (dotIdx: number) => {
    if (!vipScrollRef.current) return;
    const itemWidth = getScrollConfig();
    const currentIndex = Math.round(vipScrollRef.current.scrollLeft / itemWidth);
    
    // Kiszámítjuk, hogy a jelenlegi 7-es blokkban hol van a kért kép
    const currentBase = Math.floor(currentIndex / VIP_COUNT) * VIP_COUNT;
    const targetIndex = currentBase + dotIdx;
    
    vipScrollRef.current.scrollTo({ left: targetIndex * itemWidth, behavior: 'smooth' });
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
    <div className="bg-[#FDFBF7] overflow-x-hidden selection:bg-[#2C3E50] selection:text-white font-sans text-[#2C3E50]">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,600;0,700;1,600;1,700&family=Tenor+Sans&display=swap');
        
        body, p, a, button, li, span, div, .font-sans { 
          font-family: 'Tenor Sans', sans-serif !important; 
          -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4, h5, h6, .font-serif { 
          font-family: 'Cormorant', serif !important;
          font-weight: 700 !important;
          letter-spacing: -0.02em;
        }
        
        html { scroll-behavior: smooth; }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  
          scrollbar-width: none;  
        }
      `}} />

      {/* --- PRELOADER --- */}
      <AnimatePresence>
        {isLoading && (
          <React.Fragment key="preloader-wrapper">
            <motion.div
              key="preloader-bg"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed inset-0 z-[9998] bg-[#0B131A]"
            />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
              <motion.div
                layoutId="main-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-[120px] h-[160px] md:w-[150px] md:h-[200px] relative"
              >
                <TurkizLogo isWhite={true} isScrolled={false} />
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ease-[0.22,1,0.36,1] ${isScrolled ? "py-4 bg-white border-none" : "py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent"}`}>
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 flex justify-center md:justify-between items-center">
          <div className="hidden md:flex flex-1 justify-start space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase">
            <a href="#about" className={`transition-colors ${isScrolled ? "text-[#577285] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>{t.nav.gastro}</a>
            <a href="#menu" className={`transition-colors ${isScrolled ? "text-[#577285] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>{t.nav.menu}</a>
          </div>

          <div className={`relative flex-none transition-all duration-700 ease-[0.22,1,0.36,1] cursor-pointer ${isScrolled ? "w-[60px] h-[80px] md:w-[70px] md:h-[90px]" : "w-[90px] h-[120px] md:w-[110px] md:h-[145px]"}`}>
             {!isLoading && (
               <motion.div 
                 layoutId="main-logo" 
                 transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
                 className="w-full h-full"
               >
                 <TurkizLogo isWhite={!isScrolled} isScrolled={isScrolled} />
               </motion.div>
             )}
          </div>
          
          <div className="hidden md:flex flex-1 justify-end space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase items-center">
            <a href="#gallery" className={`transition-colors ${isScrolled ? "text-[#577285] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>{t.nav.gallery}</a>
            <a href="#reservation" className={`transition-colors duration-300 ${isScrolled ? "text-[#577285] hover:text-black" : "text-white/90 hover:text-white"}`}>
              {t.nav.res}
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col justify-end pb-28 md:pb-36 px-4 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131A] via-black/50 to-black/30 z-10" />
          <motion.img
            initial={{ opacity: 0 }} 
            animate={{ opacity: !isLoading ? 1 : 0 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/turkiz1.jpg" alt="TÜRKIZ Restaurant" className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-[90rem] mx-auto w-full flex flex-col items-center text-center gap-6">
          <motion.div initial="hidden" animate={!isLoading ? "visible" : "hidden"} variants={staggerContainer} className="flex flex-col items-center">
            <motion.h1 variants={fadeUpReveal} className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] font-serif text-white tracking-tight leading-[1] max-w-6xl uppercase px-2 whitespace-pre-line">
              {t.hero.title}
            </motion.h1>
            <motion.p variants={fadeUpReveal} className="text-white/90 text-[14px] md:text-[17px] font-sans tracking-wide max-w-2xl mx-auto mt-6 md:mt-8 font-light leading-relaxed drop-shadow-lg px-4">
              {t.hero.desc}
            </motion.p>
          </motion.div>
        </div>

        {/* --- SCROLL INDICATOR --- */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: !isLoading ? 1 : 0 }} 
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-30"
        >
          <div className="w-[1px] h-[40px] bg-white/30 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-40, 40] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-full bg-white absolute top-0 left-0"
            />
          </div>
        </motion.div>
      </section>

      {/* --- GASZTRONÓMIA SZEKCIÓ --- */}
      <section id="about" className="py-20 lg:py-40 bg-[#FFFFFF]">
        <div className="max-w-[85rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col gap-6">
                <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[12px] font-sans tracking-[0.3em] uppercase mb-2">{t.about.tag}</motion.h4>
                <motion.h2 variants={fadeUpReveal} className="text-4xl lg:text-5xl font-serif text-[#2C3E50] leading-[1.2] text-left">{t.about.title}</motion.h2>
                <motion.p variants={fadeUpReveal} className="text-[16px] md:text-[18px] text-[#2C3E50] font-sans max-w-lg mt-4 leading-relaxed font-semibold text-left">{t.about.subtitle}</motion.p>
                <motion.p variants={fadeUpReveal} className="text-[15px] md:text-[16px] text-[#577285] leading-relaxed font-sans max-w-lg mt-2 text-left">{t.about.p1}</motion.p>
                <motion.p variants={fadeUpReveal} className="text-[15px] md:text-[16px] text-[#577285] leading-relaxed font-sans max-w-lg mt-2 text-left">{t.about.p2}</motion.p>
                <motion.p variants={fadeUpReveal} className="text-[15px] md:text-[16px] text-[#577285] leading-relaxed font-sans max-w-lg mt-2 text-left">{t.about.p3}</motion.p>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpReveal} className="w-full">
                <div className="aspect-[3/4] w-full bg-gray-100">
                  <img src="/turkiz3.jpg" alt={t.about.tag} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SIGNATURE DISHES --- */}
      <section className="py-20 lg:py-40 bg-[#FFFFFF]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-12 lg:mb-20">
            <div className="flex flex-col gap-4">
              <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase">{t.dishes.tag}</motion.h4>
              <motion.h2 variants={fadeUpReveal} className="text-4xl lg:text-5xl font-serif text-[#2C3E50] text-left">{t.dishes.title}</motion.h2>
            </div>
            <motion.p variants={fadeUpReveal} className="text-[#577285] max-w-sm text-sm font-sans mb-2 md:mb-0 leading-relaxed text-left md:text-right">{t.dishes.desc}</motion.p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { name: t.dishes.items[0].name, img: "/turkiz4.jpg", desc: t.dishes.items[0].desc },
              { name: t.dishes.items[1].name, img: "/turkiz2.jpg", desc: t.dishes.items[1].desc },
              { name: t.dishes.items[2].name, img: "/uj_turkiz2.jpg", desc: t.dishes.items[2].desc }
            ].map((dish, idx) => (
              <motion.div key={idx} variants={fadeUpReveal} className="group">
                <div className="aspect-[3/4] w-full mb-6 bg-gray-100 relative">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-serif text-2xl text-[#2C3E50] mb-3 text-left">{dish.name}</h3>
                <p className="text-[#577285] text-[14px] leading-relaxed font-sans text-left">{dish.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- MENU SZEKCIÓ --- */}
      <section id="menu" className="relative py-24 lg:py-40 bg-[#1C2A35] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/uj_turkiz1.jpg" alt="Background Texture" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131A] via-black/50 to-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center md:text-center text-left">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col items-start md:items-center">
            
            <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[12px] font-sans tracking-[0.3em] uppercase mb-8">{t.menu.tag}</motion.h4>
            <motion.h2 variants={fadeUpReveal} className="text-4xl lg:text-5xl font-serif mb-6 text-white">{t.menu.title}</motion.h2>
            <motion.p variants={fadeUpReveal} className="text-white/80 font-sans text-[15px] md:text-[18px] max-w-3xl mx-auto leading-relaxed md:leading-loose mb-12 text-left md:text-center">
              {t.menu.desc}
            </motion.p>
            
            <motion.div variants={fadeUpReveal} className="w-full max-w-3xl mx-auto mb-16 flex flex-col gap-6 text-left">
              {t.menuPreview.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-4">
                  <div className="flex-1 pr-0 md:pr-6 mb-2 md:mb-0">
                    <h3 className="font-serif text-xl md:text-2xl text-white mb-2">{item.name}</h3>
                    <p className="font-sans text-white/60 text-[13px] md:text-[14px] leading-relaxed">{item.desc}</p>
                  </div>
                  {/* Felnagyított, Hófehér árak */}
                  <div className="text-white font-sans font-bold tracking-[0.1em] text-[18px] md:text-[20px] whitespace-nowrap mt-2 md:mt-0">
                    {item.price}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUpReveal} className="w-full md:w-auto">
               <a href="#" className="inline-block bg-transparent border border-white text-white font-sans tracking-[0.15em] uppercase text-[11px] md:text-[12px] hover:bg-white hover:text-[#0B131A] transition-colors duration-500 w-full md:w-auto text-center whitespace-nowrap px-10 md:px-14 py-4">
                {t.menu.btn}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- FŐ BENTO GRID GALÉRIA --- */}
      <section id="gallery" className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-[#FFFFFF]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mb-12 lg:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
            <div className="flex flex-col gap-4">
              <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase">{t.gallery.tag}</motion.h4>
              <motion.h2 variants={fadeUpReveal} className="text-4xl lg:text-5xl font-serif text-[#2C3E50] text-left">{t.gallery.title}</motion.h2>
            </div>
            <motion.p variants={fadeUpReveal} className="text-[#577285] max-w-md text-sm font-sans mb-2 md:mb-0 leading-relaxed text-left md:text-right hidden md:block">
              {t.gallery.desc}
            </motion.p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 auto-rows-[120px] sm:auto-rows-[180px] md:auto-rows-[250px]">
            <motion.div variants={fadeUpReveal} className="col-span-2 row-span-2 overflow-hidden bg-gray-100">
              <img src="/turkiz1.jpg" alt="Gallery 1" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeUpReveal} className="col-span-1 row-span-1 overflow-hidden bg-gray-100">
              <img src="/turkiz2.jpg" alt="Gallery 2" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeUpReveal} className="col-span-1 row-span-2 overflow-hidden bg-gray-100">
              <img src="/uj_turkiz2.jpg" alt="Gallery 3" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeUpReveal} className="col-span-1 row-span-1 overflow-hidden bg-gray-100">
              <img src="/uj_turkiz4.jpg" alt="Gallery 4" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeUpReveal} className="col-span-2 row-span-1 overflow-hidden bg-gray-100">
              <img src="/turkiz4.jpg" alt="Gallery 5" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeUpReveal} className="col-span-2 row-span-1 overflow-hidden bg-gray-100">
              <img src="/uj_turkiz1.jpg" alt="Gallery 6" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- VIP / VENDÉG GALÉRIA (FLEX-CALC SZÁMÍTÁSSAL, KILÓGÁS NÉLKÜL) --- */}
      <section className="py-16 lg:py-24 bg-[#FFFFFF] overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col text-center items-center gap-4 mb-10">
            <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase">{t.vip.tag}</motion.h4>
            <motion.h2 variants={fadeUpReveal} className="text-4xl font-serif text-[#2C3E50]">{t.vip.title}</motion.h2>
            <motion.p variants={fadeUpReveal} className="text-[#577285] max-w-lg text-[14px] md:text-[15px] font-sans leading-relaxed">{t.vip.desc}</motion.p>
          </motion.div>
          
          {/* Ezen a wrapperen van az overflow-hidden, hogy a belső margónál (padding) tökéletesen elvágja */}
          <div className="w-full overflow-hidden relative">
            <div 
              ref={vipScrollRef} 
              onScroll={handleScroll}
              className="w-full overflow-x-auto hide-scrollbar flex gap-4 md:gap-6 pb-4 snap-x snap-mandatory"
            >
              {allVips.map((item, idx) => (
                <div 
                  key={idx} 
                  /* A CSS trükk: Pontosan beállítja a kártyák méretét (2, 3 vagy 4 darab) a szellők (gap) kivonásával! */
                  className="w-[calc((100%-16px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] h-[240px] sm:h-[300px] md:h-[380px] flex-shrink-0 snap-start relative rounded-t-[120px] overflow-hidden bg-[#F5F3ED]"
                >
                  <img 
                    src={`/vendeg${item}.jpg`} 
                    alt={`VIP Guest`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Kattintható Navigációs Pöttyök */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {VIP_IMAGES.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => handleDotClick(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeDot === idx ? "bg-[#62B6C7] w-6" : "bg-[#2C3E50]/20 hover:bg-[#2C3E50]/40"}`}
                aria-label={`Ugrás a ${idx + 1}. vendégre`}
              />
            ))}
          </div>
          
        </div>
      </section>


{/* --- CTA / KAPCSOLAT ÉS ASZTALFOGLALÁS (KÉPES HÁTTÉRREL) --- */}
      <section id="reservation" className="relative pt-24 lg:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/uj_turkiz3.jpg" alt="Texture" className="w-full h-full object-cover" />
          {/* Finom sötétítés az olvashatóságért + alsó egybeolvadó átmenet */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B131A]"></div>
        </div>

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 text-white">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpReveal} className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            <div className="flex-1">
              <h4 className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase mb-4 md:mb-6">{t.contact.tag}</h4>
              <h2 className="text-4xl lg:text-5xl font-serif mb-6 md:mb-8">{t.contact.title}</h2>
              <p className="text-white/80 font-sans text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-2xl text-left">
                {t.contact.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[13px] md:text-[14px] font-sans text-white/90">
                <div className="text-left">
                  <p className="text-[#62B6C7] mb-2 font-semibold tracking-wider text-[10px] md:text-[11px] uppercase">{t.contact.addressLabel}</p>
                  <p className="mb-1">Elite Meat House (Türkiz Restaurant)</p>
                  <p>1051 BUDAPEST Nádor u. 36</p>
                </div>
                <div className="text-left">
                  <p className="text-[#62B6C7] mb-2 font-semibold tracking-wider text-[10px] md:text-[11px] uppercase">{t.contact.contactLabel}</p>
                  <p className="mb-1">+36 70 366 7666</p>
                  <p>reservation@turkizrestaurant.com</p>
                  
                  <div className="flex gap-4 mt-4 text-white/60">
                    <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
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
                <a href="#" className="flex items-center justify-center px-8 py-4 bg-white text-[#04080B] border border-white hover:bg-transparent hover:text-white font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 w-full sm:w-auto text-center font-bold whitespace-nowrap">
                  {t.contact.btnRes}
                </a>
                <a href="#" className="flex items-center justify-center px-8 py-4 bg-transparent border border-white text-white font-sans text-[11px] tracking-[0.15em] uppercase hover:bg-white hover:text-[#04080B] transition-colors duration-300 w-full sm:w-auto text-center whitespace-nowrap">
                  {t.contact.btnNav}
                </a>
              </div>
            </div>

            {/* --- NYITVATARTÁS (Kártya nélkül, nagyobb szöveg, mobil vonalak eltüntetve) --- */}
            <div className="w-full lg:w-[350px] flex-shrink-0 mt-8 lg:mt-0">
              <h4 className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase mb-6 md:mb-8 text-left">{t.contact.hoursTitle}</h4>
              <ul className="space-y-4 md:space-y-3 text-[15px] md:text-[16px] font-sans text-white/90">
                {t.contact.days.map((day, idx) => (
                  <li key={idx} className={`flex justify-between ${idx !== 6 ? "border-b-0 md:border-b md:border-white/10 pb-0 md:pb-3" : ""}`}>
                    <span>{day}</span>
                    <span>12:00 - 0:00</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- KÖZÖS SÖTÉT WRAPPER A TESTVÉRÉTTEREMNEK ÉS A LÁBLÉCNEK --- */}
      <div className="w-full bg-[#0B131A] text-white flex flex-col">

        {/* --- ROSE MEZE CROSS-PROMO --- */}
        <section className="relative z-10 pt-10 lg:pt-16 pb-4">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left flex-1 max-w-2xl flex flex-col items-center md:items-start">
               <h2 className="text-3xl md:text-4xl font-serif mb-4 text-white">{t.sister.title}</h2>
               <p className="text-white/70 text-[14px] md:text-[15px] font-sans leading-relaxed max-w-xl">{t.sister.desc}</p>
            </div>
            <div className="flex-shrink-0">
               <a href="#" className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white text-white hover:bg-white hover:text-[#0B131A] transition-colors duration-500 uppercase tracking-[0.2em] text-[11px] whitespace-nowrap font-bold">
                 {t.sister.btn}
               </a>
            </div>
          </div>
        </section>

        {/* --- EGY SOROS, COMPACT LÁBLÉC (Mobil nézetben nincs felső vonal) --- */}
{/* --- EGY SOROS, COMPACT LÁBLÉC (Mobil nézetben nincs felső vonal) --- */}
        <footer className="relative z-10 py-6 lg:py-8 border-t-0 md:border-t md:border-white/10 mt-6 md:mt-10">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-4 w-full">
            
            {/* Nyelvválasztó */}
            <div className="flex gap-4 text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-white/60">
              <button 
                onClick={() => handleLanguageChange("HU")} 
                className={`transition-colors whitespace-nowrap ${lang === "HU" ? "text-white font-bold underline underline-offset-4" : "hover:text-white"}`}
              >
                HU
              </button>
              <span className="text-white/30">|</span>
              <button 
                onClick={() => handleLanguageChange("EN")} 
                className={`transition-colors whitespace-nowrap ${lang === "EN" ? "text-white font-bold underline underline-offset-4" : "hover:text-white"}`}
              >
                EN
              </button>
            </div>

            {/* Jogi és infó linkek */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-3 lg:gap-6 text-[9px] md:text-[10px] font-sans tracking-[0.2em] uppercase text-white/60">
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">{t.footer.imprint}</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">{t.footer.payment}</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">{t.footer.privacy}</a>
            </div>
            
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-[9px] md:text-[10px] font-sans tracking-[0.2em] uppercase text-white/50">
              <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} {t.footer.rights}</p>
            </div>
            
          </div>
        </footer>

      </div>
    </div>
  );
}