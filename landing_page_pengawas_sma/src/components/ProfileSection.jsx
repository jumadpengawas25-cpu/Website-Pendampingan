import MaterialSymbol from "./MaterialSymbol.jsx";
import { programs, supervisor } from "../data.js";

export default function ProfileSection() {
  return (
    <section className="py-stack-lg bg-surface relative" id="profile">
      <div className="max-w-container-max-width mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 h-full flex flex-col justify-between shadow-sm">
              <div>
                <h2 className="font-headline-lg text-primary mb-stack-md">
                  Sambutan Pengawas
                </h2>
                <p className="text-on-surface-variant italic mb-stack-lg">
                  {`"${supervisor.quote}"`}
                </p>
              </div>
              <div className="mt-auto space-y-4 pt-6 border-t border-slate-100">
                {supervisor.education.map((item, i) => (
                  <div className="flex items-center gap-3" key={i}>
                    <MaterialSymbol icon={item.icon} className="text-secondary" />
                    <div>
                      <p className="font-label-md">{item.label}</p>
                      <p className="text-xs text-on-surface-variant">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="mb-stack-lg">
              <div className="inline-flex items-center gap-2 bg-surface-container-low rounded-full px-3 py-1 mb-4">
                <MaterialSymbol icon="circle" className="text-secondary text-[10px]" />
                <span className="text-xs font-label-md text-on-surface-variant">
                  Komitmen Pengawas Sekolah
                </span>
              </div>
              <h2 className="text-4xl font-bold text-[#2D3748] mb-3">
                Kami Siap Melayani Sepenuh Hati
              </h2>
              <p className="text-base text-on-surface-variant">
                Mewujudkan transformasi pendidikan melalui pendampingan yang tulus dan profesional untuk memastikan peningkatan mutu yang berkelanjutan
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              {programs.map((program) => (
                <ProgramCard
                  key={program.title}
                  icon={program.icon}
                  title={program.title}
                  desc={program.desc}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ icon, title, desc }) {
  return (
    <div className="p-stack-md bg-white rounded-lg border border-outline-variant hover:border-primary transition-all group">
      <div className="w-12 h-12 bg-primary-fixed text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
        <MaterialSymbol icon={icon} />
      </div>
      <h4 className="font-title-md mb-2">{title}</h4>
      <p className="text-on-surface-variant font-body-md">{desc}</p>
    </div>
  );
}
