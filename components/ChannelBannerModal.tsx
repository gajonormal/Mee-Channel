"use client";

import React, { useEffect, useState } from "react";
import { useChannelBanner } from "./ChannelBannerContext";
import Link from "next/link";

// squircle para os channels
const squirclePath = "M 284.92 16.55 C 284.49 12.67 282.75 9.07 280.01 6.38 C 277.26 3.69 273.68 2.08 269.9 1.83 C 240.25 0.0 196.96 0.0 144.0 0.0 C 91.04 0.0 47.75 0.0 18.1 1.83 C 14.32 2.08 10.74 3.69 7.99 6.38 C 5.25 9.07 3.51 12.67 3.08 16.55 C 1.11 32.88 0.0 59.44 0.0 80.0 C 0.0 100.56 1.11 127.12 3.08 143.45 C 3.51 147.33 5.25 150.93 7.99 153.62 C 10.74 156.31 14.32 157.92 18.1 158.17 C 47.75 160.0 91.04 160.0 144.0 160.0 C 196.96 160.0 240.25 160.0 269.9 158.17 C 273.68 157.92 277.26 156.31 280.01 153.62 C 282.75 150.93 284.49 147.33 284.92 143.45 C 286.89 127.12 288.0 100.53 288.0 80.0 C 288.0 59.47 286.89 32.88 284.92 16.55 Z";

// Mask para todos os cards
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 160" preserveAspectRatio="none"><path d="${squirclePath}" fill="black"/></svg>`;
const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(maskSvg)}")`;

export default function ChannelBannerModal() {
  const { activeBanner, closeBanner } = useChannelBanner();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [show, setShow] = useState(false);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeBanner) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      setShow(true);
      setIsClosing(false);
      setIsExpanded(false);
      setIsTransitioning(true);

      // Timeout de 30ms para o DOM processar o scale antes da sequer começar
      // O react borra-se todo se tirar isto
      const timer = setTimeout(() => {
        setIsExpanded(true);
        // O transition dura 900ms. Depois disso acaba a transição
        setTimeout(() => {
          setIsTransitioning(false);
        }, 900);
      }, 30);
      
      return () => clearTimeout(timer);
    }
  }, [activeBanner]);

  const handleClose = () => {
    setIsClosing(true);
    setIsTransitioning(true);

    // Damos 1150ms de margem para a animação de fecho 
    closeTimeoutRef.current = setTimeout(() => {
      closeBanner();
      setShow(false);
      setIsTransitioning(false);
      closeTimeoutRef.current = null;
    }, 1150);
  };

  if (!show || !activeBanner) return null;

  let currentStyle: React.CSSProperties = {};
  
  if (activeBanner.originRect) {
    const { top, left, width, height } = activeBanner.originRect;
    const scaleX = width / window.innerWidth;
    const scaleY = height / window.innerHeight;

    if (isClosing) {
      currentStyle = {
        transform: `translate(${left}px, ${top}px) scale(${scaleX}, ${scaleY})`,
        opacity: 0,
        transformOrigin: "top left",
        willChange: "transform, opacity",
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-in-out 0.7s", // Fade out starts 100ms before the shrink finishes
      };
    } else if (isExpanded) {
      currentStyle = {
        transform: `translate(0px, 0px) scale(1, 1)`,
        opacity: 1,
        transformOrigin: "top left",
        willChange: "transform, opacity",
        transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)", 
      };
    } else {
      // Estado inicial do card
      currentStyle = {
        transform: `translate(${left}px, ${top}px) scale(${scaleX}, ${scaleY})`,
        opacity: 1,
        transformOrigin: "top left",
        willChange: "transform, opacity",
        transition: "none",
      };
    }
  } else {
    // Fallback
    if (isClosing) {
      currentStyle = { opacity: 0, transition: "opacity 0.3s ease-in" };
    } else if (isExpanded) {
      currentStyle = { opacity: 1, transition: "opacity 0.3s ease-out" };
    } else {
      currentStyle = { opacity: 0, transition: "none" };
    }
  }

  const maskStyle = {
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat"
  };

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {/* O background preto tipo como fica na wii */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity ${isClosing ? "opacity-0" : "opacity-100"}`} 
        style={{ transitionDuration: isClosing ? '800ms' : '600ms' }}
      />

      {/* O container expande com o modal */}
      <div 
        className="absolute inset-0 bg-[#f0f4f8] pointer-events-auto"
        style={{ ...currentStyle, ...maskStyle }}
      >

        {/* Conteudo do banner */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {activeBanner.bannerContent ? (
            React.isValidElement(activeBanner.bannerContent)
              ? typeof (activeBanner.bannerContent as React.ReactElement<any>).type === 'string'
                ? activeBanner.bannerContent
                : React.cloneElement(activeBanner.bannerContent as React.ReactElement<any>, { isAnimating: isClosing })
              : activeBanner.bannerContent
          ) : (
            <div className="text-4xl text-[#888] font-bold">
              {activeBanner.title}
            </div>
          )}
        </div>

        {/* Barra de baixo com os dois botões ja clicaveis */}
        <div 
          className="absolute bottom-0 w-full h-[90px] sm:h-[110px] bg-[#DDE1E4] flex items-center justify-center border-t-2 border-[#C5C7CA] shadow-[inset_0_12px_20px_-8px_rgba(0,0,0,0.25)] z-50"
          style={{
            transform: isExpanded && !isClosing ? 'translateY(0)' : 'translateY(100%)',
            transition: isClosing ? 'transform 350ms ease-in' : 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform'
          }}
        >
          {/* Scanlines na barra como na Wii */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 4px)' }}
          />

          <div className="relative z-10 w-full max-w-4xl px-8 flex justify-center items-center gap-6 sm:gap-12">
            {/* Voltar atras */}
            <button 
              onClick={handleClose}
              className="group relative flex items-center justify-center w-36 sm:w-56 h-14 sm:h-20 rounded-full bg-gradient-to-b from-white to-[#E5E5E5] border-2 border-[#C5C7CA] hover:border-[#00b0f0] shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_0_15px_rgba(0,176,240,0.4)] transition-all active:scale-95"
            >
              <span className="text-[#666] group-hover:text-[#00b0f0] font-medium text-xl sm:text-3xl transition-colors tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>
                Menu
              </span>
            </button>

            {/* Botão de start ao clicar abre os links ou o que seja */}
            <Link 
              href={activeBanner.href}
              target="_blank"
              onClick={handleClose}
              className="group relative flex items-center justify-center w-36 sm:w-56 h-14 sm:h-20 rounded-full bg-gradient-to-b from-white to-[#E5E5E5] border-2 border-[#C5C7CA] hover:border-[#00b0f0] shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_0_15px_rgba(0,176,240,0.4)] transition-all active:scale-95"
            >
              <span className="text-[#666] group-hover:text-[#00b0f0] font-medium text-xl sm:text-3xl transition-colors tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>
                Start
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay crt independente */}
      <div 
        className="absolute inset-0 pointer-events-none crt transition-opacity"
        style={{
          opacity: isClosing ? 0 : 1,
          transitionDuration: isClosing ? '950ms' : '800ms'
        }}
      />
    </div>
  );
}
