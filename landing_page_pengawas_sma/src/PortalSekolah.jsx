import { useState, useEffect } from "react";
import MaterialSymbol from "./components/MaterialSymbol.jsx";
import { portalInfo, academicPeriods, loadDocuments, saveDocuments } from "./portalData.js";
import { schools } from "./data.js";
import { sekolahCredentials } from "./data/sekolah.js";
import { useNavigate } from "./router.jsx";
import SideNavBar from "./components/portal/SideNavBar.jsx";
import DocumentCounters from "./components/portal/DocumentCounters.jsx";
import AiInsight from "./components/portal/AiInsight.jsx";
import RecentActivity from "./components/portal/RecentActivity.jsx";
import UploadForm from "./components/portal/UploadForm.jsx";
import DocumentTable from "./components/portal/DocumentTable.jsx";
import LoginPortalSekolah from "./components/portal/LoginPortalSekolah.jsx";
import { usePortalAuth } from "./hooks/usePortalAuth.js";
import { useActiveSchool } from "./hooks/useActiveSchool.js";

function loadPortalLogbooks() {
  try {
    const stored = localStorage.getItem("portal_logbooks");
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

export default function PortalSekolah() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, session } = usePortalAuth();
  const activeSchool = useActiveSchool();

  const schoolSlug = activeSchool?.slug ?? schools[0]?.slug;
  const school = activeSchool ?? schools[0];
  const schoolName = school?.name ?? portalInfo.school;

  const [documents, setDocuments] = useState(() => loadDocuments(school.id));
  const [logbookEntries, setLogbookEntries] = useState(() => loadPortalLogbooks());
  const [category, setCategory] = useState("ksp");
  const [editingDoc, setEditingDoc] = useState(null);
  const [period, setPeriod] = useState("ganjil-2024/2025");

  useEffect(() => {
    setDocuments(loadDocuments(school.id));
  }, [school.id]);

  useEffect(() => {
    saveDocuments(school.id, documents);
  }, [documents, school.id]);

  useEffect(() => {
    setLogbookEntries(loadPortalLogbooks());
    const interval = setInterval(() => {
      setLogbookEntries(loadPortalLogbooks());
    }, 3000);
    return () => clearInterval(interval);
  }, [school.id]);

  const filteredLogbook = logbookEntries.filter(
    (entry) => entry.sekolahSlug === schoolSlug,
  );

  if (!isLoggedIn) {
    return <LoginPortalSekolah schoolSlug={schoolSlug} />;
  }

  if (session?.schoolSlug && session.schoolSlug !== schoolSlug) {
    navigate("/login-portal");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handlePeriodChange = (e) => setPeriod(e.target.value);

  const handleAddDocument = (doc) => {
    setDocuments((prev) => [{ ...doc, schoolId: school.id, period }, ...prev]);
  };

  const handleEditDocument = (doc) => {
    setEditingDoc(doc);
    setCategory(doc.category);
  };

  const handleUpdateDocument = (updatedDoc) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === updatedDoc.id ? { ...updatedDoc, schoolId: school.id, period } : d))
    );
    setEditingDoc(null);
  };

  const handleCancelEdit = () => {
    setEditingDoc(null);
  };

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const credential = sekolahCredentials.find(
    (c) => c.schoolSlug === schoolSlug,
  );

  return (
    <>
      <SideNavBar school={school} schoolName={schoolName} />
      <main className="ml-64 p-margin-desktop min-h-screen">
        <header className="flex justify-between items-center mb-stack-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              {portalInfo.title ?? "Portal Unggah Laporan"}
            </h2>
            <p className="text-on-surface-variant font-body-md">
              {portalInfo.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant">
              <MaterialSymbol
                icon="calendar_today"
                className="text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              />
              <select
                value={period}
                onChange={handlePeriodChange}
                className="bg-transparent text-label-md font-bold text-on-surface focus:outline-none cursor-pointer"
              >
                {academicPeriods.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
              NPSN: {credential?.npsn ?? "-"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-error text-on-error rounded-lg font-label-md font-bold hover:opacity-90 transition-opacity"
          >
            <MaterialSymbol icon="logout" />
            Keluar
          </button>
        </div>

        <DocumentCounters documents={documents} />

        <div className="grid grid-cols-12 gap-gutter mb-stack-lg">
          <UploadForm
            category={category}
            onCategoryChange={handleCategoryChange}
            onAddDocument={handleAddDocument}
            editingDoc={editingDoc}
            onUpdateDocument={handleUpdateDocument}
            onCancelEdit={handleCancelEdit}
          />
          <div className="col-span-4 flex flex-col gap-stack-lg">
            <AiInsight category={category} />
            <RecentActivity />
          </div>
        </div>

        <DocumentTable
          documents={documents}
          onDelete={handleDelete}
          onEditDocument={handleEditDocument}
        />

        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden mt-stack-lg">
          <div className="p-stack-lg border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-title-md text-title-md text-on-surface">
              Logbook Pendampingan
            </h3>
            <span className="text-label-sm text-on-surface-variant">
              {filteredLogbook.length} entri
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Hari / Tanggal", "Kegiatan", "Capaian Pendampingan", "Kendala", "Solusi / Tindak Lanjut"].map((h) => (
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
                {filteredLogbook.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-stack-lg py-8 text-center text-on-surface-variant">
                      <MaterialSymbol icon="event_busy" className="text-4xl text-outline mb-2" />
                      <p className="text-label-md">Belum ada catatan pendampingan</p>
                    </td>
                  </tr>
                ) : (
                  filteredLogbook.map((entry) => (
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
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-stack-lg pt-stack-lg border-t border-outline-variant grid grid-cols-1 md:grid-cols-3 gap-gutter text-on-surface-variant">
          <div className="col-span-1">
            <p className="font-title-md text-title-md text-secondary-fixed mb-2">
              {schoolName}
            </p>
            <p className="text-label-sm">
              Portal manajemen dokumen pendidikan terintegrasi untuk
              transparansi dan akuntabilitas supervisi sekolah.
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <p className="font-bold text-on-surface mb-1">Tautan Cepat</p>
            <a
              className="text-label-sm hover:text-primary-fixed-dim transition-colors"
              href="#"
            >
              Panduan ARKAS
            </a>
            <a
              className="text-label-sm hover:text-primary-fixed-dim transition-colors"
              href="#"
            >
              Kebijatan Privasi
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
