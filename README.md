# ANFASSC Website

A full-stack membership platform with integrated payments, e-commerce, and content management.

🔗 Live: [anfassc-tau.vercel.app](https://anfassc-tau.vercel.app)

## What it does

ANFASSC solves the problem of running a membership organization online end-to-end: member sign-up and authentication, paid membership tiers, a shop for merchandise/products, and a content-managed public site — all in one platform, with digital membership cards generated on the fly.

## Features

- Member authentication via Supabase Auth
- Paystack-powered membership payments and shop checkout
- Sanity CMS for editable site content
- Cloudinary-hosted image gallery
- Automated email notifications via Resend
- Digital membership card generation (PDF) via jsPDF
- Admin panel for managing members, content, and orders

## Tech Stack

- **Framework:** Next.js 14 (full-stack)
- **Auth:** Supabase
- **Payments:** Paystack
- **CMS:** Sanity
- **Media:** Cloudinary
- **Email:** Resend
- **PDF generation:** jsPDF
- **Deployment:** Vercel

## Setup

\`\`\`bash
git clone https://github.com/5LIM3/anfassc.git
cd anfassc
npm install
cp .env.example .env   # add Supabase, Paystack, Sanity, Cloudinary, Resend keys
npm run dev
\`\`\`

## Author

Built by [Alozie Anyatonwu](https://slimestackdevs.com) — Full Stack Developer & Cybersecurity Analyst.
