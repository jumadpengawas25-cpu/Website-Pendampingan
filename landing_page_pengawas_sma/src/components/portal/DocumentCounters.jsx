import MaterialSymbol from "../MaterialSymbol.jsx";
import { statusMeta } from "../../portalData.js";

export default function DocumentCounters({ documents }) {
  const counters = documents.reduce(
    (acc, doc) => {
      acc.total += 1;
      if (doc.status === "pending") acc.pending += 1;
      if (doc.status === "verified") acc.verified += 1;
      if (doc.status === "revision") acc.revision += 1;
      return acc;
    },
    { total: 0, pending: 0, verified: 0, revision: 0 }
  );

  const items = [
    {
      label: "Total Dokumen",
      value: counters.total,
      icon: "folder_special",
      color: "text-primary",
      trend: "+2",
    },
    {
      label: "Pending Verifikasi",
      value: counters.pending,
      icon: "pending",
      color: "text-secondary",
      trend: null,
    },
    {
      label: "Telah Terverifikasi",
      value: counters.verified,
      icon: statusMeta.verified.icon,
      color: "text-on-tertiary-container",
      trend: null,
    },
    {
      label: "Perlu Revisi",
      value: counters.revision,
      icon: statusMeta.revision.icon,
      color: "text-error",
      trend: null,
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-gutter mb-stack-lg">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30"
        >
          <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">
            {item.label}
          </p>
          <div className="flex items-end justify-between mt-1">
            <span
              className={`font-headline-lg text-headline-lg ${item.color}`}
            >
              {item.value}
            </span>
            {item.trend ? (
              <span className={`text-label-sm ${item.color} flex items-center`}>
                <MaterialSymbol icon="trending_up" className="text-sm" />{" "}
                {item.trend}
              </span>
            ) : (
              <MaterialSymbol icon={item.icon} className={`text-sm ${item.color}`} />
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
