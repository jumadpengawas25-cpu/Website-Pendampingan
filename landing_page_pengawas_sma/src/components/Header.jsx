import { useState, useEffect } from "react";
import { Link } from "../router.jsx";
import MaterialSymbol from "./MaterialSymbol.jsx";
import { siteInfo } from "../data.js";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Profile", href: "#profile" },
  { label: "Schools", href: "#schools" },
  { label: "News", href: "#news" },
  { label: "Logbook", href: "/logbook" },
  { label: "Portal Sekolah", href: "/portal-sekolah" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scheduleOpen, setScheduleOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        if (window.pageYOffset >= section.offsetTop - 150) {
          current = section.getAttribute("id");
        }
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-primary dark:bg-primary-container shadow-md">
      <nav className="flex justify-between items-center w-full px-margin-desktop max-w-container-max-width mx-auto h-20">
        <div className="flex items-center gap-stack-md">
          <img
            alt={siteInfo.logoAlt}
            className="h-12 w-12 object-contain"
            src={siteInfo.logo}
          />
          <span className="font-title-md text-title-md font-bold text-on-primary">
            {siteInfo.name}
          </span>
        </div>

        <div className="hidden md:flex gap-stack-lg items-center">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("#");
            if (isAnchor) {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  className={
                    isActive
                      ? "font-body-md text-body-md text-on-primary border-b-2 border-secondary-container pb-1"
                      : "font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors border-b-2 border-transparent pb-1"
                  }
                  href={link.href}
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                to={link.href}
                activeClassName="font-body-md text-body-md text-on-primary border-b-2 border-secondary-container pb-1"
                className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors border-b-2 border-transparent pb-1"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-stack-md">
          <button
            type="button"
            className="hidden md:inline-flex px-4 py-2 bg-secondary-container text-on-secondary-container font-label-md rounded-lg hover:opacity-90 transition-opacity items-center gap-2"
            onClick={() => setScheduleOpen(true)}
          >
            <MaterialSymbol icon="calendar_month" className="text-sm" />
            Jadwal Supervisi
          </button>
          <button
            className="md:hidden text-on-primary"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MaterialSymbol icon={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden bg-primary dark:bg-primary-container shadow-inner transition-[max-height] duration-300 overflow-hidden ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 p-stack-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-body-md text-body-md text-on-primary hover:text-secondary-fixed transition-colors py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {scheduleOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4"
          onClick={() => setScheduleOpen(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-xl shadow-xl max-w-lg w-full p-stack-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-stack-md">
              <h3 className="font-title-md text-title-md text-on-surface">
                Jadwal Supervisi
              </h3>
              <button
                type="button"
                className="p-1 hover:bg-surface-container-highest rounded"
                onClick={() => setScheduleOpen(false)}
              >
                <MaterialSymbol icon="close" />
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-body-md text-on-surface-variant">
                Ringkasan jadwal supervisi akan ditampilkan di sini.
              </p>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <MaterialSymbol icon="event" className="text-primary" />
                <div>
                  <p className="font-label-md font-bold text-on-surface">
                    Senin, 5 Agustus 2024
                  </p>
                  <p className="text-label-sm text-on-surface-variant">
                    SMA Negeri 1 Jakarta - KOSP
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <MaterialSymbol icon="event" className="text-primary" />
                <div>
                  <p className="font-label-md font-bold text-on-surface">
                    Rabu, 7 Agustus 2024
                  </p>
                  <p className="text-label-sm text-on-surface-variant">
                    SMA Negeri 3 Bandung - ARKAS
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-stack-lg flex justify-end">
              <button
                type="button"
                className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-bold hover:opacity-90 transition-opacity"
                onClick={() => setScheduleOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
