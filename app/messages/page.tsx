"use client";

import { useState } from "react";
import Link from "next/link";
import MessageCard from "@/components/MessageCard";
import MemoModal from "@/components/MemoModal";

export default function MessagesPage() {
  const [isMemoOpen, setIsMemoOpen] = useState(false);

  const date = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const formattedDate = `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;

  return (
    <main className="h-screen fixed w-screen overflow-hidden flex flex-col bg-[#EEEEEE] crt">
      {/* Posicionamento random das cartas  */}
      <div className="flex-1 w-full h-full relative animate-fade-in-bottom">
        {/* Carta principal com o contacto */}
        <div className="absolute top-[25%] left-[10%] sm:top-[20%] sm:left-[25%]">
          <MessageCard 
            isOpen={isMemoOpen}
            onClick={(e) => {
              e.preventDefault();
              setIsMemoOpen(true);
            }}
          />
        </div>

        {/* Carta que nao faz nada (aindaa não faz nada) */}
        <div className="absolute top-[45%] right-[15%] sm:top-[40%] sm:right-[20%]">
          <MessageCard 
            name="Nova Carta" 
            imageSrc={null} 
            rotationClass="rotate-6"
            pinColor="orange"
            href="#" 
          />
        </div>
      </div>

      {/* Data em baixo tipo o menu da wii */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none animate-fade-in-bottom">
        <p className="text-[#888A8D] text-3xl tracking-widest drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]" style={{ fontFamily: 'Arial, sans-serif' }}>
          {formattedDate}
        </p>
      </div>

      {/* Botão de voltar */}
      <div className="absolute bottom-6 right-0 h-[80px] w-[130px] animate-fade-in-right">
        <div 
          className="absolute z-10 rounded-l-full bg-gradient-to-b from-[#EEEEEE] to-[#D4D7D9] border border-[#B0B4B7] shadow-[0_4px_12px_rgba(0,0,0,0.15),inset_2px_2px_4px_rgba(255,255,255,0.9)]
                     h-[80px] w-[130px] top-0 right-[-20px]"
        />

        <Link
          href="/"
          className="z-20 absolute transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.2)] rounded-full flex ring-1 hover:ring-2 ring-[#C5C7CA] hover:ring-[#00b0f0] hover:shadow-[0_0_15px_rgba(0,176,240,0.5)] bg-gradient-to-b from-[#F5F5F5] to-[#E0E0E0] w-[60px] h-[60px] top-[10px] left-[30px] group active:scale-95"
          aria-label="Voltar"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="m-auto w-8 h-8 text-[#9ca3af] transition-colors duration-300 group-hover:text-[#00b0f0]"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      {/* Modal que aparece quando se clica nas cartas */}
      <MemoModal isOpen={isMemoOpen} onClose={() => setIsMemoOpen(false)} />
    </main>
  );
}
