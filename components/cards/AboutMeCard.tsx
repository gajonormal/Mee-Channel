import Card from "../Card";

export default function AboutMeCard() {
  return (
    <Card
      href=""
      additionalClasses="hover:scale-100 bg-[#ffe97a]"
    >
      <div className="overflow-hidden flex relative w-full h-full rounded-3xl">
        {/* Imagem de background */}
        <img
          className="absolute inset-0 w-full h-full object-cover scale-[1.20] translate-x-12 -translate-y-6 group-hover:scale-[1.3] transition-transform duration-500"
          src="/assets/about-mii.png"
          alt="Mii Sentado"
        />

        {/* Simbolos que aparecem a flutuar */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute bottom-[-30%] left-[5%] text-yellow-600/50 text-5xl font-semibold font-mono opacity-0 group-hover:opacity-100 group-hover:-translate-y-[220px] group-hover:rotate-12 transition-all duration-[1500ms] ease-out">
            {"{ }"}
          </div>
          <div className="absolute bottom-[-40%] left-[25%] text-yellow-600/40 text-6xl font-semibold font-mono opacity-0 group-hover:opacity-100 group-hover:-translate-y-[260px] group-hover:-rotate-12 transition-all duration-[2000ms] ease-out delay-100">
            {"</>"}
          </div>
          <div className="absolute bottom-[-45%] left-[45%] text-yellow-600/50 text-4xl font-semibold font-mono opacity-0 group-hover:opacity-100 group-hover:-translate-y-[180px] group-hover:rotate-35 transition-all duration-[1700ms] ease-out delay-75">
            {"=>"}
          </div>
          <div className="absolute bottom-[-50%] left-[20%] text-yellow-600/30 text-7xl font-semibold font-mono opacity-0 group-hover:opacity-100 group-hover:-translate-y-[300px] group-hover:-rotate-45 transition-all duration-[2200ms] ease-out delay-200">
            [ ]
          </div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 px-[22px] py-4 flex flex-col justify-end items-start h-full">
          <span className="translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-gray-900 drop-shadow-sm">
            About Me
          </span>
          <p className="font-semibold translate-y-6 group-hover:translate-y-0 z-10 text-gray-800 opacity-0 group-hover:opacity-100 transition drop-shadow-sm">
            estudante & dev
          </p>
        </div>
      </div>
    </Card>
  );
}
