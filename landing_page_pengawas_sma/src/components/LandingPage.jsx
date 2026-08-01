import Header from "./Header.jsx";
import HeroSection from "./HeroSection.jsx";
import ProfileSection from "./ProfileSection.jsx";
import SchoolsSection from "./SchoolsSection.jsx";
import NewsSection from "./NewsSection.jsx";
import GallerySection from "./GallerySection.jsx";
import Footer from "./Footer.jsx";

export default function LandingPage() {
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
