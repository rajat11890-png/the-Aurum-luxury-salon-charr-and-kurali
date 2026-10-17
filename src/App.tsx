/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { JourneyTimeline } from './components/JourneyTimeline';
import { FeaturedServices } from './components/FeaturedServices';
import { ServicesSection } from './components/ServicesSection';
import { LocationsSection } from './components/LocationsSection';
import { GallerySection } from './components/GallerySection';
import { InstagramSection } from './components/InstagramSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WhyChooseAurum } from './components/WhyChooseAurum';
import { CallToAction } from './components/CallToAction';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingModal } from './components/BookingModal';
import { ManagerDeskModal } from './components/ManagerDeskModal';
import { SalonLocationId } from './types';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [managerDeskOpen, setManagerDeskOpen] = useState(false);
  const [bookingLocationPref, setBookingLocationPref] = useState<SalonLocationId>('kharar');
  const [bookingServicePref, setBookingServicePref] = useState<string>('Hair');

  const handleOpenBooking = (locationPref?: SalonLocationId, servicePref?: string) => {
    if (locationPref) setBookingLocationPref(locationPref);
    if (servicePref) setBookingServicePref(servicePref);
    setBookingModalOpen(true);
  };

  const handleOpenManagerDesk = () => {
    setManagerDeskOpen(true);
  };

  const handleSelectFeaturedService = (serviceId: string) => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col relative pb-16 md:pb-0">
      {/* Sticky Navigation Header with Manager Desk Access */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenManagerDesk={handleOpenManagerDesk}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. About Us Section */}
        <AboutSection />

        {/* 3. Brand Story / Journey */}
        <JourneyTimeline />

        {/* 4. Featured Services Spotlight ("Beauty, Grooming & Everything In Between") */}
        <FeaturedServices
          onSelectService={handleSelectFeaturedService}
          onOpenBooking={(serviceName) => handleOpenBooking(undefined, serviceName)}
        />

        {/* 5. Comprehensive Categorized Services Menu */}
        <ServicesSection
          onOpenBooking={(loc, service) => handleOpenBooking(loc, service)}
        />

        {/* 6. Two Dedicated Locations (Kurali & Kharar) */}
        <LocationsSection
          onOpenBooking={(loc) => handleOpenBooking(loc)}
        />

        {/* 7. Visual Portfolio Gallery */}
        <GallerySection />

        {/* 8. Instagram Social Media Feed Section */}
        <InstagramSection />

        {/* 9. Reviews & Client Experience Section */}
        <ReviewsSection />

        {/* 10. Why Choose Aurum Section (6 Pillars) */}
        <WhyChooseAurum />

        {/* 11. Large Luxury Call to Action */}
        <CallToAction onOpenBooking={() => handleOpenBooking()} />

        {/* 12. Contact Section */}
        <ContactSection
          onOpenBooking={(loc) => handleOpenBooking(loc)}
        />
      </main>

      {/* 13. Dark Luxury Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenManagerDesk={handleOpenManagerDesk}
      />

      {/* 14. Mobile Sticky Bottom Bar (Book Now + Call + WhatsApp) */}
      <MobileStickyBar
        onOpenBooking={() => handleOpenBooking()}
        onOpenManagerDesk={handleOpenManagerDesk}
      />

      {/* 15. Booking / Appointment System Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialLocation={bookingLocationPref}
        initialService={bookingServicePref}
        onOpenManagerDesk={handleOpenManagerDesk}
      />

      {/* 16. Salon Manager & Reception Booking Desk Modal */}
      <ManagerDeskModal
        isOpen={managerDeskOpen}
        onClose={() => setManagerDeskOpen(false)}
      />
    </div>
  );
}
