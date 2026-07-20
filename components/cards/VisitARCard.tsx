import Card from "../Card";
import { useChannelBanner } from "../ChannelBannerContext";

export default function VisitARCard() {
  const { openBanner } = useChannelBanner();

  const handleOpen = (rect?: DOMRect) => {
    openBanner({
      id: "visitar",
      title: "VisitAR",
      href: "#",
      originRect: rect,
      bannerContent: (
        <div className="flex flex-col items-center justify-center animate-bounce-slow">
          <div className="relative mb-6">
            <svg
              className="w-40 h-40 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(56, 189, 248, 1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div 
              className="absolute inset-[10%] rounded-full animate-pulse" 
              style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)' }} 
            />
          </div>
          <h2 className="text-3xl text-[#555] font-bold tracking-widest drop-shadow-md text-center">
            TURISMO EM RA
          </h2>
        </div>
      ),
    });
  };

  return (
    <Card
      onClick={handleOpen}
      additionalClasses="hover:scale-100 bg-gradient-to-br from-[#0a1628] to-[#0d3b6b]"
    >
      <div className="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full overflow-hidden">
        <svg
          className="translate-y-6 group-hover:translate-y-0 transition-transform w-5 h-5 mb-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(56, 189, 248, 1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-white">
          VisitAR
        </span>
        <p className="font-semibold translate-y-6 group-hover:translate-y-0 z-10 text-sky-300 opacity-0 group-hover:opacity-100 transition">
          turismo em realidade aumentada
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute top-0 right-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:-translate-y-1 transition-all duration-500"
          src="/assets/visitar-bg.png"
          alt=""
        />
        {/* efeito de overlay */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-sky-400/40 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700" />
        <div className="absolute top-0 right-0 w-16 h-16 rounded-full border border-cyan-300/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
      </div>
    </Card>
  );
}
