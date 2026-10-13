# WizeTV — Sri Lanka's Premier Podcast & Media Production Studio

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js)](https://threejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)

A high-converting, production-ready web application for **WizeTV**, Sri Lanka's leading podcast and media production studio located in Colombo 07. Engineered with 4K Sony FX cinema multi-cam systems, Shure SM7B broadcast audio, live ATEM switching, and viral short-form content scaling.

---

## 🌟 Features & Highlights

- **High-Converting Dark UI / UX**: High-contrast design system featuring Deep Black (`#000000`), Surface Dark (`#090D16`, `#0F172A`), Pure White (`#FFFFFF`), and Signature Primary Red (`#EC2328`) with glassmorphism and subtle glowing red accents.
- **Interactive 3D Studio Microphone**: Custom-engineered WebGL / Three.js canvas built with `@react-three/fiber` and `@react-three/drei`, rendering a floating, illuminated broadcast studio microphone.
- **Dynamic Pricing Engine**: Interactive switcher between **Hourly Studio Sessions** (Audio Only 18.5k, Solo Video 40k, Dual Multi-Cam 50k, Full Panel 65k LKR) and **Monthly Creator Subscriptions** (Basic 80k, Bronze 95k, Silver Pro 175k, Gold Elite 350k LKR).
- **Interactive Booking System**: Multi-step booking form with date picker, timeslot selector, guest counter, production add-ons with real-time price estimation, and **Zod** validation.
- **PostgreSQL Database & RLS Security**: Complete Supabase migration schema (`supabase/schema.sql`) with tables for `profiles`, `studio_packages`, `subscriptions`, `bookings`, and `inquiries` with strict Row-Level Security policies.
- **Responsive Architecture**: Mobile navigation drawer, responsive pricing matrix, and touch-optimized components.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Typography**: Google Font Montserrat
- **3D & Animation**: `@react-three/fiber`, `@react-three/drei`, `three`, `framer-motion`
- **Icons**: `lucide-react`
- **Validation**: `zod`
- **Database & Backend**: `@supabase/supabase-js`, `@supabase/ssr`, PostgreSQL

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Configure your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. Database Setup (Supabase / PostgreSQL)
Run the SQL script located at `supabase/schema.sql` in the Supabase SQL Editor. This will:
- Create all required tables (`profiles`, `studio_packages`, `subscriptions`, `bookings`, `inquiries`)
- Set up automatic `updated_at` triggers
- Apply Row-Level Security (RLS) policies
- Pre-populate initial studio packages and monthly subscription seed data in LKR.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx                # Montserrat font, global SEO metadata, dark theme layout
│   ├── globals.css               # Tailwind directives, custom glassmorphic utilities, glow accents
│   ├── page.tsx                  # Home Page (Hero + 3D Mic, Services, Pricing, Gear, Testimonials)
│   ├── services/page.tsx         # Detailed breakdown of all 5 production pillars & 5-stage pipeline
│   ├── pricing/page.tsx          # Studio Packages (18.5k-65k LKR) & Subscriptions (80k-350k LKR) + Add-ons
│   ├── about/page.tsx            # Studio story, acoustic specs, camera & mic gear tour, creative team
│   ├── contact/page.tsx          # Interactive booking form, Colombo studio details, WhatsApp fast-track
│   └── api/bookings/route.ts     # Zod validated API route for processing booking requests
├── components/
│   ├── 3d/
│   │   └── HeroMicScene.tsx      # Interactive 3D studio microphone canvas (Three.js / R3F)
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky glassmorphic navbar with mobile drawer & booking CTA
│   │   └── Footer.tsx            # Footer with Colombo location, operating hours, social links
│   └── ui/
│       ├── PricingTable.tsx      # Interactive package/subscription toggle with LKR pricing
│       ├── BookingForm.tsx       # Dynamic booking form with real-time price estimation
│       ├── ServiceCard.tsx       # Glassmorphic service cards with hover animations
│       └── SectionHeading.tsx    # Reusable section heading with glowing red badge
├── lib/
│   ├── data.ts                   # Static data for packages, subscriptions, gear, FAQs, testimonials
│   ├── supabaseClient.ts         # Supabase client initializer (client & server)
│   ├── types.ts                  # TypeScript interfaces for all studio models
│   └── validations.ts            # Zod validation schemas for forms
└── supabase/
    └── schema.sql                # PostgreSQL DDL, RLS security policies, and seed data
```

---

## 📍 Studio Location
- **Address**: 17, Kirimandala Mawatha, Nawala / Colombo, Sri Lanka
- **Hotline**: 077 779 4600
- **Email**: `info@wize.tv`
- **Hours**: Monday – Sunday: 8:00 AM – 10:00 PM (By Appointment)
