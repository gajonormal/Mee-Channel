"use client";

import Card from "../Card";
import { useChannelBanner } from "../ChannelBannerContext";
import GithubBanner from "../GithubBanner";

export default function GithubCard() {
  const { openBanner } = useChannelBanner();

  const handleOpen = (rect?: DOMRect) => {
    openBanner({
      id: "github",
      title: "GitHub Channel",
      href: "https://github.com/gajonormal",
      originRect: rect,
      bannerContent: <GithubBanner />,
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
          className="translate-y-6 group-hover:translate-y-0 transition-transform relative z-10"
          src="/assets/github.svg"
          alt=""
        />
        <span className="translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold relative z-10">
          github/gajonormal
        </span>
        <p className="font-semibold translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
          o meu código
        </p>
        <div className="absolute top-4 -right-2 w-[220px] h-[140px] group-hover:-translate-y-2 transition-transform opacity-60 rounded-xl overflow-hidden pointer-events-none z-0">
          <GithubBanner variant="card" />
        </div>
      </div>
    </Card>
  );
}
