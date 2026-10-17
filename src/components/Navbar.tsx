import React, { useState, useEffect } from 'react';
import { AurumLogo } from './AurumLogo';
import { Menu, X, Phone, Calendar, Instagram, ClipboardList, ShieldCheck } from 'lucide-react';
import { SALON_LOCATIONS } from '../data/salonData';
import { bookingService, BOOKING_UPDATE_EVENT } from '../services/bookingService';

interface NavbarProps {
  onOpenBooking: (locationPref?: 'kharar' | 'kurali', servicePref?: string) => void;
  onOpenManagerDesk?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenManagerDesk }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newBookingsCount, setNewBookingsCount] = useState(0);

  const updateCount = async () => {
    try {
      const all = await bookingService.getBookings();
      const newItems = all.filter(b => b.status === 'new').length;
      setNewBookingsCount(newItems);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    updateCount();
    window.addEventListener(BOOKING_UPDATE_EVENT, updateCount);
    return () => window.removeEventListener(BOOKING_UPDATE_EVENT, updateCount);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Locations', href: '#locations' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-stone-200/70 py-2 sm:py-2.5'
            : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-stone-200/30 py-2.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Zone 1: Brand Wordmark & Emblem */}
            <a
              href="#home"
              className="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3B95] rounded-lg min-h-[44px]"
              aria-label="Aurum Luxury Salon Homepage"
            >
              <AurumLogo size="sm" variant="badge" className="transition-transform group-hover:scale-105 duration-300 w-8 h-8 sm:w-10 sm:h-10" />
              <div className="flex flex-col">
                <span className="font-serif-luxury font-bold text-base sm:text-xl text-[#0B3B95] tracking-[0.05em] leading-tight">
                  AURUM LUXURY SALON
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans-clean font-semibold tracking-[0.18em] text-[#C59B27] uppercase leading-none">
                  His & Her · Punjab
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] font-medium text-stone-700 hover:text-[#0B3B95] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#0B3B95] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Manager Desk Portal Button */}
              {onOpenManagerDesk && (
                <button
                  onClick={onOpenManagerDesk}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider text-[#07255E] bg-[#FAF8F5] hover:bg-stone-100 rounded-lg transition-colors border border-[#C59B27]/40 min-h-[40px] cursor-pointer shadow-xs"
                  title="Salon Manager & Reception Booking Register"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Manager Desk</span>
                  {newBookingsCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold leading-none animate-pulse">
                      {newBookingsCount}
                    </span>
                  )}
                </button>
              )}

              {/* Call Button for Kharar (Desktop/Tablet) */}
              <a
                href={`tel:${SALON_LOCATIONS.kharar.phone}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider text-stone-700 hover:text-[#0B3B95] hover:bg-stone-100 rounded-lg transition-colors border border-stone-200/80 min-h-[40px]"
                title="Call Kharar Branch (9875847109)"
              >
                <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="whitespace-nowrap">98758 47109</span>
              </a>

              {/* Prominent BOOK NOW Button */}
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-white bg-[#0B3B95] hover:bg-[#082C74] active:scale-[0.98] rounded-lg shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[40px]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E5C568]" />
                <span className="hidden xs:inline">BOOK NOW</span>
                <span className="xs:hidden">BOOK</span>
              </button>

              {/* Mobile Menu Toggle Button (44px touch target) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-stone-800 hover:text-[#0B3B95] hover:bg-stone-100 active:bg-stone-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3B95]"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[300px] bg-[#FAF8F5] p-5 shadow-2xl flex flex-col justify-between overflow-y-auto z-50 pb-safe">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <AurumLogo size="sm" variant="badge" />
                  <span className="font-serif-luxury font-bold text-base text-[#0B3B95]">
                    THE AURUM
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-500 hover:text-stone-900"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center px-3 text-sm uppercase tracking-[0.16em] font-medium text-stone-800 hover:text-[#0B3B95] active:bg-stone-200/70 rounded-xl transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="min-h-[48px] w-full py-3 px-4 bg-[#0B3B95] active:bg-[#07255E] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded-xl text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#E5C568]" />
                <span>BOOK APPOINTMENT</span>
              </button>

              {onOpenManagerDesk && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenManagerDesk();
                  }}
                  className="min-h-[48px] w-full py-2.5 px-4 bg-amber-50/80 border border-[#C59B27]/40 text-[#07255E] text-xs font-semibold tracking-wider rounded-xl text-center flex items-center justify-center gap-2 active:bg-amber-100 cursor-pointer"
                >
                  <ClipboardList className="w-4 h-4 text-[#C59B27]" />
                  <span>SALON MANAGER DESK ({newBookingsCount} New)</span>
                </button>
              )}

              <a
                href={`tel:${SALON_LOCATIONS.kharar.phone}`}
                className="min-h-[48px] w-full py-2.5 px-4 border border-stone-300 bg-white text-stone-800 text-xs font-semibold tracking-wider rounded-xl text-center flex items-center justify-center gap-2 active:bg-stone-100"
              >
                <Phone className="w-4 h-4 text-[#C59B27]" />
                <span>CALL KHARAR (9875847109)</span>
              </a>

              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={SALON_LOCATIONS.kharar.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-2 text-xs text-stone-700 hover:text-[#0B3B95] flex items-center gap-1 font-medium"
                >
                  <Instagram className="w-4 h-4 text-[#C59B27]" />
                  <span>Kharar IG</span>
                </a>
                <span className="text-stone-300">·</span>
                <a
                  href={SALON_LOCATIONS.kurali.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-2 text-xs text-stone-700 hover:text-[#0B3B95] flex items-center gap-1 font-medium"
                >
                  <Instagram className="w-4 h-4 text-[#C59B27]" />
                  <span>Kurali IG</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
