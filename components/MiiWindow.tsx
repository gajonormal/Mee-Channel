"use client";

export default function MiiWindow() {
  const greeting = "Olá!";

  return (
    <div 
      className="z-30 absolute top-5 left-2.5 sm:top-7 sm:left-6 group cursor-pointer"
    >
      {/* Bolha com nome do Mii */}
      <div className="absolute z-50 bottom-full mb-1 sm:mb-2 left-1/2 -translate-x-[20px] sm:-translate-x-1/2 opacity-0 scale-75 origin-bottom group-hover:scale-100 group-hover:opacity-100 group-hover:mb-3 sm:group-hover:mb-5 transition-all duration-300 ease-out pointer-events-none">
        <div className="relative bg-gradient-to-b from-[#FFFFFF] to-[#EAEAEA] border-[3px] sm:border-[4px] border-[#787A7D] rounded-full px-4 py-1 sm:px-6 sm:py-2 shadow-[inset_0_0_0_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.15)] whitespace-nowrap">
          <span
            className="text-[#555] text-sm sm:text-lg"
            style={{ fontFamily: '"Wii", sans-serif' }}
          >
            {greeting}
          </span>
        </div>
        <div className="absolute top-full left-[20px] sm:left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] sm:border-l-[10px] sm:border-r-[10px] sm:border-t-[12px] border-l-transparent border-r-transparent border-t-[#787A7D] -mt-[3px] sm:-mt-[4px]" />
        <div className="absolute top-full left-[20px] sm:left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] sm:border-l-[8px] sm:border-r-[8px] sm:border-t-[10px] border-l-transparent border-r-transparent border-t-[#EAEAEA] -mt-[2px]" />
      </div>

      {/* Janela onde fica o mii */}
      <div className="relative w-14 h-14 sm:h-28 sm:w-28 transition-transform active:scale-95">
        <div className="absolute inset-0 rounded-full bg-[#E5E6E7] shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] ring-2 sm:ring-4 ring-[#C5C7CA] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/mii-acenar.gif"
            alt="Mii"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] max-w-none object-contain translate-y-10 sm:translate-y-16 group-hover:translate-y-6 sm:group-hover:translate-y-10 transition-transform duration-300"
          />
        </div>
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{ clipPath: "inset(-150px -150px 50% -150px)" }}
        >
          <img
            src="/assets/mii-acenar.gif"
            alt="Mii"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] max-w-none object-contain translate-y-10 sm:translate-y-16 group-hover:translate-y-6 sm:group-hover:translate-y-10 transition-transform duration-300"
          />
        </div>

        {/* Efeito CRT por cima do mii */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-30">
          <div 
            className="absolute inset-0" 
            style={{
              background: "linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,0.03) 50%)",
              backgroundSize: "100% 2px"
            }} 
          />
        </div>
      </div>
    </div>
  );
}
