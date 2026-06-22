import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// In production: import { getPost, getPosts } from "@/lib/sanity/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "Read the latest ANFASSC news and announcements.",
  };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-green-900 py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="font-condensed text-gold text-xs uppercase tracking-widest mb-4">AFCON 2025</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              ANFASSC Leads Official Delegation to AFCON Morocco 2025
            </h1>
            <p className="text-green-300 font-condensed mt-4">January 2025 · By ANFASSC Communications</p>
          </div>
        </div>

        <article className="py-16 px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p>
              Hundreds of ANFASSC members descended on Moroccan stadiums flying the Nigerian
              flag high as the Super Eagles competed at the 2025 Africa Cup of Nations.
              President Prince Abayomi Ogunjimi led the official delegation in a show of
              national pride that captured the attention of fans across the continent.
            </p>
            <p>
              The delegation, which included members from all tiers of the club, was
              coordinated through ANFASSC&apos;s official travel programme — providing organised,
              safe, and affordable access to match venues across Morocco.
            </p>
            <p>
              This article is a placeholder. In production, content is fetched from Sanity CMS
              using the slug: <code>{slug}</code>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
