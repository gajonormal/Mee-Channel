"use client";

import React, { useEffect, useRef, useState } from "react";

export default function DiscordBanner({ 
  isAnimating = false, 
  variant = "banner" 
}: { 
  isAnimating?: boolean; 
  variant?: "banner" | "card";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(isAnimating);
  const particlesRef = useRef<any[]>([]);
  const rafRef = useRef<number>();

  // For typing indicator animation (if we keep it)
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    if (variant === "banner") {
      const interval = setInterval(() => {
        setDotIndex(prev => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [variant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let s = 1;

    const resize = () => {
      if (!wrapRef.current) return;
      
      // Use offsetWidth/offsetHeight instead of getBoundingClientRect() 
      // so the canvas ignores CSS scale() transforms during modal animations!
      width = wrapRef.current.offsetWidth;
      height = wrapRef.current.offsetHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      s = variant === "card" ? 1 : 1.5;

      const isCard = variant === "card";
      const numParticles = isCard ? 25 : 40;
      particlesRef.current = [];
      for (let i = 0; i < numParticles; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: isCard ? (Math.random() * (height * 0.5) - 20) : Math.random() * height, 
          size: isCard ? 2.5 : (Math.random() > 0.8 ? 5 : 3), 
          shape: isCard 
            ? (Math.random() > 0.5 ? "plus" : "diamond")
            : (Math.random() > 0.5 ? "x" : "circle"),
          phase: Math.random() * Math.PI * 2,
          speedY: isCard ? (Math.random() * 8 + 6) : (Math.random() * 10 - 5), 
          speedX: isCard ? 0 : (Math.random() * 10 - 5),
          minOpacity: Math.random() * 0.15 + 0.05, 
          maxOpacity: Math.random() * 0.4 + 0.6, 
          twinkleSpeed: Math.random() * 2.5 + 1.0 
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();
    let entranceStartTime: number | null = null;
    let hasDrawn = false;

    const drawPlus = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      const thick = size * 0.3; 
      ctx.rect(x - size, y - thick, size * 2, thick * 2);
      ctx.rect(x - thick, y - size, thick * 2, size * 2);
      ctx.fill();
    };

    const drawDiamond = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.85, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size * 0.85, y);
      ctx.closePath();
      ctx.fill();
    };

    const drawX = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      const s = size * 0.6;
      ctx.moveTo(x - s, y - s);
      ctx.lineTo(x + s, y + s);
      ctx.moveTo(x + s, y - s);
      ctx.lineTo(x - s, y + s);
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = size * 0.3;
      ctx.stroke();
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = size * 0.3;
      ctx.stroke();
    };

    const draw = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isAnimatingRef.current && hasDrawn) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      
      if (!isAnimatingRef.current && entranceStartTime === null && hasDrawn) {
        entranceStartTime = now;
      }
      hasDrawn = true;

      const timeSinceEntrance = entranceStartTime ? (now - entranceStartTime) / 1000 : 0;
      
      const globalAlpha = variant === "card" ? 1 : Math.min(timeSinceEntrance / 0.8, 1);

      ctx.clearRect(0, 0, width, height);

      if (variant === "card") {
        const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, "#121a4f"); 
        bgGradient.addColorStop(0.5, "#303c9e"); 
        bgGradient.addColorStop(1, "#5865F2"); 
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = "#1E1F22"; // Deep Discord gray for banner
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalAlpha = globalAlpha;
      ctx.fillStyle = "#FFFFFF";

      const elapsed = now / 1000;
      
      const fadeStart = height * 0.35;
      const fadeEnd = height * 0.65;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i] as any; 
        
        p.x += p.speedX * dt;
        p.y += p.speedY * dt;
        
        let yFade = 1;

        if (variant === "card") {
          if (p.y > fadeEnd) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.y > fadeStart) {
            yFade = 1 - ((p.y - fadeStart) / (fadeEnd - fadeStart));
          }
        } else {
          // Bounce off walls for fireflies
          if (p.x < 0 || p.x > width) p.speedX *= -1;
          if (p.y < 0 || p.y > height) p.speedY *= -1;
        }

        const sine = (Math.sin(elapsed * p.twinkleSpeed + p.phase) + 1) / 2; 
        const breathe = p.minOpacity + sine * (p.maxOpacity - p.minOpacity); 
        const finalOpacity = breathe * yFade;
        
        ctx.globalAlpha = globalAlpha * finalOpacity;

        // Apply PlayStation neon colors for fireflies
        if (variant === "banner") {
          ctx.fillStyle = p.shape === "x" ? "#5865F2" : "#EB459E"; // Blurple and Pink
        } else {
          ctx.fillStyle = "#FFFFFF";
        }

        if (p.shape === "plus") {
          drawPlus(ctx, p.x, p.y, p.size);
        } else if (p.shape === "diamond") {
          drawDiamond(ctx, p.x, p.y, p.size);
        } else if (p.shape === "x") {
          drawX(ctx, p.x, p.y, p.size);
        } else if (p.shape === "circle") {
          drawCircle(ctx, p.x, p.y, p.size);
        }
      }

      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [variant]);

  return (
    <div 
      ref={wrapRef} 
      className="absolute inset-0 w-full h-full"
      style={{ transform: 'translateZ(0)' }}
    >
      <canvas ref={canvasRef} style={{ transform: 'translateZ(0)' }} className="absolute inset-0 w-full h-full block" />
      
      {/* Overlay HTML content for the Banner Mode */}
      {variant === "banner" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center pointer-events-none overflow-hidden text-white font-sans">
          
          {/* Header Logo */}
          <div className="mt-12 flex flex-col items-center justify-center">
            <svg
              className="w-32 h-32 text-white drop-shadow-md"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.926 19.926 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span className="font-black text-7xl tracking-tighter drop-shadow-md">Discord</span>
          </div>

          {/* Profile Card Container (Interactive Hover Reveal anchored to bottom) */}
          <div className="absolute bottom-[90px] sm:bottom-[110px] translate-y-[168px] hover:translate-y-0 group w-[340px] transition-transform duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) pointer-events-auto cursor-default">
            
            {/* The Card Background/Wrapper (Flat bottom to stay flush with the screen edge) */}
            <div className="bg-[#111214] rounded-t-[18px] rounded-b-none overflow-hidden shadow-[0_-8px_24px_rgba(0,0,0,0.4)] relative z-20">
              
              {/* Profile Banner */}
              <div className="h-[120px] bg-[#6de670] relative">
                {/* SVG/Image banner placeholder */}
              </div>

              {/* Avatar and Info Section */}
              <div className="relative px-4 pb-6">
                
                {/* Avatar */}
                <div className="absolute -top-[52px] left-4 rounded-full p-1.5 bg-[#111214]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/pfp.jpg" alt="Avatar" className="w-[84px] h-[84px] rounded-full object-cover bg-gray-800" />
                  {/* Status Indicator */}
                  <div className="absolute bottom-1.5 right-1.5 w-[22px] h-[22px] bg-[#23a559] border-[3.5px] border-[#111214] rounded-full"></div>
                </div>

                {/* Badges */}
                <div className="flex justify-end pt-3 pb-4">
                  <div className="bg-[#1E1F22] rounded-[8px] px-2 py-1 flex items-center gap-1.5 shadow-sm border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/badges/User Badges.svg" className="h-[16px]" alt="Badge" />
                    {/* A segunda badge tem de ser ligeiramente menor (ex: 13px em vez de 16px) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/badges/User Badges-1.svg" className="h-[13px]" alt="Badge" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/badges/User Badges-2.svg" className="h-[16px]" alt="Badge" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/badges/User Badges-3.svg" className="h-[16px]" alt="Badge" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/badges/User Badges-4.svg" className="h-[16px]" alt="Badge" />
                  </div>
                </div>

                {/* User Info Container */}
                <div className="mt-3 bg-[#1E1F22] p-3 rounded-[12px]">
                  <h2 className="text-xl font-bold text-white tracking-wide">
                    gajonormal<span className="text-[#B5BAC1] font-medium">#0001</span>
                  </h2>
                  
                  {/* Divider line */}
                  <div className="h-[1px] w-full bg-white/10 my-3"></div>
                  
                  {/* About Me Section (Always rendered, but initially hidden offscreen because of the container's translate-y) */}
                  <div className="pb-1">
                    <h3 className="text-xs font-bold text-[#B5BAC1] uppercase mb-2">Sobre Mim</h3>
                    <p className="text-sm text-[#DBDEE1] leading-relaxed">
                      Dude, sucking at something is the first step towards being sort of good at something
                    </p>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
