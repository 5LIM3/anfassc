import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ANFASSC — membership enquiries, media, partnerships, and general questions.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero label="Get In Touch" title="Contact ANFASSC" subtitle="We'd love to hear from you. Reach out to our team in Lagos." />
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl font-bold mb-8">Our Details</h2>
              {[
                { label: "Address", value: "96 Ogunlana Drive, Surulere, Lagos, Nigeria" },
                { label: "Email", value: "info@authenticnfassc.org" },
                { label: "Instagram", value: "@authenticnfassc" },
                { label: "Facebook", value: "facebook.com/AuthenticNFASSC" },
              ].map((item) => (
                <div key={item.label} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
                  <p className="font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-1">{item.label}</p>
                  <p className="text-text-dark">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray-100 rounded p-8">
              <h2 className="font-display text-2xl font-bold mb-6">Send a Message</h2>
              {/* ContactForm component goes here */}
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
                <select className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors">
                  <option>Membership Enquiry</option>
                  <option>Merchandise / Shop</option>
                  <option>Travel Package</option>
                  <option>Media / Press</option>
                  <option>Partnership</option>
                  <option>General Enquiry</option>
                </select>
                <textarea rows={4} placeholder="Your message..." className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors resize-none" />
                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-condensed font-bold text-sm uppercase tracking-widest py-3 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
