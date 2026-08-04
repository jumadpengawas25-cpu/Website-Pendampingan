import { Routes, Route } from "./router.jsx";
import LandingPage from "./components/LandingPage.jsx";
import PortalSekolah from "./PortalSekolah.jsx";
import PortalReviewPengawas from "./pages/PortalReviewPengawas.jsx";
import LogbookPendampingan from "./pages/LogbookPendampingan.jsx";
import LoginPortalSekolah from "./components/portal/LoginPortalSekolah.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login-portal" element={<LoginPortalSekolah />} />
      <Route path="/portal-sekolah/:school" element={<PortalSekolah />} />
      <Route path="/portal-sekolah" element={<PortalSekolah />} />
      <Route path="/portal-review/:school" element={<PortalReviewPengawas />} />
      <Route path="/portal-review" element={<PortalReviewPengawas />} />
      <Route path="/logbook/:school" element={<LogbookPendampingan />} />
      <Route path="/logbook" element={<LogbookPendampingan />} />
    </Routes>
  );
}
