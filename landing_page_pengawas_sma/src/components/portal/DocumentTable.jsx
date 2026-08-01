import MaterialSymbol from "../MaterialSymbol.jsx";
import { statusMeta } from "../../portalData.js";

export default function DocumentTable({ documents, onDelete }) {
  const rows = documents.length
    ? documents
    : [
        {
          id: "empty",
          title: "Belum ada dokumen",
          subtitle: "Unggah dokumen pertama melalui formulir di atas.",
          category: "-",
          version: "-",
          versionClass: "bg-surface-container-high text-on-surface-variant",
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
    }[id] ?? id);

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
                "Versi",
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
                  <td className="px-stack-lg py-5 text-right">
                    <DocumentActions
                      doc={doc}
                      onDelete={onDelete}
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

function DocumentActions({ doc, onDelete }) {
  if (doc.empty) return null;
  const isRevision = doc.status === "revision";
  return (
    <div className="flex justify-end gap-2">
      <button
        className="p-2 hover:bg-surface-container-highest rounded-lg text-primary"
        title="Lihat"
      >
        <MaterialSymbol icon="visibility" />
      </button>
      {isRevision ? (
        <button className="p-2 hover:bg-surface-container-highest rounded-lg text-primary font-bold text-label-sm">
          Unggah V.2
        </button>
      ) : (
        <button
          className="p-2 hover:bg-surface-container-highest rounded-lg text-on-surface-variant"
          title="Hapus"
          onClick={() => onDelete(doc.id)}
        >
          <MaterialSymbol icon="delete" />
        </button>
      )}
    </div>
  );
}
