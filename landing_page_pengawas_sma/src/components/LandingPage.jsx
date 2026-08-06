import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import HeroSection from "./HeroSection.jsx";
import ProfileSection from "./ProfileSection.jsx";
import SchoolsSection from "./SchoolsSection.jsx";
import NewsSection from "./NewsSection.jsx";
import GallerySection from "./GallerySection.jsx";
import Footer from "./Footer.jsx";
import MaterialSymbol from "./MaterialSymbol.jsx";

function loadSupervisionSchedules() {
  try {
    const stored = localStorage.getItem("supervision_schedules");
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

export default function LandingPage() {
  const [schedules, setSchedules] = useState(() => loadSupervisionSchedules());

  useEffect(() => {
    setSchedules(loadSupervisionSchedules());
    const interval = setInterval(() => {
      setSchedules(loadSupervisionSchedules());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-28">
        <HeroSection />
        <ProfileSection />
        <SchoolsSection />
        <NewsSection />
        <GallerySection />
        <section className="py-stack-lg px-margin-desktop max-w-container-max-width mx-auto">
          <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">
              Jadwal Supervisi
            </h2>
            <p className="text-on-surface-variant font-body-md mb-stack-lg">
              Jadwal dan catatan hasil supervisi sekolah binaan
            </p>
            {schedules.length === 0 ? (
              <div className="p-stack-lg text-center text-on-surface-variant">
                <MaterialSymbol icon="event_busy" className="text-4xl text-outline mb-2" />
                <p className="text-label-md">Belum ada jadwal supervisi</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low">
                    <tr>
                      {["Tanggal", "Sekolah", "Status", "Evaluasi", "Catatan / Rekomendasi"].map((h) => (
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
                    {schedules.map((note) => (
                      <tr
                        key={note.id}
                        className="hover:bg-surface-container-lowest transition-colors"
                      >
                        <td className="px-stack-lg py-5 text-body-md text-on-surface-variant">
                          {note.tanggal}
                        </td>
                        <td className="px-stack-lg py-5 text-body-md text-on-surface font-medium">
                          {note.schoolName}
                        </td>
                        <td className="px-stack-lg py-5">
                          <span className={`status-pill ${
                            note.status === "selesai" ? "status-verified" :
                            note.status === "pending" ? "status-pending" : "status-draft"
                          }`}>
                            {note.status === "selesai" ? "Selesai" :
                             note.status === "pending" ? "Pending" : "Jadwal"}
                          </span>
                        </td>
                        <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[200px] truncate">
                          {note.evaluasi || "-"}
                        </td>
                        <td className="px-stack-lg py-5 text-body-md text-on-surface-variant max-w-[200px] truncate">
                          {note.catatanHasil || note.rekomendasi || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
