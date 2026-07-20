import Card from "../Card";
import { useChannelBanner } from "../ChannelBannerContext";

export default function OportuniaCard() {
  const { openBanner } = useChannelBanner();

  const handleOpen = (rect?: DOMRect) => {
    openBanner({
      id: "oportunia",
      title: "Oportunia",
      href: "#",
      originRect: rect,
      bannerContent: (
        <div className="flex flex-col items-center justify-center animate-bounce-slow">
          <div className="relative mb-6">
            <svg
              className="w-40 h-40 drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(251, 146, 60, 1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <div 
              className="absolute inset-[10%] rounded-full animate-pulse" 
              style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)' }} 
            />
          </div>
          <h2 className="text-3xl text-[#555] font-bold tracking-widest drop-shadow-md text-center">
            PLATAFORMA
          </h2>
        </div>
      ),
    });
  };

  return (
    <Card
      onClick={handleOpen}
      additionalClasses="hover:scale-100 bg-gradient-to-br from-[#1a0a00] to-[#7c2d12]"
    >
      <div className="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full overflow-hidden">
        <svg
          className="translate-y-6 group-hover:translate-y-0 transition-transform w-5 h-5 mb-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(251, 146, 60, 1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <span className="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-white">
          Oportunia
        </span>
        <p className="font-semibold translate-y-6 group-hover:translate-y-0 z-10 text-orange-300 opacity-0 group-hover:opacity-100 transition">
          plataforma de oportunidades
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute top-0 right-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:-translate-y-1 transition-all duration-500"
          src="/assets/oportunia-bg.png"
          alt=""
        />
        {/* glow a passar pelo card */}
        <div 
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full group-hover:scale-110 transition-all duration-500" 
          style={{ background: 'radial-gradient(ellipse, rgba(249, 115, 22, 0.4) 0%, transparent 70%)' }} 
        />
      </div>
    </Card>
  );
}
