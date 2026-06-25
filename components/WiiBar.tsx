import RepoDisplay from "./RepoDisplay";
import SdCardMenu from "./SdCardMenu";
import Link from "next/link";

// Config
const GITHUB_USERNAME = "gajonormal";

// Types
interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
}

// Vai buscar data
// Usa o "revalidate: 300" no fetch para o Next.js guardar o resultado em cache durante 5 mins e não acabar com o limite de APIs do github
async function getLatestRepo(): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      {
        next: { revalidate: 300 },
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    if (!res.ok) return null;

    const events: GitHubEvent[] = await res.json();

    // Procurar push mais recente no github
    const workEvent = events.find(
      (e) => e.type === "PushEvent" || e.type === "CreateEvent"
    );
    if (!workEvent) return null;
    return workEvent.repo.name.split("/")[1] ?? workEvent.repo.name;
  } catch {
    return null;
  }
}

// Component
export default async function WiiBar() {
  const repo = await getLatestRepo();

  return (
    <div className="w-full flex flex-col sm:mb-0 relative animate-dock-slide-up-v2">
        {/* A janela redonda do Mii no canto */}
        <div className="z-30 absolute top-5 left-2.5 sm:top-7 sm:left-6 group cursor-pointer">
        {/* Balão de fala que só aparece no hover */}
        <div className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:mb-4 transition-all duration-300 pointer-events-none flex flex-col items-center">
          <div className="bg-gradient-to-b from-[#FFFFFF] to-[#EAEAEA] border-[3px] sm:border-[4px] border-[#787A7D] rounded-full px-4 py-1 sm:px-6 sm:py-2 shadow-[inset_0_0_0_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.15)] whitespace-nowrap">
            <span
              className="text-[#777] text-sm sm:text-lg tracking-wide"
              style={{ fontFamily: '"Wii", sans-serif' }}
            >
              Bernardo
            </span>
          </div>
          {/* Triângulo feito com CSS borders para fazer o bico do balão de fala */}
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] sm:border-l-[10px] sm:border-r-[10px] sm:border-t-[12px] border-l-transparent border-r-transparent border-t-[#787A7D] -mt-[2px] sm:-mt-[4px]" />
          <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] sm:border-l-[8px] sm:border-r-[8px] sm:border-t-[10px] border-l-transparent border-r-transparent border-t-[#EAEAEA] absolute bottom-[2px] sm:bottom-[4px]" />
        </div>

        {/* O container principal da janela do Mii */}
        <div className="relative w-14 h-14 sm:h-28 sm:w-28 transition-transform active:scale-95">
          
          {/* Camada 1: O fundo cinzento e o Mii normal cortado lá dentro */}
          <div className="absolute inset-0 rounded-full bg-[#E5E6E7] shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] ring-1 sm:ring-2 ring-[#C5C7CA] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mii-acenar.gif"
              alt="Mii"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] max-w-none object-contain translate-y-10 sm:translate-y-16 group-hover:translate-y-6 sm:group-hover:translate-y-10 transition-transform duration-300"
            />
          </div>

          {/* Clip path de cima solta para o Mii aparecer meio fora do circulo */}
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{ clipPath: "inset(-150px -150px 50% -150px)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mii-acenar.gif"
              alt="Mii"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] max-w-none object-contain translate-y-10 sm:translate-y-16 group-hover:translate-y-6 sm:group-hover:translate-y-10 transition-transform duration-300"
            />
          </div>

          {/* Camada 3: Um overlay para dar a ilusão do vidro/CRT por cima da janela */}
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

      {/* O menu em forma de cartão SD com os links */}
      <SdCardMenu />

      {/* O trilho em relevo de onde sai o botão do email */}
      <div 
        className="absolute z-10 rounded-l-full bg-gradient-to-b from-[#EEEEEE] to-[#D4D7D9] border border-[#B0B4B7] shadow-[0_4px_12px_rgba(0,0,0,0.15),inset_2px_2px_4px_rgba(255,255,255,0.9)]
                   h-[52px] w-[150px] top-[22px] right-[-92px]
                   sm:h-[104px] sm:w-[250px] sm:top-[32px] sm:right-[-130px]"
      />

      {/* O botão do email */}
      <Link
        id="email-btn"
        href="/messages"
        className="z-20 absolute transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.2)] rounded-full flex ring-1 hover:ring-2 ring-[#C5C7CA] hover:ring-[#00b0f0] hover:shadow-[0_0_15px_rgba(0,176,240,0.5)] bg-gradient-to-b from-[#F5F5F5] to-[#E0E0E0] w-10 h-10 sm:h-20 sm:w-20 top-7 right-2.5 sm:top-11 sm:right-6 group"
        aria-label="Email"
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto w-5 h-5 sm:w-10 sm:h-10 text-[#9ca3af] transition-colors duration-300"
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M3.98005 2.79497C5.04961 2.25 6.44974 2.25 9.25 2.25H14.75C17.5503 2.25 18.9504 2.25 20.02 2.79497C20.9608 3.27433 21.7257 4.03924 22.205 4.98005C22.75 6.04961 22.75 7.44974 22.75 10.25V13.75C22.75 16.5503 22.75 17.9504 22.205 19.02C21.7257 19.9608 20.9608 20.7257 20.02 21.205C18.9504 21.75 17.5503 21.75 14.75 21.75H9.25C6.44974 21.75 5.04961 21.75 3.98005 21.205C3.03924 20.7257 2.27433 19.9608 1.79497 19.02C1.25 17.9504 1.25 16.5503 1.25 13.75V10.25C1.25 7.44974 1.25 6.04961 1.79497 4.98005C2.27433 4.03924 3.03924 3.27433 3.98005 2.79497ZM6.41603 7.37596C6.07138 7.1462 5.60573 7.23933 5.37596 7.58397C5.1462 7.92862 5.23933 8.39427 5.58397 8.62404L6.58397 9.2907L6.70034 9.36829L6.70034 9.3683C8.19864 10.3674 9.09026 10.9619 10.0527 11.2519C11.3227 11.6346 12.6773 11.6346 13.9473 11.2519C14.9097 10.9619 15.8014 10.3674 17.2996 9.3683L17.2997 9.36829L17.416 9.2907L18.416 8.62404C18.7607 8.39427 18.8538 7.92862 18.624 7.58397C18.3943 7.23933 17.9286 7.1462 17.584 7.37596L16.584 8.04263C14.9337 9.14281 14.2367 9.59812 13.5145 9.81569C12.5268 10.1133 11.4732 10.1133 10.4855 9.81569C9.76334 9.59812 9.0663 9.14281 7.41603 8.04263L7.41597 8.04259L6.41603 7.37596Z" 
            fill="currentColor" 
          />
        </svg>
      </Link>

      {/* Curva com a linha azul na barra inferior */}
      <div className="relative z-0 w-full">
        {/* A barra contínua que preenche a largura toda */}
        <div className="relative w-full h-[58px] sm:h-[95px] overflow-visible">
          <svg className="absolute top-0 left-0 w-full h-[58px] sm:h-[95px] overflow-visible" viewBox="0 0 5000 130" preserveAspectRatio="none">
            <path d="M0 0 H 600 C 1000 0 1200 120 1600 120 H 3400 C 3800 120 4000 0 4400 0 H 5000 L 5000 130 H 0 Z" fill="#DDE1E4" />
            <path transform="translate(0, 1.5)" d="M0 0 H 600 C 1000 0 1200 120 1600 120 H 3400 C 3800 120 4000 0 4400 0 H 5000" fill="none" stroke="#31b8f5" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(0px -2px 6px rgba(49,184,245,0.35)) drop-shadow(0px 3px 8px rgba(0,0,0,0.2)) drop-shadow(0px 6px 20px rgba(0,0,0,0.25))" }} />
          </svg>
          
          {/* O texto do GitHub centrado entre a abertura da barra */}
          <div className="absolute top-[15px] sm:top-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-[80%] sm:w-[60%]">
            {repo ? (
              <RepoDisplay repo={repo} />
            ) : (
              <p className="text-xl sm:text-2xl font-medium text-center whitespace-nowrap text-[#010313]/50 w-full translate-y-3">
                bernardo maia
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#DDE1E4] h-[38px] sm:min-h-[65px]" />
    </div>
  );
}
