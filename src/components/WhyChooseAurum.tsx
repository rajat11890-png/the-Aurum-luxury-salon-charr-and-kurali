import React from 'react';
import { Sparkles, Scissors, Users, HeartHandshake, MapPin, Camera } from 'lucide-react';

export const WhyChooseAurum: React.FC = () => {
  const cards = [
    {
      title: 'Luxury Experience',
      description: 'Professional service in an elegant environment featuring arched backlit mirrors and ambient tranquility.',
      icon: Sparkles,
    },
    {
      title: 'Expert Beauty Services',
      description: 'Hair, makeup, nails, skin and lashes performed with specialized master artistry and gentle care.',
      icon: Scissors,
    },
    {
      title: 'His & Her (Unisex)',
      description: 'A unisex destination designed for everyone with dedicated styling stations for women and men.',
      icon: Users,
    },
    {
      title: 'Personalized Care',
      description: 'Services carefully tailored to every client’s unique features, scalp/skin requirements, and style preference.',
      icon: HeartHandshake,
    },
    {
      title: 'Two Convenient Locations',
      description: 'Founding flagship in Kurali and modern second branch in Modern Valley, Kharar, Punjab.',
      icon: MapPin,
    },
    {
      title: 'Modern Beauty',
      description: 'Contemporary styles, international product formulas, and cutting-edge beauty trends.',
      icon: Camera,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] relative border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.24em] font-semibold text-[#C59B27] mb-2">
            The Aurum Standard
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight mb-4">
            Why Choose Aurum?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            We believe self-care is an art form. Here is what defines your experience at The Aurum Luxury Unisex Salon.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="p-8 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[#0B3B95]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex items-center justify-center text-[#0B3B95] mb-6 group-hover:bg-[#0B3B95] group-hover:text-white transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-[#07255E] mb-3">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#C59B27]">
                  <span>Aurum Pillar 0{idx + 1}</span>
                  <span className="w-6 h-[1.5px] bg-[#C59B27]/40" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
