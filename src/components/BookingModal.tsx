import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, CheckCircle2, MessageCircle, Phone, Sparkles, Mail, ExternalLink, Eye, Loader2, AlertCircle } from 'lucide-react';
import { SalonLocationId, BookingFormData, BookingRecord } from '../types';
import { SALON_LOCATIONS, SALON_CONTACT_CONFIG } from '../data/salonData';
import { bookingService } from '../services/bookingService';
import { AurumLogo } from './AurumLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocation?: SalonLocationId;
  initialService?: string;
  onOpenManagerDesk?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialLocation = 'kharar',
  initialService = 'Hair',
  onOpenManagerDesk,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    location: initialLocation,
    service: initialService,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default tomorrow
    time: '11:00 AM',
    guests: 1,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string>('AUR-74192');
  const [createdRecord, setCreatedRecord] = useState<BookingRecord | null>(null);
  const [redirectWaUrl, setRedirectWaUrl] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setFormError('Please fill in your Full Name and Phone Number to book your appointment.');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    // 1. Generate booking reference and WhatsApp Quick URL immediately
    const tempRef = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    const waUrl = bookingService.getSalonWhatsAppUrl({ ...formData, id: tempRef });
    setBookingRef(tempRef);
    setRedirectWaUrl(waUrl);

    // 2. Quickly redirect to WhatsApp without delay (within direct user gesture)
    if (typeof window !== 'undefined') {
      try {
        const link = document.createElement('a');
        link.href = waUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        window.location.href = waUrl;
      }
    }

    setSubmitted(true);
    setIsSubmitting(false);

    // 3. Persist booking in Firebase Firestore & backend API in the background
    bookingService.createBooking(formData).then((record) => {
      setBookingRef(record.id);
      setCreatedRecord(record);
      const finalWaUrl = bookingService.getSalonWhatsAppUrl(record);
      setRedirectWaUrl(finalWaUrl);
    }).catch((err) => {
      console.warn('Booking persistence completed with fallback:', err);
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const servicesList = [
    'Hair',
    'Nails',
    'Makeup',
    'Skin',
    'Lashes',
    "Men's Grooming",
    'Bridal Package',
    'Other Bespoke Ritual'
  ];

  const timeSlots = [
    '10:30 AM', '11:30 AM', '12:30 PM', '01:30 PM', '02:30 PM',
    '03:30 PM', '04:30 PM', '05:30 PM', '06:30 PM', '07:30 PM'
  ];

  const targetWaUrl = redirectWaUrl || (createdRecord ? bookingService.getSalonWhatsAppUrl(createdRecord) : bookingService.getSalonWhatsAppUrl(formData));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto sm:overflow-hidden flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/75 backdrop-blur-sm transition-all duration-300">
      <div
        className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-stone-200 overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-8 sm:zoom-in-95"
      >
        {/* Mobile Drag Handle Indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-[#FAF8F5]">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* Modal Top Bar */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#FAF8F5] border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <AurumLogo size="sm" variant="badge" />
            <div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#07255E] leading-tight">
                  WhatsApp Quick Booking
                </h3>
              </div>
              <p className="text-[10px] sm:text-[11px] font-sans-clean font-semibold tracking-wider text-[#C59B27] uppercase">
                The Aurum Luxury Unisex Salon · Direct Front Desk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 overscroll-contain">
          {submitted ? (
            /* Submission & WhatsApp Redirection Confirmation Screen */
            <div className="text-center py-4 sm:py-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-sm">
                <MessageCircle className="w-9 h-9" />
              </div>
              <h4 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#07255E] mb-1">
                Redirecting to WhatsApp...
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto mb-4 leading-relaxed">
                Your appointment details have been compiled and sent to WhatsApp front desk. If WhatsApp didn't open automatically, click the button below:
              </p>

              {/* Direct Open WhatsApp Button */}
              <div className="mb-6 max-w-sm mx-auto">
                <a
                  href={targetWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[50px] w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>OPEN WHATSAPP CHAT NOW</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>
              </div>

              {/* Complete Booking Summary Card */}
              <div className="max-w-md mx-auto text-left mb-6 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Booking Voucher: {bookingRef}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    WHATSAPP READY
                  </span>
                </div>
                <div>
                  <strong>Branch:</strong>{' '}
                  <span className="text-[#07255E] font-semibold">
                    {formData.location === 'kharar'
                      ? 'Kharar Branch (SCO-2, Modern Valley)'
                      : 'Kurali Branch (Founding Flagship)'}
                  </span>
                </div>
                <div><strong>Guest Name:</strong> {formData.fullName}</div>
                <div><strong>Phone Number:</strong> {formData.phone}</div>
                <div><strong>Email Address:</strong> {formData.email || 'Not provided'}</div>
                <div><strong>Service Ritual:</strong> {formData.service}</div>
                <div><strong>Date &amp; Time:</strong> {formData.date} at {formData.time}</div>
                <div><strong>Party Size:</strong> {formData.guests} Person(s)</div>
                {formData.notes && (
                  <div><strong>Special Request:</strong> {formData.notes}</div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
                {onOpenManagerDesk && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenManagerDesk();
                    }}
                    className="min-h-[44px] px-4 py-2 bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
                  >
                    <Eye className="w-4 h-4 text-[#C59B27]" />
                    <span>View Manager Desk</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="min-h-[44px] px-6 py-2 bg-[#0B3B95] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#07255E] transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Done &amp; Close
                </button>
              </div>
            </div>
          ) : (
            /* Streamlined WhatsApp Quick Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 pb-2">
              
              {/* WhatsApp Quick Info Banner */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-xs text-emerald-950 min-w-0">
                  <div className="font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <span>Direct WhatsApp Concierge</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold uppercase tracking-wider">
                      Instant Front Desk
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800/90 mt-0.5 leading-snug">
                    Enter your details below and click continue. You will be instantly redirected to WhatsApp with your appointment details pre-filled to the salon!
                  </p>
                </div>
              </div>

              {/* 1. Which Branch */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Which Branch *
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, location: 'kharar' })}
                    className={`min-h-[52px] p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      formData.location === 'kharar'
                        ? 'border-[#0B3B95] bg-[#0B3B95]/5 ring-2 ring-[#0B3B95]/30'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#07255E]">Kharar Branch</div>
                    <div className="text-[10px] sm:text-[11px] text-stone-500">Modern Valley, SCO-2</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, location: 'kurali' })}
                    className={`min-h-[52px] p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      formData.location === 'kurali'
                        ? 'border-[#0B3B95] bg-[#0B3B95]/5 ring-2 ring-[#0B3B95]/30'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#07255E]">Kurali Branch</div>
                    <div className="text-[10px] sm:text-[11px] text-stone-500">Founding Flagship</div>
                  </button>
                </div>
              </div>

              {/* 2. Personal Details: Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaspreet Kaur"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="min-h-[44px] w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9875847109"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="min-h-[44px] w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 3. Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com (optional)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="min-h-[44px] w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                />
              </div>

              {/* 4. Service Ritual */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Service Ritual *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="min-h-[44px] w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none bg-white transition-colors"
                >
                  {servicesList.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>

                {/* Animated Live Reel GIF Callout when Hair is selected */}
                {formData.service === 'Hair' && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#07255E]/5 border border-[#C59B27]/40 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#C59B27]/50 shrink-0 bg-stone-900 shadow-sm">
                      <img
                        src="/src/assets/images/aurum_hair_art_optimized.gif"
                        alt="Hair Design transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#07255E] flex items-center gap-1.5">
                        <span>Bespoke Hair Design &amp; Layered Cuts</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E5C568]/20 text-[#85630d] font-bold uppercase tracking-wider border border-[#E5C568]/40">
                          Live Reel GIF
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-light truncate">
                        Precision layer cuts, dimensional color &amp; silk blowout finish.
                      </p>
                    </div>
                  </div>
                )}

                {/* Animated Live Reel GIF Callout when Nails is selected */}
                {formData.service === 'Nails' && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#07255E]/5 border border-[#C59B27]/40 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#C59B27]/50 shrink-0 bg-stone-900 shadow-sm">
                      <img
                        src="/src/assets/images/aurum_nails_art_optimized.gif"
                        alt="Nail Art transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#07255E] flex items-center gap-1.5">
                        <span>Bespoke Nail Art &amp; Gel Extensions</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E5C568]/20 text-[#85630d] font-bold uppercase tracking-wider border border-[#E5C568]/40">
                          Live Reel GIF
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-light truncate">
                        Custom length sculpting, French tips &amp; champagne gold leaf accents.
                      </p>
                    </div>
                  </div>
                )}

                {/* Animated Live Reel GIF Callout when Makeup is selected */}
                {(formData.service === 'Makeup' || formData.service === 'Bridal Package') && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#07255E]/5 border border-[#C59B27]/40 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#C59B27]/50 shrink-0 bg-stone-900 shadow-sm">
                      <img
                        src="/src/assets/images/aurum_makeup_art_optimized.gif"
                        alt="Makeup & Artistry transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#07255E] flex items-center gap-1.5">
                        <span>Bespoke Makeup &amp; Bridal Glam</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E5C568]/20 text-[#85630d] font-bold uppercase tracking-wider border border-[#E5C568]/40">
                          Live Reel GIF
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-light truncate">
                        HD bridal couture, dewy party finish &amp; camera-ready contouring.
                      </p>
                    </div>
                  </div>
                )}

                {/* Animated Live Reel GIF Callout when Skin is selected */}
                {(formData.service === 'Skin' || formData.service === 'Skin Therapies & Glow') && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#07255E]/5 border border-[#C59B27]/40 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#C59B27]/50 shrink-0 bg-stone-900 shadow-sm">
                      <img
                        src="/src/assets/images/aurum_skin_art_optimized.gif"
                        alt="Skin Therapies transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#07255E] flex items-center gap-1.5">
                        <span>Signature Skin Therapies &amp; Glow</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E5C568]/20 text-[#85630d] font-bold uppercase tracking-wider border border-[#E5C568]/40">
                          Live Reel GIF
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-light truncate">
                        Deep cleansing, hydra-infusion &amp; cellular radiance therapy.
                      </p>
                    </div>
                  </div>
                )}

                {/* Animated Live Reel GIF Callout when Lashes is selected */}
                {(formData.service === 'Lashes' || formData.service === 'Lash Enhancements') && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#07255E]/5 border border-[#C59B27]/40 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#C59B27]/50 shrink-0 bg-stone-900 shadow-sm">
                      <img
                        src="/src/assets/images/aurum_lashes_art_optimized.gif"
                        alt="Lash Enhancement transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#07255E] flex items-center gap-1.5">
                        <span>Bespoke Lash Enhancements &amp; Volume</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E5C568]/20 text-[#85630d] font-bold uppercase tracking-wider border border-[#E5C568]/40">
                          Live Reel GIF
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-light truncate">
                        Featherweight volume extensions, keratin lifts &amp; eye-framing definition.
                      </p>
                    </div>
                  </div>
                )}

                {/* Animated Live Reel GIF Callout when Men's Grooming is selected */}
                {formData.service === "Men's Grooming" && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#07255E]/5 border border-[#C59B27]/40 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#C59B27]/50 shrink-0 bg-stone-900 shadow-sm">
                      <img
                        src="/src/assets/images/aurum_mens_grooming_optimized.gif"
                        alt="Men's Luxury Grooming transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#07255E] flex items-center gap-1.5">
                        <span>Executive Haircut &amp; Beard Sculpting</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E5C568]/20 text-[#85630d] font-bold uppercase tracking-wider border border-[#E5C568]/40">
                          Live Reel GIF
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-light truncate">
                        Precision scissor cuts, fade detailing &amp; hot towel beard sculpting.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Preferred Date, 6. Preferred Time & 7. Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="min-h-[44px] w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="min-h-[44px] w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none bg-white"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                    className="min-h-[44px] w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none bg-white"
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 People</option>
                    <option value={3}>3 People</option>
                    <option value={4}>4+ People (Group/Bridal)</option>
                  </select>
                </div>
              </div>

              {/* 8. Any Special Request or Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Special Request or Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Hair/skin preferences, bridal details, stylist requests, or special notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                />
              </div>

              {/* Submit Button: Direct WhatsApp Quick Booking */}
              <div className="pt-2 sticky bottom-0 bg-white/95 backdrop-blur-sm pb-safe space-y-2">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[52px] w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-75 disabled:cursor-wait text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-2xl shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>CONNECTING TO WHATSAPP...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>BOOK ON WHATSAPP QUICK →</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-stone-500">
                  Instant Redirection · Opens WhatsApp with all appointment details pre-formatted for <strong>+91 98758 47109</strong>
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
