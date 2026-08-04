import { Link } from "../router.jsx";
import MaterialSymbol from "./MaterialSymbol.jsx";
import { schools } from "../data.js";

export default function SchoolsSection() {
  return (
    <section className="bg-slate-900/90 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8" id="schools">
      <div className="max-w-container-max-width mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-medium tracking-wide uppercase mb-3">
              ● SATUAN PENDIDIKAN BINAAN
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Daftar SMA Binaan & Ekosistem Supervisi
            </h2>
            <p className="text-blue-200/80 text-sm sm:text-base max-w-2xl">
              Portofolio digital, profil, serta pelaporan capaian mutu dari seluruh Sekolah Menengah Atas di wilayah supervisi aktif Cabang Dinas Pendidikan Kabupaten Malang.
            </p>
          </div>
          <button className="flex items-center gap-2 text-blue-300 hover:text-white">
            Lihat Semua Sekolah
            <MaterialSymbol icon="arrow_forward" className="text-sm" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SchoolCard({ school }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 w-full ${school.accent}`}></div>
      <div className="p-stack-md">
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 bg-surface-container-highest rounded-lg flex items-center justify-center">
            <img
              alt={school.logoAlt}
              className="w-10 h-10 object-contain"
              src={school.logo}
            />
          </div>
          <span
            className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${school.accreditation.class}`}
          >
            {school.accreditation.text}
          </span>
        </div>

        <h4 className="font-title-md text-on-surface mb-1">{school.name}</h4>
        <p className="text-label-sm text-on-surface-variant mb-4">
          {school.address}
        </p>

        <div className="flex gap-2">
          <Link
            to={`/portal-sekolah/${school.slug}`}
            className="flex-1 py-2 text-xs font-bold border border-outline rounded hover:bg-surface-variant transition-colors text-center"
          >
            Profil
          </Link>
          <Link
            to={`/portal-review/${school.slug}`}
            className="flex-1 py-2 text-xs font-bold bg-primary text-on-primary rounded hover:opacity-90 text-center"
          >
            Laporan
          </Link>
        </div>
      </div>
    </div>
  );
}
