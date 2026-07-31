"use client";

import React from "react";

// --- LOGÓ (CSAK IKON) ---
const MinimalLogo = () => (
  <svg 
    className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] text-white mb-10"
    viewBox="0 0 190.58 160" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="currentColor" d="M75.71,156.35V136.84L95.4,118.05l19.68,18.79v19.51l-19.69,8Zm-39-15.69L28.52,122,43,108.6H70.81v26.32L56.48,148.6Zm39-32.06h8.9l6.61,6.84L75.71,130.25Zm23.86,6.84,6.61-6.85h8.9v21.66ZM120,134.92V108.59h27.77L162.27,122l-8.17,18.64-19.79,7.94ZM64.08,89.14l6.73,5.69v9.11H48.07ZM120,94.83l6.73-5.69,16,14.8H120Zm0-20.23V65.5h22.72l-16,14.8Zm9,10.1L149.7,65.5h19.83l9.09,19.26-9.05,19.18H149.74Zm-116.8,0L21.19,65.5H41l20.8,19.24-20.76,19.2H21.22ZM48,65.5H70.77v9.1L64,80.3ZM75.71,92.74l-9.51-8,9.47-8V65.5h11l8.64-8.93L104,65.5h11.06V76.69l9.5,8-9.47,8v11.2H104l-8.64,8.93-8.63-8.93H75.71Zm0-53.55L91.18,54l-6.61,6.84h-8.9ZM99.53,54l15.52-14.81V60.84h-8.9Zm-71-6.58,8.12-18.13,19.86-8.43,14.3,13.65V60.84H43ZM120,34.51l14.32-13.67,19.8,7.94,8.16,18.63L147.71,60.84H120ZM75.67,32.59V13.08l19.69-8,19.69,8V32.59L95.36,51.38ZM95.35,0l-7.3,3L70.77,10v17.9L57.56,15.3,39.43,23l-6.58,2.79L23,48.83l13,12H18l-1.76,3.73h0l0,.06L10,77.74l0-.06-3.21,7,3.31,7.07,7.93,16.81H36l-13,12,9.87,23.63L57.76,154l13.05-12.46v17.59l24.58,9.68L120,159.11V141.52L133,154l24.83-9.77,2.8-6.18-.12.05,7.53-17.19-13.3-12.3h18l7.93-16.8L184,84.88l-5.6-12-5.68-12h-18l13.19-12.2-10.1-23.42-6.44-2.58-18.24-7.32L120,27.91V10L102.44,2.89Z"></path>
    <rect fill="currentColor" x="49.57" y="39.53" width="10.16" height="10.16"></rect>
    <rect fill="currentColor" x="131.71" y="39.53" width="10.16" height="10.16"></rect>
    <rect fill="currentColor" x="49.57" y="119.74" width="10.16" height="10.16"></rect>
    <rect fill="currentColor" x="131.71" y="119.74" width="10.16" height="10.16"></rect>
    <rect fill="currentColor" x="32.85" y="79.64" width="10.16" height="10.16" transform="translate(-48.79 51.63) rotate(-45)"></rect>
    <rect fill="currentColor" x="148.06" y="79.64" width="10.16" height="10.16" transform="translate(-15.05 133.1) rotate(-45)"></rect>
    <rect fill="currentColor" x="90.29" y="23.15" width="10.16" height="10.16" transform="translate(7.97 75.7) rotate(-45)"></rect>
    <rect fill="currentColor" x="90.29" y="135.55" width="10.16" height="10.16" transform="translate(-71.51 108.63) rotate(-45)"></rect>
  </svg>
);

export default function DemoSelector() {
  return (
    <div className="min-h-screen bg-[#0B131A] text-white flex flex-col items-center justify-center px-6 py-12 selection:bg-[#62B6C7] selection:text-white">
      
      {/* --- GLOBÁLIS STÍLUSOK (Letisztult Inter font használata) --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        
        body, p, a, button, h1, h2, h3, span, div { 
          font-family: 'Inter', sans-serif !important; 
          -webkit-font-smoothing: antialiased;
        }
      `}} />

      <MinimalLogo />
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-16 text-center tracking-tight">
        TÜRKIZ DEMÓK
      </h1>
      
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        
        <a 
          href="/demo-1" 
          className="flex-1 flex flex-col items-center justify-center p-10 md:p-14 lg:p-16 border border-white/20 hover:bg-white hover:text-[#0B131A] transition-colors duration-300 group"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">1. Verzió</h2>
          <p className="text-[13px] md:text-[15px] lg:text-[17px] tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity font-semibold">
            Képes Kapcsolat szekció
          </p>
        </a>

        <a 
          href="/demo-2" 
          className="flex-1 flex flex-col items-center justify-center p-10 md:p-14 lg:p-16 border border-white/20 hover:bg-white hover:text-[#0B131A] transition-colors duration-300 group"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">2. Verzió</h2>
          <p className="text-[13px] md:text-[15px] lg:text-[17px] tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity font-semibold">
            Képes Rose szekció
          </p>
        </a>

        <a 
          href="/demo-3" 
          className="flex-1 flex flex-col items-center justify-center p-10 md:p-14 lg:p-16 border border-white/20 hover:bg-white hover:text-[#0B131A] transition-colors duration-300 group"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">3. Verzió</h2>
          <p className="text-[13px] md:text-[15px] lg:text-[17px] tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity font-semibold">
            Türkiz - Rose váltó
          </p>
        </a>

      </div>
    </div>
  );
}