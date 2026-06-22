import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your ANFASSC member account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-green-900 font-condensed font-black text-sm mb-4">
            ANFASSC
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Member Login</h1>
          <p className="text-green-300 mt-2">Welcome back. Sign in to your account.</p>
        </div>

        <div className="bg-white rounded p-8">
          {/* LoginForm component goes here — handles Supabase auth */}
          {/* <LoginForm /> */}
          <div className="space-y-5">
            <div>
              <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
            </div>
            <div>
              <label className="block font-condensed font-bold text-xs uppercase tracking-widest text-text-muted mb-2">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm outline-none focus:border-green-600 transition-colors" />
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-green-700 hover:underline">Forgot password?</Link>
            </div>
            <button className="w-full bg-green-700 hover:bg-green-800 text-white font-condensed font-bold text-sm uppercase tracking-widest py-3 transition-colors">
              Sign In
            </button>
          </div>
          <p className="text-center text-sm text-text-muted mt-6">
            Not a member?{" "}
            <Link href="/register" className="text-green-700 font-semibold hover:underline">Join ANFASSC</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
