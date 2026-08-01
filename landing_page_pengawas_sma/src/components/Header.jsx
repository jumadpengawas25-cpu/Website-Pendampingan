import { useState, useEffect } from "react";
import { Link } from "../router.jsx";
import MaterialSymbol from "./MaterialSymbol.jsx";
import { siteInfo } from "../data.js";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Profile", href: "#profile" },
  { label: "Schools", href: "#schools" },
  { label: "News", href: "#news" },
  { label: "Portal Sekolah", href: "/portal-sekolah" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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
          <a
            className="hidden md:inline-flex px-4 py-2 bg-secondary-container text-on-secondary-container font-label-md rounded-lg hover:opacity-90 transition-opacity items-center gap-2"
            href="#"
          >
            <MaterialSymbol icon="calendar_month" className="text-sm" />
            Jadwal Supervisi
          </a>
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
    </header>
  );
}
