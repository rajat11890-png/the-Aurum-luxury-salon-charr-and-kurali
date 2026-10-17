import React, { useState } from 'react';
import { AurumLogo } from './AurumLogo';
import { Instagram, Phone, MapPin, ArrowUp, Shield, FileText } from 'lucide-react';
import { SALON_LOCATIONS } from '../data/salonData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenManagerDesk?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenManagerDesk }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05173B] text-white pt-16 pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-block mb-4">
              <AurumLogo size="md" variant="light" />
            </a>
            <p className="font-serif-luxury italic text-stone-300 text-lg mb-4">
              "Transforming Beauty with Luxury and Care"
            </p>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm mb-6">
              A premium unisex luxury salon destination in Punjab. Combining master artistry in hair, nails, makeup, skin, and lashes with attentive personal care.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SALON_LOCATIONS.kharar.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C59B27] flex items-center justify-center text-white transition-colors"
                aria-label="Kharar Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SALON_LOCATIONS.kurali.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C59B27] flex items-center justify-center text-white transition-colors"
                aria-label="Kurali Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${SALON_LOCATIONS.kharar.phone}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0B3B95] flex items-center justify-center text-white transition-colors"
                aria-label="Direct Telephone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E5C568] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 font-light">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services & Rituals</a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">Our Locations</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Visual Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Reviews & Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#E5C568] hover:underline font-semibold cursor-pointer"
                >
                  Book an Appointment
                </button>
              </li>
              {onOpenManagerDesk && (
                <li className="pt-1 border-t border-white/10">
                  <button
                    onClick={onOpenManagerDesk}
                    className="text-stone-300 hover:text-[#E5C568] font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>✦ Salon Manager Booking Desk</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Locations */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E5C568] mb-4">
              Locations
            </h4>
            <div className="space-y-4 text-xs text-stone-300">
              <div>
                <span className="font-semibold text-white block">Aurum – Kharar</span>
                <span className="text-stone-400 block mt-0.5">First Floor, SCO-2, Modern Valley, Kharar, Punjab</span>
                <span className="text-[#E5C568] font-mono mt-1 block">Phone: 9875847109</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="font-semibold text-white block">The Aurum – Kurali</span>
                <span className="text-stone-400 block mt-0.5">Kurali, Punjab</span>
                <span className="text-stone-500 italic block mt-0.5">Founding Flagship</span>
              </div>
            </div>
          </div>

          {/* Col 4: Primary Action & Hours */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E5C568] mb-4">
                Reservations
              </h4>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                Step into luxury. Book your unisex beauty transformation today.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 bg-[#0B3B95] hover:bg-[#07255E] border border-white/20 text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer text-center"
              >
                Book Now
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Aurum Luxury Salon. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Legal Information Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white text-stone-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h3 className="font-serif-luxury text-xl font-bold text-[#07255E]">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="text-stone-500 hover:text-stone-900 text-xs uppercase font-bold"
              >
                Close
              </button>
            </div>

            <div className="text-xs text-stone-600 space-y-3 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    <strong>Aurum Luxury Salon</strong> respects your personal privacy. When you request an appointment through our website, we collect your name, phone number, email, and ritual preferences strictly to coordinate your visit.
                  </p>
                  <p>
                    We never sell, rent, or share personal client contact information with third-party advertisers. All data is processed solely for salon reservations and customer care.
                  </p>
                  <p>
                    For inquiries regarding data privacy, please contact our salon reception at 9875847109.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Appointment Requests:</strong> Booking submissions via this website represent an appointment request. Our salon team confirms timing directly via phone or WhatsApp.
                  </p>
                  <p>
                    <strong>Punctuality:</strong> To maintain an unhurried, luxurious experience for every guest, we kindly request arrivals 5–10 minutes prior to scheduled rituals.
                  </p>
                  <p>
                    <strong>Hygiene & Safety:</strong> Our tools, linens, and styling stations undergo medical-grade sanitation between every client service.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-stone-200 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-[#0B3B95] text-white text-xs font-semibold rounded-lg"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
