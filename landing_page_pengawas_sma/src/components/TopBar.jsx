import { useState, useEffect } from "react";
import MaterialSymbol from "./MaterialSymbol.jsx";

export default function TopBar() {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDateString(now.toLocaleDateString("id-ID", options));
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-on-primary">
      <div className="max-w-container-max-width mx-auto px-margin-desktop flex items-center justify-between h-10 text-sm">
        <div className="flex items-center gap-stack-lg">
          <span className="flex items-center gap-2 font-label-md">
            <MaterialSymbol icon="calendar_today" className="text-sm" />
            {dateString}
          </span>
          <span className="hidden sm:flex items-center gap-2 font-label-md">
            <MaterialSymbol icon="phone" className="text-sm" />
            <a href="tel:085331304333" className="hover:text-secondary-fixed-dim transition-colors">
              0853-3130-4333
            </a>
          </span>
          <span className="hidden sm:flex items-center gap-2 font-label-md">
            <MaterialSymbol icon="mail" className="text-sm" />
            <a href="mailto:jumadpengawas25@gmail.com" className="hover:text-secondary-fixed-dim transition-colors">
              jumadpengawas25@gmail.com
            </a>
          </span>
        </div>

        <div className="hidden md:flex flex-1 mx-8 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap font-label-md">
            Transformasi Pendampingan di Era Digital
          </div>
        </div>
      </div>
    </div>
  );
}