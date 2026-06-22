import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and memories from ANFASSC events — AFCON, Super Eagles matches, member gatherings, and more.",
};

const ALBUMS = [
  { id: "1", title: "AFCON Morocco 2025", count: 48, date: "January 2025" },
  { id: "2", title: "ANFASSC Annual Dinner 2024", count: 32, date: "December 2024" },
  { id: "3", title: "Super Eagles vs. Bafana Bafana", count: 21, date: "November 2024" },
  { id: "4", title: "AGM & Awards Ceremony 2024", count: 18, date: "October 2024" },
  { id: "5", title: "AFCON 2023 — Côte d'Ivoire", count: 67, date: "February 2024" },
  { id: "6", title: "World Cup Qualifier — Nigeria vs. Lesotho", count: 14, date: "September 2023" },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero label="Gallery" title="Moments & Memories" subtitle="Captured from stadiums, events, and celebrations across Africa and beyond." />
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ALBUMS.map((album) => (
                <div key={album.id} className="group cursor-pointer">
                  <div className="bg-green-800 aspect-video rounded overflow-hidden relative flex items-center justify-center mb-3 group-hover:brightness-110 transition">
                    <span className="font-display text-5xl font-bold italic text-white/10">NG</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="font-condensed text-white/60 text-xs">{album.count} photos</span>
                    </div>
                  </div>
                  <h3 className="font-body font-semibold text-text-dark group-hover:text-green-700 transition-colors">{album.title}</h3>
                  <p className="font-condensed text-xs uppercase tracking-wider text-text-muted mt-1">{album.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
