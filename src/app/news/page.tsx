import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and announcements from ANFASSC — Super Eagles updates, membership news, travel packages, and more.",
};

// In production this fetches from Sanity CMS
// import { getPosts } from "@/lib/sanity/queries";

export default async function NewsPage() {
  // const posts = await getPosts();
  const categories = ["All", "Super Eagles", "AFCON", "Membership", "Merchandise", "Travel", "Governance"];

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Latest Updates"
          title="News & Announcements"
          subtitle="Stay up to date with everything ANFASSC and Nigerian football."
        />
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="flex gap-3 flex-wrap mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="font-condensed font-bold text-sm uppercase tracking-widest px-5 py-2 border border-green-200 hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors rounded-sm"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* News Grid — populated from Sanity in production */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SAMPLE_NEWS.map((post) => (
                <article key={post.id} className="bg-white border border-gray-100 rounded overflow-hidden group hover:-translate-y-1 transition-transform duration-200">
                  <div className="h-48 bg-green-800 relative flex items-center justify-center">
                    <span className="font-display text-5xl font-bold italic text-white/10">NG</span>
                    <span className="absolute top-4 left-4 bg-gold text-green-900 font-condensed font-bold text-xs uppercase tracking-wider px-3 py-1">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="font-condensed text-xs uppercase tracking-widest text-text-muted mb-2">{post.date}</p>
                    <h3 className="font-display font-bold text-lg text-text-dark leading-snug mb-3 group-hover:text-green-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">{post.excerpt}</p>
                    <a href={`/news/${post.slug}`} className="inline-flex items-center gap-1 mt-4 font-condensed font-bold text-sm uppercase tracking-wider text-green-700 hover:gap-2 transition-all">
                      Read more →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const SAMPLE_NEWS = [
  { id: 1, title: "ANFASSC Leads Official Delegation to AFCON Morocco 2025", category: "AFCON", date: "January 2025", slug: "anfassc-afcon-morocco-2025", excerpt: "Hundreds of ANFASSC members descended on Moroccan stadiums flying the Nigerian flag as the Super Eagles competed at AFCON 2025." },
  { id: 2, title: "2025 Membership Registration Now Open — New Benefits Announced", category: "Membership", date: "March 2025", slug: "membership-2025", excerpt: "ANFASSC opens registration for the 2025 membership year with improved benefits for all tiers." },
  { id: 3, title: "New ANFASSC Official Jersey Collection Available", category: "Merchandise", date: "February 2025", slug: "jersey-collection-2025", excerpt: "The 2025 official jersey collection is now available in the ANFASSC online shop." },
  { id: 4, title: "ANFASSC Holds Annual General Meeting", category: "Governance", date: "December 2024", slug: "agm-2024", excerpt: "The 2024 AGM adopted the strategic plan for 2025–2027 with key resolutions on membership growth." },
  { id: 5, title: "Super Eagles AFCON Squad Announced — ANFASSC Reaction", category: "Super Eagles", date: "November 2024", slug: "afcon-squad-reaction", excerpt: "ANFASSC President Prince Abayomi Ogunjimi reacts to the Super Eagles AFCON 2025 squad announcement." },
  { id: 6, title: "ANFASSC Travel Package: AFCON Morocco 2025", category: "Travel", date: "October 2024", slug: "travel-package-afcon-2025", excerpt: "Book your spot on the official ANFASSC travel package to AFCON 2025 in Morocco." },
];
