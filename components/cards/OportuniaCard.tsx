import Card from "../Card";

export default function OportuniaCard() {
  return (
    <Card
      href="#"
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
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full bg-orange-500/30 blur-xl group-hover:bg-orange-400/50 group-hover:scale-110 transition-all duration-500" />
      </div>
    </Card>
  );
}
