import { useState, useEffect } from "react";
import MaterialSymbol from "../components/MaterialSymbol.jsx";
import WhatsappPreview from "../components/WhatsappPreview.jsx";
import { portalInfo, portalCategories, statusMeta, academicPeriods, loadDocuments, saveDocuments } from "../portalData.js";
import { schools } from "../data.js";
import { useNavigate } from "../router.jsx";
import SideNavBar from "../components/portal/SideNavBar.jsx";
import DocumentCounters from "../components/portal/DocumentCounters.jsx";
import AiInsight from "../components/portal/AiInsight.jsx";
import RecentActivity from "../components/portal/RecentActivity.jsx";
import LoginPortalSekolah from "../components/portal/LoginPortalSekolah.jsx";
import { usePortalAuth } from "../hooks/usePortalAuth.js";
import { useActiveSchool } from "../hooks/useActiveSchool.js";

function ReviewActions({ doc, onApprove, onRevision }) {
  return (
    <div className="flex justify-end gap-2">
      <button
        className="p-2 hover:bg-surface-container-highest rounded-lg text-primary"
        title="Lihat Detail"
        onClick={() => {
          if (doc.fileUrl) {
            window.open(doc.fileUrl, "_blank");
          }
        }}
      >
        <MaterialSymbol icon="visibility" />
      </button>
      {doc.status === "revision" ? (
        <button
          className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-bold text-label-sm hover:opacity-90 transition-opacity"
          onClick={() => onApprove(doc.id)}
        >
          Setujui
        </button>
      ) : doc.status === "pending" ? (
        <>
          <button
            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-label-sm hover:opacity-90 transition-opacity"
            onClick={() => onApprove(doc.id)}
          >
            Approve
          </button>
          <button
            className="px-3 py-1.5 bg-amber-500 text-white rounded-lg font-bold text-label-sm hover:opacity-90 transition-opacity"
            onClick={() => onRevision(doc.id)}
          >
            Revisi
          </button>
        </>
      ) : (
        <span className="px-2 py-1 rounded text-[10px] font-bold bg-surface-container-high text-on-surface-variant">
          {statusMeta[doc.status]?.label ?? doc.status}
        </span>
      )}
    </div>
  );
}

