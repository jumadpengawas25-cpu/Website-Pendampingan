import { useState, useEffect } from "react";
import { Link } from "../router.jsx";
import MaterialSymbol from "./MaterialSymbol.jsx";
import TopBar from "./TopBar.jsx";
import logoWebBaru from "../public/Logo web baru.png";
import { schools } from "../data.js";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Profile", href: "#profile" },
  { label: "Sekolah", href: "#schools" },
  { label: "Berita", href: "#news" },
  { label: "Logbook", href: "/logbook" },
  { label: "Portal Sekolah", href: `/portal-sekolah/${schools[0]?.slug}` },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("agenda");
  const [schedules, setSchedules] = useState([
    { id: 1, date: "2024-08-05T08:00", school: "SMA Negeri 1 Jakarta", teacher: "Budi Santoso", subject: "KOSP", status: "Pending" },
    { id: 2, date: "2024-08-07T09:00", school: "SMA Negeri 3 Bandung", teacher: "Siti Aminah", subject: "ARKAS", status: "Pending" },
  ]);
  const [history, setHistory] = useState([
    { id: 1, date: "2024-07-20T08:00", school: "SMA Negeri 2 Surabaya", teacher: "Ahmad Hidayat", subject: "Pendampingan Kurikulum", note: "Implementasi Kurikulum Merdeka berjalan dengan baik. Perlu peningkatan literasi numerasi.", status: "Selesai" },
    { id: 2, date: "2024-07-18T10:00", school: "SMA Negeri 4 Yogyakarta", teacher: "Dewi Lestari", subject: "Supervisi Kelas", note: "Strategi diferensiasi sudah diterapkan dengan baik. Rekomendasi: tambahkan assessmen autentik.", status: "Selesai" },
  ]);
  const [formData, setFormData] = useState({
    date: "",
    school: "",
    teacher: "",
    subject: "",
    status: "Pending",
  });
  const [showNoteFormId, setShowNoteFormId] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [directFormCollapsed, setDirectFormCollapsed] = useState(false);
  const [directFormData, setDirectFormData] = useState({
    school: "",
    teacher: "",
    date: "",
    subject: "",
    note: "",
  });

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        if (window.pageYOffset >= section.offsetTop - 150) {
          current = section.getAttribute("id");
        }
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openScheduleModal = () => {
    setScheduleOpen(true);
    setClosing(false);
    setActiveTab("agenda");
  };

  const closeScheduleModal = () => {
    setClosing(true);
    setTimeout(() => {
      setScheduleOpen(false);
      setClosing(false);
      setActiveTab("agenda");
    }, 200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.date || !formData.school || !formData.teacher || !formData.subject) return;
    const newItem = {
      id: Date.now(),
      ...formData,
    };
    if (formData.status === "Selesai") {
      setHistory((prev) => [newItem, ...prev]);
    } else {
      setSchedules((prev) => [...prev, newItem]);
    }
    setFormData({ date: "", school: "", teacher: "", subject: "", status: "Pending" });
    setActiveTab("agenda");
  };

  const handleOpenNoteForm = (id) => {
    setShowNoteFormId(id);
    setNoteText("");
  };

  const handleCloseNoteForm = () => {
    setShowNoteFormId(null);
    setNoteText("");
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    const item = schedules.find((s) => s.id === showNoteFormId);
    if (!item) return;
    const completedItem = {
      ...item,
      note: noteText.trim(),
      status: "SELESAI",
    };
    setHistory((prev) => [completedItem, ...prev]);
    setSchedules((prev) => prev.filter((s) => s.id !== showNoteFormId));
    handleCloseNoteForm();
  };

  const handleToggleDirectForm = () => {
    setDirectFormCollapsed((prev) => !prev);
  };

  const handleDirectFormChange = (e) => {
    const { name, value } = e.target;
    setDirectFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDirectFormSubmit = () => {
    if (!directFormData.date || !directFormData.school || !directFormData.teacher || !directFormData.subject || !directFormData.note.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: directFormData.date,
      school: directFormData.school,
      teacher: directFormData.teacher,
      subject: directFormData.subject,
      note: directFormData.note.trim(),
      status: "SELESAI",
    };
    setHistory((prev) => [newEntry, ...prev]);
    setDirectFormData({ school: "", teacher: "", date: "", subject: "", note: "" });
    setDirectFormCollapsed(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const tabClass = (tab) =>
    `flex-1 py-3 text-center font-label-md transition-colors border-b-2 ${
      activeTab === tab
        ? "border-secondary-container text-on-surface font-bold"
        : "border-transparent text-on-surface-variant hover:text-on-surface"
    }`;

  const statusBadge = (status) => {
    const isPending = status === "Pending";
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          isPending
            ? "bg-amber-100 text-amber-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        <MaterialSymbol
          icon={isPending ? "schedule" : "check_circle"}
          className="text-xs"
        />
        {status}
      </span>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
        <header className="bg-white shadow-md">
      <nav className="flex justify-between items-center w-full px-margin-desktop max-w-container-max-width mx-auto h-16">
        <Link to="/" className="flex items-center">
          <img
            src={logoWebBaru}
            alt="Ruang Jumad - Portal Pengawas SMA Kab. Malang"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex gap-stack-lg items-center">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("#");
            if (isAnchor) {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  className={`font-body-md text-body-md transition-colors border-b-2 border-transparent pb-1 ${
                    isActive
                      ? "text-primary border-secondary-container font-semibold"
                      : "text-on-surface/75 hover:text-primary"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                to={link.href}
                className="font-body-md text-body-md text-on-surface/75 hover:text-primary transition-colors border-b-2 border-transparent pb-1"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-stack-md">
          <button
            type="button"
            className="hidden md:inline-flex px-5 py-2.5 bg-secondary-container text-on-secondary-container font-label-md rounded-lg hover:bg-secondary-fixed transition-colors shadow-sm items-center gap-2"
            onClick={openScheduleModal}
          >
            <MaterialSymbol icon="calendar_month" className="text-sm" />
            Jadwal Supervisi
          </button>
          <button
            className="md:hidden text-on-surface"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MaterialSymbol icon={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden bg-white shadow-inner transition-[max-height] duration-300 overflow-hidden ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 p-stack-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors py-2.5 px-2 rounded hover:bg-surface-container-low"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="mt-2 px-5 py-2.5 bg-secondary-container text-on-secondary-container font-label-md rounded-lg hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2"
            onClick={openScheduleModal}
          >
            <MaterialSymbol icon="calendar_month" className="text-sm" />
            Jadwal Supervisi
          </button>
        </div>
      </div>

      {scheduleOpen && (
        <div
          className={`fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4 transition-opacity duration-200 ${
            closing ? "opacity-0" : "opacity-100"
          }`}
          onClick={closeScheduleModal}
        >
          <div
            className={`bg-surface-container-lowest rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col transition-all duration-200 ${
              closing ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-stack-lg border-b border-outline-variant">
              <h3 className="font-title-md text-title-md text-on-surface">
                Jadwal Supervisi
              </h3>
              <button
                type="button"
                className="p-1 hover:bg-surface-container-highest rounded transition-colors"
                onClick={closeScheduleModal}
              >
                <MaterialSymbol icon="close" />
              </button>
            </div>

            <div className="flex border-b border-outline-variant">
              <button
                type="button"
                className={tabClass("agenda")}
                onClick={() => setActiveTab("agenda")}
              >
                Agenda Supervisi
              </button>
              <button
                type="button"
                className={tabClass("tambah")}
                onClick={() => setActiveTab("tambah")}
              >
                Tambah Jadwal Baru
              </button>
              <button
                type="button"
                className={tabClass("riwayat")}
                onClick={() => setActiveTab("riwayat")}
              >
                Riwayat & Catatan
              </button>
            </div>

            <div className="p-stack-lg overflow-y-auto flex-1">
              {activeTab === "agenda" && (
                <div className="space-y-3">
                  {schedules.length === 0 ? (
                    <div className="text-center py-8 text-on-surface-variant">
                      <MaterialSymbol icon="event_busy" className="text-4xl mb-2" />
                      <p className="font-body-md">Belum ada jadwal mendatang.</p>
                    </div>
                  ) : (
                    schedules.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant hover:border-primary transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center flex-shrink-0">
                            <MaterialSymbol icon="event" className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-label-md font-bold text-on-surface truncate">
                                {formatDate(item.date)}
                              </p>
                              {statusBadge(item.status)}
                            </div>
                            <p className="text-label-sm text-on-surface-variant mt-1">
                              {item.school}
                            </p>
                            <p className="text-label-sm text-on-surface-variant">
                              {item.teacher} • {item.subject}
                            </p>
                          </div>
                        </div>
                        {showNoteFormId === item.id ? (
                          <div className="mt-2 pt-3 border-t border-outline-variant space-y-3">
                            <div>
                              <label className="block font-label-md text-on-surface mb-1">
                                Catatan Evaluasi / Rekomendasi Pengawas
                              </label>
                              <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Tulis catatan evaluasi dan rekomendasi di sini..."
                                rows={3}
                                className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors resize-none"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                className="px-4 py-1.5 border border-outline text-on-surface rounded-lg font-label-md hover:bg-surface-container-low transition-colors"
                                onClick={handleCloseNoteForm}
                              >
                                Batal
                              </button>
                              <button
                                type="button"
                                className="px-4 py-1.5 bg-secondary text-on-secondary rounded-lg font-label-md font-bold hover:opacity-90 transition-opacity"
                                onClick={handleSaveNote}
                              >
                                Simpan & Pindahkan
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-lg font-label-md font-bold hover:opacity-90 transition-opacity text-xs"
                              onClick={() => handleOpenNoteForm(item.id)}
                            >
                              Selesaikan & Catat Hasil
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "tambah" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-label-md text-on-surface mb-1">
                      Tanggal & Waktu
                    </label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface mb-1">
                      Sekolah Binaan
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      placeholder="Contoh: SMA Negeri 1 Jakarta"
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface mb-1">
                      Nama Guru / Kepala Sekolah
                    </label>
                    <input
                      type="text"
                      name="teacher"
                      value={formData.teacher}
                      onChange={handleInputChange}
                      placeholder="Contoh: Budi Santoso, S.Pd"
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface mb-1">
                      Mata Pelajaran / Fokus Kegiatan
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Contoh: KOSP, Supervisi Kelas, dll."
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface mb-1">
                      Status Agenda
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "riwayat" && (
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 bg-surface-container-low rounded-lg border border-outline-variant hover:border-primary transition-colors"
                    onClick={handleToggleDirectForm}
                  >
                    <span className="font-label-md font-bold text-on-surface flex items-center gap-2">
                      <MaterialSymbol icon="add" className="text-secondary" />
                      Tambah Catatan Supervisi Direct
                    </span>
                    <MaterialSymbol
                      icon={directFormCollapsed ? "expand_less" : "expand_more"}
                      className="text-on-surface-variant"
                    />
                  </button>
                  {directFormCollapsed && (
                    <div className="space-y-3 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant">
                      <div>
                        <label className="block font-label-md text-on-surface mb-1">
                          Sekolah Binaan
                        </label>
                        <input
                          type="text"
                          name="school"
                          value={directFormData.school}
                          onChange={handleDirectFormChange}
                          placeholder="Contoh: SMA Negeri 1 Jakarta"
                          className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-label-md text-on-surface mb-1">
                          Nama Guru / Sasaran
                        </label>
                        <input
                          type="text"
                          name="teacher"
                          value={directFormData.teacher}
                          onChange={handleDirectFormChange}
                          placeholder="Contoh: Budi Santoso, S.Pd"
                          className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-label-md text-on-surface mb-1">
                          Tanggal Supervisi
                        </label>
                        <input
                          type="datetime-local"
                          name="date"
                          value={directFormData.date}
                          onChange={handleDirectFormChange}
                          className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-label-md text-on-surface mb-1">
                          Fokus Kegiatan
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={directFormData.subject}
                          onChange={handleDirectFormChange}
                          placeholder="Contoh: KOSP, Supervisi Kelas, Pendampingan Kurikulum"
                          className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-label-md text-on-surface mb-1">
                          Catatan Evaluasi
                        </label>
                        <textarea
                          name="note"
                          value={directFormData.note}
                          onChange={handleDirectFormChange}
                          placeholder="Tulis catatan evaluasi dan rekomendasi..."
                          rows={3}
                          className="w-full px-3 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors resize-none"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="px-4 py-2 bg-secondary text-on-secondary rounded-lg font-label-md font-bold hover:opacity-90 transition-opacity"
                          onClick={handleDirectFormSubmit}
                        >
                          Simpan Catatan
                        </button>
                      </div>
                    </div>
                  )}
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-on-surface-variant">
                      <MaterialSymbol icon="history" className="text-4xl mb-2" />
                      <p className="font-body-md">Belum ada catatan riwayat.</p>
                    </div>
                  ) : (
                    history.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-surface-container-low rounded-lg border border-outline-variant"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <p className="font-label-md font-bold text-on-surface">
                            {formatDate(item.date)}
                          </p>
                          {statusBadge(item.status)}
                        </div>
                        <p className="text-label-sm text-on-surface-variant mb-1">
                          {item.school}
                        </p>
                        <p className="text-label-sm text-on-surface-variant mb-3">
                          {item.teacher} • {item.subject}
                        </p>
                        <div className="bg-surface-container-highest/50 rounded-lg p-3">
                          <p className="text-label-sm font-bold text-on-surface mb-1">
                            Catatan Evaluasi
                          </p>
                          <p className="text-body-md text-on-surface-variant italic">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="p-stack-lg border-t border-outline-variant flex justify-end gap-2">
              <button
                type="button"
                className="px-6 py-2 border border-outline text-on-surface rounded-lg font-label-md hover:bg-surface-container-low transition-colors"
                onClick={closeScheduleModal}
              >
                Tutup
              </button>
              {activeTab === "tambah" && (
                <button
                  type="button"
                  className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-label-md font-bold hover:opacity-90 transition-opacity"
                  onClick={handleSave}
                >
                  Simpan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
      </div>
    </>
  );
}