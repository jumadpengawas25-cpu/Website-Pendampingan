import MaterialSymbol from "./MaterialSymbol.jsx";
import { siteInfo } from "../data.js";

export default function Footer() {
  const { contact, logo, logoAlt, name, tagline } = siteInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-inverse-surface dark:bg-surface-dim text-inverse-on-surface dark:text-on-surface pt-stack-lg pb-stack-md">
      <div className="max-w-container-max-width mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-stack-md">
            <img
              alt={logoAlt}
              className="h-10 w-10 brightness-0 invert"
              src={logo}
            />
            <span className="font-title-md text-title-md text-secondary-fixed">
              {name}
            </span>
          </div>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {tagline}
          </p>
          <div className="flex gap-4 mt-2">
            <a
              className="w-10 h-10 rounded-full border border-on-surface-variant/30 flex items-center justify-center hover:bg-primary-fixed-dim hover:text-primary transition-all"
              href="#"
            >
              <MaterialSymbol icon="public" className="text-sm" />
            </a>
            <a
              className="w-10 h-10 rounded-full border border-on-surface-variant/30 flex items-center justify-center hover:bg-primary-fixed-dim hover:text-primary transition-all"
              href="#"
            >
              <MaterialSymbol icon="share" className="text-sm" />
            </a>
            <a
              className="w-10 h-10 rounded-full border border-on-surface-variant/30 flex items-center justify-center hover:bg-primary-fixed-dim hover:text-primary transition-all"
              href="#"
            >
              <MaterialSymbol icon="mail" className="text-sm" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-title-md text-on-primary border-b border-on-surface-variant/20 pb-2 mb-2">
            Tautan Cepat
          </h4>
          <nav className="flex flex-col gap-2">
            {[
              "Official Portal",
              "Privacy Policy",
              "Terms of Service",
              "Contact Us",
            ].map((label) => (
              <a
                key={label}
                className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors flex items-center gap-2"
                href="#"
              >
                <MaterialSymbol icon="chevron_right" className="text-sm" />
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-title-md text-on-primary border-b border-on-surface-variant/20 pb-2 mb-2">
            Kontak Kami
          </h4>
          <div className="flex flex-col gap-3 text-on-surface-variant">
            <div className="flex items-start gap-3">
              <MaterialSymbol icon="location_on" className="text-secondary-fixed" />
              <span>{contact.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <MaterialSymbol icon="phone" className="text-secondary-fixed" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MaterialSymbol icon="mail" className="text-secondary-fixed" />
              <span>{contact.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-margin-desktop pt-stack-md border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          {`© ${currentYear} Dinas Pendidikan - Pengawas SMA. All rights reserved.`}
        </p>
        <div className="flex gap-4">
          <span className="text-label-sm text-on-surface-variant">
            v2.4.0-build
          </span>
          <span className="text-label-sm text-on-surface-variant">
            Security Certified
          </span>
        </div>
      </div>
    </footer>
  );
}
