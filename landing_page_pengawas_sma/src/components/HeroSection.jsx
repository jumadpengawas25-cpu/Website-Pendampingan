import { useEffect, useState } from "react";
import { Link } from "../router.jsx";
import { supervisor } from "../data.js";
import jumadFotoBaru from "../public/jumad foto baru.png";
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
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary-container to-primary"
      id="hero"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-fixed/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-tertiary-fixed/15 to-transparent"></div>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary-fixed/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-container-max-width mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10 py-stack-lg">
        <div className="md:col-span-7 flex flex-col justify-center gap-stack-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-on-primary/10 rounded-full w-fit backdrop-blur-sm border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="text-on-primary font-label-sm uppercase tracking-widest">
              Digital Supervision 2026
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
            <Link
              to="/portal-sekolah"
              className="px-8 py-4 bg-secondary-container text-on-secondary-container font-label-md rounded-lg shadow-xl hover:scale-105 transition-transform inline-block text-center hover:shadow-2xl"
            >
              Mulai Pendampingan
            </Link>
            <Link
              to="/portal-sekolah"
              className="px-8 py-4 border border-on-primary/30 text-on-primary font-label-md rounded-lg hover:bg-white/5 transition-colors inline-flex items-center justify-center text-center"
            >
              Lihat Laporan
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <div className="relative w-full aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
            <img
              alt="Pak Jumad Pengawas SMA"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={jumadFotoBaru}
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
