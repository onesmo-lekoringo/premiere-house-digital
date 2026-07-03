import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d / 3_600_000) % 24),
    minutes: Math.floor((d / 60_000) % 60),
    seconds: Math.floor((d / 1000) % 60),
    milliseconds: Math.floor((d % 1000) / 10),
    done: d === 0,
  };
}

export function Countdown({
  iso,
  size = "lg",
}: {
  iso: string;
  size?: "lg" | "sm";
}) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 33);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { v: t.days, l: "Days" },
    { v: t.hours, l: "Hrs" },
    { v: t.minutes, l: "Min" },
    { v: t.seconds, l: "Sec" },
  ];

  const big = size === "lg";

  return (
    <div className="flex items-start gap-5 sm:gap-8">
      {units.map((u, i) => (
        <div key={u.l} className="flex items-start gap-5 sm:gap-8">
          <div className="flex flex-col items-center">
            <span
              className={`font-display font-extrabold tabular-nums leading-none ${
                big ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {String(u.v).padStart(2, "0")}
            </span>
            <span className="eyebrow mt-2 text-muted-foreground">{u.l}</span>
          </div>
          {i < units.length - 1 && (
            <span
              className={`font-display font-light text-muted-foreground/40 ${
                big ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"
              }`}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
