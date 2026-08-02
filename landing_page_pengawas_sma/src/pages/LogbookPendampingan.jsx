import { useState } from "react";
import MaterialSymbol from "../components/MaterialSymbol.jsx";
import SideNavBar from "../components/portal/SideNavBar.jsx";
import { portalInfo } from "../portalData.js";
import { schools, getSchoolBySlug } from "../data.js";
import { useParams } from "../router.jsx";

const initialLogbookEntries = [
  {
    id: "lb1",
    sekolah: "SMAN 1 Pagak",
    sasaran: "Kepala Sekolah",
    fokusKegiatan: "Konsultasi Implementasi KOSP",
    rtl: "Pemantauan pelaksanaan KOSP semester depan",
    tanggal: "25 Okt 2024",
    status: "selesai",
  },
  {
    id: "lb2",
    sekolah: "SMA Muhammadiyah 1 Kepanjen",
    sasaran: "Wakil Kepala Sekolah",
    fokusKegiatan: "Review ARKAS Tahun Anggaran",
    rtl: "Follow-up penyusunan anggaran operasional",
    tanggal: "22 Okt 2024",
    status: "selesai",
  },
  {
    id: "lb3",
    sekolah: "SMA Ar Rohmah Putra",
    sasaran: "Guru Pembimbing",
    fokusKegiatan: "Bimbingan AKM Siswa",
    rtl: "Evaluasi hasil AKM dan penyusunan remedial",
    tanggal: "18 Okt 2024",
    status: "proses",
  },
];

export default function LogbookPendampingan() {
  const params = useParams();
  const school = params.school
    ? getSchoolBySlug(params.school) ?? schools[0]
    : schools[0];
  const schoolName = school ? school.name : portalInfo.school;

  const [entries, setEntries] = useState(initialLogbookEntries);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    sekolah: "",
    sasaran: "",
    fokusKegiatan: "",
    rtl: "",
    tanggal: "",
  });
  const [formError, setFormError] = useState("");
  const [notifEnabled, setNotifEnabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.sekolah.trim()) {
      setFormError("Nama sekolah binaan wajib diisi.");
      return;
    }
    if (!form.sasaran.trim()) {
      setFormError("Sasaran kunjungan wajib diisi.");
      return;
    }
    if (!form.fokusKegiatan.trim()) {
      setFormError("Fokus kegiatan wajib diisi.");
      return;
    }
    if (!form.rtl.trim()) {
      setFormError("RTL (Rencana Tindak Lanjut) wajib diisi.");
      return;
    }
    const newEntry = {
      id: `lb${Date.now()}`,
      sekolah: form.sekolah.trim(),
      sasaran: form.sasaran.trim(),
      fokusKegiatan: form.fokusKegiatan.trim(),
      rtl: form.rtl.trim(),
      tanggal: form.tanggal || new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: "proses",
    };
    setEntries((prev) => [newEntry, ...prev]);
    setForm({ sekolah: "", sasaran: "", fokusKegiatan: "", rtl: "", tanggal: "" });
    setFormError("");
    setFormOpen(false);
  };

  const handleReset = () => {
    setForm({ sekolah: "", sasaran: "", fokusKegiatan: "", rtl: "", tanggal: "" });
    setFormError("");
  };

  const statusLabel = (s) =>
    ({ selesai: "Selesai", proses: "Proses" }[s] ?? s);

  const statusClass = (s) =>
    ({
      selesai: "status-verified",
      proses: "status-pending",
    }[s] ?? "status-draft");

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
              Pencatatan kunjungan dan bimbingan sekolah binaan
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-3 bg-secondary text-on-secondary rounded-lg font-bold shadow-md hover:opacity-90 transition-all"
            onClick={() => setFormOpen(true)}
          >
            <MaterialSymbol icon="add" />
            Catat Kunjungan
          </button>
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
                    style={{ height: `${Math.max((item.count / 10) * 100, 8)}%` }}
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

        {formOpen && (
          <section className="col-span-8 bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50 mb-stack-lg">
            <div className="flex items-center justify-between mb-stack-md">
              <h3 className="font-title-md text-title-md text-on-surface">
                Form Pencatatan Kunjungan
              </h3>
              <button
                type="button"
                className="p-1 hover:bg-surface-container-highest rounded"
                onClick={() => { handleReset(); setFormOpen(false); }}
              >
                <MaterialSymbol icon="close" />
              </button>
            </div>
            <form className="grid grid-cols-2 gap-stack-lg" onSubmit={handleSubmit}>
              <div className="col-span-2">
                <label className="block text-label-md font-bold text-on-surface mb-2">
                  Sekolah Binaan
                </label>
                <input
                  name="sekolah"
                  value={form.sekolah}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Contoh: SMA Muhammadiyah 1 Kepanjen"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-label-md font-bold text-on-surface mb-2">
                  Sasaran Kunjungan
                </label>
                <input
                  name="sasaran"
                  value={form.sasaran}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Contoh: Kepala Sekolah"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-label-md font-bold text-on-surface mb-2">
                  Tanggal Kunjungan
                </label>
                <input
                  name="tanggal"
                  type="date"
                  value={form.tanggal}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-label-md font-bold text-on-surface mb-2">
                  Fokus Kegiatan
                </label>
                <input
                  name="fokusKegiatan"
                  value={form.fokusKegiatan}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Contoh: Konsultasi Implementasi KOSP"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-label-md font-bold text-on-surface mb-2">
                  RTL (Rencana Tindak Lanjut)
                </label>
                <textarea
                  name="rtl"
                  value={form.rtl}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                  placeholder="Tuliskan rencana tindak lanjut setelah kunjungan..."
                  required
                />
              </div>
              {formError && (
                <div className="col-span-2">
                  <p className="text-label-sm text-error font-bold">{formError}</p>
                </div>
              )}
              <div className="col-span-2 flex justify-end gap-stack-md">
                <button
                  type="button"
                  className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest"
                  onClick={() => { handleReset(); setFormOpen(false); }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-secondary text-on-secondary rounded-lg font-bold shadow-md hover:opacity-90 transition-all"
                >
                  Simpan Logbook
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
          <div className="p-stack-lg border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-title-md text-title-md text-on-surface">
              Riwayat Kunjungan
            </h3>
            <span className="text-label-sm text-on-surface-variant">
              {entries.length} entri
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  {[
                    "Sekolah Binaan",
                    "Sasaran",
                    "Fokus Kegiatan",
                    "RTL",
                    "Tanggal",
                    "Status",
                  ].map((h) => (
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
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-surface-container-lowest transition-colors"
                  >
                    <td className="px-stack-lg py-5 font-label-md font-bold text-on-surface">
                      {entry.sekolah}
                    </td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">
                      {entry.sasaran}
                    </td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">
                      {entry.fokusKegiatan}
                    </td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[200px] truncate">
                      {entry.rtl}
                    </td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">
                      {entry.tanggal}
                    </td>
                    <td className="px-stack-lg py-5">
                      <span className={`status-pill ${statusClass(entry.status)}`}>
                        {statusLabel(entry.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {entries.length === 0 && (
            <div className="p-stack-lg text-center text-on-surface-variant">
              <MaterialSymbol icon="event_busy" className="text-4xl text-outline mb-2" />
              <p className="text-label-md">Belum ada catatan kunjungan</p>
              <p className="text-label-sm mt-1">
                Klik tombol &quot;Catat Kunjungan&quot; untuk memulai
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
              © {new Date().getFullYear()} Dinas Pendidikan - Pengawas SMA. All
              rights reserved.
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