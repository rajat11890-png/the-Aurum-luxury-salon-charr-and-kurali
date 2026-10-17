import React from 'react';
import { Calendar, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { AurumLogo } from './AurumLogo';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background ambient luxury gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFEB]/70 via-[#FAF8F5] to-[#FAF8F5] pointer-events-none" />

      {/* Subtle architectural arched background shape echoing the salon's signature arched mirrors */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-[#E5C568]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#C59B27] mb-4">
              <span>The Aurum Luxury Unisex Salon</span>
              <span aria-hidden="true">·</span>
              <span>His & Her</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#07255E] leading-[1.1] mb-6 text-balance">
              Transforming Beauty with <span className="italic font-normal text-[#0B3B95]">Luxury</span> and <span className="text-[#C59B27] font-normal">Care</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              Where luxury meets beauty, grooming and personalized care. Experience premium unisex beauty rituals designed to make you look confident, feel beautiful, and leave feeling your absolute best.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 sm:mb-10">
              <button
                onClick={onOpenBooking}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-[#0B3B95] text-white text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase rounded-xl shadow-md hover:bg-[#07255E] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E5C568]" />
                <span>BOOK NOW</span>
              </button>

              <a
                href="#services"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-stone-800 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase rounded-xl border border-stone-300 hover:border-[#0B3B95] hover:text-[#0B3B95] active:bg-stone-50 transition-all duration-200"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Location & Trust markers */}
            <div className="pt-5 border-t border-stone-200/80 grid grid-cols-2 gap-3 max-w-md">
              <a
                href="#locations"
                className="group flex flex-col p-2.5 rounded-xl bg-white/60 sm:bg-transparent border sm:border-0 border-stone-200/80 hover:bg-stone-100/80 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#0B3B95] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                  <span>Kharar Branch</span>
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">Modern Valley, SCO-2</span>
              </a>

              <a
                href="#locations"
                className="group flex flex-col p-2.5 rounded-xl bg-white/60 sm:bg-transparent border sm:border-0 border-stone-200/80 hover:bg-stone-100/80 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#0B3B95] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                  <span>Kurali Branch</span>
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">Founding Flagship</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with Arched Mirror Motif */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            
            {/* Signature Arched Visual Container matching the salon's arched brass mirrors */}
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative gold hairline frame */}
              <div className="absolute -inset-2.5 rounded-t-[100px] sm:rounded-t-[140px] rounded-b-2xl border border-[#C59B27]/40 -z-10 transform -rotate-1 hidden sm:block" />
              
              {/* Main Arched Visual Box */}
              <div className="relative rounded-t-[100px] sm:rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-stone-900 border-2 border-[#C59B27]/60 group">
                <img
                  src="/src/assets/images/aurum_kurali_salon_interior_1.jpg"
                  alt="The Aurum Luxury Unisex Salon interior with arched backlit mirrors, cognac leather styling chairs, and ambient chandeliers"
                  className="w-full h-[320px] sm:h-[460px] lg:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle luxury vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07255E]/85 via-transparent to-transparent pointer-events-none" />

                {/* Floating Brand Badge on the visual */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/90 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow-lg border border-stone-200">
                  <AurumLogo size="sm" variant="badge" className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                {/* Bottom caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#E5C568] mb-0.5 sm:mb-1">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Real Salon Atmosphere</span>
                  </div>
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white tracking-wide leading-snug">
                    Arched Mirrors · Cognac Leather · Brass Accents
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-200 font-light mt-1 line-clamp-2 sm:line-clamp-none">
                    Designed for unhurried comfort, aesthetic refinement, and master craftsmanship.
                  </p>
                </div>
              </div>

              {/* Floating review/proof card */}
              <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-8 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-xl p-3 sm:p-4 shadow-xl max-w-[210px] sm:max-w-[240px] hidden xs:block">
                <div className="flex items-center gap-0.5 text-[#C59B27] mb-1">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-xs">{star}</span>
                  ))}
                </div>
                <p className="text-[11px] sm:text-xs font-medium text-stone-800 leading-snug">
                  "Punjab's premier luxury his & her beauty destination."
                </p>
                <div className="text-[9px] sm:text-[10px] text-stone-500 mt-1 uppercase tracking-wider">
                  Kharar & Kurali
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
