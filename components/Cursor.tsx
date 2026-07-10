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
        
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }
      });
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
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
