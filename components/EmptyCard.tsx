import Card from "./Card";
import clsx from "clsx";
import { useId } from "react";

interface EmptyCardProps {
  soft?: boolean;
}

export default function EmptyCard({ soft = false }: EmptyCardProps) {
  // Id unico para o filtro para não haver conflitos
  const noiseId = useId().replace(/:/g, "");

  return (
    <div className="opacity-40 transition-opacity hover:opacity-100 relative group/empty">
      <style>{`
        @keyframes scroll-tracking {
          0% { transform: translateY(0); }
          100% { transform: translateY(150px); }
        }
        @keyframes tv-flicker {
          0%, 100% { opacity: 0.015; }
          50% { opacity: 0.025; }
        }
        @keyframes noise-flicker {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.035; }
        }
      `}</style>
      
      <Card
        soft={soft}
        href="/"
        additionalClasses={clsx(
          "hover:scale-100", // acaba com o parent scale
          soft ? "bg-[#F7F7F7]/50" : "bg-[#F7F7F7]"
        )}
      >
        {/* Overlay de interferencia */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-multiply z-0">
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay" 
            style={{ animation: "noise-flicker 0.5s ease-in-out infinite" }}
          >
            <filter id={`noise-${noiseId}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#noise-${noiseId})`} />
          </svg>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)",
              backgroundSize: "100% 4px",
              animation: "tv-flicker 0.7s ease-in-out infinite"
            }}
          />
          <div 
            className="absolute -inset-y-[150px] w-full blur-[4px] opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 100px, rgba(0,0,0,0.1) 120px, rgba(0,0,0,0.1) 130px, transparent 150px)",
              backgroundSize: "100% 150px",
              animation: "scroll-tracking 4s linear infinite"
            }}
          />
        </div>
        <p className="m-auto text-xl font-semibold text-[#CFD0D8] animate-pulse z-10 relative">
          Mee
        </p>
      </Card>
    </div>
  );
}
