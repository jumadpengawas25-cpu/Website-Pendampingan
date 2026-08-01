import { useState } from "react";
import MaterialSymbol from "./MaterialSymbol.jsx";
import { gallery } from "../data.js";

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState("");
  const [activeAlt, setActiveAlt] = useState("");

  const openLightbox = (src, alt) => {
    setActiveSrc(src);
    setActiveAlt(alt);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <section className="py-stack-lg bg-surface-container-highest" id="gallery">
      <div className="max-w-container-max-width mx-auto px-margin-desktop">
        <div className="mb-stack-lg">
          <h2 className="font-headline-lg text-primary">Galeri Kegiatan</h2>
          <p className="text-on-surface-variant">
            Dokumentasi kunjungan lapangan, workshop, dan rapat koordinasi.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {gallery.map((item) => (
            <button
              key={item.id}
              className={`relative group cursor-pointer rounded-xl overflow-hidden ${item.span}`}
              onClick={() => openLightbox(item.src, item.alt)}
            >
              <img
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={item.src}
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <MaterialSymbol
                  icon="zoom_in"
                  className={`text-on-primary ${item.zoom}`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <GalleryLightbox
        open={lightboxOpen}
        src={activeSrc}
        alt={activeAlt}
        onClose={closeLightbox}
      />
    </section>
  );
}

function GalleryLightbox({ open, src, alt, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-on-primary text-3xl hover:text-secondary-fixed transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <MaterialSymbol icon="close" />
      </button>
      <img
        alt={alt}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
        src={src}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
