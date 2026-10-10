'use client';

import Link from 'next/link';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';

interface Props {
  bookingReference?: string;
  clientName: string;
}

export default function BookingSuccess({ clientName }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Success icon */}
      <div className="relative inline-flex items-center justify-center mb-8">
        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="relative w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
          <CheckCircle size={44} className="text-green-400" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-950 mb-3">Booking Request Received!</h1>
      <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed font-medium">
        Thank you{clientName ? `, ${clientName.split(' ')[0]}` : ''}. Your booking request has been received by WIZEtv Studios.
        Your booking is <strong className="text-amber-600 font-bold">not confirmed</strong> until approved by our production team.
        You will receive an email once your booking has been confirmed.
      </p>

      {/* What happens next */}
      <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-200 shadow-sm">
        <h3 className="text-slate-900 font-black mb-4 flex items-center gap-2">
          <Mail size={18} className="text-brand-red" /> What happens next?
        </h3>
        <ol className="space-y-3.5">
          {[
            { step: '1', text: "You'll receive a request confirmation email at your provided email address." },
            { step: '2', text: "Our production team will review your booking request within 24 hours." },
            { step: '3', text: "You'll receive a booking confirmation email once approved." },
            { step: '4', text: "Please arrive 10 minutes before your scheduled time." },
          ].map(item => (
            <li key={item.step} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.step}
              </span>
              <span className="text-slate-700 text-sm font-medium">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 px-6 py-3 rounded-xl font-bold transition-all text-sm shadow-sm"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm shadow-md shadow-brand-red/20"
        >
          Contact Us <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
