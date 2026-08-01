import { useEffect, useState } from "react";
import MaterialSymbol from "./MaterialSymbol.jsx";
import { siteInfo } from "../data.js";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Profile", href: "#profile" },
  { label: "Schools", href: "#schools" },
  { label: "News", href: "#news" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute("id");
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setOpen(false);

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
            const href = link.href;
            const isActive = activeSection === href.replace("#", "");
            return (
              <HeaderLink key={href} href={href} active={isActive}>
                {link.label}
              </HeaderLink>
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
            <a
              key={link.href}
              className="font-body-md text-body-md text-on-primary hover:text-secondary-fixed transition-colors py-2"
              href={link.href}
              onClick={closeMobile}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function HeaderLink({ href, active, children }) {
  const base =
    "font-body-md text-body-md transition-colors border-b-2 pb-1";
  const classes = active
    ? `${base} text-on-primary border-secondary-container`
    : `${base} text-on-primary/80 hover:text-secondary-fixed border-transparent`;
  return (
    <a className={classes} href={href}>
      {children}
    </a>
  );
}
