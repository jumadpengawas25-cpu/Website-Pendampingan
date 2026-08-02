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
    <div className="bg-[#0B1E48] text-white">
      <div className="max-w-container-max-width mx-auto px-margin-desktop flex items-center justify-between h-9 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-label-md">
            <MaterialSymbol icon="calendar_today" className="text-xs" />
            {dateString}
          </span>
          <span className="hidden sm:flex items-center gap-1.5 font-label-md">
            <MaterialSymbol icon="phone" className="text-xs" />
            <a href="tel:085331304333" className="hover:text-yellow-300 transition-colors">
              0853-3130-4333
            </a>
          </span>
          <span className="hidden sm:flex items-center gap-1.5 font-label-md">
            <MaterialSymbol icon="mail" className="text-xs" />
            <a href="mailto:jumadpengawas25@gmail.com" className="hover:text-yellow-300 transition-colors">
              jumadpengawas25@gmail.com
            </a>
          </span>
        </div>

        <div className="hidden md:flex flex-1 mx-6 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap font-label-md text-xs">
            Transformasi Pendampingan di Era Digital
          </div>
        </div>
      </div>
    </div>
  );
}