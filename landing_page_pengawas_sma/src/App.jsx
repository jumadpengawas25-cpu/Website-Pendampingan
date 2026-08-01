import Header from "./components/Header.jsx";
import HeroSection from "./components/HeroSection.jsx";
import ProfileSection from "./components/ProfileSection.jsx";
import SchoolsSection from "./components/SchoolsSection.jsx";
import NewsSection from "./components/NewsSection.jsx";
import GallerySection from "./components/GallerySection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <HeroSection />
        <ProfileSection />
        <SchoolsSection />
        <NewsSection />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}
