import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ANFASSC — Nigeria's official CAF-recognised and FIFA-endorsed football supporters club, led by President Prince Abayomi Ogunjimi.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Who We Are"
          title="Nigeria's Heartbeat in the Stands"
          subtitle="Over three decades of passion, purpose, and patriotism."
        />
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-display text-3xl font-bold text-text-dark mb-6">
                Our Story
              </h2>
              <p className="text-text-mid leading-relaxed mb-6">
                The Authentic Nigeria Football &amp; Allied Sports Supporters Club (ANFASSC)
                was founded over three decades ago with a singular mission: to give Nigerian
                football fans a unified, official voice in the global sports community.
              </p>
              <p className="text-text-mid leading-relaxed mb-6">
                Under the visionary leadership of <strong>Prince Abayomi Ogunjimi</strong>,
                ANFASSC has grown from a passionate Lagos-based collective into Nigeria&apos;s
                most respected sporting representative body — officially recognised by CAF
                (Confederation of African Football) and endorsed by FIFA.
              </p>
              <p className="text-text-mid leading-relaxed mb-12">
                Headquartered at 96 Ogunlana Drive, Surulere, Lagos, our club coordinates
                thousands of Nigerian fans at tournaments across Africa and the world,
                from AFCON to FIFA World Cup qualifiers.
              </p>

              <h2 className="font-display text-3xl font-bold text-text-dark mb-6">
                Our Leadership
              </h2>
              <div className="bg-white border border-green-100 rounded p-8 mb-12">
                <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-green-700 mb-2">
                  Prince Abayomi Ogunjimi
                </h3>
                <p className="text-sm font-condensed uppercase tracking-widest text-text-muted mb-4">President, ANFASSC</p>
                <p className="text-text-mid leading-relaxed">
                  Prince Abayomi Ogunjimi has led ANFASSC with distinction for years,
                  building relationships with the Nigeria Football Federation, CAF, and FIFA.
                  His leadership has ensured ANFASSC remains the authoritative voice of
                  Nigerian football supporters on the world stage.
                </p>
              </div>

              <h2 className="font-display text-3xl font-bold text-text-dark mb-6">
                Recognitions &amp; Endorsements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { org: "CAF", full: "Confederation of African Football", desc: "Officially recognised as Nigeria's supporters club representative body" },
                  { org: "FIFA", full: "Fédération Internationale de Football Association", desc: "Endorsed by the global governing body of football" },
                  { org: "NFF", full: "Nigeria Football Federation", desc: "Accredited supporters club partner of the NFF" },
                ].map((item) => (
                  <div key={item.org} className="bg-green-900 text-white p-6 rounded">
                    <div className="text-gold font-display text-2xl font-bold mb-2">{item.org}</div>
                    <div className="text-xs font-condensed uppercase tracking-wider text-green-300 mb-3">{item.full}</div>
                    <p className="text-green-200 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
