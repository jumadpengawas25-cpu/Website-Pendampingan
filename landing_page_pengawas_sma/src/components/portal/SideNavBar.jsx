import { Link } from "../../router.jsx";
import MaterialSymbol from "../MaterialSymbol.jsx";
import { portalInfo } from "../../portalData.js";

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/" },
  { label: "Verification", icon: "verified_user", href: "#" },
  { label: "Logbook", icon: "menu_book", href: "/logbook" },
  { label: "Settings", icon: "settings", href: "#" },
];

export default function SideNavBar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-stack-lg z-50">
      <div className="px-stack-lg mb-stack-lg">
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          {portalInfo.school}
        </h1>
      </div>

      <div className="flex flex-col px-stack-md space-y-2 flex-grow">
        {navItems.map((item) => {
          const active = item.label === "Verification";
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
              <span className="font-label-md text-label-md">{item.label}</span>
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
  );
}
