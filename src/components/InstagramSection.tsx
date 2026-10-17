import React from 'react';
import { Instagram, ExternalLink, Sparkles } from 'lucide-react';
import { SALON_LOCATIONS } from '../data/salonData';
import { AurumLogo } from './AurumLogo';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8F5] relative border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.24em] font-semibold text-[#C59B27] mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>Social Highlights</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight mb-4">
            Follow the Aurum Experience
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            Discover our latest transformations, beauty looks, nail art, makeup, hair styling and salon moments on Instagram.
          </p>
        </div>

        {/* Two Instagram Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Kharar */}
          <div className="p-8 sm:p-10 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[#0B3B95]/40 transition-all flex flex-col justify-between text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0B3B95]/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-rose-600" />
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C59B27]">
                Kharar Branch
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#07255E] mt-1 mb-1">
                AURUM KHARAR
              </h3>
              <p className="font-mono text-xs text-stone-500 mb-6">
                @theaurumluxurysalon_kharar
              </p>
              <p className="text-xs text-stone-600 font-light leading-relaxed mb-6">
                Latest hair smoothening, balayage, festive glam, nail extensions, and modern salon reels.
              </p>
            </div>

            <a
              href={SALON_LOCATIONS.kharar.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#E5C568]" />
              <span>FOLLOW ON INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          {/* Card 2: Kurali */}
          <div className="p-8 sm:p-10 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[#0B3B95]/40 transition-all flex flex-col justify-between text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C59B27]/10 rounded-bl-full pointer-events-none" />

            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-rose-600" />
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C59B27]">
                Kurali Branch
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#07255E] mt-1 mb-1">
                AURUM KURALI
              </h3>
              <p className="font-mono text-xs text-stone-500 mb-6">
                @theaurumluxurysalon_kurali
              </p>
              <p className="text-xs text-stone-600 font-light leading-relaxed mb-6">
                Founding flagship moments, hair transformations, skin rituals, bridal updates, and client highlights.
              </p>
            </div>

            <a
              href={SALON_LOCATIONS.kurali.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#E5C568]" />
              <span>FOLLOW ON INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
