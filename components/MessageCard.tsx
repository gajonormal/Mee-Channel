"use client";

import React, { useState, useEffect } from 'react';

interface MessageCardProps {
  name?: string;
  imageSrc?: string | null;
  href?: string;
  rotationClass?: string;
  pinColor?: "red" | "orange";
  onClick?: (e: React.MouseEvent) => void;
  isOpen?: boolean;
}

export default function MessageCard({
  name = "Bernardo",
  imageSrc = "/assets/Mii_head.png",
  href = "mailto:bernamaia12@gmail.com",
  rotationClass = "-rotate-3",
  pinColor = "red",
  onClick,
  isOpen = false
}: MessageCardProps) {

  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasBeenOpened(true);
    }
  }, [isOpen]);

  const pinGradients = {
    red: "from-[#ff7a7a] via-[#e60000] to-[#8a0000]",
    orange: "from-[#ffcd7a] via-[#ff8800] to-[#b35e00]"
  };

  const innerContent = (
    <>
      <div className={`absolute top-[-10px] sm:top-[-12px] left-1/2 -translate-x-1/2 ${isOpen ? 'z-0 opacity-0' : 'z-50 opacity-100'}`}>
        <div className={!isOpen && hasBeenOpened ? 'animate-pin-stab' : ''}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_-2px_-3px_5px_rgba(0,0,0,0.4),inset_1px_2px_4px_rgba(255,255,255,0.9)] bg-gradient-to-br ${pinGradients[pinColor]}`}>
            <div className="absolute top-[8%] left-[15%] w-[70%] h-[45%] bg-gradient-to-b from-white/90 to-white/0 rounded-[50%] blur-[0.5px]" />
          </div>
        </div>
      </div>

      {/* O clip-path negativo no topo (-200px) é o que permite à carta deslizar para cima sem ser cortada à cabeça */}
      <div 
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{ clipPath: 'inset(-200px -200px 0 -200px)' }}
      >
        {/* Parte que abre pra cima na carta */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d={isOpen ? "M 0 0 L 50 -35 L 100 0" : "M 0 0 L 50 55 L 100 0"} 
            stroke="rgba(0,0,0,0.06)" 
            strokeWidth="3" 
            fill="#FFFEEA" 
            vectorEffect="non-scaling-stroke" 
            className={`transition-all duration-300 ease-in-out ${isOpen ? 'delay-0' : 'delay-300'}`} 
          />
          <path 
            d={isOpen ? "M 0 0 L 50 -35 L 100 0" : "M 0 0 L 50 55 L 100 0"} 
            stroke="#E6D99C" 
            strokeWidth="1.5" 
            fill="none" 
            vectorEffect="non-scaling-stroke" 
            className={`transition-all duration-300 ease-in-out ${isOpen ? 'delay-0' : 'delay-300'}`} 
          />
        </svg>

        {/* Papel a sair da carta  */}
        <div 
          className={`absolute top-[10%] left-[10%] w-[80%] h-[85%] bg-white rounded-t-sm shadow-[0_-4px_12px_rgba(0,0,0,0.15)] border-x border-t border-[#D9D9D9] transition-transform duration-300 ease-in-out z-20 flex flex-col overflow-hidden ${isOpen ? '-translate-y-10 sm:-translate-y-14 delay-300' : 'translate-y-[80px] sm:translate-y-[100px] delay-0'}`}
        >
          <div className="w-full h-4 bg-[#9A9C9E] opacity-50 shrink-0" />
          <div className="flex-1 w-full flex flex-col mt-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full border-b border-[#E0E0E0] mt-2 h-[1px]" />
            ))}
          </div>
        </div>
        <div 
          className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-[#FFFEEA] to-[#FDF4C5] rounded-sm"
          style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }}
        />

        {/* As linhas da carta ficam a frente e o papel atras para ter o efeito a sair da carta */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-40" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 0 0 L 50 55 L 100 0" stroke="rgba(0,0,0,0.06)" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M 0 0 L 50 55 L 100 0" stroke="#E6D99C" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Texto da Wii depois vou subsituir por uma logo ou tirar completamente  */}
      <div className={`absolute w-full flex justify-center z-50 pointer-events-none transition-all duration-300 ease-in-out ${isOpen ? 'top-[-15%] opacity-0 delay-0' : 'top-[28%] opacity-60 delay-300'}`}>
        <span className="text-[#EADD9A] text-xl font-bold tracking-widest" style={{ fontFamily: 'Arial, sans-serif' }}>Wii</span>
      </div>

      {/* Conteudo que esta na carta */}
      <div className="relative z-50 w-full h-full pointer-events-none">
        {imageSrc && (
          <div className="absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 pointer-events-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageSrc} 
              alt={name}
              className="w-full h-full object-contain drop-shadow-sm scale-[1.3]"
            />
          </div>
        )}
        
        {/* Text centered at bottom */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <p className="text-[#5A5C5E] text-xl sm:text-2xl tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {name}
          </p>
        </div>
      </div>
    </>
  );

  const containerClasses = `group block relative w-[240px] sm:w-[280px] h-[150px] sm:h-[180px] bg-gradient-to-b from-[#FFFEEA] to-[#FDF4C5] rounded-sm shadow-[4px_4px_8px_rgba(0,0,0,0.12)] transition-all duration-300 ${rotationClass} hover:rotate-0 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,176,240,0.4)] border border-[#E6D99C]`;

  if (onClick) {
    return (
      <button onClick={onClick} className={containerClasses}>
        {innerContent}
      </button>
    );
  }

  return (
    <a href={href} className={containerClasses}>
      {innerContent}
    </a>
  );
}
