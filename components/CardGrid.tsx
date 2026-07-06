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
    <div
      className="w-full overflow-x-auto horizontal-scroll px-12 md:px-20 py-6"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)",
      }}
    >
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

        {Array.from({ length: 6 }).map((_, i) => (
          <EmptyCard key={`empty-${i}`} soft />
        ))}
      </div>
    </div>
  );
}
