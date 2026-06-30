import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getNewsPostBySlug } from "@/lib/sanity/client";

const CATEGORY_LABELS: Record<string, string> = {
  "super-eagles": "Super Eagles",
  afcon: "AFCON",
  membership: "Membership",
  merchandise: "Merchandise",
  governance: "Governance",
  travel: "Travel",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) return { title: "News" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "64px" }}>
        <div style={{ background: "#003d24", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p style={{ fontWeight: 700, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#D4AF37", marginBottom: "1rem" }}>
              {CATEGORY_LABELS[post.category] ?? post.category}
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
              {post.title}
            </h1>
            <p style={{ color: "#a8d4bd", marginTop: "1rem" }}>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · By ANFASSC Communications
            </p>
          </div>
        </div>

        <article style={{ padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {post.mainImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.mainImageUrl} alt={post.title} style={{ width: "100%", borderRadius: "4px", marginBottom: "2.5rem" }} />
            )}
            <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#2e2e2e" }} className="news-body">
              {post.body ? (
                <PortableText value={post.body as never} />
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>
          </div>
        </article>

        <style>{`
          .news-body p { margin-bottom: 1.25rem; }
          .news-body h2 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; margin: 2rem 0 1rem; }
          .news-body h3 { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 0.75rem; }
          .news-body ul, .news-body ol { margin: 0 0 1.25rem 1.5rem; }
          .news-body li { margin-bottom: 0.5rem; }
          .news-body strong { font-weight: 700; }
          .news-body a { color: #008751; text-decoration: underline; }
        `}</style>
      </main>
      <Footer />
    </>
  );
}