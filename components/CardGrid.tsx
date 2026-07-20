"use client";

import EmptyCard from "@/components/EmptyCard";
import MoreSoonCard from "@/components/MoreSoonCard";
import AboutMeCard from "@/components/cards/AboutMeCard";
import GithubCard from "@/components/cards/GithubCard";
import DiscordCard from "@/components/cards/DiscordCard";
import VisitARCard from "@/components/cards/VisitARCard";
import OportuniaCard from "@/components/cards/OportuniaCard";
import FavoritesCard from "@/components/cards/FavoritesCard";

export default function CardGrid() {
  return (
    <div className="relative w-full">
      {/* Máscara Artificial Esquerda (Otimizada para CPU) */}
      <div className="absolute top-0 bottom-0 left-0 w-[48px] md:w-[80px] bg-gradient-to-r from-[#eeeeee] to-transparent z-50 pointer-events-none" />
      
      {/* Máscara Artificial Direita (Otimizada para CPU) */}
      <div className="absolute top-0 bottom-0 right-0 w-[48px] md:w-[80px] bg-gradient-to-l from-[#eeeeee] to-transparent z-50 pointer-events-none" />

      <div className="w-full overflow-x-auto horizontal-scroll px-12 md:px-20 py-6 relative">
      <div className="grid grid-rows-3 grid-flow-col gap-4 min-w-max mx-auto w-fit card-cascade-v2">
        <MoreSoonCard />
        <GithubCard />
        <EmptyCard />

        <VisitARCard />
        <DiscordCard />
        <EmptyCard />

        <OportuniaCard />
        <FavoritesCard />
        <EmptyCard />

        <AboutMeCard />
        <EmptyCard />
        <EmptyCard soft />

        {Array.from({ length: 3 }).map((_, i) => (
          <EmptyCard key={`empty-${i}`} soft />
        ))}
      </div>
    </div>
    </div>
  );
}
