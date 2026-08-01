import { useState } from "react";
import MaterialSymbol from "../components/MaterialSymbol.jsx";
import { portalInfo, portalCategories, statusMeta } from "../portalData.js";
import SideNavBar from "../components/portal/SideNavBar.jsx";
import DocumentCounters from "../components/portal/DocumentCounters.jsx";
import AiInsight from "../components/portal/AiInsight.jsx";
import RecentActivity from "../components/portal/RecentActivity.jsx";

const reviewDocs = [
  {
    id: "r1",
    title: "Laporan KOSP Semester 1",
    subtitle: "Sesuai Peraturan No. 12/2024",
    category: "ksp",
    version: "V.2",
    versionClass: "bg-primary-fixed text-on-primary-fixed-variant",
    date: "12 Okt 2024",
    status: "pending",
    reviewerNote: "",
  },
  {
    id: "r2",
    title: "Anggaran ARKAS 2025",
    subtitle: "Pengajuan Awal Tahun",
    category: "arkas",
    version: "V.1",
    versionClass: "bg-surface-container-high text-on-surface-variant",
    date: "15 Okt 2024",
    status: "pending",
    reviewerNote: "",
  },
  {
    id: "r3",
    title: "Evaluasi AKM Siswa",
    subtitle: "Data Sampling Kelas XI",
    category: "akm",
    version: "V.1",
    versionClass: "bg-surface-container-high text-on-surface-variant",
    date: "08 Okt 2024",
    status: "revision",
    reviewerNote: "Halaman 12-14 kurang lengkap",
  },
  {
    id: "r4",
    title: "Rencana Peningkatan KKS",
    subtitle: "Dokumen Perencanaan Berbasis Data",
    category: "perencanaan",
    version: "V.1",
    versionClass: "bg-surface-container-high text-on-surface-variant",
    date: "20 Okt 2024",
    status: "draft",
    reviewerNote: "",
  },
];

function ReviewActions({ doc, onApprove, onRevision, onView }) {
  return (
    <div className="flex justify-end gap-2">
      <button
        className="p-2 hover:bg-surface-container-highest rounded-lg text-primary"
        title="Lihat Detail"
        onClick={() => onView(doc)}
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

function ReviewTable({ documents, onApprove, onRevision, onView }) {
  const rows = documents.length
    ? documents
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
                      className={`px-2 py-1 rounded text-[10px] font-bold ${doc.versionClass}`}
                    >
                      {doc.version}
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
                      onView={onView}
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
  const [documents, setDocuments] = useState(reviewDocs);
  const [category] = useState("ksp");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleApprove = (id) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "verified", reviewerNote: "Disetujui oleh Pengawas" }
          : d
      )
    );
  };

  const handleRevision = (id) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "revision", reviewerNote: "Mohon perbaikan data" }
          : d
      )
    );
  };

  const handleView = (doc) => {
    setSelectedDoc(doc);
  };

  return (
    <>
      <SideNavBar />
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
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant">
            <MaterialSymbol
              icon="calendar_today"
              className="text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            />
            <span className="text-label-md font-bold">
              {portalInfo.semester}
            </span>
          </div>
        </header>

        <DocumentCounters documents={documents} />

        <div className="grid grid-cols-12 gap-gutter mb-stack-lg">
          <div className="col-span-8">
            <ReviewTable
              documents={documents}
              onApprove={handleApprove}
              onRevision={handleRevision}
              onView={handleView}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-stack-lg">
            <AiInsight category={category} />
            <RecentActivity />
          </div>
        </div>

        {selectedDoc && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setSelectedDoc(null)}>
            <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-xl border border-outline-variant max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-stack-md">
                <h3 className="font-title-md text-title-md text-on-surface">
                  Detail Dokumen
                </h3>
                <button
                  className="p-1 hover:bg-surface-container-highest rounded"
                  onClick={() => setSelectedDoc(null)}
                >
                  <MaterialSymbol icon="close" />
                </button>
              </div>
              <div className="space-y-3 text-label-md">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Judul</span>
                  <span className="font-bold text-on-surface">{selectedDoc.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Kategori</span>
                  <span className="font-bold text-on-surface">
                    {portalCategories.find((c) => c.id === selectedDoc.category)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Versi</span>
                  <span className="font-bold text-on-surface">{selectedDoc.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Tanggal</span>
                  <span className="font-bold text-on-surface">{selectedDoc.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Status</span>
                  <span className={`status-pill ${statusMeta[selectedDoc.status]?.class}`}>
                    {statusMeta[selectedDoc.status]?.label}
                  </span>
                </div>
                {selectedDoc.reviewerNote && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Catatan</span>
                    <span className="font-bold text-on-surface text-right max-w-[60%]">{selectedDoc.reviewerNote}</span>
                  </div>
                )}
              </div>
              <div className="mt-stack-lg flex justify-end gap-stack-md">
                <button
                  className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest"
                  onClick={() => setSelectedDoc(null)}
                >
                  Tutup
                </button>
                {selectedDoc.status === "pending" && (
                  <>
                    <button
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:opacity-90"
                      onClick={() => { handleApprove(selectedDoc.id); setSelectedDoc(null); }}
                    >
                      Approve
                    </button>
                    <button
                      className="px-6 py-3 bg-amber-500 text-white rounded-lg font-bold hover:opacity-90"
                      onClick={() => { handleRevision(selectedDoc.id); setSelectedDoc(null); }}
                    >
                      Minta Revisi
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <footer className="mt-stack-lg pt-stack-lg border-t border-outline-variant grid grid-cols-1 md:grid-cols-3 gap-gutter text-on-surface-variant">
          <div className="col-span-1">
            <p className="font-title-md text-title-md text-secondary-fixed mb-2">
              {portalInfo.school}
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