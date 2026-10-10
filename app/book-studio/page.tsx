// app/book-studio/page.tsx
import type { Metadata } from 'next';
import BookingWizard from '@/components/booking/BookingWizard';

export const metadata: Metadata = {
  title: 'Book The Studio | WIZEtv Studios',
  description: 'Book a professional podcast and media production studio session at WIZEtv Studios, Colombo. Select your package, date, and time in minutes.',
};

export default function BookStudioPage() {
  return (
    <section className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#090D16] to-brand-dark border-b border-brand-charcoal">
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Studio Booking
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Book The <span className="text-brand-red">Studio</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select your package, choose your date and time, and submit your booking request.
            Our team will confirm within 24 hours.
          </p>
        </div>
      </div>

      {/* Wizard */}
      <BookingWizard />
    </section>
  );
}
