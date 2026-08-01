import { initialActivity } from "../../portalData.js";

export default function RecentActivity() {
  return (
    <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm">
      <h3 className="font-title-md text-title-md text-on-surface mb-stack-md">
        Aktivitas Terakhir
      </h3>
      <div className="space-y-4">
        {initialActivity.map((item) => (
          <div className="flex gap-4" key={item.id}>
            <div className={`w-2 h-2 rounded-full ${item.dot} mt-2`}></div>
            <div>
              <p className="text-label-md font-bold">{item.title}</p>
              <p className="text-label-sm text-on-surface-variant">{item.sub}</p>
              <p className="text-[10px] text-outline mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
