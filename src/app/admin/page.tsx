import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatNaira } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
  if (!profile || !["admin", "super_admin"].includes(profile.role ?? "")) redirect("/dashboard");

  // Stats
  const [members, orders, messages, products] = await Promise.all([
    supabase.from("memberships").select("id", { count: "exact" }).eq("status", "active"),
    supabase.from("orders").select("total, status"),
    supabase.from("contact_messages").select("id", { count: "exact" }).eq("is_read", false),
    supabase.from("products").select("id", { count: "exact" }).eq("is_active", true),
  ]);

  const totalRevenue = orders.data?.filter(o => o.status === "paid").reduce((sum, o) => sum + o.total, 0) ?? 0;

  const STATS = [
    { label: "Active Members", value: members.count ?? 0, color: "text-green-700" },
    { label: "Total Revenue", value: formatNaira(totalRevenue), color: "text-blue-700" },
    { label: "Total Orders", value: orders.data?.length ?? 0, color: "text-purple-700" },
    { label: "Unread Messages", value: messages.count ?? 0, color: "text-orange-600" },
    { label: "Active Products", value: products.count ?? 0, color: "text-teal-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <div className="flex">
        <aside className="w-60 bg-green-900 min-h-screen fixed top-0 left-0 p-6">
          <div className="font-display text-white font-bold text-lg mb-1">ANFASSC</div>
          <div className="font-condensed text-gold text-xs uppercase tracking-widest mb-8">Admin Panel</div>
          <nav className="space-y-1">
            {[
              { label: "Dashboard", href: "/admin" },
              { label: "Members", href: "/admin/members" },
              { label: "Orders", href: "/admin/orders" },
              { label: "News / CMS", href: "/admin/news" },
              { label: "Gallery", href: "/admin/gallery" },
              { label: "Products", href: "/admin/products" },
              { label: "Messages", href: "/admin/messages" },
              { label: "Settings", href: "/admin/settings" },
              { label: "← Back to Site", href: "/" },
            ].map((item) => (
              <a key={item.href} href={item.href}
                className="block px-4 py-2.5 font-condensed font-bold text-xs uppercase tracking-wider text-white/70 hover:text-gold hover:bg-green-800 rounded transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="ml-60 flex-1 p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-text-dark">Dashboard</h1>
            <p className="text-text-muted text-sm mt-1">Welcome, {profile.full_name}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white rounded border border-gray-100 p-5">
                <div className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="font-condensed text-xs uppercase tracking-widest text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent orders table */}
          <div className="bg-white rounded border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-condensed font-bold text-sm uppercase tracking-widest">Recent Orders</h2>
              <a href="/admin/orders" className="text-xs text-green-700 font-semibold hover:underline">View all →</a>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs font-condensed uppercase tracking-widest text-text-muted">
                <tr>
                  <th className="text-left px-6 py-3">Order ID</th>
                  <th className="text-left px-6 py-3">Amount</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-left px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.data?.slice(0, 5).map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-mono text-xs">ORD-{String(i + 1).padStart(5, "0")}</td>
                    <td className="px-6 py-3 font-bold text-green-700">{formatNaira(order.total)}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs font-condensed font-bold uppercase px-2 py-0.5 rounded ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-text-muted">—</td>
                  </tr>
                )) ?? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-text-muted">No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
