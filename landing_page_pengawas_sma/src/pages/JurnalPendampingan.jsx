import { useState, useEffect } from "react";
import MaterialSymbol from "../components/MaterialSymbol.jsx";
import SideNavBar from "../components/portal/SideNavBar.jsx";
import LoginPortalSekolah from "../components/portal/LoginPortalSekolah.jsx";
import { portalInfo } from "../portalData.js";
import { schools } from "../data.js";
import { sekolahCredentials } from "../data/sekolah.js";
import { useNavigate } from "../router.jsx";
import { usePortalAuth } from "../hooks/usePortalAuth.js";
import { useActiveSchool } from "../hooks/useActiveSchool.js";

function loadPortalLogbooks() {
  try {
    const stored = localStorage.getItem("portal_logbooks");
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function savePortalLogbooks(entries) {
  try {
    localStorage.setItem("portal_logbooks", JSON.stringify(entries));
  } catch {
    // ignore
  }
}

const FOCUS_KEYWORDS = {
  "Kurikulum / Pembelajaran": ["kurikulum", "pembelajaran", "kosp", "arkas", "materi", "belajar", "silabus", "rpp", "tka", "akm"],
  Manajerial: ["manajemen", "kepemimpinan", "kinerja", "sarpras", "keuangan", "anggaran", "inventory", "staf", "guru"],
  "BK / Kesiswaan": ["bk", "kesiswaan", "siswa", "bimbingan", "konseling", "prestasi", "disiplin", "karir", "perpindahan"],
  "Digitalisasi / SI-AREMA": ["digital", "sistem", "arema", "teknologi", "aplikasi", "website", "cloud", "data", "otomatisasi"],
};

function categorizeFocus(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  for (const [focus, keywords] of Object.entries(FOCUS_KEYWORDS)) {
    const score = keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = focus;
    }
  }
  return bestMatch;
}

const MOCK_UPCOMING = [
  { id: "up1", tanggal: "2026-08-12", waktu: "08:30 - 11:30", agenda: "Supervisi Kurikulum - Evaluasi Implementasi KOSP", topik: "Kurikulum / Pembelajaran" },
  { id: "up2", tanggal: "2026-08-19", waktu: "09:00 - 12:00", agenda: "Bimbingan Manajerial - Penguatan Kapasitas Kepemimpinan Sekolah", topik: "Manajerial" },
  { id: "up3", tanggal: "2026-09-02", waktu: "08:00 - 10:00", agenda: "Pendampingan Digitalisasi - Pelatihan SI-AREMA", topik: "Digitalisasi / SI-AREMA" },
];

export default function JurnalPendampingan() {
  const navigate = useNavigate();
  const { isLoggedIn, session } = usePortalAuth();
  const activeSchool = useActiveSchool();
  const school = activeSchool ?? schools[0];
  const schoolName = school?.name ?? portalInfo.school;
  const schoolSlug = school?.slug ?? schools[0]?.slug;

  if (!isLoggedIn) {
    return <LoginPortalSekolah schoolSlug={schoolSlug} />;
  }

  if (session?.schoolSlug && session.schoolSlug !== schoolSlug) {
    navigate("/login-portal");
    return null;
  }

  const [entries, setEntries] = useState(() => loadPortalLogbooks());
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [rtlText, setRtlText] = useState("");
  const [showRtlModal, setShowRtlModal] = useState(false);

  useEffect(() => {
    setEntries(loadPortalLogbooks());
    const interval = setInterval(() => {
      setEntries(loadPortalLogbooks());
    }, 3000);
    return () => clearInterval(interval);
  }, [schoolSlug]);

  const filtered = entries
    .filter((entry) => entry.sekolahSlug === schoolSlug)
    .map((entry) =>
      entry.status === "menunggu" ? { ...entry, status: "diterima" } : entry
    );

  const totalFrekuensi = filtered.length;

  const focusBreakdown = filtered.reduce((acc, entry) => {
    const combined = [entry.kegiatan, entry.capaian, entry.kendala, entry.solusi].join(" ");
    const focus = categorizeFocus(combined);
    if (focus) {
      acc[focus] = (acc[focus] || 0) + 1;
    }
    return acc;
  }, {});

  const focusLabels = ["Kurikulum / Pembelajaran", "Manajerial", "BK / Kesiswaan", "Digitalisasi / SI-AREMA"];
  const focusBgs = ["bg-primary-fixed/30", "bg-emerald-50", "bg-amber-50", "bg-violet-50"];

  const upcomingAgenda = MOCK_UPCOMING;

  const handleSubmitRtl = () => {
    if (!selectedEntry || !rtlText.trim()) return;
    const updated = entries.map((e) =>
      e.id === selectedEntry.id ? { ...e, status: "rtl", rtl: rtlText.trim(), rtlAt: Date.now() } : e
    );
    setEntries(updated);
    savePortalLogbooks(updated);
    setRtlText("");
    setShowRtlModal(false);
    setSelectedEntry(null);
  };

  const handlePrintJurnal = () => {
    const rows = filtered.map((entry, idx) => {
      const focus = categorizeFocus([entry.kegiatan, entry.capaian, entry.kendala, entry.solusi].join(" "));
      const statusLabel = { menunggu: "Menunggu Konfirmasi", diterima: "Diterima", rtl: "Sudah RTL" }[entry.status] || "Menunggu";
      return `
        <tr>
          <td style="text-align:center;width:40px;">${idx + 1}</td>
          <td>${entry.tanggal}</td>
          <td>${entry.kegiatan}</td>
          <td>${entry.capaian || "-"}</td>
          <td>${entry.kendala || "-"}</td>
          <td>${entry.solusi || "-"}</td>
          <td style="text-align:center;">${statusLabel}</td>
          <td>${entry.rtl || "-"}</td>
          <td>${focus || "-"}</td>
        </tr>
      `;
    }).join("");

    const printContent = `
      <html>
        <head>
          <title>Jurnal Pendampingan - ${schoolName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #000; margin: 0; }
            .header { text-align: center; margin-bottom: 16px; }
            .header h1 { font-size: 16px; margin-bottom: 6px; text-transform: uppercase; }
            .header p { font-size: 12px; margin: 2px 0; }
            .info { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 12px; }
            .info div { width: 48%; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border: 1px solid #000; padding: 6px; text-align: left; font-size: 10px; vertical-align: top; }
            th { background-color: #f0f0f0; font-weight: bold; text-align: center; }
            .signature { margin-top: 48px; display: flex; justify-content: space-between; }
            .signature .box { width: 240px; text-align: center; }
            .signature .box p { margin: 0; font-size: 12px; }
            .signature .box .line { margin-top: 56px; border-top: 1px solid #000; }
            .summary { margin-bottom: 16px; font-size: 12px; }
            .summary strong { display: inline-block; width: 180px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>JURNAL PENDAMPINGAN</h1>
            <p>Portal Sekolah Binaan - Dinas Pendidikan</p>
            <p>${schoolName} | NPSN: ${credentialNpsn}</p>
          </div>
          <div class="summary">
            <p><strong>Total Frekuensi Pendampingan:</strong> ${totalFrekuensi} kunjungan</p>
            <p><strong>Periode:</strong> ${new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}</p>
            <p><strong>Dicetak pada:</strong> ${new Date().toLocaleString("id-ID")}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width:40px;">No</th>
                <th>Hari / Tanggal</th>
                <th>Kegiatan</th>
                <th>Capaian Pendampingan</th>
                <th>Kendala</th>
                <th>Solusi / Tindak Lanjut</th>
                <th>Status</th>
                <th>Respons / RTL</th>
                <th>Fokus</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `<tr><td colspan="9" style="text-align:center;">Tidak ada data jurnal pendampingan</td></tr>` : rows}
            </tbody>
          </table>
          <div class="signature">
            <div class="box">
              <p>Pengawas SMA</p>
              <div class="line"></div>
              <p><u>${portalInfo.supervisor}</u></p>
            </div>
            <div class="box">
              <p>Kepala Sekolah</p>
              <div class="line"></div>
              <p><u>${schoolName}</u></p>
            </div>
          </div>
        </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      setTimeout(() => win.print(), 300);
    } else {
      alert("Popup diblokir oleh browser. Izinkan popup untuk mencetak.");
    }
  };

  const credential = sekolahCredentials.find((c) => c.schoolSlug === schoolSlug);
  const credentialNpsn = credential?.npsn ?? "-";

  const statusLabel = (s) => ({ menunggu: "Menunggu", diterima: "Diterima", rtl: "RTL" })[s] || s;
  const statusClass = (s) =>
    ({ menunggu: "status-pending", diterima: "status-verified", rtl: "status-draft" })[s] || "status-draft";

  if (!activeSchool) {
    return null;
  }

  return (
    <>
      <SideNavBar school={school} schoolName={schoolName} />
      <main className="ml-64 p-margin-desktop min-h-screen">
        <header className="flex justify-between items-center mb-stack-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Jurnal Pendampingan
            </h2>
            <p className="text-on-surface-variant font-body-md">
              Ringkasan dan riwayat pendampingan sekolah binaan
            </p>
          </div>
          <button
            type="button"
            onClick={handlePrintJurnal}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-lg font-bold text-label-md hover:opacity-90 transition-opacity"
          >
            <MaterialSymbol icon="picture_as_pdf" />
            Unduh Jurnal (PDF)
          </button>
        </header>

        <div className="bg-surface-container-low rounded-xl border border-outline-variant p-4 mb-stack-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center flex-shrink-0">
            <img
              alt={school.logoAlt}
              className="w-8 h-8 object-contain"
              src={school.logo}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-title-md text-title-md text-on-surface truncate">
              {schoolName}
            </h3>
            <p className="text-label-sm text-on-surface-variant">
              NPSN: {credentialNpsn}
            </p>
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-lg">
          <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <MaterialSymbol icon="fact_check" style={{ fontVariationSettings: "'FILL' 1" }} />
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant">Total Frekuensi</p>
                <p className="font-title-md text-title-md text-on-surface">{totalFrekuensi}</p>
              </div>
            </div>
            <p className="text-label-sm text-on-surface-variant">Kunjungan pendampingan tercatat</p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
            <p className="font-label-md font-bold text-on-surface mb-3">Statistik Fokus Pendampingan</p>
            <div className="grid grid-cols-2 gap-2">
              {focusLabels.map((label, i) => {
                const count = focusBreakdown[label] || 0;
                const pct = totalFrekuensi > 0 ? Math.round((count / totalFrekuensi) * 100) : 0;
                return (
                  <div key={label} className={`rounded-lg p-2 ${focusBgs[i]}`}>
                    <p className="text-[11px] font-bold text-on-surface truncate">{label}</p>
                    <p className="text-label-md font-bold text-on-surface">{count} kunjungan</p>
                    <p className="text-label-sm text-on-surface-variant">{pct}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
            <div className="flex items-center gap-2 mb-3">
              <MaterialSymbol icon="event" className="text-primary" />
              <p className="font-label-md font-bold text-on-surface">Jadwal Mendatang</p>
            </div>
            <div className="space-y-3">
              {upcomingAgenda.map((agenda) => (
                <div key={agenda.id} className="flex items-start gap-3 p-2 rounded-lg bg-surface-container-low">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                    <span className="text-[10px] font-bold text-center leading-tight">
                      {new Date(agenda.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-label-sm font-bold text-on-surface truncate">{agenda.agenda}</p>
                    <p className="text-label-sm text-on-surface-variant">{agenda.waktu} WIB</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-high text-on-surface-variant">
                      {agenda.topik}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
          <div className="p-stack-lg border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-title-md text-title-md text-on-surface">
              Riwayat Jurnal Pendampingan
            </h3>
            <span className="text-label-sm text-on-surface-variant">
              {filtered.length} entri
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Hari / Tanggal", "Kegiatan", "Capaian Pendampingan", "Kendala", "Solusi / Tindak Lanjut", "Aksi & Respons"].map((h) => (
                    <th
                      key={h}
                      className="px-stack-lg py-4 font-label-md text-on-surface-variant uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-stack-lg py-8 text-center text-on-surface-variant">
                      <MaterialSymbol icon="event_busy" className="text-4xl text-outline mb-2" />
                      <p className="text-label-md">Belum ada catatan pendampingan</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((entry) => {
                    const status = entry.status || "menunggu";
                    const hasRtl = !!entry.rtl;
                    return (
                      <tr key={entry.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="px-stack-lg py-5 text-body-md text-on-surface-variant whitespace-nowrap">
                          {entry.tanggal}
                        </td>
                        <td className="px-stack-lg py-5 text-body-md text-on-surface font-medium">
                          {entry.kegiatan}
                        </td>
                        <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[200px]">
                          {entry.capaian || "-"}
                        </td>
                        <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[150px]">
                          {entry.kendala || "-"}
                        </td>
                        <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[150px]">
                          {entry.solusi || "-"}
                        </td>
                        <td className="px-stack-lg py-5">
                          <div className="flex flex-col gap-2">
                            <span className={`status-pill ${statusClass(status)} w-fit`}>
                              {statusLabel(status)}
                            </span>
                            {status === "diterima" && !hasRtl && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedEntry(entry);
                                  setRtlText("");
                                  setShowRtlModal(true);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold hover:opacity-90 transition-opacity w-fit"
                              >
                                <MaterialSymbol icon="edit" />
                                Input RTL
                              </button>
                            )}
                            {hasRtl && (
                              <div className="p-2 rounded-lg bg-surface-container-low border border-outline-variant">
                                <p className="text-label-sm font-bold text-on-surface mb-1">Respons / RTL:</p>
                                <p className="text-label-sm text-on-surface-variant">{entry.rtl}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {showRtlModal && selectedEntry && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => { setShowRtlModal(false); setSelectedEntry(null); }}
          >
            <div
              className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-title-md text-title-md text-on-surface">
                  Input Respons / Progress RTL
                </h3>
                <button
                  type="button"
                  onClick={() => { setShowRtlModal(false); setSelectedEntry(null); }}
                  className="p-1 hover:bg-surface-container-highest rounded-lg"
                >
                  <MaterialSymbol icon="close" />
                </button>
              </div>
              <p className="text-label-sm text-on-surface-variant mb-4">
                Tulis catatan tindak lanjut atau progres pelaksanaan rekomendasi pengawas untuk kunjungan tanggal <strong>{selectedEntry.tanggal}</strong>.
              </p>
              <textarea
                value={rtlText}
                onChange={(e) => setRtlText(e.target.value)}
                placeholder="Tulis respons atau progress RTL..."
                rows={5}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowRtlModal(false); setSelectedEntry(null); }}
                  className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRtl}
                  className="px-8 py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  Simpan RTL
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-stack-lg pt-stack-lg border-t border-outline-variant grid grid-cols-1 md:grid-cols-3 gap-gutter text-on-surface-variant">
          <div className="col-span-1">
            <p className="font-title-md text-title-md text-secondary-fixed mb-2">
              {schoolName}
            </p>
            <p className="text-label-sm">
              Portal jurnal pendampingan untuk transparansi dan akuntabilitas supervisi sekolah.
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <p className="font-bold text-on-surface mb-1">Tautan Cepat</p>
            <a className="text-label-sm hover:text-primary-fixed-dim transition-colors" href="#">
              Panduan Pendampingan
            </a>
            <a className="text-label-sm hover:text-primary-fixed-dim transition-colors" href="#">
              Kebijakan Privasi
            </a>
            <a className="text-label-sm hover:text-primary-fixed-dim transition-colors" href="#">
              Portal Resmi Kemdikbud
            </a>
          </div>
          <div className="col-span-1 text-right">
            <p className="text-label-sm">
              © {new Date().getFullYear()} Dinas Pendidikan - Pengawas SMA. All rights reserved.
            </p>
            <div className="flex justify-end gap-stack-md mt-2">
              <MaterialSymbol className="cursor-pointer hover:text-primary" icon="qr_code_2" />
              <MaterialSymbol className="cursor-pointer hover:text-primary" icon="language" />
              <MaterialSymbol className="cursor-pointer hover:text-primary" icon="mail" />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
