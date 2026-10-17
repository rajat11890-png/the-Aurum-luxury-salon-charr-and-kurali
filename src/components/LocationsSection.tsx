import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Navigation, Calendar, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { SALON_LOCATIONS } from '../data/salonData';

interface LocationsSectionProps {
  onOpenBooking: (locationPref: 'kharar' | 'kurali') => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'kharar' | 'kurali'>('all');

  return (
    <section id="locations" className="py-20 md:py-28 bg-[#F5EFEB]/50 relative border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.24em] font-semibold text-[#C59B27] mb-2">
            Visit Our Salons
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight mb-4">
            Our Locations in Punjab
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            Experience the signature Aurum luxury and personalized beauty care at our modern salons in Kharar and Kurali.
          </p>

          {/* Location Filter Control */}
          <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-xl mt-6 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Branches (2)
            </button>
            <button
              onClick={() => setActiveTab('kharar')}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'kharar'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kharar
            </button>
            <button
              onClick={() => setActiveTab('kurali')}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'kurali'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kurali
            </button>
          </div>
        </div>

        {/* 2 Dedicated Large Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* LOCATION 1: KURALI FLAGSHIP */}
          {(activeTab === 'all' || activeTab === 'kurali') && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5C568]/10 rounded-bl-full pointer-events-none" />

              <div>
                {/* Header & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B3B95] bg-[#0B3B95]/10 px-3 py-1 rounded-full">
                    Location 1 · Founding Flagship
                  </span>
                  <span className="text-xs text-stone-400 font-light">Est. June 2025</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#07255E] mb-1">
                  THE AURUM LUXURY UNISEX SALON
                </h3>
                <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#C59B27] uppercase mb-6">
                  KURALI BRANCH
                </div>

                {/* Details List */}
                <div className="space-y-4 mb-8 text-stone-600 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-[#0B3B95]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Address
                      </div>
                      <div className="font-mono text-xs text-stone-700 bg-stone-50 px-2 py-1 rounded border border-stone-200 inline-block mt-0.5 break-all sm:break-normal">
                        [INSERT VERIFIED KURALI ADDRESS HERE]
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1 italic">
                        Kurali, Punjab · Direct address coordinates update upon verification
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-[#0B3B95]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Phone Number
                      </div>
                      <div className="font-mono text-xs text-stone-700 bg-stone-50 px-2 py-1 rounded border border-stone-200 inline-block mt-0.5">
                        [INSERT VERIFIED KURALI PHONE NUMBER HERE]
                      </div>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-[#0B3B95]">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Official Instagram
                      </div>
                      <a
                        href={SALON_LOCATIONS.kurali.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] text-xs sm:text-sm font-semibold text-[#0B3B95] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>@theaurumluxurysalon_kurali</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons with 48px touch targets */}
              <div className="pt-5 border-t border-stone-200/80 flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kurali+Punjab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] py-2.5 px-3 bg-stone-100 active:bg-stone-200 text-stone-800 text-xs font-semibold tracking-wider uppercase rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-[#0B3B95]" />
                    <span>GET DIRECTIONS</span>
                  </a>

                  <button
                    onClick={() => {
                      alert('The official phone number for Kurali branch is being verified. Please connect via our Instagram (@theaurumluxurysalon_kurali) or call our Kharar branch at 9875847109.');
                    }}
                    className="min-h-[48px] py-2.5 px-3 bg-stone-100 active:bg-stone-200 text-stone-800 text-xs font-semibold tracking-wider uppercase rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#C59B27]" />
                    <span>CALL NOW</span>
                  </button>
                </div>

                <button
                  onClick={() => onOpenBooking('kurali')}
                  className="min-h-[48px] w-full py-3 px-4 bg-[#0B3B95] hover:bg-[#07255E] active:scale-[0.99] text-white text-xs font-semibold tracking-[0.14em] uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E5C568]" />
                  <span>BOOK AT KURALI</span>
                </button>
              </div>

            </div>
          )}

          {/* LOCATION 2: KHARAR BRANCH */}
          {(activeTab === 'all' || activeTab === 'kharar') && (
            <div className="bg-white rounded-3xl border-2 border-[#0B3B95]/30 p-6 sm:p-10 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0B3B95]/10 rounded-bl-full pointer-events-none" />

              <div>
                {/* Header & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Location 2 · Modern Valley Branch</span>
                  </span>
                  <span className="text-xs text-stone-400 font-light">Est. April 2026</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#07255E] mb-1">
                  AURUM LUXURY SALON – KHARAR
                </h3>
                <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#C59B27] uppercase mb-6">
                  FIRST FLOOR, SCO-2
                </div>

                {/* Details List */}
                <div className="space-y-4 mb-8 text-stone-600 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-[#0B3B95]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Address
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-stone-900 mt-0.5 leading-relaxed">
                        First Floor, SCO-2, Modern Valley, Kharar, Punjab
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-[#0B3B95]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Direct Phone
                      </div>
                      <a
                        href={`tel:${SALON_LOCATIONS.kharar.phone}`}
                        className="min-h-[44px] flex items-center text-xs sm:text-sm font-bold text-[#0B3B95] hover:underline mt-0.5"
                      >
                        9875847109 (+91 98758 47109)
                      </a>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-[#0B3B95]">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Official Instagram
                      </div>
                      <a
                        href={SALON_LOCATIONS.kharar.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] flex items-center text-xs sm:text-sm font-semibold text-[#0B3B95] hover:underline gap-1 mt-0.5"
                      >
                        <span>@theaurumluxurysalon_kharar</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons with 48px touch targets */}
              <div className="pt-5 border-t border-stone-200/80 flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Modern+Valley+SCO-2+Kharar+Punjab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] py-2.5 px-3 bg-stone-100 active:bg-stone-200 text-stone-800 text-xs font-semibold tracking-wider uppercase rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-[#0B3B95]" />
                    <span>GET DIRECTIONS</span>
                  </a>

                  <a
                    href={`tel:${SALON_LOCATIONS.kharar.phone}`}
                    className="min-h-[48px] py-2.5 px-3 bg-stone-100 active:bg-stone-200 text-stone-800 text-xs font-semibold tracking-wider uppercase rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C59B27]" />
                    <span>CALL NOW</span>
                  </a>
                </div>

                <button
                  onClick={() => onOpenBooking('kharar')}
                  className="min-h-[48px] w-full py-3 px-4 bg-[#0B3B95] hover:bg-[#07255E] active:scale-[0.99] text-white text-xs font-semibold tracking-[0.14em] uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E5C568]" />
                  <span>BOOK AT KHARAR</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
