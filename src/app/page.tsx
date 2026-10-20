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
import { getNewsPosts } from "@/lib/sanity/client";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const [posts, supabase] = await Promise.all([getNewsPosts(), createClient()]);

  const { data: albumRows } = await supabase
    .from("gallery_albums")
    .select("id, title, gallery_images(url)")
    .eq("is_published", true)
    .order("event_date", { ascending: false })
    .limit(6);

  const albums = (albumRows ?? []).map((a) => ({
    id: a.id,
    label: a.title,
    image: a.gallery_images?.[0]?.url ?? null,
  }));

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TickerBanner />
        <AboutSection />
        <MissionSection />
        <NewsSection posts={posts} />
        <GalleryStrip albums={albums} />
        <ShopSection />
        <JoinCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