function ReviewTable({ documents, selectedPeriod, onApprove, onRevision }) {
  const filteredDocuments = selectedPeriod === "all"
    ? documents
    : documents.filter((d) => d.period === selectedPeriod);

  const rows = filteredDocuments.length
    ? filteredDocuments
    : [
        {
          id: "empty",
          title: "Belum ada dokumen untuk direview",
          subtitle: "Dokumen akan muncul di sini setelah diunggah.",
          category: "-",
          version: "-",
          versionClass: "bg-surface-container-high text-on-surface-variant",
          date: "-",
          status: "draft",
          reviewerNote: "",
          empty: true,
        },
      ];

  const categoryLabel = (id) =>
    ({
      ksp: "Kurikulum",
      arkas: "Keuangan",
      akm: "Evaluasi",
      perencanaan: "Perencanaan",
    }[id] ?? id);

  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
      <div className="p-stack-lg border-b border-outline-variant/30 flex justify-between items-center">
        <h3 className="font-title-md text-title-md text-on-surface">
          Antrian Review Dokumen
        </h3>
        <div className="flex gap-stack-md">
          <div className="relative">
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-low border-outline-variant rounded-lg text-label-md focus:ring-primary focus:border-primary"
              placeholder="Cari dokumen..."
              type="text"
            />
            <MaterialSymbol
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-outline rounded-lg text-label-md font-bold hover:bg-surface-container-high transition-all">
            <MaterialSymbol icon="filter_list" />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low">
            <tr>
              {[
                "Nama Dokumen",
                "Kategori",
                "Versi",
                "Tanggal Unggah",
                "Status Review",
                "Catatan",
                "Aksi",
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
            {rows.map((doc) => {
              const meta = statusMeta[doc.status];
              return (
                <tr
                  key={doc.id}
                  className="hover:bg-surface-container-lowest transition-colors"
                >
                  <td className="px-stack-lg py-5">
                    <div className="flex items-center gap-3">
                      <MaterialSymbol
                        icon={categoryIcon(doc.category)}
                        className="text-primary"
                      />
                      <div>
                        <p className="font-label-md font-bold text-on-surface">
                          {doc.title}
                        </p>
                        <p className="text-[11px] text-on-surface-variant">
                          {doc.subtitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">
                    {categoryLabel(doc.category)}
                  </td>
                  <td className="px-stack-lg py-5">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold ${doc.versionClass ?? "bg-surface-container-high text-on-surface-variant"}`}
                    >
                      {doc.version ?? "-"}
                    </span>
                  </td>
                  <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">
                    {doc.date}
                  </td>
                  <td className="px-stack-lg py-5">
                    <span className={`status-pill ${meta.class}`}>
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[180px] truncate">
                    {doc.reviewerNote || "-"}
                  </td>
                  <td className="px-stack-lg py-5 text-right">
                     <ReviewActions
                       doc={doc}
                       onApprove={onApprove}
                       onRevision={onRevision}
                     />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-stack-md bg-surface-container-low flex justify-between items-center border-t border-outline-variant/30">
        <p className="text-label-sm text-on-surface-variant">
          Menampilkan {rows.length} dari {documents.length} dokumen
        </p>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest text-on-surface-variant">
            <MaterialSymbol icon="chevron_left" className="text-sm" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-primary bg-primary text-on-primary text-sm font-bold">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest text-on-surface-variant text-sm">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest text-on-surface-variant">
            <MaterialSymbol icon="chevron_right" className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
}

function categoryIcon(category) {
  return (
    {
      ksp: "description",
      arkas: "account_balance_wallet",
      akm: "assessment",
      perencanaan: "analytics",
    }[category] ?? "description"
  );
}

export default function PortalReviewPengawas() {
  const navigate = useNavigate();
  const { isLoggedIn, session } = usePortalAuth();
  const activeSchool = useActiveSchool();

  const schoolSlug = activeSchool?.slug ?? schools[0]?.slug;
  const school = activeSchool ?? schools[0];
  const schoolName = school?.name ?? portalInfo.school;

  const [documents, setDocuments] = useState(() => loadDocuments(school.id));
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [category] = useState("ksp");
  const [waPreview, setWaPreview] = useState(null);

  useEffect(() => {
    setDocuments(loadDocuments(school.id));
  }, [school.id]);

  useEffect(() => {
    saveDocuments(school.id, documents);
  }, [documents, school.id]);

  if (!isLoggedIn) {
    return <LoginPortalSekolah schoolSlug={schoolSlug} />;
  }

  if (session?.schoolSlug && session.schoolSlug !== schoolSlug) {
    navigate("/login-portal");
    return null;
  }

  const handleApprove = (id) => {
    const doc = documents.find((d) => d.id === id);
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "verified", reviewerNote: "Disetujui oleh Pengawas" }
          : d
      )
    );
    if (doc) {
      setWaPreview({
        school: schoolName,
        docType: portalCategories.find((c) => c.id === doc.category)?.label ?? doc.category,
        status: "verified",
        reviewerNote: "Disetujui oleh Pengawas",
        qrLink: "https://verifikasi.example.com/qr/" + doc.id,
      });
    }
  };

  const handleRevision = (id) => {
    const doc = documents.find((d) => d.id === id);
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "revision", reviewerNote: "Mohon perbaikan data" }
          : d
      )
    );
    if (doc) {
      setWaPreview({
        school: schoolName,
        docType: portalCategories.find((c) => c.id === doc.category)?.label ?? doc.category,
        status: "revision",
        reviewerNote: "Mohon perbaikan data",
        qrLink: "https://verifikasi.example.com/qr/" + doc.id,
      });
    }
  };

  const handleCloseWaPreview = () => {
    setWaPreview(null);
  };

  const handleSendWa = (message) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
    setWaPreview(null);
  };

  const handlePeriodChange = (e) => setSelectedPeriod(e.target.value);

  return (
    <>
        <SideNavBar school={school} schoolName={schoolName} />
      <main className="ml-64 p-margin-desktop min-h-screen">
        <header className="flex justify-between items-center mb-stack-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Portal Review Pengawas
            </h2>
            <p className="text-on-surface-variant font-body-md">
              Verifikasi dan review dokumen satuan pendidikan
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
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="bg-transparent text-label-md font-bold text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="all">Semua Periode</option>
                {academicPeriods.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <DocumentCounters documents={documents} />

        <div className="grid grid-cols-12 gap-gutter mb-stack-lg">
          <div className="col-span-8">
            <ReviewTable
              documents={documents}
              selectedPeriod={selectedPeriod}
              onApprove={handleApprove}
              onRevision={handleRevision}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-stack-lg">
            <AiInsight category={category} />
            <RecentActivity />
          </div>
        </div>

        {waPreview && (
          <WhatsappPreview
            schoolName={waPreview.school}
            docType={waPreview.docType}
            status={waPreview.status}
            reviewerNote={waPreview.reviewerNote}
            qrLink={waPreview.qrLink}
            onClose={handleCloseWaPreview}
            onSend={handleSendWa}
          />
        )}

        <footer className="mt-stack-lg pt-stack-lg border-t border-outline-variant grid grid-cols-1 md:grid-cols-3 gap-gutter text-on-surface-variant">
          <div className="col-span-1">
            <p className="font-title-md text-title-md text-secondary-fixed mb-2">
              {schoolName}
            </p>
            <p className="text-label-sm">
              Portal review dokumen pendidikan terintegrasi untuk
              transparansi dan akuntabilitas supervisi sekolah.
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <p className="font-bold text-on-surface mb-1">Tautan Cepat</p>
            <a className="text-label-sm hover:text-primary-fixed-dim transition-colors" href="#">
              Panduan Review
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
