import React from 'react';
import { Phone, MessageCircle, Instagram, Navigation, Calendar, Mail, Clock, MapPin } from 'lucide-react';
import { SALON_LOCATIONS } from '../data/salonData';

interface ContactSectionProps {
  onOpenBooking: (locationPref?: 'kharar' | 'kurali') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.24em] font-semibold text-[#C59B27] mb-2">
            Get in Touch
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight mb-4">
            Contact Aurum Luxury Salon
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            Our team is always delighted to assist with service consultations, bridal bookings, and appointment coordination.
          </p>
        </div>

        {/* Both Branches Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* BRANCH 1: KHARAR */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border-2 border-[#0B3B95]/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B3B95] bg-[#0B3B95]/10 px-3 py-1 rounded-full">
                  Modern Valley Branch
                </span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  ● Verified Location
                </span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#07255E] mb-2">
                Aurum Luxury Salon – Kharar
              </h3>
              <p className="text-xs text-stone-500 mb-6 uppercase tracking-wider font-semibold text-[#C59B27]">
                First Floor, SCO-2, Modern Valley, Kharar, Punjab
              </p>

              {/* Contact list */}
              <div className="space-y-4 mb-8 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0B3B95] shrink-0 mt-0.5" />
                  <span>First Floor, SCO-2, Modern Valley, Kharar, Punjab</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#0B3B95] shrink-0" />
                  <a href={`tel:${SALON_LOCATIONS.kharar.phone}`} className="font-bold text-[#0B3B95] hover:underline">
                    9875847109 (+91 98758 47109)
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-[#0B3B95] shrink-0" />
                  <a
                    href={SALON_LOCATIONS.kharar.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-stone-900 hover:text-[#0B3B95]"
                  >
                    @theaurumluxurysalon_kharar
                  </a>
                </div>
              </div>
            </div>

            {/* All 5 Actions: Call Now, WhatsApp, Instagram, Get Directions, Book Now */}
            <div className="pt-5 border-t border-stone-200 space-y-2.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a
                  href={`tel:${SALON_LOCATIONS.kharar.phone}`}
                  className="min-h-[44px] py-2.5 px-3 bg-white border border-stone-300 hover:border-[#0B3B95] active:bg-stone-100 text-stone-800 text-[11px] font-bold uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C59B27]" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/919875847109?text=${encodeURIComponent(
                    'Hello Aurum Luxury Salon, I would like to book an appointment at the Kharar branch.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-2.5 px-3 bg-white border border-emerald-300 active:bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={SALON_LOCATIONS.kharar.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-2.5 px-3 bg-white border border-stone-300 hover:border-[#0B3B95] active:bg-stone-100 text-stone-800 text-[11px] font-bold uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-rose-500" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Modern+Valley+SCO-2+Kharar+Punjab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-2.5 px-3 bg-white border border-stone-300 hover:border-[#0B3B95] active:bg-stone-100 text-stone-800 text-[11px] font-bold uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#0B3B95]" />
                  <span>Directions</span>
                </a>
              </div>

              <button
                onClick={() => onOpenBooking('kharar')}
                className="min-h-[48px] w-full py-3 px-4 bg-[#0B3B95] hover:bg-[#07255E] active:scale-[0.99] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E5C568]" />
                <span>BOOK AT KHARAR</span>
              </button>
            </div>
          </div>

          {/* BRANCH 2: KURALI */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 bg-stone-200/60 px-3 py-1 rounded-full">
                  Founding Flagship
                </span>
                <span className="text-xs text-stone-400">
                  Est. June 2025
                </span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#07255E] mb-2">
                The Aurum Luxury Unisex Salon – Kurali
              </h3>
              <p className="text-xs text-stone-500 mb-6 uppercase tracking-wider font-semibold text-[#C59B27]">
                Kurali, Punjab
              </p>

              {/* Contact list */}
              <div className="space-y-4 mb-8 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0B3B95] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xs bg-stone-100 px-2 py-0.5 rounded border border-stone-200 text-stone-600">
                      [INSERT VERIFIED KURALI ADDRESS]
                    </span>
                    <p className="text-[11px] text-stone-400 mt-1">Kurali, Punjab</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#0B3B95] shrink-0" />
                  <span className="font-mono text-xs bg-stone-100 px-2 py-0.5 rounded border border-stone-200 text-stone-600">
                    [INSERT VERIFIED KURALI PHONE]
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-[#0B3B95] shrink-0" />
                  <a
                    href={SALON_LOCATIONS.kurali.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-stone-900 hover:text-[#0B3B95]"
                  >
                    @theaurumluxurysalon_kurali
                  </a>
                </div>
              </div>
            </div>

            {/* All 5 Actions: Call Now, WhatsApp, Instagram, Get Directions, Book Now */}
            <div className="pt-6 border-t border-stone-200 space-y-2.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => alert('The official phone number for Kurali branch is being verified. Please connect via our Instagram (@theaurumluxurysalon_kurali) or call our Kharar branch at 9875847109.')}
                  className="py-2.5 px-3 bg-white border border-stone-300 hover:border-[#0B3B95] text-stone-800 text-[11px] font-bold uppercase tracking-wider rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Call Now</span>
                </button>

                <a
                  href={SALON_LOCATIONS.kurali.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-white border border-stone-300 hover:border-[#0B3B95] text-stone-800 text-[11px] font-bold uppercase tracking-wider rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DM Kurali</span>
                </a>

                <a
                  href={SALON_LOCATIONS.kurali.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-white border border-stone-300 hover:border-[#0B3B95] text-stone-800 text-[11px] font-bold uppercase tracking-wider rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-500" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kurali+Punjab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-white border border-stone-300 hover:border-[#0B3B95] text-stone-800 text-[11px] font-bold uppercase tracking-wider rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#0B3B95]" />
                  <span>Directions</span>
                </a>
              </div>

              <button
                onClick={() => onOpenBooking('kurali')}
                className="w-full py-3 px-4 bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E5C568]" />
                <span>BOOK AT KURALI</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
