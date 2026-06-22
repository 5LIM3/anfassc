import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatDate, formatNaira, tierColor, statusColor, daysUntil } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Your ANFASSC member dashboard.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: membership } = await supabase.from("memberships").select("*").eq("user_id", user.id).eq("status", "active").single();
  const { data: orders } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);

  const displayName = profile?.full_name ?? user.email ?? "Member";

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-off-white">
        {/* Header */}
        <div className="bg-green-900 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="font-condensed text-green-400 text-xs uppercase tracking-widest mb-2">Member Portal</p>
            <h1 className="font-display text-3xl font-bold">Welcome back, {displayName.split(" ")[0]}</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left — Membership Card */}
            <div className="lg:col-span-1">
              <h2 className="font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-4">Membership</h2>
              {membership ? (
                <div className="bg-green-900 text-white rounded p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="font-condensed font-black text-gold text-sm tracking-wider">ANFASSC</div>
                    <span className={`text-xs font-condensed font-bold uppercase px-2 py-1 rounded ${tierColor(membership.tier)}`}>
                      {membership.tier}
                    </span>
                  </div>
                  <div className="font-display text-xl font-bold mb-1">{displayName}</div>
                  <div className="font-condensed text-green-400 text-xs tracking-widest mb-6">{membership.membership_number}</div>
                  <div className="flex justify-between text-xs">
                    <div>
                      <div className="text-green-500 uppercase tracking-widest mb-1">Valid From</div>
                      <div>{formatDate(membership.start_date)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500 uppercase tracking-widest mb-1">Expires</div>
                      <div>{formatDate(membership.expiry_date)}</div>
                    </div>
                  </div>
                  {daysUntil(membership.expiry_date) < 30 && (
                    <div className="mt-4 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs px-3 py-2 rounded">
                      ⚠ Expires in {daysUntil(membership.expiry_date)} days
                    </div>
                  )}
                  <a href="/membership-card" className="mt-6 block text-center bg-gold text-green-900 font-condensed font-bold text-xs uppercase tracking-widest py-2 hover:bg-yellow-400 transition-colors">
                    Download Card
                  </a>
                </div>
              ) : (
                <div className="bg-white border border-dashed border-green-300 rounded p-6 text-center">
                  <p className="text-text-muted text-sm mb-4">No active membership found.</p>
                  <a href="/membership" className="inline-block bg-green-700 text-white font-condensed font-bold text-xs uppercase tracking-widest px-6 py-2 hover:bg-green-800 transition-colors">
                    Get Membership
                  </a>
                </div>
              )}

              {/* Quick Links */}
              <div className="mt-6 bg-white border border-gray-100 rounded overflow-hidden">
                {[
                  { label: "My Profile", href: "/profile" },
                  { label: "My Orders", href: "/orders" },
                  { label: "Membership Card", href: "/membership-card" },
                  { label: "Shop Merch", href: "/shop" },
                  { label: "Travel Packages", href: "/travel" },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="flex items-center justify-between px-5 py-3 border-b border-gray-100 last:border-none text-sm text-text-mid hover:bg-green-50 hover:text-green-700 transition-colors">
                    {link.label}
                    <span className="text-text-muted">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Activity */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Orders */}
              <div>
                <h2 className="font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-4">Recent Orders</h2>
                <div className="bg-white border border-gray-100 rounded overflow-hidden">
                  {orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between px-5 py-4 border-b border-gray-100 last:border-none">
                        <div>
                          <div className="text-sm font-semibold text-text-dark">{order.id.slice(0, 8).toUpperCase()}</div>
                          <div className="text-xs text-text-muted">{formatDate(order.created_at)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-green-700">{formatNaira(order.total)}</div>
                          <span className={`text-xs font-condensed font-bold uppercase px-2 py-0.5 rounded ${statusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-text-muted text-sm">
                      No orders yet. <a href="/shop" className="text-green-700 font-semibold hover:underline">Browse the shop</a>
                    </div>
                  )}
                </div>
              </div>

              {/* Announcements */}
              <div>
                <h2 className="font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-4">Members Announcements</h2>
                <div className="space-y-3">
                  {[
                    { title: "ANFASSC AGM — Save the Date", date: "May 2025", tag: "Governance" },
                    { title: "New Travel Package: CHAN 2025 — Book Now", date: "April 2025", tag: "Travel" },
                    { title: "2025 Membership Cards Being Dispatched", date: "March 2025", tag: "Membership" },
                  ].map((item) => (
                    <div key={item.title} className="bg-white border border-gray-100 rounded px-5 py-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-text-dark">{item.title}</div>
                        <div className="text-xs text-text-muted">{item.date}</div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 font-condensed font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
