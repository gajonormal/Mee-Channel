"use client";

import { useEffect, useState } from "react";

interface RepoDisplayProps {
  repo: string;
}

export default function RepoDisplay({ repo }: RepoDisplayProps) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);

  // Animação typewriter de escrever no ecrã
  useEffect(() => {
    let i = 0;
    let erasing = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!erasing) {
        // Escrever letra a letra o texto
        i++;
        setDisplayed(repo.slice(0, i));
        setDone(false);

        if (i >= repo.length) {
          // Pausa antes de apagar
          setDone(true);
          timeoutId = setTimeout(() => {
            erasing = true;
            timeoutId = setTimeout(tick, 40);
          }, 3500);
          return;
        }
      } else {
        i--;
        setDisplayed(repo.slice(0, i));
        setDone(false);

        if (i <= 0) {
          erasing = false;
          timeoutId = setTimeout(tick, 600);
          return;
        }
      }

      timeoutId = setTimeout(tick, erasing ? 35 : 60);
    };

    timeoutId = setTimeout(tick, 60);
    return () => clearTimeout(timeoutId);
  }, [repo]);

  // Cursor de escrita, vai piscar mais rapido a escrever e mais lento quando estiver parado
  useEffect(() => {
    const interval = setInterval(
      () => setCursorVisible((v) => !v),
      done ? 530 : 200
    );
    return () => clearInterval(interval);
  }, [done]);

  return (
    <div className="flex flex-col items-center justify-center gap-0.5 select-none">
      <p className="text-[9px] sm:text-[10px] font-semibold text-center whitespace-nowrap text-[#010313]/40 uppercase tracking-[0.15em] leading-none flex items-center gap-1">
        <span className="inline-block w-1 h-1 rounded-full bg-green-500 animate-pulse shrink-0" />
        currently working on
      </p>
      <p className="text-2xl sm:text-3xl font-semibold text-center text-[#010313]/60 leading-none tabular-nums whitespace-nowrap">
        {displayed}
        <span
          className="inline-block w-[2px] h-[1em] bg-[#010313]/50 align-middle ml-0.5 translate-y-[-1px] rounded-sm transition-opacity duration-75"
          style={{ opacity: cursorVisible ? 1 : 0 }}
        />
      </p>
    </div>
  );
}
