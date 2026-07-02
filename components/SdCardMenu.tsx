"use client";

import { useState } from "react";

export default function SdCardMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-30 absolute top-[30px] left-[80px] sm:top-[86px] sm:left-[150px] flex items-center">
      
      {/* Botão de SDCard a fazer as socials */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-20 w-[40px] h-[46px] sm:w-[46px] sm:h-[54px] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
        aria-label="Socials"
      >
        <svg
          viewBox="0 0 44 55"
          className="w-full h-full drop-shadow-[0_0_2px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_0_8px_rgba(0,176,240,0.5)] transition-all duration-300"
        >
          {/* Base do Cartão SD */}
          <path 
            d="M 4 4 L 30 4 L 40 14 L 40 51 L 4 51 L 4 22 L 7 19 L 7 13 L 4 10 Z" 
            fill="white" 
            className="stroke-[#d1d5db] group-hover:stroke-[#00b0f0] transition-colors duration-300"
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
          {/* Ícone do Globo */}
          <g transform="translate(10, 15)" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <circle cx="12" cy="12" r="10" />
            <ellipse cx="12" cy="12" rx="4.5" ry="10" />
            <path d="M2 12h20" />
            <path d="M4.5 7h15" />
            <path d="M4.5 17h15" />
          </g>
          {/* Retângulo de baixo */}
          <rect x="8" y="44" width="28" height="3" fill="#d1d5db" />
        </svg>
      </button>

      {/* Barra das redes sociais que expande ao clicar */}
      <div 
        className={`relative z-10 flex items-center bg-white rounded-r-md border-[#d1d5db] overflow-hidden transition-all duration-300 ease-in-out h-[34px] sm:h-[40px] ${
          isOpen ? "max-w-[200px] opacity-100 border-y-2 border-r-2 pl-8 pr-3 shadow-sm" : "max-w-0 opacity-0 border-0 px-0 pointer-events-none"
        } -ml-5`}
      >
        <div className="flex space-x-4 items-center whitespace-nowrap">
          {/* LinkedIn */}
          <a href="#" className="hover:scale-110 transition-transform hover:-translate-y-1">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#9ca3af] hover:text-[#0a66c2] transition-colors" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          {/* GitHub */}
          <a href="#" className="hover:scale-110 transition-transform hover:-translate-y-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/github.svg" alt="GitHub" className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 hover:opacity-100 transition-opacity" style={{ filter: "brightness(0) opacity(50%)" }} />
          </a>
          {/* Twitter */}
          <a href="#" className="hover:scale-110 transition-transform hover:-translate-y-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/twitter.svg" alt="Twitter" className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 hover:opacity-100 transition-opacity" style={{ filter: "brightness(0) opacity(50%)" }} />
          </a>
        </div>
      </div>

    </div>
  );
}
