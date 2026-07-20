import React, { useId } from "react";
import Card from "./Card";
import clsx from "clsx";

interface EmptyCardProps {
  soft?: boolean;
}

const EmptyCard = React.memo(({ soft = false }: EmptyCardProps) => {
  // Id unico para o filtro para não haver conflitos
  const noiseId = useId().replace(/:/g, "");

  return (
    <div className="relative group/empty">
      <Card
        soft={soft}
        href="/"
        empty={true}
        additionalClasses={clsx(
          "hover:scale-100", // acaba com o parent scale
          soft ? "bg-[#F7F7F7]/5" : "bg-[#F7F7F7]/10"
        )}
      >
        {/* Fundo Animado Otimizado via WebM (Hardware Decoding) */}
        <video 
          src="/empty.webm" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-30 group-hover/empty:opacity-50 transition-opacity duration-300" 
        />
        <p className="m-auto text-xl font-semibold text-[#CFD0D8] animate-pulse z-10 relative pointer-events-none opacity-20 group-hover/empty:opacity-40 transition-opacity duration-300">
          Mee
        </p>
      </Card>
    </div>
  );
});

export default EmptyCard;
