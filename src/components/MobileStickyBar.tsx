import React from 'react';
import { Calendar, Phone, MessageCircle } from 'lucide-react';
import { SALON_LOCATIONS } from '../data/salonData';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
  onOpenManagerDesk?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking, onOpenManagerDesk }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200/90 px-3 pt-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Call Button (48px touch target) */}
        <a
          href={`tel:${SALON_LOCATIONS.kharar.phone}`}
          className="flex-1 min-h-[48px] flex flex-col items-center justify-center bg-white border border-stone-300 rounded-xl text-stone-800 active:bg-stone-100 transition-colors shadow-sm select-none"
          aria-label="Call Kharar Salon Reception (9875847109)"
        >
          <Phone className="w-4 h-4 text-[#C59B27] mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Call</span>
        </a>

        {/* WhatsApp Button (48px touch target) */}
        <a
          href={`https://wa.me/919875847109?text=${encodeURIComponent(
            'Hello Aurum Luxury Salon, I would like to book an appointment at the Kharar branch.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[48px] flex flex-col items-center justify-center bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 active:bg-emerald-100 transition-colors shadow-sm select-none"
          aria-label="WhatsApp Kharar Salon"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">WhatsApp</span>
        </a>

        {/* Primary BOOK NOW Action (Natural Thumb reach, 48px touch target) */}
        <button
          onClick={onOpenBooking}
          className="flex-[2] min-h-[48px] flex items-center justify-center gap-2 px-4 bg-[#0B3B95] active:bg-[#07255E] text-white rounded-xl shadow-md transition-all active:scale-[0.98] select-none cursor-pointer"
          aria-label="Book an Appointment at Aurum Luxury Salon"
        >
          <Calendar className="w-4 h-4 text-[#E5C568]" />
          <span className="text-xs font-bold tracking-[0.16em] uppercase">BOOK NOW</span>
        </button>

      </div>
    </div>
  );
};

