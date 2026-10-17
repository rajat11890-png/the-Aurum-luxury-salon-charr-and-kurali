import React, { useState } from 'react';
import { GALLERY_ITEMS, SALON_LOCATIONS } from '../data/salonData';
import { Instagram, Eye, ExternalLink, X, Play } from 'lucide-react';
import { GalleryItem } from '../types';
import { BackgroundVideo } from './BackgroundVideo';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'hair', label: 'Hair' },
    { id: 'nails', label: 'Nails' },
    { id: 'makeup', label: 'Makeup' },
    { id: 'skin', label: 'Skin' },
    { id: 'lashes', label: 'Lashes' },
    { id: 'mens', label: "Men's Grooming" },
    { id: 'interior', label: 'Salon Experience' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.24em] font-semibold text-[#C59B27] mb-2">
              Visual Portfolio
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight">
              The Aurum Gallery
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={SALON_LOCATIONS.kharar.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-100 hover:bg-[#0B3B95] hover:text-white text-stone-700 text-xs font-semibold tracking-wider transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Kharar Feed</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
            <a
              href={SALON_LOCATIONS.kurali.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-100 hover:bg-[#0B3B95] hover:text-white text-stone-700 text-xs font-semibold tracking-wider transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Kurali Feed</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Filter Tabs (Interactive Filter Buttons with 44px tap targets) */}
        <div className="flex items-center overflow-x-auto pb-3 mb-8 sm:mb-10 gap-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#0B3B95] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 active:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-sm cursor-pointer"
            >
              {item.isVideo && item.videoSrc ? (
                <BackgroundVideo
                  src={item.videoSrc}
                  poster={item.image}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                    item.category === 'lashes' ? 'object-[center_28%]' : 'object-center'
                  }`}
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out ${
                    item.category === 'lashes' ? 'object-[center_28%]' : 'object-center'
                  }`}
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

              {/* Video Reel Badge */}
              {item.isVideo && (
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#E5C568]/60 text-white shadow-lg pointer-events-none">
                  <Play className="w-2.5 h-2.5 fill-[#E5C568] text-[#E5C568]" />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#E5C568]">
                    Video Reel
                  </span>
                </div>
              )}

              {/* Floating Quick Action */}
              <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-900 opacity-90 sm:opacity-0 group-hover:opacity-100 transform sm:translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                <Eye className="w-4 h-4" />
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-[#E5C568]">
                  {item.categoryLabel} · {item.locationLabel}
                </span>
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white leading-snug mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Instagram */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-600 font-medium">
              Want to see daily stories, reels, and transformations?
            </span>
            <div className="flex items-center gap-2">
              <a
                href={SALON_LOCATIONS.kharar.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 text-xs font-semibold text-[#0B3B95] bg-white border border-stone-300 rounded-lg hover:border-[#0B3B95] flex items-center gap-1.5 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>View More on Instagram</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeLightboxItem.isVideo && activeLightboxItem.videoSrc ? (
              <video
                src={activeLightboxItem.videoSrc}
                poster={activeLightboxItem.image}
                autoPlay
                controls
                playsInline
                className="w-full max-h-[70vh] object-contain bg-black"
              />
            ) : (
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="w-full max-h-[70vh] object-contain bg-black"
                referrerPolicy="no-referrer"
              />
            )}

            <div className="p-6 bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#E5C568]">
                    {activeLightboxItem.categoryLabel}
                  </span>
                  {activeLightboxItem.reelUrl && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5C568]/20 text-[#E5C568] border border-[#E5C568]/40 font-bold uppercase tracking-wider">
                      Official Reel
                    </span>
                  )}
                </div>
                <h4 className="font-serif-luxury text-2xl font-bold mt-0.5">
                  {activeLightboxItem.title}
                </h4>
              </div>

              <a
                href={activeLightboxItem.reelUrl || SALON_LOCATIONS.kharar.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors whitespace-nowrap active:scale-95 shadow-md"
              >
                <Instagram className="w-4 h-4 text-[#E5C568]" />
                <span>
                  {activeLightboxItem.reelUrl
                    ? 'Watch Original Reel'
                    : 'View on Instagram'}
                </span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
