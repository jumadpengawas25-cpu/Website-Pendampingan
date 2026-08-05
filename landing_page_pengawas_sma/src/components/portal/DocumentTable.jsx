import { useState } from "react";
import MaterialSymbol from "../MaterialSymbol.jsx";
import { statusMeta } from "../../portalData.js";

export default function DocumentTable({ documents, onDelete, onEditDocument }) {
  const [previewDoc, setPreviewDoc] = useState(null);
  const rows = documents.length
    ? documents
    : [
        {
          id: "empty",
          title: "Belum ada dokumen",
          subtitle: "Unggah dokumen pertama melalui formulir di atas.",
          category: "-",
          date: "-",
          status: "draft",
          empty: true,
        },
      ];

  const categoryLabel = (id) =>
    ({
      ksp: "Kurikulum",
      arkas: "Keuangan",
      akm: "Evaluasi",
      perencanaan: "Perencanaan",
    })[id] ?? id;

  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
      <div className="p-stack-lg border-b border-outline-variant/30 flex justify-between items-center">
        <h3 className="font-title-md text-title-md text-on-surface">
          Riwayat Verifikasi &amp; Manajemen Dokumen
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
                "Tanggal Unggah",
                "Status",
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
                  <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">
                    {doc.date}
                  </td>
                  <td className="px-stack-lg py-5">
                    <span className={`status-pill ${meta.class}`}>
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-stack-lg py-5 text-right">
                    <DocumentActions
                      doc={doc}
                      onDelete={onDelete}
                      onEdit={onEditDocument}
                      onPreview={setPreviewDoc}
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

      {previewDoc && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-xl border border-outline-variant w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-stack-lg border-b border-outline-variant/30">
              <div>
                <h3 className="font-title-md text-title-md text-on-surface">
                  {previewDoc.title}
                </h3>
                <span
                  className={`status-pill ${statusMeta[previewDoc.status]?.class}`}
                >
                  {statusMeta[previewDoc.status]?.label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-2 hover:bg-surface-container-highest rounded-lg"
              >
                <MaterialSymbol icon="close" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              {previewDoc.fileUrl ? (
                <iframe
                  src={previewDoc.fileUrl}
                  className="w-full h-full border-0"
                  title={previewDoc.title}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-on-surface-variant">
                  <p>Preview tidak tersedia</p>
                </div>
              )}
            </div>
            <div className="p-stack-md border-t border-outline-variant/30 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
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

function DocumentActions({ doc, onDelete, onEdit, onPreview }) {
  if (doc.empty) return null;
  return (
    <div className="flex justify-end gap-2">
      <button
        className="p-2 hover:bg-surface-container-highest rounded-lg text-primary"
        title="Lihat Dokumen"
        onClick={() => {
          if (doc.fileUrl) {
            window.open(doc.fileUrl, "_blank");
          } else {
            onPreview(doc);
          }
        }}
      >
        <MaterialSymbol icon="visibility" />
      </button>
      <button
        className="p-2 hover:bg-surface-container-highest rounded-lg text-primary"
        title="Edit / Unggah Ulang"
        onClick={() => onEdit(doc)}
      >
        <MaterialSymbol icon="lock" />
      </button>
      <button
        className="p-2 hover:bg-surface-container-highest rounded-lg text-error"
        title="Hapus Dokumen"
        onClick={() => {
          if (
            window.confirm(
              "Hapus dokumen ini? Tindakan ini tidak dapat dibatalkan.",
            )
          ) {
            onDelete(doc.id);
          }
        }}
      >
        <MaterialSymbol icon="delete" />
      </button>
    </div>
  );
}
