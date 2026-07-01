import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and memories from ANFASSC events — AFCON, Super Eagles matches, member gatherings, and more.",
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: albums } = await supabase
    .from("gallery_albums")
    .select("*, gallery_images(id, url, caption)")
    .eq("is_published", true)
    .order("event_date", { ascending: false });

  return (
    <>
      <Navbar />
      <main>
        <PageHero label="Gallery" title="Moments & Memories" subtitle="Captured from stadiums, events, and celebrations across Africa and beyond." />
        <section style={{ padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {!albums || albums.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666", padding: "3rem 0" }}>
                No photos yet. Check back soon.
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {albums.map((album) => {
                  const cover = album.gallery_images?.[0]?.url;
                  const count = album.gallery_images?.length ?? 0;
                  return (
                    <div key={album.id} style={{ cursor: "pointer" }}>
                      <div style={{ background: "#003d24", aspectRatio: "16/9", borderRadius: "2px", overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                        {cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={cover} alt={album.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontStyle: "italic", color: "rgba(255,255,255,0.1)" }}>NG</span>
                        )}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)" }} />
                        <span style={{ position: "absolute", bottom: "10px", left: "10px", color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>{count} photo{count !== 1 ? "s" : ""}</span>
                      </div>
                      <h3 style={{ fontWeight: 600, color: "#0A0A0A", fontSize: "0.95rem" }}>{album.title}</h3>
                      {album.event_date && (
                        <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#999", marginTop: "0.25rem" }}>
                          {new Date(album.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}