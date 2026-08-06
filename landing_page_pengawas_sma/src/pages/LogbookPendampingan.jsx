import { useState, useEffect } from "react";
import MaterialSymbol from "../components/MaterialSymbol.jsx";
import SideNavBar from "../components/portal/SideNavBar.jsx";
import { portalInfo } from "../portalData.js";
import { schools } from "../data.js";
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

export default function LogbookPendampingan() {
  const activeSchool = useActiveSchool();
  const school = activeSchool ?? schools[0];
  const schoolName = school?.name ?? portalInfo.school;
  const schoolSlug = school?.slug ?? schools[0]?.slug;

  const [entries, setEntries] = useState(() => loadPortalLogbooks());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    sekolah: "",
    tanggal: "",
    kegiatan: "",
    capaian: "",
    kendala: "",
    solusi: "",
  });
  const [notifEnabled, setNotifEnabled] = useState(true);

  const filteredEntries = entries.filter(
    (entry) => entry.sekolahSlug === schoolSlug,
  );

  useEffect(() => {
    setEntries(loadPortalLogbooks());
    const interval = setInterval(() => {
      setEntries(loadPortalLogbooks());
    }, 3000);
    return () => clearInterval(interval);
  }, [schoolSlug]);

  const statusLabel = (s) => ({ selesai: "Selesai", proses: "Proses" })[s] ?? s;

  const statusClass = (s) =>
    ({
      selesai: "status-verified",
      proses: "status-pending",
    })[s] ?? "status-draft";

  const handleSave = () => {
    if (!formData.sekolah || !formData.tanggal || !formData.kegiatan) return;
    const newEntry = {
      id: "lb_" + Date.now(),
      sekolah: school.name,
      sekolahSlug: schoolSlug,
      tanggal: formData.tanggal,
      kegiatan: formData.kegiatan,
      capaian: formData.capaian,
      kendala: formData.kendala,
      solusi: formData.solusi,
      createdAt: Date.now(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    savePortalLogbooks(updated);
    setFormData({ sekolah: "", tanggal: "", kegiatan: "", capaian: "", kendala: "", solusi: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    savePortalLogbooks(updated);
  };

  return (
    <>
      <SideNavBar school={school} schoolName={schoolName} />
      <main className="ml-64 p-margin-desktop min-h-screen">
        <header className="flex justify-between items-center mb-stack-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Logbook Pendampingan
            </h2>
            <p className="text-on-surface-variant font-body-md">
              Riwayat kunjungan dan bimbingan sekolah binaan
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-lg">
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-md">
              Visit Statistics
            </h3>
            <div className="flex items-end justify-between gap-3 h-40 px-2">
              {[
                { month: "Jan", count: 4 },
                { month: "Feb", count: 7 },
                { month: "Mar", count: 5 },
                { month: "Apr", count: 8 },
                { month: "May", count: 6 },
                { month: "Jun", count: 9 },
              ].map((item) => (
                <div
                  key={item.month}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <span className="text-label-sm font-bold text-on-surface">
                    {item.count}
                  </span>
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all"
                    style={{
                      height: `${Math.max((item.count / 10) * 100, 8)}%`,
                    }}
                  />
                  <span className="text-label-sm text-on-surface-variant">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-md">
              Notification Settings
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-label-md font-bold text-on-surface">
                  WhatsApp Automatic Notifications
                </p>
                <p className="text-label-sm text-on-surface-variant">
                  Kirim notifikasi otomatis via WhatsApp
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNotifEnabled(!notifEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifEnabled ? "bg-primary" : "bg-outline-variant"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden mb-stack-lg">
          <div className="p-stack-lg border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-title-md text-title-md text-on-surface">
              Catat Pendampingan
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-label-md hover:opacity-90 transition-opacity"
            >
              <MaterialSymbol icon="add" />
              + Catat Pendampingan
            </button>
          </div>

          {showForm && (
            <div className="p-stack-lg border-b border-outline-variant/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div>
                  <label className="block font-label-md text-on-surface mb-1.5">Nama Sekolah Binaan</label>
                  <select
                    value={formData.sekolah}
                    onChange={(e) => setFormData((p) => ({ ...p, sekolah: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Pilih Sekolah Binaan</option>
                    {schools.map((s) => (
                      <option key={s.slug} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-on-surface mb-1.5">Hari / Tanggal</label>
                  <input
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData((p) => ({ ...p, tanggal: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-on-surface mb-1.5">Kegiatan</label>
                  <input
                    type="text"
                    value={formData.kegiatan}
                    onChange={(e) => setFormData((p) => ({ ...p, kegiatan: e.target.value }))}
                    placeholder="Contoh: Konsultasi Implementasi KOSP"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-on-surface mb-1.5">Capaian Pendampingan</label>
                  <textarea
                    value={formData.capaian}
                    onChange={(e) => setFormData((p) => ({ ...p, capaian: e.target.value }))}
                    placeholder="Tulis capaian pendampingan..."
                    rows={3}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-on-surface mb-1.5">Kendala</label>
                  <textarea
                    value={formData.kendala}
                    onChange={(e) => setFormData((p) => ({ ...p, kendala: e.target.value }))}
                    placeholder="Tulis kendala yang ditemui..."
                    rows={2}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-on-surface mb-1.5">Solusi / Tindak Lanjut</label>
                  <textarea
                    value={formData.solusi}
                    onChange={(e) => setFormData((p) => ({ ...p, solusi: e.target.value }))}
                    placeholder="Tulis solusi atau tindak lanjut..."
                    rows={2}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => { setShowForm(false); setFormData({ sekolah: "", tanggal: "", kegiatan: "", capaian: "", kendala: "", solusi: "" }); }} className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest">Batal</button>
                <button type="button" onClick={handleSave} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity">Simpan</button>
              </div>
            </div>
          )}
        </section>

        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
          <div className="p-stack-lg border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-title-md text-title-md text-on-surface">
              Riwayat Kunjungan
            </h3>
            <span className="text-label-sm text-on-surface-variant">
              {filteredEntries.length} entri
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Hari / Tanggal", "Kegiatan", "Capaian Pendampingan", "Kendala", "Solusi / Tindak Lanjut", "Aksi"].map((h) => (
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
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-stack-lg py-8 text-center text-on-surface-variant">
                      <MaterialSymbol
                        icon="event_busy"
                        className="text-4xl text-outline mb-2"
                      />
                      <p className="text-label-md">Belum ada catatan pendampingan</p>
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-surface-container-lowest transition-colors"
                    >
                      <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">
                        {entry.tanggal}
                      </td>
                      <td className="px-stack-lg py-5 text-body-md text-on-surface font-medium">
                        {entry.kegiatan}
                      </td>
                      <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[200px] truncate">
                        {entry.capaian || "-"}
                      </td>
                      <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[150px] truncate">
                        {entry.kendala || "-"}
                      </td>
                      <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[150px] truncate">
                        {entry.solusi || "-"}
                      </td>
                      <td className="px-stack-lg py-5">
                        <button type="button" onClick={() => handleDelete(entry.id)} className="p-2 hover:bg-surface-container-highest rounded-lg text-error" title="Hapus">
                          <MaterialSymbol icon="delete" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filteredEntries.length === 0 && (
            <div className="p-stack-lg text-center text-on-surface-variant">
              <MaterialSymbol
                icon="event_busy"
                className="text-4xl text-outline mb-2"
              />
              <p className="text-label-md">Belum ada catatan kunjungan</p>
              <p className="text-label-sm mt-1">
                Riwayat kunjungan akan ditampilkan di sini
              </p>
            </div>
          )}
        </section>

        <footer className="mt-stack-lg pt-stack-lg border-t border-outline-variant grid grid-cols-1 md:grid-cols-3 gap-gutter text-on-surface-variant">
          <div className="col-span-1">
            <p className="font-title-md text-title-md text-secondary-fixed mb-2">
              {schoolName}
            </p>
            <p className="text-label-sm">
              Portal logbook pendampingan untuk supervisi sekolah binaan.
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <p className="font-bold text-on-surface mb-1">Tautan Cepat</p>
            <a
              className="text-label-sm hover:text-primary-fixed-dim transition-colors"
              href="#"
            >
              Panduan Pendampingan
            </a>
            <a
              className="text-label-sm hover:text-primary-fixed-dim transition-colors"
              href="#"
            >
              Kebijakan Privasi
            </a>
            <a
              className="text-label-sm hover:text-primary-fixed-dim transition-colors"
              href="#"
            >
              Portal Resmi Kemdikbud
            </a>
          </div>
          <div className="col-span-1 text-right">
            <p className="text-label-sm">
              © {new Date().getFullYear()} Dinas Pendidikan - Pengawas SMA. All
              rights reserved.
            </p>
            <div className="flex justify-end gap-stack-md mt-2">
              <MaterialSymbol
                className="cursor-pointer hover:text-primary"
                icon="qr_code_2"
              />
              <MaterialSymbol
                className="cursor-pointer hover:text-primary"
                icon="language"
              />
              <MaterialSymbol
                className="cursor-pointer hover:text-primary"
                icon="mail"
              />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
