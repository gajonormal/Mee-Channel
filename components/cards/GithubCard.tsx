"use client";

import Card from "../Card";
import { useChannelBanner } from "../ChannelBannerContext";

export default function GithubCard() {
  const { openBanner } = useChannelBanner();

  const handleOpen = (rect?: DOMRect) => {
    openBanner({
      id: "github",
      title: "GitHub Channel",
      href: "https://github.com/gajonormal",
      originRect: rect,
      bannerContent: (
        <div className="flex flex-col items-center justify-center animate-bounce-slow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/github.svg" alt="GitHub" className="w-48 h-48 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]" />
          <h2 className="text-4xl mt-8 text-[#555] font-bold tracking-widest drop-shadow-md">GITHUB</h2>
        </div>
      ),
    });
  };

  return (
    <Card
      onClick={handleOpen}
      additionalClasses="hover:scale-100 bg-[#010313]"
    >
      <div className="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="translate-y-6 group-hover:translate-y-0 transition-transform"
          src="/assets/github.svg"
          alt=""
        />
        <span className="translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold">
          github/gajonormal
        </span>
        <p className="font-semibold translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
          o meu código
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute top-5 left-20 w-[256px] h-[158px] group-hover:-translate-y-2 transition-transform opacity-60"
          src="/assets/heatmap.svg"
          alt=""
        />
      </div>
    </Card>
  );
}
