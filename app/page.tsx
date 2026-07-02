import CardGrid from "@/components/CardGrid";
import WiiBar from "@/components/WiiBar";
import { ChannelBannerProvider } from "@/components/ChannelBannerContext";
import ChannelBannerModal from "@/components/ChannelBannerModal";

export default function Home() {
  return (
    <ChannelBannerProvider>
      {/* O overflow-hidden aqui tem de ter para não aparecer barras de scroll no telemovel */}
      <main className="h-screen fixed w-screen overflow-hidden flex flex-col">
        {/* Espaço flexível para empurrar a WiiBar lá para o fundo e centrar os canais no meio do ecrã */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <CardGrid />
        </div>
        <WiiBar />
      </main>
      <ChannelBannerModal />
    </ChannelBannerProvider>
  );
}
