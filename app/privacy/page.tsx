'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, ChevronRight, Phone, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
          <Link href="/" className="hover:text-brand-red transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800">Privacy Policy</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 text-brand-red border border-brand-red/30 text-[11px] font-black uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Data Protection &amp; Confidentiality</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl leading-relaxed">
              How WIZEtv Studios collects, uses, and safeguards client production data, personal information, and recording materials.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-6 text-xs text-slate-400">
              <div>
                <span>Effective Date: </span>
                <span className="text-white font-semibold">September 2026</span>
              </div>
              <div>
                <span>Location: </span>
                <span className="text-white font-semibold">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-3">
            1. Introduction
          </h2>
          <p>
            WIZEtv Studios (&ldquo;WIZEtv&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy and confidentiality of our clients, podcast guests, partners, and website visitors. This Privacy Policy describes how we collect, process, store, and protect your information when you book our studio, engage our production services, visit our website, or interact with our team.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-3">
            2. Information We Collect
          </h2>
          <p className="mb-2">We collect information necessary to coordinate, execute, and deliver professional production services:</p>
          <ul className="list-disc list-inside space-y-1.5 ml-2">
            <li><strong>Contact &amp; Identity Details:</strong> Full name, company name, email address, phone number, and billing details.</li>
            <li><strong>Booking &amp; Production Details:</strong> Scheduled recording times, package selection, guest names, technical requirements, and custom scripts or assets provided by you.</li>
            <li><strong>Audio, Video &amp; Media Assets:</strong> Unedited raw footage, multi-track audio recordings, project files, and edited final master media files generated during your sessions.</li>
            <li><strong>Website Inquiry Information:</strong> Details submitted through our booking or quotation contact forms.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-3">
            3. How We Use Your Information
          </h2>
          <p className="mb-2">Your information is used strictly to:</p>
          <ul className="list-disc list-inside space-y-1.5 ml-2">
            <li>Schedule, coordinate, and execute your podcast and media recording sessions.</li>
            <li>Provide post-production editing, color grading, sound mastering, and file delivery.</li>
            <li>Communicate logistical updates, schedule confirmations, and invoice payments.</li>
            <li>Comply with applicable legal, accounting, and regulatory obligations in Sri Lanka.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-3">
            4. Media Storage, Backups &amp; Source Files
          </h2>
          <p>
            Media assets recorded during sessions are stored on secure local studio storage and temporary cloud delivery servers. As outlined in Section 23 of our Subscription Terms &amp; Conditions, clients are responsible for downloading and archiving their final delivered files. WIZEtv does not guarantee indefinite cloud retention of project files or raw footage once delivery is completed, unless a specific archival retainer is active.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-3">
            5. Confidentiality &amp; Non-Disclosure
          </h2>
          <p>
            We treat client unreleased content, unedited footage, proprietary discussions, and podcast recordings with strict confidentiality. Non-disclosure agreements (NDAs) are available upon request for corporate clients, enterprise leaders, and embargoed announcements prior to public broadcast.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-3">
            6. Promotional &amp; Portfolio Use
          </h2>
          <p>
            WIZEtv may occasionally request permission to showcase excerpts, showreels, behind-the-scenes photographs, or completed episodes on our website or social media channels. If your production involves confidential or proprietary topics, you may opt out in writing at any time before recording.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-3">
            7. Contact Us
          </h2>
          <p className="mb-3">
            For questions regarding this Privacy Policy or your data, please contact:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-900">WIZEtv Studios</p>
            <p className="text-slate-600">17, Kirimandala Mawatha, Nawala, Sri Lanka</p>
            <p className="text-slate-600">Email: <a href="mailto:info@wize.tv" className="text-brand-red font-semibold hover:underline">info@wize.tv</a> | Phone: <a href="tel:+94777794600" className="text-brand-red font-semibold hover:underline">077 779 4600</a></p>
          </div>
        </section>
      </main>
    </div>
  );
}
