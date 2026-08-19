import React from 'react';

export default function TurkizLogo({ isWhite = false, isScrolled = false }: { isWhite?: boolean; isScrolled?: boolean }) {
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
}