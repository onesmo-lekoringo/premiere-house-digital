import { useEffect, useState } from "react";

const QUOTE = {
  text: "Some works are meant to be preserved, or finally allowed to finish.",
  film: "Vermilion"
};

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d / 3_600_000) % 24),
    minutes: Math.floor((d / 60_000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

const TARGET = Date.now() + 20 * 24 * 60 * 60 * 1000;

export function Loader({ onFinished }: { onFinished: () => void }) {
  const [fade, setFade] = useState(false);
  const [t, setT] = useState(() => diff(TARGET));

  useEffect(() => {
    const id = setInterval(() => setT(diff(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Start fade out slightly before finish
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 3300);

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background px-6 transition-opacity duration-700 ease-in-out ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <style>{`
        .loader-container {
          width: 112px;
          height: 112px;
          position: relative;
        }

        .box1,
        .box2,
        .box3 {
          background-color: var(--color-primary, oklch(0.78 0.11 78));
          border-radius: 6px;
          box-sizing: border-box;
          position: absolute;
          display: block;
        }

        .box1 {
          width: 112px;
          height: 48px;
          margin-top: 64px;
          margin-left: 0px;
          animation: abox1 3s 0.2s forwards ease-in-out infinite;
        }

        .box2 {
          width: 48px;
          height: 48px;
          margin-top: 0px;
          margin-left: 0px;
          animation: abox2 3s 0.2s forwards ease-in-out infinite;
        }

        .box3 {
          width: 48px;
          height: 48px;
          margin-top: 0px;
          margin-left: 64px;
          animation: abox3 3s 0.2s forwards ease-in-out infinite;
        }

        @keyframes abox1 {
          0% {
            width: 112px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }
          12.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }
          25% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }
          37.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }
          50% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }
          62.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }
          75% {
            width: 48px;
            height: 112px;
            margin-top: 0px;
            margin-left: 0px;
          }
          87.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }
          100% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }
        }

        @keyframes abox2 {
          0% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }
          12.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }
          25% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }
          37.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }
          50% {
            width: 112px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }
          62.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }
          75% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }
          87.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }
          100% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }
        }

        @keyframes abox3 {
          0% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }
          12.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }
          25% {
            width: 48px;
            height: 112px;
            margin-top: 0px;
            margin-left: 64px;
          }
          37.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }
          50% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }
          62.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }
          75% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }
          87.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }
          100% {
            width: 112px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }
        }
      `}</style>

      <div className="flex flex-col items-center max-w-lg text-center">
        <div className="loader-container">
          <div className="box1" />
          <div className="box2" />
          <div className="box3" />
        </div>

        <blockquote className="mt-16 text-foreground/90 font-serif text-xl italic leading-relaxed md:text-2xl animate-reveal">
          &ldquo;{QUOTE.text}&rdquo;
        </blockquote>

        <cite className="mt-4 eyebrow text-primary not-italic animate-reveal" style={{ animationDelay: "150ms" }}>
          — {QUOTE.film}
        </cite>
      </div>
    </div>
  );
}
