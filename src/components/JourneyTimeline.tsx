import React from 'react';
import { JOURNEY_TIMELINE } from '../data/salonData';
import { CalendarCheck, MapPin } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.22em] font-semibold text-[#C59B27] mb-2">
            The Aurum Heritage
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight mb-4">
            Our Journey
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            Founded with the vision of bringing a premium, professional, and luxurious salon experience to clients in Punjab outside metropolitan hubs.
          </p>
        </div>

        {/* Timeline Component */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C59B27] via-[#0B3B95] to-[#C59B27]/40" />

          <div className="space-y-12">
            {JOURNEY_TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Box */}
                  <div className="w-full md:w-1/2 px-0 md:px-8 mb-4 md:mb-0">
                    <div
                      className={`p-6 sm:p-7 bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow ${
                        isEven ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider text-[#0B3B95] bg-stone-100 rounded-md">
                          {item.month ? `${item.month} ${item.year}` : item.year}
                        </span>
                      </div>

                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#07255E] mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-stone-600 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0B3B95] text-white items-center justify-center border-4 border-[#FAF8F5] shadow-md z-10">
                    {index === 0 && <MapPin className="w-4 h-4 text-[#E5C568]" />}
                    {index === 1 && <CalendarCheck className="w-4 h-4 text-[#E5C568]" />}
                    {index === 2 && <span className="text-xs font-bold">★</span>}
                  </div>

                  {/* Empty Spacer Column for balance on desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>

        {/* Brand Pillars */}
        <div className="mt-16 pt-10 border-t border-stone-200/80">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] font-semibold text-stone-500">
            <span>Luxury</span>
            <span className="text-[#C59B27]">·</span>
            <span>Professionalism</span>
            <span className="text-[#C59B27]">·</span>
            <span>Customer Experience</span>
            <span className="text-[#C59B27]">·</span>
            <span>Beauty Expertise</span>
            <span className="text-[#C59B27]">·</span>
            <span>Personalized Care</span>
          </div>
        </div>

      </div>
    </section>
  );
};
