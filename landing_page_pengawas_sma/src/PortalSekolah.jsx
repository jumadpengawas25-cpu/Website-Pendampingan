import { useState } from "react";
import MaterialSymbol from "./components/MaterialSymbol.jsx";
import { portalInfo, initialDocuments } from "./portalData.js";
import { schools, getSchoolBySlug } from "./data.js";
import { useParams } from "./router.jsx";
import SideNavBar from "./components/portal/SideNavBar.jsx";
import DocumentCounters from "./components/portal/DocumentCounters.jsx";
import AiInsight from "./components/portal/AiInsight.jsx";
import RecentActivity from "./components/portal/RecentActivity.jsx";
import UploadForm from "./components/portal/UploadForm.jsx";
import DocumentTable from "./components/portal/DocumentTable.jsx";

export default function PortalSekolah() {
  const params = useParams();
  const school = params.school
    ? getSchoolBySlug(params.school) ?? schools[0]
    : schools[0];
  const schoolName = school ? school.name : portalInfo.school;

  const [documents, setDocuments] = useState(initialDocuments);
  const [category, setCategory] = useState("ksp");

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleAddDocument = (doc) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

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
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant">
            <MaterialSymbol
              icon="calendar_today"
              className="text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            />
            <span className="text-label-md font-bold">{portalInfo.semester}</span>
          </div>
        </header>

        <DocumentCounters documents={documents} />

        <div className="grid grid-cols-12 gap-gutter mb-stack-lg">
          <UploadForm
            category={category}
            onCategoryChange={handleCategoryChange}
            onAddDocument={handleAddDocument}
          />
          <div className="col-span-4 flex flex-col gap-stack-lg">
            <AiInsight category={category} />
            <RecentActivity />
          </div>
        </div>

        <DocumentTable documents={documents} onDelete={handleDelete} />

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
            <a className="text-label-sm hover:text-primary-fixed-dim transition-colors" href="#">
              Panduan ARKAS
            </a>
            <a className="text-label-sm hover:text-primary-fixed-dim transition-colors" href="#">
              Kebijatan Privasi
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
