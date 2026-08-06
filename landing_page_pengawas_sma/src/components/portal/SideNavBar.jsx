import { useState } from "react";
import { Link, useLocation, useParams } from "../../router.jsx";
import { matchRoute } from "../../router.jsx";
import MaterialSymbol from "../MaterialSymbol.jsx";
import { portalInfo } from "../../portalData.js";

export default function SideNavBar({ school, schoolName, activeTab, setActiveTab }) {
  const path = useLocation();
  const params = useParams();
  const schoolSlug = school?.slug ?? params.school ?? null;

  const portalHref = schoolSlug
    ? `/portal-sekolah/${schoolSlug}`
    : "/portal-sekolah";
  const reviewHref = schoolSlug
    ? `/portal-review/${schoolSlug}`
    : "/portal-review";
  const jurnalHref = schoolSlug
    ? `/jurnal-pendampingan/${schoolSlug}`
    : "/jurnal-pendampingan";

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowPasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const navLinks = [
    { label: "Dashboard", icon: "dashboard", action: "dashboard" },
    { label: "Dokumen", icon: "folder_open", action: "documents" },
    { label: "Verification", icon: "verified_user", href: portalHref },
    { label: "Review", icon: "verified_user", href: reviewHref },
    { label: "Jurnal Pendampingan", icon: "menu_book", href: jurnalHref },
    { label: "Ubah Password", icon: "lock", action: "password" },
  ];

  return (
    <>
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-stack-lg z-50">
      <div className="px-stack-lg mb-stack-lg">
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          {schoolName ?? portalInfo.school}
        </h1>
      </div>

      <div className="flex flex-col px-stack-md space-y-2 flex-grow">
        {navLinks.map((item) => {
          if (item.action === "dashboard" || item.action === "documents") {
            const isActive = activeTab === item.action;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveTab?.(item.action)}
                className={
                  isActive
                    ? "flex items-center gap-3 py-3 px-4 text-primary font-bold border-l-4 border-primary bg-surface-container-low transition-all rounded-lg"
                    : "flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg group w-full text-left"
                }
              >
                <MaterialSymbol
                  icon={item.icon}
                  className={
                    isActive ? "text-primary" : "text-on-surface-variant"
                  }
                />
                <span className="font-label-md text-label-md">
                  {item.label}
                </span>
              </button>
            );
          }
          if (item.action === "password") {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg group w-full text-left"
              >
                <MaterialSymbol
                  icon={item.icon}
                  className="text-on-surface-variant"
                />
                <span className="font-label-md text-label-md">
                  {item.label}
                </span>
              </button>
            );
          }
          const active =
            item.href !== "#" && matchRoute(item.href, path);
          return (
            <Link
              key={item.label}
              to={item.href}
              className={
                active
                  ? "flex items-center gap-3 py-3 px-4 text-primary font-bold border-l-4 border-primary bg-surface-container-low transition-all"
                  : "flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg group"
              }
            >
              <MaterialSymbol
                icon={item.icon}
                className={active ? "text-primary" : "text-on-surface-variant"}
              />
              <span className="font-label-md text-label-md">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto px-stack-md pt-stack-lg border-t border-outline-variant">
        <div className="flex items-center gap-3 px-4 mb-stack-lg">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
            AM
          </div>
          <div>
            <p className="text-label-md font-bold text-on-surface">
              {portalInfo.supervisor}
            </p>
            <p className="text-label-sm text-on-surface-variant">
              Senior Supervisor
            </p>
          </div>
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-on-secondary rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          <MaterialSymbol icon="upload_file" />
          Unggah Laporan
        </button>
        <nav className="mt-4 space-y-1">
          <Link
            to="#"
            className="flex items-center gap-3 py-2 px-4 text-on-surface-variant hover:text-primary transition-colors"
          >
            <MaterialSymbol icon="help" />
            <span className="text-label-sm">Help Center</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 py-2 px-4 text-primary hover:opacity-80 transition-opacity"
          >
            <MaterialSymbol icon="home" />
            <span className="text-label-sm">Halaman Utama</span>
          </Link>
        </nav>
      </div>
    </aside>

    {showPasswordModal && (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={() => setShowPasswordModal(false)}
      >
        <div
          className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-title-md text-title-md text-on-surface">
              Ubah Password
            </h3>
            <button
              type="button"
              onClick={() => setShowPasswordModal(false)}
              className="p-1 hover:bg-surface-container-highest rounded-lg"
            >
              <MaterialSymbol icon="close" />
            </button>
          </div>
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
            <div>
              <label className="block text-label-md font-bold text-on-surface mb-2">
                Password Lama
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Masukkan password lama"
                required
              />
            </div>
            <div>
              <label className="block text-label-md font-bold text-on-surface mb-2">
                Password Baru
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Masukkan password baru"
                required
              />
            </div>
            <div>
              <label className="block text-label-md font-bold text-on-surface mb-2">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Konfirmasi password baru"
                required
              />
            </div>
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-secondary text-on-secondary rounded-lg font-bold shadow-md hover:opacity-90 transition-all"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
}
