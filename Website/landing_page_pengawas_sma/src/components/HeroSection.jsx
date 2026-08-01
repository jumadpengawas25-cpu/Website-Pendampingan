import { useEffect, useState } from "react";
import { supervisor } from "../data.js";
import StatsOverlay from "./StatsOverlay.jsx";

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary overflow-hidden"
      id="hero"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-fixed/30 to-transparent"></div>
      </div>

      <div className="max-w-container-max-width mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10 py-stack-lg">
        <div className="md:col-span-7 flex flex-col justify-center gap-stack-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-on-primary/10 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="text-on-primary font-label-sm uppercase tracking-widest">
              Digital Supervision 2024
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg text-on-primary leading-tight">
            Transformasi Mutu Melalui{" "}
            <span className="text-secondary-fixed-dim">Pendampingan Digital</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-primary/80 max-w-xl">
            Mewujudkan ekosistem pendidikan yang unggul dengan integrasi data
            real-time, pengawasan kolaboratif, dan evaluasi berbasis bukti untuk
            SMA yang lebih maju.
          </p>

          <div className="flex flex-wrap gap-stack-md pt-4">
            <button className="px-8 py-4 bg-secondary-container text-on-secondary-container font-label-md rounded-lg shadow-xl hover:scale-105 transition-transform">
              Mulai Pendampingan
            </button>
            <button className="px-8 py-4 border border-on-primary/30 text-on-primary font-label-md rounded-lg hover:bg-white/5 transition-colors">
              Lihat Laporan
            </button>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <div className="relative w-full aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
            <img
              alt="A professional portrait of an Indonesian school supervisor, Drs. Ahmad M.Pd, a middle-aged man with a wise and friendly expression wearing a formal brown batik shirt. He is sitting in a modern, brightly lit office with books and educational awards in the soft-focus background. The lighting is warm and authoritative, reflecting a corporate professional aesthetic with navy blue and gold accents consistent with the brand."
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={supervisor.photo}
            />
            <div className="absolute bottom-0 left-0 right-0 p-stack-lg bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-on-primary font-title-md">{supervisor.name}</p>
              <p className="text-on-primary/70 font-label-md">{supervisor.title}</p>
            </div>
          </div>
          <StatsOverlay scrolled={scrolled} />
        </div>
      </div>
    </section>
  );
}
