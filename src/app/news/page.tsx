import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { getNewsPosts } from "@/lib/sanity/client";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and announcements from ANFASSC — Super Eagles updates, membership news, travel packages, and more.",
};

const CATEGORY_LABELS: Record<string, string> = {
  "super-eagles": "Super Eagles",
  afcon: "AFCON",
  membership: "Membership",
  merchandise: "Merchandise",
  governance: "Governance",
  travel: "Travel",
};

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Latest Updates"
          title="News & Announcements"
          subtitle="Stay up to date with everything ANFASSC and Nigerian football."
        />
        <section style={{ padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {posts.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666", padding: "3rem 0" }}>
                No news posts yet. Check back soon.
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                {posts.map((post) => (
                  <a key={post._id} href={`/news/${post.slug.current}`} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "2px", overflow: "hidden", textDecoration: "none", color: "inherit", display: "block" }}>
                    <div style={{ height: "180px", background: "#003d24", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {post.mainImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.mainImageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontStyle: "italic", color: "rgba(255,255,255,0.1)" }}>NG</span>
                      )}
                      <span style={{ position: "absolute", top: "12px", left: "12px", background: "#D4AF37", color: "#003d24", fontWeight: 700, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px" }}>
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </span>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <p style={{ fontSize: "11px", color: "#999", marginBottom: "0.5rem" }}>
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#0A0A0A", lineHeight: 1.3, marginBottom: "0.5rem" }}>{post.title}</h3>
                      <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6 }}>{post.excerpt}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}