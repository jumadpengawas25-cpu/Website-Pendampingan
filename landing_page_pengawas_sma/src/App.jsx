import { Routes, Route } from "./router.jsx";
import LandingPage from "./components/LandingPage.jsx";
import PortalSekolah from "./PortalSekolah.jsx";
import PortalReviewPengawas from "./pages/PortalReviewPengawas.jsx";
import LogbookPendampingan from "./pages/LogbookPendampingan.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/portal-sekolah" element={<PortalSekolah />} />
      <Route path="/portal-review" element={<PortalReviewPengawas />} />
      <Route path="/logbook" element={<LogbookPendampingan />} />
    </Routes>
  );
}
