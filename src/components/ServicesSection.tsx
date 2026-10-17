import React, { useState } from 'react';
import { SALON_SERVICES } from '../data/salonData';
import { Calendar, HelpCircle, Check, Sparkles, Instagram, ExternalLink, Play, Volume2, VolumeX } from 'lucide-react';
import { ServiceCategory } from '../types';
import { BackgroundVideo } from './BackgroundVideo';

interface ServicesSectionProps {
  onOpenBooking: (locationPref?: 'kharar' | 'kurali', serviceName?: string) => void;
  selectedCategoryFromOutside?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<string>('hair');
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [enquiryModalService, setEnquiryModalService] = useState<string | null>(null);

  const currentCategory = SALON_SERVICES.find((s) => s.id === activeTab) || SALON_SERVICES[0];

  const handleEnquire = (serviceName: string) => {
    setEnquiryModalService(serviceName);
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAF8F5] relative border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.24em] font-semibold text-[#C59B27] mb-2">
            The Aurum Menu
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight mb-4">
            Curated Beauty & Grooming Services
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            From hair transformations and bespoke nails to glowing skin therapy, party glam, and men's precision grooming.
          </p>
        </div>

        {/* Category Tabs (Segmented Control - Interactive buttons with 44px tap targets) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 sm:mb-12 no-scrollbar gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {SALON_SERVICES.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`min-h-[44px] px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#0B3B95] text-white shadow-sm ring-2 ring-[#0B3B95]/30'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                }`}
              >
                {cat.id === 'mens' ? "Men's Grooming" : cat.id.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Active Category Display Container */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto min-h-[300px] sm:min-h-[420px] bg-stone-900 overflow-hidden group">
              {currentCategory.videoSrc ? (
                <BackgroundVideo
                  key={currentCategory.videoSrc}
                  src={currentCategory.videoSrc}
                  poster={currentCategory.image}
                  isMuted={isVideoMuted}
                  className={`w-full h-full object-cover ${
                    currentCategory.id === 'lashes' ? 'object-[center_28%]' : 'object-center'
                  }`}
                />
              ) : (
                <img
                  src={currentCategory.image}
                  alt={currentCategory.title}
                  className={`w-full h-full object-cover ${
                    currentCategory.id === 'lashes' ? 'object-[center_28%]' : 'object-center'
                  }`}
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              
              {/* Badges and actions */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                {currentCategory.videoSrc ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#E5C568]/60 text-white shadow-lg pointer-events-none">
                    <Play className="w-2.5 h-2.5 fill-[#E5C568] text-[#E5C568]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E5C568]">
                      Signature Video Reel
                    </span>
                  </div>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  {currentCategory.videoSrc && (
                    <button
                      type="button"
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition-all shadow-md active:scale-95 cursor-pointer"
                      title={isVideoMuted ? 'Unmute video sound' : 'Mute video sound'}
                      aria-label={isVideoMuted ? 'Unmute video sound' : 'Mute video sound'}
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-stone-300" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-[#E5C568]" />
                      )}
                    </button>
                  )}

                  {currentCategory.reelUrl && (
                    <a
                      href={currentCategory.reelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-[#0B3B95] active:scale-95 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
                      <span>Reel</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  )}
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#E5C568]">
                  {currentCategory.videoSrc ? 'Signature Craft Spotlight' : 'Category Spotlight'}
                </span>
                <h3 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white mt-1">
                  {currentCategory.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-200 font-light mt-1.5 max-w-sm line-clamp-2 sm:line-clamp-none">
                  {currentCategory.description}
                </p>
              </div>
            </div>

            {/* Content & Rituals List Column */}
            <div className="lg:col-span-7 p-5 sm:p-10 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-[#C59B27] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentCategory.tagline}</span>
                </div>

                <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#07255E] mb-5 sm:mb-6">
                  Available Services & Treatments
                </h4>

                {/* Service Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
                  {currentCategory.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 flex items-start gap-2.5 sm:gap-3 hover:border-[#0B3B95]/40 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#0B3B95]/10 text-[#0B3B95] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-stone-800">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Additional Detailed Treatments if present */}
                {currentCategory.detailedItems && currentCategory.detailedItems.length > 0 && (
                  <div className="border-t border-stone-200/80 pt-5 mb-6 sm:mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                      Featured Ritual Descriptions
                    </div>
                    <div className="space-y-3">
                      {currentCategory.detailedItems.map((detail) => (
                        <div key={detail.id} className="text-xs">
                          <span className="font-semibold text-stone-900">{detail.title}: </span>
                          <span className="text-stone-600 font-light">{detail.description}</span>
                          <span className="block text-[11px] text-[#C59B27] italic mt-0.5">
                            Best suited for: {detail.recommendedFor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hair Specific Live Reel Highlight Card */}
                {currentCategory.id === 'hair' && (
                  <div className="mt-4 mb-2 p-4 rounded-2xl bg-[#07255E]/5 border border-[#C59B27]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/60 shrink-0 bg-stone-900 shadow-sm">
                        <img
                          src={currentCategory.image}
                          alt="Aurum Hair Design Live Reel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#07255E] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Official Hair Styling Transformation (Reel)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-light mt-0.5">
                          Layered haircut precision, bouncy volume & silk blowout crafted at Aurum.
                        </p>
                      </div>
                    </div>
                    {currentCategory.reelUrl && (
                      <a
                        href={currentCategory.reelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
                        <span>Watch Reel</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    )}
                  </div>
                )}

                {/* Nails Specific Live Reel Highlight Card */}
                {currentCategory.id === 'nails' && (
                  <div className="mt-4 mb-2 p-4 rounded-2xl bg-[#07255E]/5 border border-[#C59B27]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/60 shrink-0 bg-stone-900 shadow-sm">
                        <img
                          src={currentCategory.image}
                          alt="Aurum Nail Artistry Live Reel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#07255E] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Official Nail Transformation (Reel)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-light mt-0.5">
                          Sculpted gel extensions & metallic accents crafted at Aurum.
                        </p>
                      </div>
                    </div>
                    {currentCategory.reelUrl && (
                      <a
                        href={currentCategory.reelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
                        <span>Watch Reel</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    )}
                  </div>
                )}

                {/* Makeup Specific Live Reel Highlight Card */}
                {currentCategory.id === 'makeup' && (
                  <div className="mt-4 mb-2 p-4 rounded-2xl bg-[#07255E]/5 border border-[#C59B27]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/60 shrink-0 bg-stone-900 shadow-sm">
                        <img
                          src={currentCategory.image}
                          alt="Aurum Makeup & Artistry Live Reel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#07255E] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Official Makeup Artistry (Reel)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-light mt-0.5">
                          High-definition bridal glam & luminous skin finish crafted at Aurum.
                        </p>
                      </div>
                    </div>
                    {currentCategory.reelUrl && (
                      <a
                        href={currentCategory.reelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
                        <span>Watch Reel</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    )}
                  </div>
                )}

                {/* Skin Specific Live Reel Highlight Card */}
                {currentCategory.id === 'skin' && (
                  <div className="mt-4 mb-2 p-4 rounded-2xl bg-[#07255E]/5 border border-[#C59B27]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/60 shrink-0 bg-stone-900 shadow-sm">
                        <img
                          src={currentCategory.image}
                          alt="Aurum Skin Therapies & Glow Live Reel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#07255E] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Official Skin Therapy & Glow (Reel)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-light mt-0.5">
                          Skin purification, radiance hydration & rejuvenating therapies crafted at Aurum.
                        </p>
                      </div>
                    </div>
                    {currentCategory.reelUrl && (
                      <a
                        href={currentCategory.reelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
                        <span>Watch Reel</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    )}
                  </div>
                )}

                {/* Lashes Specific Live Reel Highlight Card */}
                {currentCategory.id === 'lashes' && (
                  <div className="mt-4 mb-2 p-4 rounded-2xl bg-[#07255E]/5 border border-[#C59B27]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/60 shrink-0 bg-stone-900 shadow-sm">
                        <img
                          src={currentCategory.image}
                          alt="Aurum Lash Enhancement Live Reel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#07255E] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Official Lash Enhancements (Reel)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-light mt-0.5">
                          Customized lash styling, volume extensions & eye definition crafted at Aurum.
                        </p>
                      </div>
                    </div>
                    {currentCategory.reelUrl && (
                      <a
                        href={currentCategory.reelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
                        <span>Watch Reel</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    )}
                  </div>
                )}

                {/* Men's Grooming Specific Live Reel Highlight Card */}
                {currentCategory.id === 'mens' && (
                  <div className="mt-4 mb-2 p-4 rounded-2xl bg-[#07255E]/5 border border-[#C59B27]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/60 shrink-0 bg-stone-900 shadow-sm">
                        <img
                          src={currentCategory.image}
                          alt="Aurum Men's Luxury Grooming Live Reel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#07255E] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Official Men's Grooming (Reel)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-light mt-0.5">
                          Precision scissor cut, executive fade & hot towel beard sculpting crafted at Aurum.
                        </p>
                      </div>
                    </div>
                    {currentCategory.reelUrl && (
                      <a
                        href={currentCategory.reelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
                        <span>Watch Reel</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons with 48px touch targets */}
              <div className="pt-5 sm:pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => onOpenBooking(undefined, currentCategory.title)}
                  className="min-h-[48px] flex-1 py-3 px-6 bg-[#0B3B95] text-white text-xs font-semibold tracking-[0.14em] uppercase rounded-xl shadow-sm hover:bg-[#07255E] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#E5C568]" />
                  <span>BOOK THIS CATEGORY</span>
                </button>

                <button
                  onClick={() => handleEnquire(currentCategory.title)}
                  className="min-h-[48px] py-3 px-6 bg-white border border-stone-300 text-stone-800 text-xs font-semibold tracking-[0.14em] uppercase rounded-xl hover:border-[#0B3B95] hover:text-[#0B3B95] active:bg-stone-50 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>ENQUIRE NOW</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Quick Service Enquiry Modal */}
      {enquiryModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#07255E] mb-2">
              Enquire About {enquiryModalService}
            </h3>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              Have specific questions regarding hair length, texture recommendations, skin sensitivities, or custom bridal packages? Connect directly with our front desk.
            </p>

            <div className="space-y-3">
              <a
                href={`https://wa.me/919875847109?text=${encodeURIComponent(
                  `Hello Aurum Luxury Salon, I have an enquiry regarding ${enquiryModalService}. Could you share more details?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span>Enquire via WhatsApp (Kharar)</span>
              </a>

              <button
                onClick={() => {
                  const service = enquiryModalService;
                  setEnquiryModalService(null);
                  onOpenBooking(undefined, service);
                }}
                className="w-full py-3 px-4 bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Book via WhatsApp Quick</span>
              </button>

              <button
                onClick={() => setEnquiryModalService(null)}
                className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
