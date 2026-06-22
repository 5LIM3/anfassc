import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { MEMBERSHIP_TIERS } from "@/types";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join ANFASSC — Nigeria's official football supporters club. Choose your membership tier and be part of the nation's most passionate sporting community.",
};

export default function MembershipPage() {
  const tiers = Object.entries(MEMBERSHIP_TIERS);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Join the Club"
          title="Become an ANFASSC Member"
          subtitle="Choose your tier and be part of Nigeria's loudest, proudest sporting family."
        />
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map(([key, tier], i) => (
                <div
                  key={key}
                  className={`relative rounded border-2 p-8 flex flex-col ${
                    key === "premium"
                      ? "border-green-700 shadow-lg scale-105"
                      : "border-gray-200"
                  }`}
                >
                  {key === "premium" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-700 text-white font-condensed font-bold text-xs uppercase tracking-widest px-4 py-1">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-condensed font-bold text-2xl uppercase tracking-wider text-text-dark mb-2">
                    {tier.name}
                  </h3>
                  <div className="font-display text-4xl font-bold text-green-700 mb-1">
                    {formatNaira(tier.price * 100)}
                  </div>
                  <p className="font-condensed text-xs uppercase tracking-widest text-text-muted mb-8">per year</p>
                  <ul className="space-y-3 mb-10 flex-1">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm text-text-mid">
                        <span className="text-green-700 mt-0.5 font-bold">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/register"
                    className={`w-full text-center font-condensed font-bold text-sm uppercase tracking-widest py-3 transition-colors ${
                      key === "premium"
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-20 bg-green-900 text-white rounded p-10 text-center">
              <h2 className="font-display text-3xl font-bold mb-4">Already a member?</h2>
              <p className="text-green-300 mb-6">Log in to view your membership card, manage your account, and access exclusive benefits.</p>
              <a href="/login" className="inline-block bg-gold text-green-900 font-condensed font-bold text-sm uppercase tracking-widest px-8 py-3 hover:bg-yellow-400 transition-colors">
                Member Login
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
