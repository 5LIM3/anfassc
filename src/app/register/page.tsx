import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Join ANFASSC",
  description: "Register as an ANFASSC member and be part of Nigeria's official football supporters club.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-green-900 font-condensed font-black text-sm mb-4">
            ANFASSC
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Join ANFASSC</h1>
          <p className="text-green-300 mt-2">Create your member account in minutes.</p>
        </div>

        <div className="bg-white rounded p-8">
          {/* RegisterForm component — handles Supabase signup + membership selection */}
          {/* <RegisterForm /> */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">First Name</label>
                <input type="text" placeholder="Chukwuemeka" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
              </div>
              <div>
                <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">Last Name</label>
                <input type="text" placeholder="Okafor" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
            </div>
            <div>
              <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">Phone Number</label>
              <input type="tel" placeholder="08012345678" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
            </div>
            <div>
              <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">Membership Tier</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors">
                <option value="standard">Standard — ₦10,000/year</option>
                <option value="premium">Premium — ₦25,000/year</option>
                <option value="vip">VIP — ₦50,000/year</option>
              </select>
            </div>
            <div>
              <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
            </div>
            <div>
              <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
            </div>
            <button className="w-full bg-green-700 hover:bg-green-800 text-white font-condensed font-bold text-sm uppercase tracking-widest py-3 transition-colors">
              Create Account & Pay
            </button>
          </div>
          <p className="text-center text-sm text-text-muted mt-6">
            Already a member?{" "}
            <Link href="/login" className="text-green-700 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
