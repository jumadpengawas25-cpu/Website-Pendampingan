import MaterialSymbol from "./MaterialSymbol.jsx";
import { programs, supervisor } from "../data.js";

export default function ProfileSection() {
  return (
    <section className="py-stack-lg bg-surface relative" id="profile">
      <div className="max-w-container-max-width mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row gap-gutter items-start">
          <div className="md:w-1/3">
            <div className="sticky top-28 p-stack-lg bg-white rounded-xl shadow-sm border border-outline-variant">
              <h2 className="font-headline-lg text-primary mb-stack-md">
                Sambutan Pengawas
              </h2>
              <p className="text-on-surface-variant italic mb-stack-lg">
                {`"${supervisor.quote}"`}
              </p>
              <div className="space-y-4">
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

          <div className="md:w-2/3">
            <h3 className="font-title-md text-primary mb-stack-md border-l-4 border-secondary pl-4 uppercase tracking-wider">
              Program Kerja Utama
            </h3>
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
