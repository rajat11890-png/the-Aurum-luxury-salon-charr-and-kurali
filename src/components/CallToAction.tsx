import React from 'react';
import { Calendar, Instagram, Sparkles } from 'lucide-react';
import { AurumLogo } from './AurumLogo';
import { SALON_LOCATIONS } from '../data/salonData';
import { BackgroundVideo } from './BackgroundVideo';

interface CallToActionProps {
  onOpenBooking: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-24 md:py-32 bg-[#07255E] text-white overflow-hidden">
      {/* Ambient background salon tour video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <BackgroundVideo
          src="/videos/aurum_salon_tour.mp4"
          poster="/images/aurum_kurali_salon_interior_1.jpg"
          className="w-full h-full object-cover filter blur-[1px] scale-105"
        />
        <div className="absolute inset-0 bg-[#07255E]/85 mix-blend-multiply" />
      </div>

      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0B3B95]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E5C568]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative arched framing line */}
      <div className="absolute inset-x-8 inset-y-8 rounded-3xl border border-white/10 pointer-events-none hidden md:block" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center justify-center mb-6">
          <AurumLogo size="lg" variant="badge" className="ring-4 ring-white/20 rounded-full" />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#E5C568] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Aurum Experience</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
          Ready for Your Aurum Transformation?
        </h2>

        <p className="text-base sm:text-xl text-stone-200 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Step into luxury. Step out feeling your best.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#07255E] text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase rounded-xl shadow-lg hover:bg-stone-100 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#C59B27]" />
            <span>BOOK YOUR APPOINTMENT</span>
          </button>

          <a
            href={SALON_LOCATIONS.kharar.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Instagram className="w-4 h-4 text-[#E5C568]" />
            <span>FOLLOW US ON INSTAGRAM</span>
          </a>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300">
          <span>Kharar: Modern Valley, SCO-2</span>
          <span>·</span>
          <span>Phone: 9875847109</span>
          <span>·</span>
          <span>Kurali Flagship</span>
        </div>

      </div>
    </section>
  );
};
