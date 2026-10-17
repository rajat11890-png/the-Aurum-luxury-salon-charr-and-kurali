import React from 'react';
import { Crown, Award, Heart } from 'lucide-react';
import { SalonVideoPlayer } from './SalonVideoPlayer';

export const AboutSection: React.FC = () => {
  const valueCards = [
    {
      title: 'LUXURY',
      description: 'Premium surroundings and an elevated salon experience.',
      icon: Crown,
    },
    {
      title: 'EXPERTISE',
      description: 'Professional beauty and grooming services.',
      icon: Award,
    },
    {
      title: 'CARE',
      description: 'Personalized attention for every client.',
      icon: Heart,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F5EFEB]/50 relative border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Seamless Luxury Video Experience */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <SalonVideoPlayer />
          </div>

          {/* Right Column: Editorial Copy & Value Cards */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C59B27] mb-3">
              About Aurum
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight mb-6">
              Welcome to Aurum Luxury Salon
            </h2>

            <div className="space-y-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed mb-8">
              <p>
                Aurum Luxury Salon is a premium unisex beauty and grooming destination created to bring a luxurious, professional and personalized salon experience to clients in Punjab.
              </p>
              <p>
                From hair and nails to makeup, skin and lashes, Aurum combines modern beauty techniques with attentive service and a luxurious atmosphere.
              </p>
              <p className="font-medium text-stone-800">
                Our philosophy is simple: every client deserves to feel confident, cared for and their absolute best.
              </p>
            </div>

            {/* Three Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {valueCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.title}
                    className="p-5 bg-white rounded-xl border border-stone-200/70 shadow-sm hover:border-[#0B3B95]/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-center mb-3">
                      <IconComponent className="w-4 h-4 text-[#0B3B95]" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-stone-900 mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

