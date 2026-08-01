import { supervisor } from "../data.js";

export default function StatsOverlay({ scrolled }) {
  return (
    <div
      className={`absolute -bottom-10 -left-10 md:-left-20 glass-ai p-stack-lg rounded-xl shadow-2xl border border-white/20 hidden md:block w-72 transition-all duration-300 ${
        scrolled ? "translate-y-0 scale-100" : "translate-y-2 scale-95"
      }`}
    >
      <div className="grid grid-cols-2 gap-4">
        {supervisor.stats.map((stat, i) => (
          <div key={i}>
            <h3 className="font-headline-lg text-primary-fixed-dim leading-none">
              {stat.value}
            </h3>
            <p className="font-label-sm text-on-primary/60 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
