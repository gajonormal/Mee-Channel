import Card from "../Card";

const favorites = [
  { emoji: "🎵", label: "MGMT", sub: "music" },
  { emoji: "🎬", label: "Interstellar", sub: "film" },
  { emoji: "📚", label: "Sapiens", sub: "book" },
];

export default function FavoritesCard() {
  return (
    <Card
      href="#"
      additionalClasses="hover:scale-100 bg-gradient-to-br from-[#1c1c2e] to-[#2d1b69]"
    >
      <div className="px-4 py-3 flex flex-col justify-between h-full w-full">
        <p className="text-xs font-semibold text-purple-300/80 uppercase tracking-widest translate-y-0">
          favoritos
        </p>
        <div className="flex flex-col gap-1.5">
          {favorites.map((item) => (
            <div
              key={item.sub}
              className="flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100"
              style={{
                transitionDelay: item.sub === "music" ? "0ms" : item.sub === "film" ? "50ms" : "100ms",
              }}
            >
              <span className="text-sm">{item.emoji}</span>
              <span className="text-white text-sm font-semibold leading-none">
                {item.label}
              </span>
              <span className="text-purple-300/60 text-xs">{item.sub}</span>
            </div>
          ))}
        </div>
        {/* nada de jeito por agora */}
        <div className="absolute top-3 right-4 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-purple-300/40 group-hover:bg-purple-200/80 transition-colors"
              style={{ transitionDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
