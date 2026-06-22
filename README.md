# ANFASSC — Official Website

**Authentic Nigeria Football & Allied Sports Supporters Club**
Nigeria's official CAF-recognised, FIFA-endorsed football supporters club.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| CMS | Sanity.io (news/blog) |
| Payments | Paystack |
| Email | Resend |
| Images | Cloudinary |
| Security | Cloudflare WAF + Next.js middleware |
| Deploy | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx               # Home page
│   ├── about/                 # About ANFASSC
│   ├── news/                  # News listing + [slug] detail
│   ├── shop/                  # Shop listing + [slug] product
│   ├── membership/            # Membership tiers + join
│   ├── gallery/               # Photo gallery
│   ├── travel/                # Travel packages
│   ├── contact/               # Contact page
│   ├── login/                 # Auth — login
│   ├── register/              # Auth — register
│   ├── dashboard/             # Member portal
│   ├── profile/               # Member profile
│   ├── orders/                # Order history
│   ├── membership-card/       # Digital card
│   ├── admin/                 # Admin dashboard
│   └── api/                   # API routes
│       ├── contact/           # Contact form handler
│       ├── newsletter/        # Newsletter subscribe
│       ├── membership/        # Membership payment init
│       └── shop/verify-payment/ # Paystack verification
├── components/
│   ├── layout/                # Navbar, Footer, PageHero
│   └── sections/              # Home page sections
├── lib/
│   ├── supabase/              # client.ts + server.ts
│   ├── validations/           # Zod schemas
│   └── utils/                 # Helpers
├── types/                     # TypeScript types
├── middleware.ts              # Auth guards + security headers
supabase/
└── schema.sql                # Full DB schema with RLS
```

---

## Getting Started

### 1. Clone & install
```bash
git clone https://github.com/your-org/anfassc.git
cd anfassc
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Set up Supabase
- Create a project at supabase.com
- Run `supabase/schema.sql` in the SQL Editor
- Copy your project URL and anon key to `.env.local`

### 4. Set up Paystack
- Create account at paystack.com
- Get your public and secret keys
- Add to `.env.local`

### 5. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

### 6. Deploy to Vercel
```bash
npx vercel
# Add all env vars in Vercel dashboard
# Set up Cloudflare in front of Vercel domain
```

---

## Security Checklist

- [x] JWT-based auth via Supabase
- [x] Row Level Security on all tables
- [x] Security headers (X-Frame-Options, CSP, NOSNIFF)
- [x] Route guards in middleware
- [x] Zod input validation on all forms
- [x] Admin role check server-side
- [x] Service role key server-only (never exposed to client)
- [x] .env.local in .gitignore
- [ ] Cloudflare WAF (set up post-deploy)
- [ ] 2FA on admin accounts (Supabase MFA)
- [ ] Rate limiting on API routes (Upstash Redis)

---

## Key Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # Lint check
npm run type-check # TypeScript check
```

---

**President:** Prince Abayomi Ogunjimi
**Address:** 96 Ogunlana Drive, Surulere, Lagos, Nigeria
**Instagram:** [@authenticnfassc](https://www.instagram.com/authenticnfassc/)
**Facebook:** [AuthenticNFASSC](https://www.facebook.com/AuthenticNFASSC/)
