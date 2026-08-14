"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, Variants, useSpring, useMotionValue } from "framer-motion";

// --- NYELVI SZÓTÁR ---
const translations = {
  HU: {
    nav: { gastro: "Gasztronómia", menu: "Menü", events: "Rendezvények", reviews: "Vélemények" },
    hero: {
      title: "A Mediterrán\nÍzek Kikötője",
      desc: "Élje át az anatóliai gasztronómia páratlan eleganciáját Budapest szívében."
    },
    about: {
      tag: "Gasztronómia",
      title: "Egy igazi török konyha, ahol minden érzékedet elvarázsoljuk.",
      subtitle: "Kóstolja meg Törökország autentikus fogásait Budapest egyik legjobb török éttermében!",
      p1: "Fedezze fel a hideg és meleg mezzéket, a különleges ízvilágot képviselő leveseket, a jellegzetes török italokat! Tapasztalja meg az autentikus török ételek frissességét és vitalitását, élénk, aromás és ízekkel teli repertoárunkat! Török séfünk kizárólag a legfrissebb alapanyagokat felhasználva biztosítja, hogy étlapunkon szereplő minden étel egy keleti ízorgia legyen.",
      p2: "Legyen szó romantikus vacsoráról, nagy családi ebédről, üzleti találkozóról vagy baráti beszélgetésről, a TÜRKIZ mindegyik alkalomra kitűnő választás, hiszen olyan sokszínű, mint minden egyes találkozás.",
    },
    quote: "A török vendéglátás nem csupán ételről szól; egy megosztott pillanat, egy őszinte mosoly és a közös asztal öröme.",
    dishes: {
      tag: "Specialitások",
      title: "Kiemelt Fogásaink",
      desc: "Kóstolja meg séfünk által megálmodott, prémium alapanyagokból készült specialitásainkat.",
      items: [
        { name: "TÜRKIZ Mix Grill", desc: "Faszénen sült válogatás, autentikus fűszerezésű bárány- és borjúhúsokkal.", img: "/turkiz4.jpg" },
        { name: "Meze Válogatás", desc: "Klasszikus hideg mezzék: selymes humusz, muhammara, és haydari.", img: "/turkiz2.jpg" },
        { name: "Adana Kebab", desc: "Klasszikus fűszeres bárány- és borjúdarálthús nyárson.", img: "/uj_turkiz2.jpg" },
        { name: "Kézműves Baklava", desc: "Házi készítésű ropogós pisztáciás baklava, eredeti maras fagylalttal.", img: "/turkiz3.jpg" }
      ]
    },
    menu: {
      tag: "Kínálatunk",
      title: "MENÜ",
      desc: "Stílusos török étterem a mindennapokra. Fedezze fel az anatóliai élet sokszínűségét!",
      btn: "Teljes Étlap Megtekintése",
      tabs: ["Mezzék", "Főételek", "Desszertek"],
      categories: [
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
      ]
    },
    events: {
      tag: "Exkluzivitás",
      title: "Rendezvények a Türkizben",
      desc: "Üzleti vacsora, évforduló vagy zártkörű esemény? A TÜRKIZ egyedi belső terei és személyre szabott szolgáltatásai garantálják a felejthetetlen élményt.",
      btn: "Ajánlatkérés"
    },
    reviews: {
      tag: "Rólunk Mondták",
      title: "Vendégeink Véleménye",
      items: [
        { name: "Kovács Péter", text: "Fantasztikus ízek, mintha újra Isztambulban lennék! A kiszolgálás is kifogástalan." },
        { name: "Nagy Anna", text: "Gyönyörű enteriőr, és a baklava valami zseniális. Mindenkinek ajánlom!" },
        { name: "Tóth Gábor", text: "Tökéletes helyszín volt az évfordulónkhoz. A meze tál verhetetlen volt." },
        { name: "Szabó Éva", text: "Minden apró részletre odafigyelnek, a hangulat magával ragadó." },
        { name: "Varga Bence", text: "Budapest legjobb török étterme, kompromisszumok nélkül." }
      ]
    },
    vip: {
      tag: "Vendégeink",
      title: "Kik jártak nálunk?",
      desc: "Büszkék vagyunk rá, hogy a TÜRKIZ élményt az évek során már számos hazai és nemzetközi ismert személyiség is átélte nálunk."
    },
    contact: {
      tag: "Kapcsolat",
      title: "Várjuk Szeretettel",
      desc: "Budapest belvárosának nevezetes háromszögében a Kossuth Lajos tér szomszédságában található a TÜRKIZ étterem.",
      addressLabel: "Címünk",
      contactLabel: "Elérhetőség",
      btnRes: "Asztalfoglalás",
      btnNav: "Navigáció",
      hoursTitle: "Nyitvatartás",
      days: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"]
    },
    sister: {
      title: "Rose Meze & Cocktail Bar",
      desc: "Folytassa az estét különleges signature koktélokkal és modern mezzékkel a Rose-ban.",
      btn: "Felfedezem a Rose-t"
    },
    footer: {
      imprint: "Impresszum",
      payment: "Fizetési lehetőségek",
      privacy: "Adatkezelési tájékoztató",
      rights: "TÜRKIZ BUDAPEST"
    }
  },
  EN: {
    nav: { gastro: "Gastronomy", menu: "Menu", events: "Events", reviews: "Reviews" },
    hero: {
      title: "The Harbor of\nMediterranean Flavors",
      desc: "Experience the unmatched elegance of Anatolian gastronomy in the heart of Budapest."
    },
    about: {
      tag: "Gastronomy",
      title: "A true Turkish kitchen where all your senses will be enchanted.",
      subtitle: "Taste the authentic dishes of Turkey in one of Budapest's best Turkish restaurants!",
      p1: "Discover hot and cold mezes, soups representing unique flavors, and characteristic Turkish beverages! Experience the freshness and vitality of authentic Turkish cuisine through our vibrant, aromatic, and flavorful repertoire. Our Turkish chef uses only the freshest ingredients to ensure every dish is an oriental feast of flavors.",
      p2: "Whether it is a romantic dinner, a large family lunch, a business meeting, or a friendly chat, TÜRKIZ is an excellent choice for any occasion, as diverse as every single encounter.",
    },
    quote: "Turkish hospitality is not just about food; it is a shared moment, a sincere smile, and the joy of the common table.",
    dishes: {
      tag: "Specialties",
      title: "Signature Dishes",
      desc: "Taste our chef's specialties, made from premium ingredients representing the very best of oriental flavors.",
      items: [
        { name: "TÜRKIZ Mix Grill", desc: "Charcoal-grilled selection with authentically seasoned lamb and veal.", img: "/turkiz4.jpg" },
        { name: "Meze Selection", desc: "Classic cold mezes: silky hummus, muhammara, and haydari.", img: "/turkiz2.jpg" },
        { name: "Adana Kebab", desc: "Charcoal-grilled spicy minced lamb and veal on a skewer.", img: "/uj_turkiz2.jpg" },
        { name: "Artisanal Baklava", desc: "Homemade crispy pistachio baklava with maras ice cream.", img: "/turkiz3.jpg" }
      ]
    },
    menu: {
      tag: "Our Selection",
      title: "MENU",
      desc: "A stylish Turkish restaurant for everyday life. Discover the diversity of Anatolian life!",
      btn: "View Full Menu",
      tabs: ["Mezes", "Mains", "Desserts"],
      categories: [
        [
          { name: "Hummus Kavurma", desc: "Silky chickpea puree with roasted spicy lamb and pine nuts", price: "4 200 Ft", img: "/turkiz1.jpg" },
          { name: "Muhammara", desc: "Spicy roasted pepper dip enriched with walnuts and pomegranate syrup", price: "3 500 Ft", img: "/turkiz2.jpg" },
          { name: "Haydari", desc: "Thick garlic yogurt with fresh dill and mint", price: "3 200 Ft", img: "/uj_turkiz1.jpg" },
          { name: "Babagannus", desc: "Smoked eggplant dip with tahini and olive oil", price: "3 600 Ft", img: "/uj_turkiz2.jpg" }
        ],
        [
          { name: "Adana Kebab", desc: "Charcoal-grilled spicy minced lamb and veal on a skewer", price: "7 900 Ft", img: "/turkiz4.jpg" },
          { name: "Kuzu Sis", desc: "Marinated charcoal-grilled lamb cubes with bulgur and vegetables", price: "8 500 Ft", img: "/uj_turkiz4.jpg" },
          { name: "Tavuk Sis", desc: "Chicken breast skewer marinated in spicy yogurt", price: "6 500 Ft", img: "/vendeg1.jpg" },
          { name: "Türkiz Mix Grill", desc: "Huge meat platter for 2: Adana, lamb and chicken skewers, lamb chops", price: "18 900 Ft", img: "/turkiz3.jpg" }
        ],
        [
          { name: "Türkiz Baklava", desc: "Homemade crispy pistachio baklava with maras ice cream", price: "3 800 Ft", img: "/vendeg2.jpg" },
          { name: "Sütlaç", desc: "Traditional oven-baked Turkish rice pudding", price: "3 200 Ft", img: "/vendeg3.jpg" },
          { name: "Künefe", desc: "Sweet cheese dessert in crispy kadayif pastry with pistachios", price: "3 500 Ft", img: "/vendeg4.jpg" }
        ]
      ]
    },
    events: {
      tag: "Exclusivity",
      title: "Events at Türkiz",
      desc: "Business dinner, anniversary, or private event? TÜRKIZ's unique interiors and personalized services guarantee an unforgettable experience.",
      btn: "Request a Quote"
    },
    reviews: {
      tag: "Testimonials",
      title: "What Our Guests Say",
      items: [
        { name: "Peter K.", text: "Fantastic flavors, I felt like I was back in Istanbul! The service is impeccable." },
        { name: "Anna N.", text: "Beautiful interior, and the baklava is brilliant. Highly recommended!" },
        { name: "Gabor T.", text: "Perfect venue for our anniversary. The meze platter was unbeatable." },
        { name: "Eva S.", text: "They pay attention to every little detail, the atmosphere is captivating." },
        { name: "Bence V.", text: "The best Turkish restaurant in Budapest, without compromises." }
      ]
    },
    vip: {
      tag: "Our Guests",
      title: "Who Visited Us?",
      desc: "We are proud that the TÜRKIZ experience has been enjoyed by many well-known personalities over the years."
    },
    contact: {
      tag: "Contact",
      title: "We Look Forward to Welcoming You",
      desc: "TÜRKIZ restaurant is located in the famous triangle of downtown Budapest at Vértanúk tere.",
      addressLabel: "Our Address",
      contactLabel: "Contact Info",
      btnRes: "Reservation",
      btnNav: "Navigation",
      hoursTitle: "Opening Hours",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    sister: {
      title: "Rose Meze & Cocktail Bar",
      desc: "Continue your evening with signature cocktails and modern mezes at Rose.",
      btn: "Discover Rose"
    },
    footer: {
      imprint: "Imprint",
      payment: "Payment Options",
      privacy: "Privacy Policy",
      rights: "TÜRKIZ BUDAPEST"
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
        <path fill="currentColor" className="text-[#62b6c7]" d="M75.71,156.35V136.84L95.4,118.05l19.68,18.79v19.51l-19.69,8Zm-39-15.69L28.52,122,43,108.6H70.81v26.32L56.48,148.6Zm39-32.06h8.9l6.61,6.84L75.71,130.25Zm23.86,6.84,6.61-6.85h8.9v21.66ZM120,134.92V108.59h27.77L162.27,122l-8.17,18.64-19.79,7.94ZM64.08,89.14l6.73,5.69v9.11H48.07ZM120,94.83l6.73-5.69,16,14.8H120Zm0-20.23V65.5h22.72l-16,14.8Zm9,10.1L149.7,65.5h19.83l9.09,19.26-9.05,19.18H149.74Zm-116.8,0L21.19,65.5H41l20.8,19.24-20.76,19.2H21.22ZM48,65.5H70.77v9.1L64,80.3ZM75.71,92.74l-9.51-8,9.47-8V65.5h11l8.64-8.93L104,65.5h11.06V76.69l9.5,8-9.47,8v11.2H104l-8.64,8.93-8.63-8.93H75.71Zm0-53.55L91.18,54l-6.61,6.84h-8.9ZM99.53,54l15.52-14.81V60.84h-8.9Zm-71-6.58,8.12-18.13,19.86-8.43,14.3,13.65V60.84H43ZM120,34.51l14.32-13.67,19.8,7.94,8.16,18.63L147.71,60.84H120ZM75.67,32.59V13.08l19.69-8,19.69,8V32.59L95.36,51.38ZM95.35,0l-7.3,3L70.77,10v17.9L57.56,15.3,39.43,23l-6.58,2.79L23,48.83l13,12H18l-1.76,3.73h0l0,.06L10,77.74l0-.06-3.21,7,3.31,7.07,7.93,16.81H36l-13,12,9.87,23.63L57.76,154l13.05-12.46v17.59l24.58,9.68L120,159.11V141.52L133,154l24.83-9.77,2.8-6.18-.12.05,7.53-17.19-13.3-12.3h18l7.93-16.8L184,84.88l-5.6-12-5.68-12h-18l13.19-12.2-10.1-23.42-6.44-2.58-18.24-7.32L120,27.91V10L102.44,2.89Z"></path>
        <rect fill="currentColor" x="49.57" y="39.53" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="131.71" y="39.53" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="49.57" y="119.74" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="131.71" y="119.74" width="10.16" height="10.16" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="32.85" y="79.64" width="10.16" height="10.16" transform="translate(-48.79 51.63) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="148.06" y="79.64" width="10.16" height="10.16" transform="translate(-15.05 133.1) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="90.29" y="23.15" width="10.16" height="10.16" transform="translate(7.97 75.7) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="90.29" y="135.55" width="10.16" height="10.16" transform="translate(-71.51 108.63) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <text style={{fontSize: "15px", fontFamily: "GillSans, Gill Sans", letterSpacing: "0.21em"}} transform="translate(49 257.38)" fill={isWhite ? "#ffffff" : "#577285"}>
          <tspan>B</tspan><tspan x="11.64" y="0">U</tspan><tspan x="25.48" y="0">D</tspan><tspan x="39.27" y="0">A</tspan><tspan x="52.41" y="0">P</tspan><tspan x="63.06" y="0">E</tspan><tspan x="73.69" y="0">S</tspan><tspan x="83.64" y="0">T</tspan>
        </text>
        <polygon fill="currentColor" points="25.94 199.67 4.97 199.67 3.27 198.01 0 205.19 6.99 201.6 12.65 201.6 12.65 228.19 9.24 231.87 21.66 231.87 18.26 228.19 18.26 201.6 23.97 201.6 30.91 205.19 27.69 198.01 25.94 199.67" className={isWhite ? "text-white" : "text-[#577285]"}></polygon>
        <path fill="currentColor" d="M46,199.67l-3.4,3.72v13.8q0,12.06,9.93,12.05c3.47,0,6-1,7.57-3.08s2.37-5,2.37-9v-13.8l-3.41-3.72h8.7l-3.41,3.72V217a31.08,31.08,0,0,1-.34,4.87,15.71,15.71,0,0,1-1.27,4.17,9.83,9.83,0,0,1-2.43,3.33,11.46,11.46,0,0,1-4,2.14,18,18,0,0,1-5.66.81,18.25,18.25,0,0,1-5.84-.85,11.13,11.13,0,0,1-4-2.21,10.1,10.1,0,0,1-2.37-3.41,16.56,16.56,0,0,1-1.21-4.14A30.33,30.33,0,0,1,37,217V203.39l-3.4-3.72Z" className={isWhite ? "text-white" : "text-[#577285]"}></path>
        <path fill="currentColor" d="M72.82,199.67H85q13.56,0,13.57,8.6,0,8.41-12.29,8.88l5.8,1.24,6.81,10.16,5.61,3.32H92.27v-3.32l-7.63-11.4H81.83v11l3.41,3.68H72.82l3.4-3.68V203.48ZM85,201.6H81.83v13.66h3.08a9.06,9.06,0,0,0,5.73-1.66,6.09,6.09,0,0,0,2.14-5.15,6.22,6.22,0,0,0-2.12-5.15A8.77,8.77,0,0,0,85,201.6" className={isWhite ? "text-white" : "text-[#577285]"}></path>
        <polygon fill="currentColor" points="110.31 203.39 106.9 199.66 119.32 199.66 115.92 203.39 115.92 213.6 116.75 214.2 128.71 202.61 128.71 199.66 138.46 199.66 130.41 203.44 120.11 213.51 124.8 213.51 134.13 228.41 140.39 231.87 127.05 231.87 127.05 228 118.95 214.66 115.92 217.65 115.92 228.19 119.32 231.87 106.9 231.87 110.31 228.19 110.31 203.39" className={isWhite ? "text-white" : "text-[#577285]"}></polygon>
        <polygon fill="currentColor" points="156.21 231.87 143.79 231.87 147.2 228.19 147.2 203.39 143.79 199.67 156.21 199.67 152.81 203.39 152.81 228.19 156.21 231.87" className={isWhite ? "text-white" : "text-[#577285]"}></polygon>
        <polygon fill="currentColor" points="186.48 199.67 187.22 201.14 170.61 229.98 184.46 229.98 190.58 223.54 188.14 233.15 186.62 231.87 164.72 231.87 163.94 230.44 180.55 201.6 168.54 201.6 162.42 208.04 164.86 198.38 166.33 199.67 186.48 199.67" className={isWhite ? "text-white" : "text-[#577285]"}></polygon>
        
        {/* TÜRKIZ 'Ü' ÉKEZET PONTOK (PÓTOLVA) */}
        <rect fill="currentColor" x="55.29" y="187.59" width="5.62" height="5.62" transform="translate(-117.62 96.85) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
        <rect fill="currentColor" x="43.95" y="187.59" width="5.62" height="5.62" transform="translate(-120.94 88.83) rotate(-45)" className={isWhite ? "text-white" : "text-[#577285]"}></rect>
      </svg>
      {/* CSAK IKON LOGÓ */}
      <svg 
        className={`absolute inset-0 w-full h-full origin-center transition-all duration-500 ease-in-out ${isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-125 pointer-events-none"}`}
        viewBox="0 0 190.58 160" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" className="text-[#62b6c7]" d="M75.71,156.35V136.84L95.4,118.05l19.68,18.79v19.51l-19.69,8Zm-39-15.69L28.52,122,43,108.6H70.81v26.32L56.48,148.6Zm39-32.06h8.9l6.61,6.84L75.71,130.25Zm23.86,6.84,6.61-6.85h8.9v21.66ZM120,134.92V108.59h27.77L162.27,122l-8.17,18.64-19.79,7.94ZM64.08,89.14l6.73,5.69v9.11H48.07ZM120,94.83l6.73-5.69,16,14.8H120Zm0-20.23V65.5h22.72l-16,14.8Zm9,10.1L149.7,65.5h19.83l9.09,19.26-9.05,19.18H149.74Zm-116.8,0L21.19,65.5H41l20.8,19.24-20.76,19.2H21.22ZM48,65.5H70.77v9.1L64,80.3ZM75.71,92.74l-9.51-8,9.47-8V65.5h11l8.64-8.93L104,65.5h11.06V76.69l9.5,8-9.47,8v11.2H104l-8.64,8.93-8.63-8.93H75.71Zm0-53.55L91.18,54l-6.61,6.84h-8.9ZM99.53,54l15.52-14.81V60.84h-8.9Zm-71-6.58,8.12-18.13,19.86-8.43,14.3,13.65V60.84H43ZM120,34.51l14.32-13.67,19.8,7.94,8.16,18.63L147.71,60.84H120ZM75.67,32.59V13.08l19.69-8,19.69,8V32.59L95.36,51.38ZM95.35,0l-7.3,3L70.77,10v17.9L57.56,15.3,39.43,23l-6.58,2.79L23,48.83l13,12H18l-1.76,3.73h0l0,.06L10,77.74l0-.06-3.21,7,3.31,7.07,7.93,16.81H36l-13,12,9.87,23.63L57.76,154l13.05-12.46v17.59l24.58,9.68L120,159.11V141.52L133,154l24.83-9.77,2.8-6.18-.12.05,7.53-17.19-13.3-12.3h18l7.93-16.8L184,84.88l-5.6-12-5.68-12h-18l13.19-12.2-10.1-23.42-6.44-2.58-18.24-7.32L120,27.91V10L102.44,2.89Z"></path>
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
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const imageZoomIn: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } }
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

    
  // 1. ÁLLAPOTOK (State-ek)
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Language>("HU");
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const [activeDot, setActiveDot] = useState(0);



  // 2. REF-ek
  const vipScrollRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  // 3. FRAMER MOTION HOOKOK
  const { scrollY, scrollYProgress } = useScroll();

// --- HORIZONTAL SCROLL HOOKOK ---
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"] // Ez garantálja, hogy pontosan a képernyő tetején ragadjon le
  });
  const horizontalX = useTransform(horizontalProgress, [0, 1], ["0%", "-70%"]);


  const t = translations[lang];

  // 4. ESEMÉNYFIGYELŐK
// 4. ESEMÉNYFIGYELŐK (Villogás és akadások megszüntetve!)
  useMotionValueEvent(scrollY, "change", (latest) => {
    // 1. Navbar háttér állapot (Csak akkor frissít, ha TÉNYLEG változik)
    setIsScrolled((prev) => {
      if (latest > 50 && !prev) return true;
      if (latest <= 50 && prev) return false;
      return prev;
    });

    // 2. Sticky gomb intelligens megjelenése
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
      
      // Megakadályozzuk a végtelen re-render ciklust görgetés közben!
      setShowStickyBtn((prev) => {
        if (prev !== shouldShow) return shouldShow;
        return prev;
      });
    }
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      
{/* --- STICKY ASZTALFOGLALÁS GOMB (Kör alakú, Csak Ikon, Pulzálás nélkül) --- */}
      <AnimatePresence>
        {showStickyBtn && (
          <motion.a 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            href="#reservation" 
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#62B6C7] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(98,182,199,0.4)] hover:bg-[#2C3E50] hover:shadow-[0_10px_30px_rgba(44,62,80,0.4)] transition-all duration-500"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>

{/* --- STÍLUSOK (Címek: Cormorant, Szöveg: Tenor Sans) --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Tenor+Sans&display=swap');
        
        body, p, a, button, li, span, div, .font-sans { 
          font-family: 'Tenor Sans', sans-serif !important; 
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

      {/* --- KÜLÖNLEGES MOBIL MENÜ OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[45] bg-[#0B131A]/95 flex flex-col items-center justify-center"
          >
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center gap-8">
              {[
                { label: t.nav.gastro, href: "#about" },
                { label: t.nav.menu, href: "#menu" },
                { label: t.nav.events, href: "#events" },
                { label: t.nav.reviews, href: "#reviews" }
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
      <nav className={`fixed w-full z-50 transition-all duration-700 ease-[0.22,1,0.36,1] ${isScrolled ? "py-4 bg-white border-none" : "py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent"}`}>
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* Asztali bal oldal */}
          <div className="hidden md:flex flex-1 justify-start space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase">
            <a href="#about" className={`transition-colors ${isScrolled ? "text-[#577285] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>{t.nav.gastro}</a>
            <a href="#menu" className={`transition-colors ${isScrolled ? "text-[#577285] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>{t.nav.menu}</a>
          </div>

          {/* Üres div mobilon a bal oldal kiegyensúlyozására */}
          <div className="flex-1 md:hidden"></div>

          {/* Középső Logó */}
          <div className={`relative flex-none transition-all duration-700 ease-[0.22,1,0.36,1] cursor-pointer ${isScrolled ? "w-[60px] h-[80px] md:w-[70px] md:h-[90px]" : "w-[90px] h-[120px] md:w-[110px] md:h-[145px]"}`}>
             {!isLoading && (
               <motion.div layoutId="main-logo" transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="w-full h-full">
                 <TurkizLogo isWhite={!isScrolled || isMobileMenuOpen} isScrolled={isScrolled} />
               </motion.div>
             )}
          </div>
          
          {/* Asztali jobb oldal */}
          <div className="hidden md:flex flex-1 justify-end space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase items-center">
            <a href="#events" className={`transition-colors ${isScrolled ? "text-[#577285] hover:text-[#62B6C7]" : "text-white/90 hover:text-white"}`}>{t.nav.events}</a>
            <a href="#reviews" className={`transition-colors duration-300 ${isScrolled ? "text-[#577285] hover:text-black" : "text-white/90 hover:text-white"}`}>
              {t.nav.reviews}
            </a>
          </div>

          {/* Tipográfiai Mobil Menü Gomb (Jobb oldalon) */}
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

{/* --- HERO SECTION (Kisebb, arányosabb térköz a gomb és az alsó sáv között) --- */}
      <section className="relative min-h-[85vh] lg:h-[85vh] w-full flex flex-col justify-center items-center px-4 lg:px-16 overflow-hidden bg-[#0B131A]">
        
        {/* Statikus háttér parallax nélkül a tökéletes simaságért */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131A] via-black/50 to-black/30 z-10" />
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }} 
            animate={{ opacity: !isLoading ? 1 : 0, scale: !isLoading ? 1 : 1.05 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/turkiz1.jpg" alt="TÜRKIZ Restaurant" className="w-full h-full object-cover"
          />
        </div>

        {/* --- KÖZÉPSŐ FŐCÍM ÉS GOMB --- */}
        <div className="relative z-20 max-w-[90rem] mx-auto w-full flex flex-col items-center text-center mt-10 md:mt-16 pb-24 lg:pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: !isLoading ? 1 : 0, y: !isLoading ? 0 : 20 }} 
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} 
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-serif text-white tracking-tight leading-[1] max-w-5xl uppercase px-2 whitespace-pre-line">
              {t.hero.title}
            </h1>
            
            <div className="mt-10 md:mt-14">
              <a href="#reservation" className="inline-block bg-[#62B6C7] text-white px-10 py-4 uppercase font-sans tracking-[0.2em] text-[11px] md:text-[12px] font-bold hover:bg-white hover:text-[#0B131A] transition-all duration-300 shadow-[0_10px_30px_rgba(98,182,199,0.3)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                Asztalfoglalás
              </a>
            </div>
          </motion.div>
        </div>

        {/* --- ALSÓ SÁV --- */}
        <div className="absolute bottom-8 md:bottom-16 left-0 w-full z-20 px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: !isLoading ? 1 : 0, y: !isLoading ? 0 : 20 }} 
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }} 
            className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-6"
          >
            {/* Bal oldal: Rövidebb, elegáns leírás */}
            <div className="max-w-md text-center md:text-left order-2 md:order-1 pb-1">
              <p className="text-white/90 font-sans text-[13px] md:text-[15px] leading-relaxed drop-shadow-md">
                Anatólia gasztronómiai öröksége és a mediterrán konyha páratlan eleganciája Budapest történelmi szívében.
              </p>
            </div>

            {/* Jobb oldal: Értékelések */}
            <div className="flex flex-col items-center order-1 md:order-2 gap-3">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full p-[5px]">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <span className="text-white font-serif text-4xl leading-none pt-1">4,7</span>
                <div className="flex items-center gap-1.5 text-[#FABB05]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <p className="text-white/90 font-sans text-[11px] md:text-[12px] uppercase tracking-[0.25em] font-medium text-center">
                Kiváló vendégértékelések
              </p>
            </div>
          </motion.div>
        </div>
      </section>

{/* ======================================================== */}
      {/* 1. SPECIÁLIS FOGÁSAINK - HORIZONTAL SCROLL SZEKCIÓ */}
      {/* ======================================================== */}
      <section ref={horizontalRef} className="relative h-[400vh] bg-white w-full">
        {/* FONTOS: Ha ez nem ragad le, ellenőrizd, hogy a <main> tagen NINCS-e overflow-hidden! */}
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          
          <motion.div 
            style={{ x: horizontalX, willChange: "transform" }} 
            className="flex items-center gap-10 md:gap-20 px-6 md:px-24 w-max"
          >
            {/* 1. BEVEZETŐ KÁRTYA (Cím) */}
            <div className="w-[80vw] md:w-[40vw] flex flex-col justify-center flex-shrink-0 pr-10">
              <p className="text-[#62B6C7] font-sans text-[12px] uppercase tracking-[0.3em] font-bold mb-4">
                Séfünk ajánlata
              </p>
              <h2 className="text-5xl md:text-7xl font-serif text-[#0B131A] tracking-tight leading-tight uppercase">
                Kivételes <br /> Fogásaink
              </h2>
              <div className="w-20 h-[2px] bg-[#0B131A]/10 mt-8"></div>
            </div>

            {/* 2. ÉTEL KÁRTYA */}
            <div className="w-[85vw] md:w-[35vw] flex flex-col group flex-shrink-0 cursor-pointer">
              <div className="relative w-full aspect-[4/5] overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src="/menu1.jpg" alt="Bárány Kebab" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
              <div className="mt-6">
                <h3 className="text-3xl font-serif text-[#0B131A] uppercase tracking-wide">Faszenes Bárány Kebab</h3>
                <p className="text-gray-600 font-sans text-sm mt-3 leading-relaxed">Pácolt bárányhús faszénen sütve, friss fűszerekkel és házi pitával.</p>
              </div>
            </div>

            {/* 3. ÉTEL KÁRTYA */}
            <div className="w-[85vw] md:w-[35vw] flex flex-col group flex-shrink-0 cursor-pointer">
              <div className="relative w-full aspect-[4/5] overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src="/menu2.jpg" alt="Meze Válogatás" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
              <div className="mt-6">
                <h3 className="text-3xl font-serif text-[#0B131A] uppercase tracking-wide">TÜRKIZ Meze Válogatás</h3>
                <p className="text-gray-600 font-sans text-sm mt-3 leading-relaxed">Autentikus anatóliai hideg és meleg előételek páratlan fúziója.</p>
              </div>
            </div>

            {/* 4. ÉTEL KÁRTYA */}
            <div className="w-[85vw] md:w-[35vw] flex flex-col group flex-shrink-0 cursor-pointer">
              <div className="relative w-full aspect-[4/5] overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src="/menu3.jpg" alt="Kemencés Pide" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
              <div className="mt-6">
                <h3 className="text-3xl font-serif text-[#0B131A] uppercase tracking-wide">Kemencében sült Pide</h3>
                <p className="text-gray-600 font-sans text-sm mt-3 leading-relaxed">Ropogós, csónak alakú tészta prémium marhahússal és török sajtokkal.</p>
              </div>
            </div>
            
            {/* Üres helykitöltő a végére */}
            <div className="w-[10vw] flex-shrink-0"></div>

          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. GASZTRONÓMIA SZEKCIÓ (Fehér háttérrel) */}
      {/* ======================================================== */}
      <section className="relative w-full py-32 lg:py-48 bg-white px-6 lg:px-16 flex justify-center border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Bal oldal: Kép */}
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

          {/* Jobb oldal: Szöveg */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
          >
            <p className="text-[#62B6C7] font-sans text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-bold mb-4">
              Páratlan Élmény
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#0B131A] tracking-tight leading-[1.1] uppercase mb-8">
              A Fűszerek <br /> és Hagyományok <br /> Találkozása
            </h2>
            <p className="text-gray-600 font-sans text-[15px] md:text-[16px] leading-relaxed max-w-lg mx-auto lg:mx-0">
              Konyhánk egy tiszteletadás Anatólia végtelen gazdagsága előtt. Minden fogásunk a legkiválóbb alapanyagok, a generációkon átívelő receptek és a modern gasztronómia precizitásának tökéletes egyensúlya.
            </p>
            
            <div className="mt-12">
              <a href="#menu" className="inline-block border border-[#0B131A]/20 text-[#0B131A] px-8 py-3 uppercase font-sans tracking-[0.2em] text-[11px] font-bold hover:bg-[#0B131A] hover:text-white transition-all duration-300">
                Teljes Étlap
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* MENU SZEKCIÓ (Hover Image Effekttel) */}
      <section id="menu" className="relative py-24 lg:py-40 bg-[#1C2A35] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/uj_turkiz1.jpg" alt="Background Texture" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131A] via-black/30 to-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center md:text-center text-left">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col items-start md:items-center w-full">
            
            <motion.h4 variants={fadeUpReveal} className="text-[#62B6C7] text-[12px] font-sans tracking-[0.3em] uppercase mb-8">{t.menu.tag}</motion.h4>
            <motion.h2 variants={fadeUpReveal} className="text-4xl lg:text-5xl font-serif mb-6 text-white">{t.menu.title}</motion.h2>
            <motion.p variants={fadeUpReveal} className="text-white/80 font-sans text-[15px] md:text-[18px] max-w-3xl mx-auto leading-relaxed md:leading-loose mb-12 text-left md:text-center">
              {t.menu.desc}
            </motion.p>
            
            {/* Tab Navigáció */}
            <motion.div variants={fadeUpReveal} className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 w-full">
              {t.menu.tabs.map((tab, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveMenuTab(idx)}
                  className={`text-[12px] md:text-[14px] font-sans tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 ${activeMenuTab === idx ? "text-white border-[#62B6C7]" : "text-white/40 border-transparent hover:text-white/80"}`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Dinamikus Menü Lista Hover Effekttel */}
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
                  {t.menu.categories[activeMenuTab].map((item, idx) => (
                    <HoverImageItem key={idx} item={item} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fadeUpReveal} className="w-full md:w-auto">
               <a href="#" className="inline-block bg-transparent border border-white text-white font-sans tracking-[0.15em] uppercase text-[11px] md:text-[12px] hover:bg-white hover:text-[#0B131A] transition-colors duration-500 w-full md:w-auto text-center whitespace-nowrap px-10 md:px-14 py-4">
                {t.menu.btn}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ÚJ: RENDEZVÉNYHELYSZÍN (Bento Grid) */}
      <section id="events" className="py-24 lg:py-40 bg-[#FFFFFF]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <h4 className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase mb-4">{t.events.tag}</h4>
              <h2 className="text-4xl lg:text-5xl font-serif text-[#2C3E50] leading-[1.2] mb-6">{t.events.title}</h2>
              <p className="text-[#577285] leading-relaxed font-sans text-[15px] md:text-[16px]">{t.events.desc}</p>
            </div>
            <a href="#reservation" className="inline-block bg-[#0B131A] text-white font-sans tracking-[0.15em] uppercase text-[11px] md:text-[12px] hover:bg-[#62B6C7] transition-colors duration-500 text-center whitespace-nowrap px-10 md:px-14 py-4">
              {t.events.btn}
            </a>
          </div>

          {/* Izgalmas Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            <div className="col-span-1 md:col-span-2 md:row-span-2 relative group overflow-hidden bg-gray-100 min-h-[300px] md:min-h-0">
               <img src="/uj_turkiz1.jpg" alt="Event" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                  <h3 className="text-white font-serif text-3xl">Zártkörű Termek</h3>
               </div>
            </div>
            <div className="col-span-1 md:col-span-1 md:row-span-1 relative group overflow-hidden bg-gray-100 min-h-[250px] md:min-h-0">
               <img src="/turkiz2.jpg" alt="Event" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <h3 className="text-white font-serif text-xl">Személyre Szabott Menü</h3>
               </div>
            </div>
            <div className="col-span-1 md:col-span-1 md:row-span-2 relative group overflow-hidden bg-gray-100 min-h-[300px] md:min-h-0">
               <img src="/uj_turkiz4.jpg" alt="Event" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <h3 className="text-white font-serif text-2xl">Prémium Enteriőr</h3>
               </div>
            </div>
            <div className="col-span-1 md:col-span-1 md:row-span-1 relative group overflow-hidden bg-[#1C2A35] min-h-[250px] md:min-h-0 flex flex-col justify-center items-center text-center p-6">
               <h3 className="text-[#62B6C7] font-serif text-5xl mb-2">40</h3>
               <p className="text-white/70 font-sans tracking-[0.2em] uppercase text-[11px]">főig bővíthető</p>
            </div>
          </div>
        </div>
      </section>

      {/* ÚJ: VÉLEMÉNYEK (Folyamatosan úszó kártyák) */}
      <section className="py-20 lg:py-32 bg-[#F5F3ED] overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-12 text-center">
          <h4 className="text-[#62B6C7] text-[11px] font-sans tracking-[0.3em] uppercase mb-4">{t.reviews.tag}</h4>
          <h2 className="text-4xl font-serif text-[#2C3E50]">{t.reviews.title}</h2>
        </div>
        
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Fading Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-[#F5F3ED] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#F5F3ED] to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex w-max gap-6"
          >
            {/* Duplikáltuk a tömböt a Seamless Loop miatt */}
            {[...t.reviews.items, ...t.reviews.items].map((review, idx) => (
              <div key={idx} className="w-[300px] md:w-[400px] bg-white p-8 md:p-10 shadow-sm border border-gray-100 flex-shrink-0">
                <svg className="w-8 h-8 text-[#62B6C7] mb-6 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10.667 12c-2.209 0-4 1.791-4 4s1.791 4 4 4c.806 0 1.554-.239 2.18-.653l-.002.046c0 2.455-1.579 4.545-3.844 5.378l.844 1.838c3.275-1.205 5.489-4.28 5.489-7.854v-6.755h-4.667zm14.667 0c-2.209 0-4 1.791-4 4s1.791 4 4 4c.806 0 1.554-.239 2.18-.653l-.002.046c0 2.455-1.579 4.545-3.844 5.378l.844 1.838c3.275-1.205 5.489-4.28 5.489-7.854v-6.755h-4.667z"/>
                </svg>
                <p className="text-[#577285] font-sans text-[14px] md:text-[15px] leading-relaxed mb-6 italic">"{review.text}"</p>
                <h4 className="text-[#2C3E50] font-serif text-lg font-bold">{review.name}</h4>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* KÖZÖS SÖTÉT WRAPPER (CTA + ROSE + LÁBLÉC) */}
      <div className="w-full bg-[#0B131A] text-white flex flex-col">

        <section id="reservation" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24">
          <div className="w-full max-w-[90rem] mx-auto px-6 lg:px-12 text-white">
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
                  <a href="https://reservours.com/turkizbudapest/tablereservation?source=website" className="flex items-center justify-center px-8 py-4 bg-white text-[#04080B] border border-white hover:bg-[#62B6C7] hover:text-white hover:border-[#62B6C7] font-sans text-[11px] tracking-[0.15em] uppercase transition-all duration-300 w-full sm:w-auto text-center font-bold whitespace-nowrap">
                    {t.contact.btnRes}
                  </a>
                  <a href="https://goo.gl/maps/82ENcK2az5Rv4q4S8" className="flex items-center justify-center px-8 py-4 bg-transparent border border-white text-white font-sans text-[11px] tracking-[0.15em] uppercase hover:bg-white hover:text-[#04080B] transition-colors duration-300 w-full sm:w-auto text-center whitespace-nowrap">
                    {t.contact.btnNav}
                  </a>
                </div>
              </div>

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

        <section className="relative z-10 py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/rose1.jpg" alt="Rose Meze" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B131A] via-transparent to-[#0B131A]"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
             <motion.img initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} src="/rose-logo.png" alt="Rose Meze & Cocktail Bar" className="h-[120px] md:h-[180px] mb-10 object-contain drop-shadow-2xl" />
             <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-4xl md:text-5xl font-serif mb-6 text-white">{t.sister.title}</motion.h2>
             <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-white/80 text-[14px] md:text-[15px] font-sans leading-relaxed max-w-2xl mb-10">{t.sister.desc}</motion.p>
             <motion.a initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} href="#" className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white text-white hover:bg-white hover:text-[#0B131A] transition-colors duration-500 uppercase tracking-[0.2em] text-[11px] whitespace-nowrap font-bold">
               {t.sister.btn}
             </motion.a>
          </div>
        </section>

        <footer className="relative z-10 py-6 lg:py-8 mt-2 md:mt-4">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-4 w-full">
            <div className="flex gap-4 text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-white/60">
              <button onClick={() => handleLanguageChange("HU")} className={`transition-colors whitespace-nowrap ${lang === "HU" ? "text-white font-bold underline underline-offset-4" : "hover:text-white"}`}>HU</button>
              <span className="text-white/30">|</span>
              <button onClick={() => handleLanguageChange("EN")} className={`transition-colors whitespace-nowrap ${lang === "EN" ? "text-white font-bold underline underline-offset-4" : "hover:text-white"}`}>EN</button>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-3 lg:gap-6 text-[9px] md:text-[10px] font-sans tracking-[0.2em] uppercase text-white/60">
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">{t.footer.imprint}</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">{t.footer.payment}</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">{t.footer.privacy}</a>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 text-[9px] md:text-[10px] font-sans tracking-[0.2em] uppercase text-white/50">
              <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} {t.footer.rights}</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}