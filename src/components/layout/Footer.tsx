import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-950 border-t-4 border-gold text-white/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          <div className="md:col-span-1">
            <div className="font-display text-xl font-bold text-white mb-1">
              ANFASSC <span className="text-gold">Nigeria</span>
            </div>
            <p className="text-xs leading-relaxed mb-6">
              Nigeria&apos;s official CAF-recognised and FIFA-endorsed football supporters club. Proudly supporting the Super Eagles since 1993.
            </p>
            <div>
              <div className="font-condensed text-gold text-[10px] uppercase tracking-[3px] mb-1">President</div>
              <div className="text-white/80 text-sm">Prince Abayomi Ogunjimi</div>
            </div>
          </div>
          {[
            { heading: "Quick Links", links: [{ label: "About Us", href: "/about" }, { label: "News", href: "/news" }, { label: "Gallery", href: "/gallery" }, { label: "Travel Packages", href: "/travel" }, { label: "Shop", href: "/shop" }, { label: "Contact", href: "/contact" }] },
            { heading: "Membership", links: [{ label: "Join ANFASSC", href: "/membership" }, { label: "Member Benefits", href: "/membership#benefits" }, { label: "Member Login", href: "/login" }, { label: "Register", href: "/register" }, { label: "Renew Membership", href: "/dashboard" }] },
            { heading: "Legal", links: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Use", href: "/terms" }, { label: "Refund Policy", href: "/refunds" }, { label: "Media Enquiries", href: "/contact" }] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="font-condensed font-bold text-[11px] uppercase tracking-[3px] text-gold mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs hover:text-gold transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2025 ANFASSC — All rights reserved. 96 Ogunlana Drive, Surulere, Lagos.</p>
          <div className="flex gap-3">
            {[
              { label: "IG", href: "https://www.instagram.com/authenticnfassc/" },
              { label: "FB", href: "https://www.facebook.com/AuthenticNFASSC/" },
              { label: "YT", href: "#" },
            ].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-gold hover:text-gold flex items-center justify-center text-xs font-bold transition-colors">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
