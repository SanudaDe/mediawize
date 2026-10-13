'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Shield,
  HelpCircle,
  Phone,
  Mail,
  ChevronRight,
  Layers,
  Camera,
  Users,
  Building2,
  Lock,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Sections' },
  { id: 'packages', label: 'Packages & Allocations' },
  { id: 'booking', label: 'Booking & Scheduling' },
  { id: 'studio-rental', label: 'Studio Rules & Rental' },
  { id: 'production', label: 'Production & Rates' },
  { id: 'legal', label: 'Legal & Policies' },
  { id: 'acceptance', label: 'Client Acceptance' },
];

export default function TermsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:py-2 print:px-0">
      {/* Top Header & Breadcrumbs */}
      <div className="max-w-5xl mx-auto mb-8 print:mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4 print:hidden">
          <Link href="/" className="hover:text-brand-red transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800">Subscription Terms &amp; Conditions</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden print:bg-transparent print:text-black print:p-0 print:border-none print:shadow-none">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl pointer-events-none print:hidden" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 text-brand-red border border-brand-red/30 text-[11px] font-black uppercase tracking-wider mb-3 print:hidden">
                <FileText className="w-3.5 h-3.5" />
                <span>Official Agreement</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2 print:text-black">
                WIZETV
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-wide mb-3 print:text-slate-800">
                Subscription Terms &amp; Conditions
              </p>
              <p className="text-xs text-slate-400 font-medium max-w-2xl leading-relaxed print:text-slate-600">
                Professional Podcast Production &amp; Studio Services. Governing the use of WizeTV subscription packages and related studio, recording, production, and support services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700 shadow-sm"
              >
                <Printer className="w-4 h-4 text-brand-red" />
                <span>Print / Save PDF</span>
              </button>
              <a
                href="#acceptance"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-brand-red/20"
              >
                <span>Jump to Acceptance</span>
              </a>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 print:text-slate-600 print:border-slate-300 print:mt-4 print:pt-2">
            <div>
              <span className="text-slate-500 font-medium">Effective Date: </span>
              <span className="text-white font-semibold print:text-black">September 2026</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Version: </span>
              <span className="text-white font-semibold print:text-black">2.1</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Jurisdiction: </span>
              <span className="text-white font-semibold print:text-black">Colombo, Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (Interactive, Hidden in Print) */}
      <div className="max-w-5xl mx-auto mb-8 print:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if (cat.id !== 'all') {
                  const el = document.getElementById(cat.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Legal Content Container */}
      <main className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Preamble */}
        <section className="mb-10 pb-8 border-b border-slate-100">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-4">
            These Subscription Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern the use of WizeTV subscription packages and related studio, recording, production and support services.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
              <strong>Notice of Acceptance:</strong> By subscribing to a WizeTV package, making payment, confirming a booking, or using WizeTV&rsquo;s subscription services, the Client acknowledges that they have read, understood and agreed to these Terms.
            </p>
          </div>
        </section>

        {/* 1. DEFINITIONS */}
        <section id="definitions" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              1
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Definitions
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-4 font-semibold uppercase tracking-wider">
            For the purpose of these Terms:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">&ldquo;WizeTV&rdquo;</span>
              <span className="text-slate-600 leading-relaxed">
                Means WizeTV and its authorized employees, contractors, production crew and representatives.
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">&ldquo;Client&rdquo;</span>
              <span className="text-slate-600 leading-relaxed">
                Means the individual, company, organization or other entity subscribing to a WizeTV subscription package.
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">&ldquo;Subscription&rdquo;</span>
              <span className="text-slate-600 leading-relaxed">
                Means the selected monthly service package purchased by the Client.
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">&ldquo;Recording Session&rdquo;</span>
              <span className="text-slate-600 leading-relaxed">
                Means a scheduled studio recording session included within the Client&rsquo;s subscription allocation.
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">&ldquo;Recording Credits&rdquo;</span>
              <span className="text-slate-600 leading-relaxed">
                Means the recording sessions or hours allocated to the Client under the selected subscription package.
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">&ldquo;Add-ons&rdquo;</span>
              <span className="text-slate-600 leading-relaxed">
                Means services, equipment, crew or production requirements outside the standard subscription package.
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 sm:col-span-2">
              <span className="font-bold text-slate-900 block mb-1">&ldquo;Subscription Period&rdquo;</span>
              <span className="text-slate-600 leading-relaxed">
                Means the agreed period for which the Client has an active subscription.
              </span>
            </div>
          </div>
        </section>

        {/* 2. SUBSCRIPTION PACKAGES */}
        <section id="packages" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              2
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Subscription Packages
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            WizeTV currently offers the following subscription packages:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 sm:p-4">Package</th>
                  <th className="p-3.5 sm:p-4">Target Audience</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">Monthly Fee</th>
                  <th className="p-3.5 sm:p-4">Recording Allocation</th>
                  <th className="p-3.5 sm:p-4 text-center">Cameras</th>
                  <th className="p-3.5 sm:p-4">Primary Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Basic</td>
                  <td className="p-3.5 sm:p-4">YouTubers, Content Creators, Influencers</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red whitespace-nowrap">LKR 80,000</td>
                  <td className="p-3.5 sm:p-4 font-medium">1 recording session / 6 hours</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold">1</td>
                  <td className="p-3.5 sm:p-4">Content creation and personal projects</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Bronze</td>
                  <td className="p-3.5 sm:p-4">Founders, CEOs, Consultants, Coaches</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red whitespace-nowrap">LKR 95,000</td>
                  <td className="p-3.5 sm:p-4 font-medium">1 recording session / 5 hours</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold">2</td>
                  <td className="p-3.5 sm:p-4">Personal branding</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Silver</td>
                  <td className="p-3.5 sm:p-4">SMEs, Marketing Teams, Educational Institutes</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red whitespace-nowrap">LKR 175,000</td>
                  <td className="p-3.5 sm:p-4 font-medium">4 recording sessions / 10 hours</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold">3</td>
                  <td className="p-3.5 sm:p-4">Company podcast and marketing content</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Gold</td>
                  <td className="p-3.5 sm:p-4">Corporates, Banks, Hotels, Large Organizations</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red whitespace-nowrap">LKR 380,000</td>
                  <td className="p-3.5 sm:p-4 font-medium">Dedicated monthly production days / 20 hours</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold">3</td>
                  <td className="p-3.5 sm:p-4">Corporate communications and executive content</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>The package selected by the Client will be identified in the relevant quotation, invoice, booking confirmation or subscription agreement.</li>
            <li>Package inclusions and allocations are limited to the services expressly stated for the selected package.</li>
          </ul>
        </section>

        {/* 3. SUBSCRIPTION ACTIVATION */}
        <section id="activation" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              3
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Subscription Activation
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 font-semibold">
            A subscription becomes active only after:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside mb-4">
            <li>The Client has selected and agreed to a package;</li>
            <li>WizeTV has confirmed the subscription;</li>
            <li>The required payment has been received; and</li>
            <li>The relevant subscription or booking information has been confirmed by WizeTV.</li>
          </ul>
          <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 font-medium">
            <strong>Important:</strong> A booking is not considered confirmed merely because the Client has requested a date or time.
          </p>
        </section>

        {/* 4. SUBSCRIPTION PERIOD */}
        <section id="period" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              4
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Subscription Period
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>The subscription operates according to the agreed subscription period stated in the Client&rsquo;s quotation, invoice or subscription agreement.</li>
            <li>The applicable subscription fee and package allocation apply to the relevant subscription period.</li>
            <li>Any special commercial terms agreed between WizeTV and the Client must be recorded in writing.</li>
          </ul>
        </section>

        {/* 5. RECORDING CREDITS */}
        <section id="credits" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              5
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Recording Credits
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 font-medium">
            Recording credits are allocated according to the Client&rsquo;s selected package. Unless otherwise agreed in writing:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>Recording credits are available only during the applicable subscription period.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Recording credits cannot be accumulated indefinitely.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>Unused monthly recording credits expire at the end of the relevant month.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>Unused credits have no cash value.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>Recording credits cannot automatically be exchanged for cash or other services.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>Recording credits cannot be transferred to another Client or account without WizeTV&rsquo;s written approval.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Recording credits do not provide unlimited studio access. WizeTV&rsquo;s subscription model provides priority access to studio facilities; it does not guarantee unlimited access or availability at any requested time.
              </span>
            </div>
          </div>
        </section>

        {/* 6. BOOKING CONFIRMATION & STUDIO RENTAL ANCHOR */}
        <section id="studio-rental" className="mb-12 scroll-mt-24">
          <div className="p-3 rounded-2xl bg-brand-red/5 border border-brand-red/20 mb-6 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-brand-red">
              Studio Rental &amp; Booking Terms
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Sections 6 – 12</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              6
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Booking Confirmation
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
            Recording sessions are confirmed only after the applicable booking has been confirmed by WizeTV and the required payment or subscription requirements have been completed. Studio availability is subject to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 mb-3">
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
              <span>Studio availability</span>
            </li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
              <span>Equipment availability</span>
            </li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
              <span>Crew availability</span>
            </li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
              <span>Existing confirmed bookings</span>
            </li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 sm:col-span-2 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
              <span>The Client&rsquo;s package priority</span>
            </li>
          </ul>
          <p className="text-xs text-slate-500 font-medium">
            Bookings are handled on a first-confirmed basis within the applicable priority structure.
          </p>
        </section>

        {/* 7. BOOKING NOTICE PERIODS */}
        <section id="notice-periods" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              7
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Booking Notice Periods
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 font-semibold">
            The following booking notice requirements apply:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-black text-slate-900 text-sm block mb-1">Basic</span>
              <p className="text-slate-600">
                Bookings should be made at least <strong>7 days</strong> before the requested recording date.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-black text-slate-900 text-sm block mb-1">Bronze</span>
              <p className="text-slate-600">
                Bookings should be made at least <strong>10 days</strong> before the requested recording date.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-black text-slate-900 text-sm block mb-1">Silver</span>
              <p className="text-slate-600">
                Preferred recording dates for the following month should be submitted by the <strong>20th of the current month</strong>.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-black text-slate-900 text-sm block mb-1">Gold</span>
              <p className="text-slate-600">
                Annual or monthly production calendars should be agreed in advance.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Requests submitted outside the applicable notice period will be treated as express booking requests and will be subject to studio, equipment and crew availability. WizeTV does not guarantee availability for late requests.
          </p>
        </section>

        {/* 8. MONTHLY SCHEDULING PROCESS */}
        <section id="scheduling-process" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              8
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Monthly Scheduling Process
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
            For subscription clients requiring advance scheduling, WizeTV follows the following scheduling process:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">Date</th>
                  <th className="p-3.5 sm:p-4">Activity</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">Responsible Party</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-brand-red">20th</td>
                  <td className="p-3.5 sm:p-4">Subscription clients submit preferred recording dates for the following month</td>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Client</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">21st–24th</td>
                  <td className="p-3.5 sm:p-4">Studio capacity and crew availability reviewed</td>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Project Coordinator</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">25th</td>
                  <td className="p-3.5 sm:p-4">Scheduling conflicts resolved</td>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Production Manager</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">26th–28th</td>
                  <td className="p-3.5 sm:p-4">Studio calendar finalized</td>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Operations Team</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-brand-red">Month Start</td>
                  <td className="p-3.5 sm:p-4">Confirmed production schedule shared</td>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Client Relations</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            The above scheduling process is subject to operational requirements and may be adjusted by WizeTV where necessary.
          </p>
        </section>

        {/* 9. BOOKING PRIORITY */}
        <section id="priority" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              9
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Booking Priority
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
            WizeTV applies the following subscription booking priority:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 sm:p-4">Priority</th>
                  <th className="p-3.5 sm:p-4">Package</th>
                  <th className="p-3.5 sm:p-4">Booking Rights</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-brand-red">Priority 1</td>
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Gold</td>
                  <td className="p-3.5 sm:p-4">Guaranteed production dates, subject to agreed production calendar</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Priority 2</td>
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Silver</td>
                  <td className="p-3.5 sm:p-4">Priority scheduling</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Priority 3</td>
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Bronze</td>
                  <td className="p-3.5 sm:p-4">High-priority scheduling</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Priority 4</td>
                  <td className="p-3.5 sm:p-4 font-black text-slate-900">Basic</td>
                  <td className="p-3.5 sm:p-4">Standard availability</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Priority does not mean unlimited availability. All bookings remain subject to the applicable studio, equipment and production capacity.
          </p>
        </section>

        {/* 10. RESCHEDULING */}
        <section id="rescheduling" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              10
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Rescheduling
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            Recording dates may be changed subject to studio availability, crew availability, equipment availability, the Client&rsquo;s applicable notice period, and WizeTV&rsquo;s approval.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>A requested date change is not considered confirmed until WizeTV provides confirmation.</li>
            <li>Where a Client requests a date change outside the required notice period, WizeTV may treat the request as an express booking request.</li>
            <li>Specific cancellation and late-rescheduling charges, if applicable, should be stated in the Client&rsquo;s subscription agreement or booking confirmation.</li>
          </ul>
        </section>

        {/* 11. LATE ARRIVAL */}
        <section id="late-arrival" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              11
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Late Arrival
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>Clients are expected to arrive at the confirmed recording time.</li>
            <li>A delay caused by the Client or the Client&rsquo;s guests does not automatically extend the scheduled recording period.</li>
            <li>Where a Client arrives late, the session may still end at the originally confirmed time in order to protect subsequent bookings.</li>
            <li>Any extension beyond the confirmed booking period is subject to availability and may be charged as an additional hour.</li>
          </ul>
        </section>

        {/* 12. ADDITIONAL HOURS */}
        <section id="additional-hours" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              12
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Additional Hours
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            Additional studio time is subject to availability and WizeTV approval.
          </p>
          <div className="inline-block p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-3">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
              Current Additional-Hour Rate
            </span>
            <span className="text-xl sm:text-2xl font-black text-brand-red">
              LKR 7,500 <span className="text-sm font-medium text-slate-600">per hour</span>
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Additional time may not be available if another confirmed booking follows the Client&rsquo;s session.
          </p>
        </section>

        {/* 13. SUBSCRIPTION BENEFITS */}
        <section id="benefits" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              13
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Subscription Benefits
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            Depending on the selected package, Clients may receive the following benefits:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 sm:p-4">Benefit</th>
                  <th className="p-3.5 sm:p-4 text-center">Basic</th>
                  <th className="p-3.5 sm:p-4 text-center">Bronze</th>
                  <th className="p-3.5 sm:p-4 text-center">Silver</th>
                  <th className="p-3.5 sm:p-4 text-center">Gold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Priority Booking</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓✓✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓✓✓✓</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Fixed Monthly Recording Slots</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center font-medium text-slate-700">Optional</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Strategy Session</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center font-medium text-slate-700">Monthly</td>
                  <td className="p-3.5 sm:p-4 text-center font-medium text-slate-700">Monthly</td>
                  <td className="p-3.5 sm:p-4 text-center font-black text-brand-red">Unlimited</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Faster Editing</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-black text-brand-red">Priority</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Discounted Add-ons</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-slate-700">5%</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-slate-700">10%</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-slate-700">15%</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-brand-red">20%</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Dedicated Project Coordinator</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Dedicated Account Manager</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Priority Support</td>
                  <td className="p-3.5 sm:p-4 text-center text-slate-300">✗</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-emerald-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Benefits are subject to the package selected and the terms of the Client&rsquo;s subscription agreement.
          </p>
        </section>

        {/* 14. STRATEGY SESSIONS */}
        <section id="strategy-sessions" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              14
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Strategy Sessions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Where a strategy session is included in the selected package, it will be provided according to the applicable package benefits. Strategy sessions do not automatically include additional production, editing, advertising, marketing, design or other services unless specifically included in the Client&rsquo;s package or separately agreed.
          </p>
        </section>

        {/* 15. EDITING & PRODUCTION SERVICES */}
        <section id="production" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              15
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Editing &amp; Production Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
            Subscription access to the studio does not automatically mean that all editing or production services are included. The Client&rsquo;s quotation or subscription agreement will identify any editing or production services included in the package. Services outside the agreed package may be charged separately.
          </p>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            Current Listed Production Rates:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-3">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 sm:p-4">Service</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">Current Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Podcast Editing</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red whitespace-nowrap">LKR 25,000 / episode</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Reel Editing</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red whitespace-nowrap">LKR 8,500 / reel</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Intro / Outro Video</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red whitespace-nowrap">LKR 15,000 / each</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Any service not specifically included in the Client&rsquo;s subscription should be treated as an additional service.
          </p>
        </section>

        {/* 16. ADDITIONAL SERVICES & EQUIPMENT */}
        <section id="additional-services" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              16
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Additional Services &amp; Equipment
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
            The following current rates apply where the relevant service or equipment is required outside the Client&rsquo;s subscription allocation:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-3">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 sm:p-4">Service / Equipment</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Additional Hour</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 7,500 / hour</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Technician</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 5,000 / hour</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Additional Podcast Microphone</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 4,000 / hour</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Additional Wireless Microphone (DJI)</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 2,000 / hour</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Additional Camera</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 6,000 / hour</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Additional Lighting</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 3,500 / hour</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Teleprompter</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 4,000 / hour</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Live Streaming Setup</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 15,000 / hour</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Intro / Outro Video</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 15,000 / each</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Reel Editing</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 8,500 / reel</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">Podcast Editing</td>
                  <td className="p-3.5 sm:p-4 font-bold text-brand-red">LKR 25,000 / episode</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Rates may be revised by WizeTV from time to time. The applicable rate for a particular booking will be confirmed in the relevant quotation, invoice or booking confirmation.
          </p>
        </section>

        {/* 17. EQUIPMENT CAPACITY */}
        <section id="equipment-capacity" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              17
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Equipment Capacity
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
            WizeTV will use its available in-house equipment for confirmed productions. Where equipment is unavailable because of another confirmed production, equipment limitations, Client-specific requirements, or special production requirements, WizeTV may recommend external equipment or resources.
          </p>
          <p className="text-xs text-slate-500">
            External equipment and crew costs will be quoted separately and require Client approval before confirmation.
          </p>
        </section>

        {/* 18. EXTERNAL EQUIPMENT */}
        <section id="external-equipment" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              18
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              External Equipment
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
            External equipment may be required when WizeTV&rsquo;s in-house inventory cannot meet the Client&rsquo;s requirements. The following principles apply:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside mb-3">
            <li>Additional cameras may be externally rented where WizeTV&rsquo;s inventory is insufficient.</li>
            <li>External lenses may be quoted separately.</li>
            <li>Additional lighting may be quoted separately.</li>
            <li>Additional microphones may be charged where the in-house inventory is exceeded.</li>
            <li>Freelance crew may be charged where additional resources are required because of Client requirements or scheduling conflicts.</li>
          </ul>
          <p className="text-xs text-slate-500">
            External production costs will be communicated to the Client for approval before being incurred wherever reasonably possible.
          </p>
        </section>

        {/* 19. CLIENT RESPONSIBILITIES */}
        <section id="responsibilities" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              19
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Client Responsibilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 font-semibold">
            The Client is responsible for:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 mb-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              ✓ Providing accurate booking information
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              ✓ Arriving on time
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              ✓ Ensuring guests arrive on time
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              ✓ Providing required scripts, references, logos and other materials within agreed timelines
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              ✓ Communicating production requirements in advance
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              ✓ Obtaining any required permissions, releases or approvals from guests or other third parties
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              ✓ Reviewing and approving materials where Client approval is required
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              ✓ Following reasonable studio and production instructions provided by WizeTV
            </div>
          </div>
          <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 font-medium">
            Failure by the Client to provide required information or materials may affect production timelines.
          </p>
        </section>

        {/* 20. GUESTS */}
        <section id="guests" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              20
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Guests
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>The Client is responsible for coordinating podcast guests and informing WizeTV of the number of guests and relevant production requirements before the recording.</li>
            <li>Guests are considered representatives of the Client for the purpose of studio conduct and scheduling.</li>
            <li>The Client is responsible for obtaining any permissions or consents required from guests for recording, publication and distribution of the content.</li>
          </ul>
        </section>

        {/* 21. STUDIO CONDUCT */}
        <section id="studio-conduct" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              21
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Studio Conduct
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            Clients, guests and representatives must follow reasonable instructions from WizeTV&rsquo;s production and studio team. WizeTV may restrict or stop activity that:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside mb-4">
            <li>Creates a safety risk;</li>
            <li>Risks damage to equipment or property;</li>
            <li>Seriously disrupts studio operations;</li>
            <li>Involves abusive or inappropriate conduct; or</li>
            <li>Violates applicable laws or studio policies.</li>
          </ul>
          <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 font-medium">
            Where a session must be stopped due to serious Client or guest misconduct, WizeTV may treat the booking as used, subject to the circumstances.
          </p>
        </section>

        {/* 22. EQUIPMENT DAMAGE & LOSS */}
        <section id="equipment-damage" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              22
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Equipment Damage &amp; Loss
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>The Client is responsible for reasonable costs associated with damage to WizeTV equipment or property caused by the Client, the Client&rsquo;s guests or the Client&rsquo;s representatives through misuse, negligence or unauthorized handling.</li>
            <li>Clients and guests must not operate, move or modify equipment without authorization from WizeTV&rsquo;s production team.</li>
          </ul>
        </section>

        {/* 23. RAW FOOTAGE & PROJECT FILES */}
        <section id="raw-footage" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              23
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Raw Footage &amp; Project Files
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>Raw footage, project files and production source files are not automatically included in a subscription unless specifically stated in the relevant package, quotation or agreement.</li>
            <li>Where raw footage is provided, the delivery method and storage period may be determined by WizeTV.</li>
            <li>Clients are responsible for maintaining their own backups of delivered content.</li>
            <li>WizeTV does not guarantee indefinite storage of completed projects, raw footage or project files unless a separate storage agreement exists.</li>
          </ul>
        </section>

        {/* 24. CONTENT APPROVAL & REVISIONS */}
        <section id="content-approval" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              24
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Content Approval &amp; Revisions
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>Where editing or production services are included, the Client may be required to review and approve the relevant content.</li>
            <li>The scope and number of revisions included will be determined by the applicable quotation or production agreement.</li>
            <li>Additional or major revisions outside the agreed scope may be charged separately.</li>
          </ul>
        </section>

        {/* 25. INTELLECTUAL PROPERTY */}
        <section id="legal" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              25
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Intellectual Property
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 font-medium">
            Unless otherwise agreed in writing:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>Client-owned content remains the property of the Client or its respective rights holder.</li>
            <li>WizeTV retains ownership of its pre-existing production systems, templates, processes, designs, workflows and other intellectual property.</li>
            <li>Third-party intellectual property remains subject to the rights of its respective owners.</li>
            <li>The specific ownership and usage rights of final production materials should be confirmed in the applicable quotation or agreement where required.</li>
          </ul>
        </section>

        {/* 26. PORTFOLIO & PROMOTIONAL USE */}
        <section id="portfolio-use" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              26
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Portfolio &amp; Promotional Use
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>WizeTV may request permission to use completed productions, excerpts or selected materials for portfolio, website, social media, showreel, case study and promotional purposes.</li>
            <li>Where the Client requires confidentiality or restrictions on promotional use, such requirements should be communicated to WizeTV and agreed in writing.</li>
          </ul>
        </section>

        {/* 27. CANCELLATION & REFUNDS */}
        <section id="cancellation" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              27
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Cancellation &amp; Refunds
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            Subscription cancellation and refund arrangements will be governed by the specific terms stated in the Client&rsquo;s subscription agreement or quotation. Unless otherwise agreed in writing:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>Used recording credits cannot be reinstated.</li>
            <li>Expired recording credits cannot be reinstated.</li>
            <li>Unused credits do not automatically convert into cash.</li>
            <li>Outstanding charges remain payable following cancellation.</li>
            <li>Any special refund arrangement must be confirmed in writing by WizeTV.</li>
          </ul>
        </section>

        {/* 28. NON-ATTENDANCE / NO-SHOW */}
        <section id="no-show" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              28
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Non-Attendance / No-Show
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
            If a Client or its guests fail to attend a confirmed recording session, the session may be treated as a used recording credit.
          </p>
          <p className="text-xs text-slate-500">
            Any exception will be considered by WizeTV based on the circumstances and availability.
          </p>
        </section>

        {/* 29. PAYMENT */}
        <section id="payment" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              29
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Payment
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>Subscription and additional service payments must be made according to the payment terms stated in the applicable quotation, invoice or subscription agreement.</li>
            <li>WizeTV may suspend future bookings or services where required payments remain outstanding.</li>
            <li>Additional services, equipment and external production resources may require payment or approval before the relevant service is provided.</li>
          </ul>
        </section>

        {/* 30. UPGRADES & DOWNGRADES */}
        <section id="upgrades-downgrades" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              30
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Upgrades &amp; Downgrades
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            Clients may request an upgrade or downgrade of their subscription package. Any change is subject to:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside mb-3">
            <li>WizeTV approval;</li>
            <li>Studio and production capacity;</li>
            <li>Applicable pricing;</li>
            <li>Outstanding payments; and</li>
            <li>The effective date agreed by both parties.</li>
          </ul>
          <p className="text-xs text-slate-500">
            The financial treatment of unused credits when changing packages will be determined and confirmed by WizeTV at the time of the package change.
          </p>
        </section>

        {/* 31. PRICE CHANGES */}
        <section id="price-changes" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              31
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Price Changes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            WizeTV reserves the right to revise subscription prices, package inclusions and additional service rates. Any pricing change applicable to an existing Client will be communicated before the revised price becomes applicable to that Client&rsquo;s future subscription period, subject to the terms of the Client&rsquo;s agreement.
          </p>
        </section>

        {/* 32. SERVICE AVAILABILITY */}
        <section id="service-availability" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              32
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Service Availability
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            A subscription provides access to WizeTV&rsquo;s services according to the selected package and applicable booking priority. A subscription does not guarantee:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 mb-3">
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• Any particular recording date</li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• Any particular recording time</li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• Unlimited studio access</li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• Unlimited equipment</li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• Unlimited production crew</li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• Unlimited editing</li>
            <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 sm:col-span-2">• Unlimited production services</li>
          </ul>
          <p className="text-xs text-slate-500">
            All services remain subject to studio, equipment, crew and operational capacity.
          </p>
        </section>

        {/* 33. SERVICE INTERRUPTIONS */}
        <section id="service-interruptions" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              33
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Service Interruptions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            WizeTV will make reasonable efforts to provide confirmed services. However, circumstances outside WizeTV&rsquo;s reasonable control may affect a scheduled production, including equipment failure, power interruptions, internet or technical failures, emergencies, natural events, government restrictions or other operational circumstances.
          </p>
          <p className="text-xs text-slate-500">
            Where reasonably possible, WizeTV will work with the Client to reschedule the affected service.
          </p>
        </section>

        {/* 34. CONFIDENTIALITY */}
        <section id="confidentiality" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              34
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Confidentiality
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            WizeTV will use reasonable care in handling confidential information provided by the Client in connection with the production. Clients requiring specific confidentiality arrangements, non-disclosure agreements or restrictions on access to content should communicate those requirements to WizeTV before production.
          </p>
        </section>

        {/* 35. LIMITATION OF RESPONSIBILITY */}
        <section id="limitation-of-responsibility" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              35
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Limitation of Responsibility
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside mb-3">
            <li>WizeTV will take reasonable measures to protect Client content and provide the agreed services.</li>
            <li>However, WizeTV cannot guarantee that technical interruptions, equipment failures, file corruption, internet failures, third-party platform failures or other unforeseen circumstances will never occur.</li>
            <li>Clients are encouraged to maintain independent backups of important content and files.</li>
            <li>Any specific limitation of liability or compensation arrangement should be stated in the Client&rsquo;s agreement where required.</li>
          </ul>
        </section>

        {/* 36. TERMINATION / SUSPENSION */}
        <section id="termination" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              36
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Termination / Suspension
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            WizeTV may suspend or terminate services where there is:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside mb-3">
            <li>Non-payment;</li>
            <li>Material breach of these Terms;</li>
            <li>Serious damage to WizeTV property;</li>
            <li>Serious misconduct;</li>
            <li>Unauthorized use of equipment;</li>
            <li>Repeated violation of studio policies; or</li>
            <li>Other circumstances that materially affect WizeTV&rsquo;s ability to provide the service.</li>
          </ul>
          <p className="text-xs text-slate-500">
            Any termination or suspension will be handled according to the Client&rsquo;s applicable subscription agreement.
          </p>
        </section>

        {/* 37. SPECIAL AGREEMENTS */}
        <section id="special-agreements" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              37
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Special Agreements
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
            WizeTV may agree to customized package arrangements for corporate, enterprise or special clients. Any customized arrangement should be documented in writing.
          </p>
          <p className="text-xs text-slate-500">
            Where a signed quotation, proposal, subscription agreement or booking confirmation contains terms that specifically modify these Terms, those specific agreed terms will apply to the relevant service.
          </p>
        </section>

        {/* 38. ORDER OF PRECEDENCE */}
        <section id="order-of-precedence" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              38
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Order of Precedence
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
            If there is a conflict between these Terms and a specific signed quotation, proposal, subscription agreement or booking confirmation, the specific written agreement will prevail only in relation to the matter expressly addressed in that document.
          </p>
          <p className="text-xs text-slate-500">
            All other provisions of these Terms remain applicable.
          </p>
        </section>

        {/* 39. AMENDMENTS TO THESE TERMS */}
        <section id="amendments" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              39
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Amendments to These Terms
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            WizeTV may update these Terms from time to time to reflect changes in its services, operations, pricing or business requirements. The applicable Terms will be those communicated to or accepted by the Client for the relevant subscription period, subject to any specific agreement between WizeTV and the Client.
          </p>
        </section>

        {/* 40. CLIENT ACKNOWLEDGEMENT */}
        <section id="acknowledgement" className="mb-12 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
              40
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
              Client Acknowledgement
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold mb-3">
            By subscribing to a WizeTV package, making payment, confirming a booking or using WizeTV&rsquo;s subscription services, the Client confirms that:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>They have read these Terms;</li>
            <li>They understand the applicable package limitations;</li>
            <li>They understand that subscription access is subject to availability;</li>
            <li>They understand that unused recording credits may expire;</li>
            <li>They understand that additional equipment, crew and production services may incur additional charges; and</li>
            <li>They agree to comply with these Terms and any specific terms stated in their subscription agreement.</li>
          </ul>
        </section>

        {/* SIGNATURE / CLIENT ACCEPTANCE SECTION */}
        <section id="acceptance" className="scroll-mt-24 pt-4">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red block mb-2">
              EXECUTION OF AGREEMENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Subscription &amp; Booking Acceptance
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-1">
              For offline agreements, quotations, and official bookings. Printable format for verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Client Acceptance Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-200">
                <Users className="w-5 h-5 text-brand-red" />
                <h3 className="font-black text-slate-900 text-base uppercase tracking-wider">
                  Client Acceptance
                </h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Client / Company Name:
                  </label>
                  <div className="h-9 border-b-2 border-slate-300 flex items-end pb-1 text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Selected Package:
                  </label>
                  <div className="h-9 border-b-2 border-slate-300 flex items-end pb-1 text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Subscription Start Date:
                  </label>
                  <div className="h-9 border-b-2 border-slate-300 flex items-end pb-1 text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Subscription Fee:
                  </label>
                  <div className="h-9 border-b-2 border-slate-300 flex items-end pb-1 text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Authorized Person:
                  </label>
                  <div className="h-9 border-b-2 border-slate-300 flex items-end pb-1 text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Designation:
                  </label>
                  <div className="h-9 border-b-2 border-slate-300 flex items-end pb-1 text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Signature:
                  </label>
                  <div className="h-14 border-b-2 border-slate-300 flex items-end pb-1 text-slate-400 text-xs">
                    (Sign here)
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Date:
                  </label>
                  <div className="h-9 border-b-2 border-slate-300 flex items-end pb-1 text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>
              </div>
            </div>

            {/* For WizeTV Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs sm:text-sm print:bg-white print:text-black print:border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-800 print:border-slate-200">
                <Building2 className="w-5 h-5 text-brand-red" />
                <h3 className="font-black text-white print:text-black text-base uppercase tracking-wider">
                  For WizeTV
                </h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 print:text-slate-600 uppercase tracking-wider block mb-1">
                    Authorized Representative:
                  </label>
                  <div className="h-9 border-b-2 border-slate-700 print:border-slate-300 flex items-end pb-1 text-slate-200 print:text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 print:text-slate-600 uppercase tracking-wider block mb-1">
                    Designation:
                  </label>
                  <div className="h-9 border-b-2 border-slate-700 print:border-slate-300 flex items-end pb-1 text-slate-200 print:text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-400 print:text-slate-600 uppercase tracking-wider block mb-1">
                    Signature:
                  </label>
                  <div className="h-14 border-b-2 border-slate-700 print:border-slate-300 flex items-end pb-1 text-slate-500 text-xs">
                    (Authorized Signatory)
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 print:text-slate-600 uppercase tracking-wider block mb-1">
                    Date:
                  </label>
                  <div className="h-9 border-b-2 border-slate-700 print:border-slate-300 flex items-end pb-1 text-slate-200 print:text-slate-800 font-semibold">
                    ______________________________________
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 print:border-slate-200">
                  <span className="font-black text-white print:text-black text-base block">WizeTV</span>
                  <p className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
                    Professional Podcast Production &amp; Studio Services
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    17, Kirimandala Mawatha, Nawala, Sri Lanka <br />
                    Tel: 077 779 4600 | Email: info@wize.tv
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Help / Inquiries Banner */}
      <div className="max-w-5xl mx-auto mt-12 text-center print:hidden">
        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-black mb-1">Have Questions About Terms or Subscriptions?</h3>
            <p className="text-xs text-slate-400 max-w-md">
              Our studio coordination team is available to clarify any package inclusions, rescheduling rules, or corporate booking contracts.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+94777794600"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
            >
              <Phone className="w-4 h-4 text-brand-red" />
              <span>077 779 4600</span>
            </a>
            <Link
              href="/contact?type=inquiry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-red-glow"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Studio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
