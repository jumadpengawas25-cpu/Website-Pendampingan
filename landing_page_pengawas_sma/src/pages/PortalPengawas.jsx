import { useState, useEffect } from "react";
import MaterialSymbol from "../components/MaterialSymbol.jsx";
import { schools } from "../data.js";
import { loadDocuments, saveDocuments, academicPeriods } from "../portalData.js";
import { usePengawasAuth } from "../hooks/usePengawasAuth.js";
import { useNavigate } from "../router.jsx";

const STORAGE_PREFIX = "pengawas_logbook_";
const SUPERVISI_STORAGE_KEY = "pengawas_supervisi";

function getLogbookKey(schoolSlug) {
  return `${STORAGE_PREFIX}${schoolSlug}`;
}

function loadLogbook(schoolSlug) {
  try {
    const key = getLogbookKey(schoolSlug);
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function saveLogbook(schoolSlug, entries) {
  try {
    const key = getLogbookKey(schoolSlug);
    localStorage.setItem(key, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

function loadSupervisiNotes() {
  try {
    const stored = localStorage.getItem(SUPERVISI_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function saveSupervisiNotes(notes) {
  try {
    localStorage.setItem(SUPERVISI_STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore
  }
}

function Dashboard({ schools }) {
  const totalSchools = schools.length;
  const allDocs = schools.flatMap((s) => loadDocuments(s.id));
  const totalDocs = allDocs.length;
  const unverifiedDocs = allDocs.filter((d) => d.status !== "verified").length;
  const totalLogbook = schools.reduce((acc, s) => acc + loadLogbook(s.slug).length, 0);

  const stats = [
    { label: "Sekolah Binaan", value: totalSchools, icon: "school", color: "text-primary" },
    { label: "Total Dokumen Masuk", value: totalDocs, icon: "folder", color: "text-secondary" },
    { label: "Belum Diverifikasi", value: unverifiedDocs, icon: "pending", color: "text-amber-600" },
    { label: "Logbook Terdaftar", value: totalLogbook, icon: "menu_book", color: "text-emerald-600" },
  ];

  return (
    <section className="space-y-gutter">
      <h2 className="font-headline-lg text-headline-lg text-primary">Dashboard Pengawas</h2>
      <p className="text-on-surface-variant font-body-md">Ringkasan aktivitas portal pengawasan sekolah binaan</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                <MaterialSymbol icon={s.icon} className={`text-lg ${s.color}`} />
              </div>
              <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">{s.label}</span>
            </div>
            <span className={`font-headline-lg text-headline-lg ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/30">
        <h3 className="font-title-md text-title-md text-on-surface mb-stack-md">Daftar Sekolah Binaan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {schools.map((s) => (
            <a key={s.id} href={`/portal-pengawas/review/${s.slug}`} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 hover:border-primary transition-colors">
              <img src={s.logo} alt={s.name} className="w-10 h-10 rounded-lg object-contain" />
              <div>
                <p className="font-label-md font-bold text-on-surface">{s.name}</p>
                <p className="text-label-sm text-on-surface-variant">{s.address}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewDokumen({ schools }) {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]?.slug);
  const school = schools.find((s) => s.slug === selectedSchool) || schools[0];
  const [documents, setDocuments] = useState(() => loadDocuments(school.id));
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [noteText, setNoteText] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);

  useEffect(() => {
    setDocuments(loadDocuments(school.id));
  }, [school.id]);

  useEffect(() => {
    saveDocuments(school.id, documents);
  }, [documents, school.id]);

  const filteredDocs = selectedPeriod === "all"
    ? documents
    : documents.filter((d) => d.period === selectedPeriod);

  const handleApprove = (id) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "verified", reviewerNote: "Disetujui oleh Pengawas" } : d
      )
    );
  };

  const handleRevision = (id) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "revision", reviewerNote: "Mohon perbaikan data" } : d
      )
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  const handleSaveNote = (id) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, reviewerNote: noteText } : d
      )
    );
    setShowNoteModal(false);
    setNoteText("");
    setCurrentDocId(null);
  };

  const openNoteModal = (id, currentNote) => {
    setCurrentDocId(id);
    setNoteText(currentNote || "");
    setShowNoteModal(true);
  };

  const categoryLabel = (id) =>
    ({ ksp: "Kurikulum", arkas: "Keuangan", akm: "Evaluasi", perencanaan: "Perencanaan" }[id] ?? id);

  const categoryIcon = (id) =>
    ({ ksp: "description", arkas: "account_balance_wallet", akm: "assessment", perencanaan: "analytics" }[id] ?? "description");

  return (
    <section className="space-y-gutter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Review Dokumen</h2>
          <p className="text-on-surface-variant font-body-md">Verifikasi laporan dan dokumen dari sekolah binaan</p>
        </div>
        <select
          value={selectedSchool}
          onChange={(e) => {
            setSelectedSchool(e.target.value);
            setSelectedPeriod("all");
          }}
          className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-label-md font-bold text-on-surface focus:outline-none focus:border-primary"
        >
          {schools.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
        <div className="p-stack-lg border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-title-md text-title-md text-on-surface">Daftar Dokumen</h3>
          <div className="flex gap-stack-md">
            <div className="relative">
              <input className="pl-10 pr-4 py-2 bg-surface-container-low border-outline-variant rounded-lg text-label-md focus:ring-primary focus:border-primary" placeholder="Cari dokumen..." type="text" />
              <MaterialSymbol icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            </div>
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-label-md text-on-surface focus:outline-none focus:border-primary">
              <option value="all">Semua Periode</option>
              {academicPeriods.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low">
              <tr>
                {["Nama Dokumen", "Kategori", "Tanggal Unggah", "Status", "Catatan", "Aksi"].map((h) => (
                  <th key={h} className="px-stack-lg py-4 font-label-md text-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-stack-lg py-8 text-center text-on-surface-variant">
                    <MaterialSymbol icon="folder_open" className="text-3xl text-outline mb-2" />
                    <p className="text-label-md">Belum ada dokumen untuk sekolah ini</p>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  return (
                    <tr key={doc.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-stack-lg py-5">
                        <div className="flex items-center gap-3">
                          <MaterialSymbol icon={categoryIcon(doc.category)} className="text-primary" />
                          <div>
                            <p className="font-label-md font-bold text-on-surface">{doc.title}</p>
                            <p className="text-[11px] text-on-surface-variant">{doc.subtitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">{categoryLabel(doc.category)}</td>
                      <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">{doc.date}</td>
                      <td className="px-stack-lg py-5">
                        <select
                          value={doc.status}
                          onChange={(e) => handleStatusChange(doc.id, e.target.value)}
                          className="status-pill border-0 cursor-pointer bg-transparent font-bold text-label-sm"
                        >
                          <option value="draft">DRAFT</option>
                          <option value="pending">PENDING</option>
                          <option value="verified">TERVERIFIKASI</option>
                          <option value="revision">BUTUH REVISI</option>
                        </select>
                      </td>
                      <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[150px] truncate">
                        {doc.reviewerNote || "-"}
                      </td>
                      <td className="px-stack-lg py-5">
                        <div className="flex justify-end gap-2">
                          {doc.fileUrl && (
                            <button
                              className="p-2 hover:bg-surface-container-highest rounded-lg text-primary"
                              title="Lihat Dokumen"
                              onClick={() => window.open(doc.fileUrl, "_blank")}
                            >
                              <MaterialSymbol icon="visibility" />
                            </button>
                          )}
                          <button
                            className="p-2 hover:bg-surface-container-highest rounded-lg text-primary"
                            title="Catatan"
                            onClick={() => openNoteModal(doc.id, doc.reviewerNote)}
                          >
                            <MaterialSymbol icon="notes" />
                          </button>
                          {doc.status === "revision" && (
                            <button
                              className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-bold text-label-sm hover:opacity-90"
                              onClick={() => handleApprove(doc.id)}
                            >
                              Setujui
                            </button>
                          )}
                          {doc.status === "pending" && (
                            <>
                              <button
                                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-label-sm hover:opacity-90"
                                onClick={() => handleApprove(doc.id)}
                              >
                                Approve
                              </button>
                              <button
                                className="px-3 py-1.5 bg-amber-500 text-white rounded-lg font-bold text-label-sm hover:opacity-90"
                                onClick={() => handleRevision(doc.id)}
                              >
                                Revisi
                              </button>
                            </>
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

        <div className="p-stack-md bg-surface-container-low flex justify-between items-center border-t border-outline-variant/30">
          <p className="text-label-sm text-on-surface-variant">Menampilkan {filteredDocs.length} dari {documents.length} dokumen</p>
        </div>
      </div>

      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowNoteModal(false)}>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-md text-title-md text-on-surface">Catatan Pengawas</h3>
              <button type="button" onClick={() => setShowNoteModal(false)} className="p-1 hover:bg-surface-container-highest rounded-lg">
                <MaterialSymbol icon="close" />
              </button>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Tulis catatan pengawas di sini..."
              rows={4}
              className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowNoteModal(false)} className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest">Batal</button>
              <button type="button" onClick={() => handleSaveNote(currentDocId)} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function LogbookPengawas({ schools }) {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]?.slug);
  const [entries, setEntries] = useState(() => loadLogbook(schools[0]?.slug));
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tanggal: "",
    fokusPendampingan: "",
    catatanHasil: "",
    umpanBalik: "",
  });

  useEffect(() => {
    setEntries(loadLogbook(selectedSchool));
  }, [selectedSchool]);

  const school = schools.find((s) => s.slug === selectedSchool) || schools[0];

  const handleSave = () => {
    if (!formData.tanggal || !formData.fokusPendampingan) return;
    const newEntry = {
      id: "lb_" + Date.now(),
      sekolah: school.name,
      tanggal: formData.tanggal,
      fokusPendampingan: formData.fokusPendampingan,
      catatanHasil: formData.catatanHasil,
      umpanBalik: formData.umpanBalik,
      createdAt: Date.now(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveLogbook(selectedSchool, updated);
    setFormData({ tanggal: "", fokusPendampingan: "", catatanHasil: "", umpanBalik: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveLogbook(selectedSchool, updated);
  };

  return (
    <section className="space-y-gutter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Logbook Pendampingan</h2>
          <p className="text-on-surface-variant font-body-md">Catat kunjungan dan hasil pendampingan sekolah binaan</p>
        </div>
        <div className="flex gap-3 items-center">
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-label-md font-bold text-on-surface focus:outline-none focus:border-primary"
          >
            {schools.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-label-md hover:opacity-90 transition-opacity"
          >
            <MaterialSymbol icon="add" />
            Catat Kunjungan
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
          <h3 className="font-title-md text-title-md text-on-surface mb-stack-md">Form Catatan Kunjungan / Pendampingan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div>
              <label className="block font-label-md text-on-surface mb-1.5">Pilih Sekolah Binaan</label>
              <input type="text" value={school.name} readOnly className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface" />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-1.5">Tanggal Kunjungan</label>
              <input type="date" value={formData.tanggal} onChange={(e) => setFormData((p) => ({ ...p, tanggal: e.target.value }))} className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary" required />
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-1.5">Fokus Pendampingan</label>
              <input type="text" value={formData.fokusPendampingan} onChange={(e) => setFormData((p) => ({ ...p, fokusPendampingan: e.target.value }))} placeholder="Contoh: Konsultasi Implementasi KOSP" className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary" required />
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-1.5">Catatan / Hasil Pendampingan</label>
              <textarea value={formData.catatanHasil} onChange={(e) => setFormData((p) => ({ ...p, catatanHasil: e.target.value }))} placeholder="Tulis catatan hasil pendampingan..." rows={3} className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-1.5">Umpan Balik</label>
              <textarea value={formData.umpanBalik} onChange={(e) => setFormData((p) => ({ ...p, umpanBalik: e.target.value }))} placeholder="Tulis umpan balik untuk sekolah..." rows={2} className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setShowForm(false); setFormData({ tanggal: "", fokusPendampingan: "", catatanHasil: "", umpanBalik: "" }); }} className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest">Batal</button>
            <button type="button" onClick={handleSave} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity">Simpan</button>
          </div>
        </div>
      )}

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
        <div className="p-stack-lg border-b border-outline-variant/30">
          <h3 className="font-title-md text-title-md text-on-surface">Riwayat Kunjungan - {school.name}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low">
              <tr>
                {["Tanggal", "Fokus Pendampingan", "Catatan Hasil", "Umpan Balik", "Aksi"].map((h) => (
                  <th key={h} className="px-stack-lg py-4 font-label-md text-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-stack-lg py-8 text-center text-on-surface-variant">
                    <MaterialSymbol icon="event_busy" className="text-4xl text-outline mb-2" />
                    <p className="text-label-md">Belum ada catatan kunjungan</p>
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">{entry.tanggal}</td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface font-medium">{entry.fokusPendampingan}</td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[200px] truncate">{entry.catatanHasil || "-"}</td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[150px] truncate">{entry.umpanBalik || "-"}</td>
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
      </div>
    </section>
  );
}

function Supervisi({ schools }) {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]?.slug);
  const [notes, setNotes] = useState(() => loadSupervisiNotes());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tanggal: "",
    evaluasi: "",
    temuan: "",
    rekomendasi: "",
  });

  const school = schools.find((s) => s.slug === selectedSchool) || schools[0];

  const schoolNotes = notes.filter((n) => n.schoolSlug === selectedSchool);

  const handleSave = () => {
    if (!formData.tanggal || !formData.evaluasi) return;
    const newNote = {
      id: "sn_" + Date.now(),
      schoolSlug: selectedSchool,
      schoolName: school.name,
      tanggal: formData.tanggal,
      evaluasi: formData.evaluasi,
      temuan: formData.temuan,
      rekomendasi: formData.rekomendasi,
      createdAt: Date.now(),
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    saveSupervisiNotes(updated);
    setFormData({ tanggal: "", evaluasi: "", temuan: "", rekomendasi: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveSupervisiNotes(updated);
  };

  return (
    <section className="space-y-gutter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Supervisi</h2>
          <p className="text-on-surface-variant font-body-md">Jadwal supervisi dan catatan hasil supervisi sekolah binaan</p>
        </div>
        <div className="flex gap-3 items-center">
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-label-md font-bold text-on-surface focus:outline-none focus:border-primary"
          >
            {schools.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-label-md hover:opacity-90 transition-opacity"
          >
            <MaterialSymbol icon="add" />
            Catatan Supervisi
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
          <h3 className="font-title-md text-title-md text-on-surface mb-stack-md">Input Catatan Hasil Supervisi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div>
              <label className="block font-label-md text-on-surface mb-1.5">Sekolah Binaan</label>
              <input type="text" value={school.name} readOnly className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface" />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-1.5">Tanggal Supervisi</label>
              <input type="date" value={formData.tanggal} onChange={(e) => setFormData((p) => ({ ...p, tanggal: e.target.value }))} className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary" required />
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-1.5">Evaluasi</label>
              <textarea value={formData.evaluasi} onChange={(e) => setFormData((p) => ({ ...p, evaluasi: e.target.value }))} placeholder="Tulis evaluasi supervisi..." rows={3} className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none" required />
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-1.5">Temuan Lapangan</label>
              <textarea value={formData.temuan} onChange={(e) => setFormData((p) => ({ ...p, temuan: e.target.value }))} placeholder="Tulis temuan lapangan..." rows={2} className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-1.5">Rekomendasi Solusi</label>
              <textarea value={formData.rekomendasi} onChange={(e) => setFormData((p) => ({ ...p, rekomendasi: e.target.value }))} placeholder="Tulis rekomendasi solusi..." rows={2} className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setShowForm(false); setFormData({ tanggal: "", evaluasi: "", temuan: "", rekomendasi: "" }); }} className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest">Batal</button>
            <button type="button" onClick={handleSave} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity">Simpan</button>
          </div>
        </div>
      )}

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
        <div className="p-stack-lg border-b border-outline-variant/30">
          <h3 className="font-title-md text-title-md text-on-surface">Catatan Hasil Supervisi - {school.name}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low">
              <tr>
                {["Tanggal", "Evaluasi", "Temuan Lapangan", "Rekomendasi", "Aksi"].map((h) => (
                  <th key={h} className="px-stack-lg py-4 font-label-md text-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {schoolNotes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-stack-lg py-8 text-center text-on-surface-variant">
                    <MaterialSymbol icon="event_busy" className="text-4xl text-outline mb-2" />
                    <p className="text-label-md">Belum ada catatan supervisi</p>
                  </td>
                </tr>
              ) : (
                schoolNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">{note.tanggal}</td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface max-w-[200px]">{note.evaluasi}</td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[150px] truncate">{note.temuan || "-"}</td>
                    <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[150px] truncate">{note.rekomendasi || "-"}</td>
                    <td className="px-stack-lg py-5">
                      <button type="button" onClick={() => handleDelete(note.id)} className="p-2 hover:bg-surface-container-highest rounded-lg text-error" title="Hapus">
                        <MaterialSymbol icon="delete" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function PortalPengawas() {
  const { isLoggedIn, logout } = usePengawasAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "review", label: "Review Dokumen", icon: "verified_user" },
    { id: "logbook", label: "Logbook Pendampingan", icon: "menu_book" },
    { id: "supervisi", label: "Supervisi", icon: "analytics" },
  ];

  if (!isLoggedIn) {
    navigate("/login-pengawas");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-surface border-r border-outline-variant flex flex-col py-stack-lg fixed left-0 top-0 h-screen z-50">
        <div className="px-stack-lg mb-stack-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
              <MaterialSymbol icon="shield" className="text-primary text-xl" />
            </div>
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Portal Pengawas</h1>
              <p className="text-label-sm text-on-surface-variant">SMA Kab. Malang</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col px-stack-md space-y-1 flex-grow">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all text-left w-full ${
                activeTab === tab.id
                  ? "text-primary font-bold border-l-4 border-primary bg-surface-container-low"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              <MaterialSymbol icon={tab.icon} className={activeTab === tab.id ? "text-primary" : "text-on-surface-variant"} />
              <span className="font-label-md text-label-md">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto px-stack-md pt-stack-lg border-t border-outline-variant">
          <div className="flex items-center gap-3 px-4 mb-stack-lg">
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container font-bold">
              PW
            </div>
            <div>
              <p className="text-label-md font-bold text-on-surface">Pengawas</p>
              <p className="text-label-sm text-on-surface-variant">Portal Pengawas</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login-pengawas");
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-error text-on-error rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            <MaterialSymbol icon="logout" />
            Keluar
          </button>
        </div>
      </aside>

      <main className="ml-64 p-margin-desktop min-h-screen">
        {activeTab === "dashboard" && <Dashboard schools={schools} />}
        {activeTab === "review" && <ReviewDokumen schools={schools} />}
        {activeTab === "logbook" && <LogbookPengawas schools={schools} />}
        {activeTab === "supervisi" && <Supervisi schools={schools} />}
      </main>
    </div>
  );
}