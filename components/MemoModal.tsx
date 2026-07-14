import React, { useEffect, useState } from "react";

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemoModal({ isOpen, onClose }: MemoModalProps) {
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  if (!render) return null;

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-[#808080]/60 pointer-events-auto transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      
      {/* Container do modal */}
      <div 
        className={`relative z-10 w-[90%] max-w-[420px] h-[328px] bg-white rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-[#D9D9D9] pointer-events-auto origin-center overflow-hidden ${isOpen ? "animate-memo-pop-in" : "animate-memo-pop-out"}`}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Lined Background atras da barra */}
        <div 
          className="absolute top-10 left-0 right-0 bottom-0 pointer-events-none" 
          style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #E0E0E0 31px, #E0E0E0 32px)' }} 
        />

        {/* Barra no topo cinzenta */}
        <div className="absolute top-0 left-0 w-full h-10 bg-[#9A9C9E]/50 flex justify-center items-center z-10">
          <h2 
            className="text-white text-2xl tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Contact me
          </h2>
        </div>

        {/* Cabeça do Mii no canto */}
        <img 
          src="/assets/Mii_head.png" 
          alt="Mii Head"
          className="absolute top-[56px] left-[20px] w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-sm z-10"
        />

        {/* Rotate de 3 graus para parecer um selo dos colados  */}
        <div className="absolute top-[50px] right-[20px] sm:right-[30px] w-[80px] h-[90px] stamp-bg p-[8px] flex justify-center items-center z-10 rotate-3" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.25))" }}>
          {/* O overflow-hidden aqui corta o GIF perfeitamente dentro da moldura */}
          <div className="w-full h-full bg-[#E5E5E5] flex justify-center items-center overflow-hidden border border-[#CCC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/regular-show.gif" 
              alt="Regular Show Stamp GIF" 
              className="w-[140%] h-[140%] object-cover object-top"
            />
          </div>
        </div>

        {/* Textos da carta */}
        <div className="absolute top-[168px] left-0 w-full h-[32px] flex justify-center items-end pb-1">
          <p className="text-[#888] text-xl" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Feel free to reach out at:
          </p>
        </div>

        <div className="absolute top-[200px] left-0 w-full h-[32px] flex justify-center items-end pb-1">
          <a 
            href="mailto:bernamaia12@gmail.com"
            className="text-[#666] text-xl sm:text-2xl tracking-wide hover:text-[#00b0f0] transition-colors font-medium"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            bernamaia12@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
