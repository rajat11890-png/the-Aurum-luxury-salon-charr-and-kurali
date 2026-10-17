import React from 'react';
import { ArrowUpRight, Instagram, ExternalLink, Sparkles } from 'lucide-react';
import { ServiceCategory } from '../types';
import { SALON_SERVICES } from '../data/salonData';

interface FeaturedServicesProps {
  onSelectService: (serviceId: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  // Primary 5 categories requested in prompt section 9
  const featured = SALON_SERVICES.filter((s) =>
    ['hair', 'nails', 'makeup', 'skin', 'lashes'].includes(s.id)
  );

  return (
    <section className="py-16 md:py-28 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-4 sm:gap-6">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.22em] font-semibold text-[#C59B27] mb-2">
              Bespoke Artistry
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight">
              Beauty, Grooming & Everything In Between
            </h2>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2 text-stone-500 text-xs sm:text-sm">
            <span className="sm:hidden text-[11px] font-semibold tracking-wider uppercase text-[#C59B27]">
              Swipe to explore rituals →
            </span>
            <p className="hidden sm:block text-stone-500 font-light max-w-md">
              Every treatment is an intentional ritual carried out in an atmosphere of tranquility, personal attention, and elevated care.
            </p>
          </div>
        </div>

        {/* 5-Card Featured Grid: Horizontal Snap Carousel on phone, Grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {featured.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="group relative bg-[#FAF8F5] rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer w-[80vw] max-w-[290px] sm:w-auto shrink-0 snap-center"
            >
              {/* Image Frame */}
              <div className="relative h-60 sm:h-72 overflow-hidden bg-stone-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out ${
                    service.id === 'lashes' ? 'object-[center_28%]' : 'object-center'
                  }`}
                  referrerPolicy="no-referrer"
                />
                
                {/* Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Live GIF / Reel Badge for featured services */}
                {(service.reelUrl || service.id === 'nails' || service.id === 'makeup' || service.id === 'lashes') && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#E5C568]/60 text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#E5C568] animate-pulse" />
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[#E5C568]">
                      Live Reel GIF
                    </span>
                  </div>
                )}

                {/* Floating Top Action */}
                {service.reelUrl ? (
                  <a
                    href={service.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title={`View ${service.title} on Instagram`}
                    className="absolute top-3 right-3 z-10 min-h-[34px] px-2.5 rounded-full bg-black/75 hover:bg-[#0B3B95] backdrop-blur-md border border-white/20 flex items-center gap-1 text-white text-[10px] font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
                    <span className="hidden xs:inline">Reel</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                ) : (
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-900 opacity-90 group-hover:opacity-100 group-hover:bg-[#0B3B95] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                )}

                {/* Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#E5C568]">
                    {service.id.toUpperCase()}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-white leading-tight mt-0.5">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-stone-600 font-light line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
                  {service.tagline}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-stone-200/80">
                  <span className="text-xs font-semibold text-[#0B3B95] group-hover:underline">
                    View Rituals
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking(service.title);
                    }}
                    className="min-h-[36px] text-xs uppercase tracking-wider font-bold text-[#C59B27] hover:text-[#9A7314] px-2 py-1 rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
