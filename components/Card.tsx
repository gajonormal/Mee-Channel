import clsx from "clsx";
import { ReactNode, useId } from "react";

interface CardProps {
  href?: string;
  onClick?: (rect?: DOMRect) => void;
  additionalClasses?: string;
  soft?: boolean;
  children: ReactNode;
}

// Squircles tipo os cards da wii mato-me
const squirclePath = "M 284.92 16.55 C 284.49 12.67 282.75 9.07 280.01 6.38 C 277.26 3.69 273.68 2.08 269.9 1.83 C 240.25 0.0 196.96 0.0 144.0 0.0 C 91.04 0.0 47.75 0.0 18.1 1.83 C 14.32 2.08 10.74 3.69 7.99 6.38 C 5.25 9.07 3.51 12.67 3.08 16.55 C 1.11 32.88 0.0 59.44 0.0 80.0 C 0.0 100.56 1.11 127.12 3.08 143.45 C 3.51 147.33 5.25 150.93 7.99 153.62 C 10.74 156.31 14.32 157.92 18.1 158.17 C 47.75 160.0 91.04 160.0 144.0 160.0 C 196.96 160.0 240.25 160.0 269.9 158.17 C 273.68 157.92 277.26 156.31 280.01 153.62 C 282.75 150.93 284.49 147.33 284.92 143.45 C 286.89 127.12 288.0 100.53 288.0 80.0 C 288.0 59.47 286.89 32.88 284.92 16.55 Z";

// Convertemos a path para data URI para usar como mask-image no CSS
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 160"><path d="${squirclePath}" fill="black"/></svg>`;
const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(maskSvg)}")`;

export default function Card({
  href,
  onClick,
  additionalClasses = "",
  soft = false,
  children,
}: CardProps) {
  const filterId = useId().replace(/:/g, "");

  const shadowParentClass = clsx(
    "relative w-72 h-40 group block text-left transform-gpu",
    soft 
      ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]" 
      : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:[filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.12))_drop-shadow(0_0_8px_rgba(0,176,240,0.25))] transition-all duration-200"
  );

  const maskedCardClass = clsx(
    "flex relative w-full h-full transition-all duration-200 hover:scale-[1.03] transform-gpu [backface-visibility:hidden]",
    additionalClasses
  );

  const maskStyle = {
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat"
  };

  const innerContent = (
    <>
      <div className="overflow-hidden flex relative w-full h-full">
        {children}
      </div>
      
      {/* Overlay para ter sombreado */}
      <svg className="absolute inset-0 pointer-events-none z-50" width="288" height="160" viewBox="0 0 288 160">
        <defs>
          <linearGradient id={`shading-${filterId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="35%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        
        {/* Efeito tipo vidro frutigeraero n shi */}
        <path 
          d={squirclePath} 
          fill={`url(#shading-${filterId})`} 
        />
        <path 
          d={squirclePath} 
          fill="none" 
          stroke="#B3B5B8" 
          strokeWidth="4" 
          className="group-hover:stroke-[#00b0f0] group-hover:stroke-[4px] group-hover:drop-shadow-[0_0_4px_rgba(0,176,240,0.3)] transition-all duration-200" 
        />
      </svg>
    </>
  );

  if (onClick) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onClick(rect);
    };

    return (
      <button onClick={handleClick} className={shadowParentClass}>
        <div className={maskedCardClass} style={maskStyle}>
          {innerContent}
        </div>
      </button>
    );
  }

  if (href && href !== "/") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={shadowParentClass}
      >
        <div className={maskedCardClass} style={maskStyle}>
          {innerContent}
        </div>
      </a>
    );
  }

  return (
    <div className={shadowParentClass}>
      <div className={maskedCardClass} style={maskStyle}>
        {innerContent}
      </div>
    </div>
  );
}
