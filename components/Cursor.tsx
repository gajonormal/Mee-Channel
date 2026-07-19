"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = (e: MouseEvent) => {
      // requestAnimationFrame evita que ratos poll rate alto explodam o pc 
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          // translate3d obriga o browser a usar a GPU. Fica melhor assim, quem nao tiver gpu dedicada pode ter um derrame a tentar usar, ha sites piores
          cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
        }
        
        // Se bater nos limites do ecrã, esconde o cursor
        // Tolerância de 2px para apanhar movimentos rápidos que "saltam" o pixel 0
        if (e.clientX <= 2 || e.clientY <= 2 || e.clientX >= window.innerWidth - 2 || e.clientY >= window.innerHeight - 2) {
          if (isVisibleRef.current) {
            isVisibleRef.current = false;
            setIsVisible(false);
          }
        } else if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }
      });
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    
    // Fallback robusto para quando o rato sai da janela rapidamente
    const handleMouseOut = (e: MouseEvent) => {
      const rt = e.relatedTarget as HTMLElement | null;
      // Se formos para null (fora do browser) ou para a tag HTML (fora do body)
      if (!rt || rt.nodeName === "HTML") {
        isVisibleRef.current = false;
        setIsVisible(false);
      }
    };
    
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", handleMouseLeave); // Se clicar fora da janela
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", handleMouseLeave);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-150 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {/* Sombra */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/cursor.svg" 
          alt="" 
          className="absolute top-[4px] left-[3px] opacity-20" 
          style={{ filter: "brightness(0) blur(2px)" }} 
        />
        {/* Cursor Real */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/cursor.svg" 
          alt="" 
          className="relative z-10" 
          style={{ 
            filter: "drop-shadow(0 0 4px rgba(0, 176, 240, 0.3)) drop-shadow(0 0 10px rgba(0, 176, 240, 0.15))" 
          }}
        />
      </div>
    </>
  );
}
