import React from "react";

export default function RecordPage() {
  return (
    <main className="w-screen h-screen bg-[#F7F7F7] flex items-center justify-center overflow-hidden relative">
      {/* Escondemos o cursor nesta página para não aparecer na gravação */}
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />

      {/* Camadas da Animação em Ecrã Inteiro */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80">
        
        {/* Ruído Estático */}
        <div className="absolute inset-0 empty-card-noise opacity-[0.03]" />
        
        {/* Scanlines a piscar (escala ajustada para ecrã inteiro) */}
        <div 
          className="absolute inset-0 rendering-pixelated"
          style={{
            backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAYAAABP2FU6AAAAD0lEQVR4nGNgQAb/mUAkAAYYAQIZz76hAAAAAElFTkSuQmCC")',
            // Ajustado para 12px de altura no ecrã inteiro para ficar igual quando for encolhido no cartão
            backgroundSize: "100% 12px", 
            animation: "tv-flicker 0.7s ease-in-out infinite"
          }}
        />
        
        {/* Barra a descer (escala ajustada para ecrã inteiro) */}
        <div 
          className="absolute -inset-y-[100vh] w-full opacity-20 will-change-transform"
          style={{
            backgroundImage: "url('/scroll-bar.png')",
            // A barra ocupa cerca de 1/3 do ecrã inteiro (igual ao cartão original)
            backgroundSize: "100% 30vh",
            // Ajustado para demorar os mesmos 4s a percorrer a distância inteira
            animation: "scroll-tracking-fullscreen 4s linear infinite",
            transform: "translateZ(0)"
          }}
        />
      </div>

      {/* Animação CSS específica para esta página de ecrã inteiro */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-tracking-fullscreen {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}} />

      {/* Alerta Invisivel para ti - Tira as margens vermelhas se quiseres */}
      <div className="absolute top-4 left-4 z-50 bg-red-500 text-white p-4 rounded font-bold shadow-lg opacity-0 hover:opacity-100 transition-opacity">
        GRAVA A PARTIR DE AQUI! F11 PARA TELA CHEIA.<br/>
        Grava 4 segundos certos para o loop ficar perfeito!
      </div>
    </main>
  );
}
