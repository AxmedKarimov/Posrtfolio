"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-[666px] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute before:absolute before:w-72 before:h-72 before:bg-gradient-to-br before:from-green-500 before:to-teal-600 before:rounded-full before:blur-3xl before:opacity-30 before:-top-20 before:-left-20 after:absolute after:w-72 after:h-72 after:bg-gradient-to-tr after:from-green-800 after:to-lime-500 after:rounded-full after:blur-3xl after:opacity-30 after:-bottom-20 after:-right-20 z-0"></div>
      </div>
      <div className="relative z-10 text-white px-4 animate-fade-cycle">
        <h1 className="text-center text-5xl font-bold text-white mb-4 relative inline-block">
          Assalomu aleykum, Men <br />
          <span className="text-green-800 relative animate-glow-cycle">
            Karimov Axmed
            <span className="absolute left-0 top-0 w-full h-full animate-shine-cycle"></span>
          </span>
        </h1>
        <p className="text-center text-2xl text-neutral-300 mb-3 animate-fade-cycle delay-200">
          Veb dasturchi va dizayner sifatida natijaga yo'naltirilgan ishchi.
          Veb- <br />
          saytlar va veb-ilovalarni yaratish va boshqarish orqali umumiy <br />
          mahsulot muvaffaqiyatiga erishish maqsadimdir.
        </p>
        <Link
          href={"/projects"}
          className="w-50 mx-auto text-center block pb-2 pt-2 ps-7 pe-7 bg-green-800 rounded-lg text-white text-xl hover:scale-105 transition-transform duration-300 animate-fade-cycle delay-400"
        >
          Loyihalar
        </Link>
      </div>

      <style jsx>{`
        .animate-fade-cycle {
          animation: fadeCycle 4s ease-in-out infinite;
        }
        @keyframes fadeCycle {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          25% {
            opacity: 1;
            transform: translateY(0);
          }
          75% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        .animate-glow-cycle {
          text-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
          position: relative;
          overflow: hidden;
          animation: glowCycle 4s infinite;
        }
        @keyframes glowCycle {
          0%,
          100% {
            text-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
          }
          50% {
            text-shadow: 0 0 15px rgba(34, 197, 94, 1);
          }
        }

        .animate-shine-cycle {
          content: "";
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          animation: shineCycle 4s infinite;
        }
        @keyframes shineCycle {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: -100%;
          }
        }
      `}</style>
    </div>
  );
}
