// Home page — assembles all landing sections
// Each section is a separate component for maintainability
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TickerBanner from "@/components/sections/TickerBanner";
import AboutSection from "@/components/sections/AboutSection";
import MissionSection from "@/components/sections/MissionSection";
import NewsSection from "@/components/sections/NewsSection";
import GalleryStrip from "@/components/sections/GalleryStrip";
import ShopSection from "@/components/sections/ShopSection";
import JoinCTA from "@/components/sections/JoinCTA";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TickerBanner />
        <AboutSection />
        <MissionSection />
        <NewsSection />
        <GalleryStrip />
        <ShopSection />
        <JoinCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
