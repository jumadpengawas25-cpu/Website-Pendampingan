import MaterialSymbol from "../MaterialSymbol.jsx";
import { portalCategories } from "../../portalData.js";

const aiChecks = [
  { ok: true, label: "Format Dokumen Sesuai", sub: "PDF terdeteksi dengan metadata valid." },
  { ok: "info", label: "Tanda Tangan Digital", sub: "Pastikan stempel basah terpindai jelas." },
];

export default function AiInsight({ category }) {
  const current =
    portalCategories.find((c) => c.id === category) ?? portalCategories[0];

  return (
    <div className="glass-teal p-stack-lg rounded-xl flex-grow relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-on-tertiary-fixed-variant mb-stack-md">
          <MaterialSymbol icon="auto_awesome" />
          <span className="font-label-md font-bold uppercase tracking-wider">
            AI Verifikasi Cepat
          </span>
          <div className="ml-auto flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <MaterialSymbol icon="chat" className="text-[14px] text-green-600" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">
              WA Active
            </span>
          </div>
        </div>

        <p className="text-body-md text-on-surface mb-4">
          Dokumen <span className="font-bold text-tertiary-container">{current.label}</span>{" "}
          Anda sedang dalam tahap pra-analisis otomatis.
        </p>

        <div className="space-y-4">
          {aiChecks.map((check) => (
            <div className="flex items-start gap-3" key={check.label}>
              <MaterialSymbol
                icon={check.ok === true ? "check_circle" : "info"}
                className={
                  check.ok === true ? "text-green-600" : "text-amber-500"
                }
              />
              <div>
                <p className="text-label-md font-bold">{check.label}</p>
                <p className="text-label-sm text-on-surface-variant">{check.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-label-md font-bold text-on-surface-variant mb-1">
            Panduan kategori yang dipilih
          </p>
          <p className="text-label-sm text-on-surface-variant">
            {current.aiTip}
          </p>
        </div>

        <button
          type="button"
          className="w-full mt-6 py-2 border border-on-tertiary-container text-on-tertiary-container rounded-lg font-bold text-label-md hover:bg-on-tertiary-container/10 transition-colors"
        >
          Lihat Panduan Teknis
        </button>
      </div>
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-tertiary-fixed opacity-10 rounded-full blur-3xl"></div>
    </div>
  );
}
