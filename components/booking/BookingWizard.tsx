'use client';

import { useState } from 'react';
import { CheckCircle, Package, Calendar, Clock, User, Eye, ChevronRight } from 'lucide-react';
import { BookingFormData, StudioPackage } from '@/lib/booking-types';
import StepPackage from './StepPackage';
import StepDate from './StepDate';
import StepTime from './StepTime';
import StepDetails from './StepDetails';
import StepReview from './StepReview';
import BookingSuccess from './BookingSuccess';

const STEPS = [
  { id: 1, label: 'Package', icon: Package },
  { id: 2, label: 'Date', icon: Calendar },
  { id: 3, label: 'Time', icon: Clock },
  { id: 4, label: 'Details', icon: User },
  { id: 5, label: 'Review', icon: Eye },
];

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<StudioPackage | null>(null);
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    guest_count: 1,
  });

  const updateFormData = (data: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goNext = () => setCurrentStep(s => Math.min(s + 1, 5));
  const goPrev = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/bookings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setBookingRef(data.bookingReference);
        setIsSubmitted(true);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      alert(msg);
    }
  };

  if (isSubmitted) {
    return <BookingSuccess bookingReference={bookingRef} clientName={formData.client_name ?? ''} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          {/* connector line */}
          <div className="absolute top-5 left-0 right-0 h-px bg-brand-charcoal z-0" />
          <div
            className="absolute top-5 left-0 h-px bg-brand-red z-0 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;
            return (
              <div key={step.id} className="flex flex-col items-center z-10">
                <button
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  disabled={step.id > currentStep}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-brand-red border-brand-red text-white cursor-pointer'
                      : isActive
                      ? 'bg-brand-dark border-brand-red text-brand-red'
                      : 'bg-brand-dark border-brand-charcoal text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle size={18} /> : <Icon size={16} />}
                </button>
                <span
                  className={`mt-2 text-xs font-semibold hidden sm:block ${
                    isActive ? 'text-brand-red' : isCompleted ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {`0${step.id}`} {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[480px]">
        {currentStep === 1 && (
          <StepPackage
            selectedPackageId={formData.package_id}
            onSelect={(pkg) => {
              setSelectedPackage(pkg);
              updateFormData({ package_id: pkg.id });
              goNext();
            }}
          />
        )}
        {currentStep === 2 && (
          <StepDate
            selectedDate={formData.requested_date}
            packageId={formData.package_id}
            onSelect={(date) => {
              updateFormData({ requested_date: date });
              goNext();
            }}
            onBack={goPrev}
          />
        )}
        {currentStep === 3 && (
          <StepTime
            selectedDate={formData.requested_date!}
            packageId={formData.package_id!}
            selectedTime={formData.requested_time_slot}
            onSelect={(time) => {
              updateFormData({ requested_time_slot: time });
              goNext();
            }}
            onBack={goPrev}
          />
        )}
        {currentStep === 4 && (
          <StepDetails
            formData={formData}
            selectedPackage={selectedPackage}
            onChange={updateFormData}
            onNext={goNext}
            onBack={goPrev}
          />
        )}
        {currentStep === 5 && (
          <StepReview
            formData={formData as BookingFormData}
            selectedPackage={selectedPackage}
            onSubmit={handleSubmit}
            onBack={goPrev}
            onEditStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
}
