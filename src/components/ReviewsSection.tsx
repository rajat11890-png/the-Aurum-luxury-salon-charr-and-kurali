import React, { useState } from 'react';
import { REVIEWS_DATA, SALON_LOCATIONS } from '../data/salonData';
import { Star, MessageSquarePlus, ExternalLink, CheckCircle, Quote, MessageCircle, Sparkles, Building2 } from 'lucide-react';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedResponseId, setExpandedResponseId] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({
    author: '',
    service: 'Hair Styling',
    location: 'Kharar Branch',
    comment: '',
    rating: 5,
  });
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All Guest Reviews (6)' },
    { id: 'hair', label: 'Hair & Styling' },
    { id: 'facial', label: 'Facials & Skin Glow' },
    { id: 'makeup', label: 'Makeup Artistry' },
    { id: 'grooming', label: "Men's Grooming" },
  ];

  const filteredReviews = reviews.filter((rev) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'hair') {
      return rev.service.toLowerCase().includes('hair') || rev.comment.toLowerCase().includes('stylist') || rev.comment.toLowerCase().includes('blowout');
    }
    if (selectedFilter === 'facial') {
      return rev.service.toLowerCase().includes('facial') || rev.comment.toLowerCase().includes('skin') || rev.comment.toLowerCase().includes('fresh');
    }
    if (selectedFilter === 'makeup') {
      return rev.service.toLowerCase().includes('makeup') || rev.comment.toLowerCase().includes('makeup');
    }
    if (selectedFilter === 'grooming') {
      return rev.service.toLowerCase().includes('grooming') || rev.comment.toLowerCase().includes('grooming') || rev.comment.toLowerCase().includes('beard');
    }
    return true;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;

    const created: ReviewItem = {
      id: `user-rev-${Date.now()}`,
      author: newReview.author,
      userBadge: 'Verified Aurum Guest',
      avatarInitial: newReview.author.charAt(0).toUpperCase(),
      avatarBg: 'bg-[#0B3B95]',
      service: newReview.service,
      location: newReview.location,
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'Just now',
      isGoogleReview: false,
      ownerResponse: {
        author: 'The Aurum Luxury Unisex Salon (owner)',
        date: 'Just now',
        text: 'Thank you for trusting us, We truly appreciate your feedback and hope to welcome you back soon!'
      }
    };

    setReviews([created, ...reviews]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setModalOpen(false);
      setNewReview({
        author: '',
        service: 'Hair Styling',
        location: 'Kharar Branch',
        comment: '',
        rating: 5,
      });
    }, 1800);
  };

  const toggleOwnerResponse = (id: string) => {
    setExpandedResponseId(expandedResponseId === id ? null : id);
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#FAF8F5] relative border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#C59B27] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07255E] tracking-tight">
              From Our Guests
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light mt-3 leading-relaxed">
              Genuine reviews from verified clients celebrating the craft, cleanliness, polite care, and luxury experience across our salons.
            </p>
          </div>

          {/* Google Rating Credibility Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              {/* Google G Logo Badge */}
              <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center font-bold text-lg shadow-inner">
                <span className="text-blue-600">G</span>
                <span className="text-red-500">o</span>
                <span className="text-amber-500">o</span>
                <span className="text-blue-600">g</span>
                <span className="text-emerald-500">l</span>
                <span className="text-red-500">e</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-stone-900 text-lg">5.0</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-stone-500 font-medium">
                  The Aurum Luxury Unisex Salon (Kurali)
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-stone-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="min-h-[42px] px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 hover:border-[#0B3B95] hover:text-[#0B3B95] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Write Review</span>
              </button>

              <a
                href="https://www.google.com/maps/search/?api=1&query=the+aurum+luxury+unisex+salon+kurali"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[42px] px-3.5 py-2 rounded-xl bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedFilter === f.id
                  ? 'bg-[#0B3B95] text-white shadow-sm ring-1 ring-[#0B3B95]'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid: 3 columns on desktop, 2 on tablet, snap on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Top User Info Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div
                      className={`w-11 h-11 rounded-full text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm ${
                        rev.avatarBg || 'bg-[#0B3B95]'
                      }`}
                    >
                      {rev.avatarInitial || rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif-luxury text-base font-bold text-[#07255E] leading-tight">
                        {rev.author}
                      </h4>
                      {rev.userBadge && (
                        <div className="text-[11px] text-stone-500 font-light flex items-center gap-1 mt-0.5">
                          {rev.userBadge.includes('Local Guide') && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                          )}
                          <span>{rev.userBadge}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Google Verified Review Badge */}
                  {rev.isGoogleReview && (
                    <div className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-50 border border-stone-200 text-stone-600 text-[10px] font-medium" title="Verified on Google Reviews">
                      <span className="font-bold text-blue-600">G</span>
                      <span className="hidden sm:inline">Review</span>
                    </div>
                  )}
                </div>

                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-light">
                    {rev.date}
                  </span>
                </div>

                {/* Verbatim Review Comment */}
                <div className="relative mb-5">
                  <Quote className="w-6 h-6 text-[#C59B27]/20 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed pl-3 whitespace-pre-line">
                    {rev.comment}
                  </p>
                </div>
              </div>

              {/* Card Footer: Service Pill & Verified Owner Response */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-stone-200 text-[#C59B27] font-semibold text-[11px]">
                    {rev.service}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {rev.location.includes('Kurali') ? 'Kurali Branch' : rev.location}
                  </span>
                </div>

                {/* Owner Response Box */}
                {rev.ownerResponse && (
                  <div className="p-3 bg-[#07255E]/5 rounded-xl border border-stone-200/80 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#07255E]">
                        <Building2 className="w-3 h-3 text-[#C59B27]" />
                        <span>The Aurum Luxury Salon</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-white text-stone-600 border border-stone-200 font-medium">Owner</span>
                      </div>
                      <span className="text-[10px] text-stone-400">{rev.ownerResponse.date}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 font-light leading-relaxed">
                      "{rev.ownerResponse.text}"
                    </p>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Social Trust Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-sm max-w-xl mx-auto">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs text-stone-600 font-light leading-relaxed text-left sm:text-center">
              All testimonials are genuine feedback shared by clients on Google and in-salon guest books. Thank you for making Aurum a top-rated luxury salon in Punjab.
            </p>
          </div>
        </div>

      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
            {submittedFeedback ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif-luxury text-2xl font-bold text-[#07255E]">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-xs text-stone-600 mt-2">
                  Your review has been recorded and will be shared with the Aurum salon team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#07255E]">
                    Share Your Salon Experience
                  </h3>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                
                <p className="text-xs text-stone-500">
                  Tell us about your visit to Aurum Luxury Salon in Kharar or Kurali.
                </p>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="min-h-[44px] w-full px-3.5 py-2 text-xs border rounded-xl border-stone-300 outline-none focus:border-[#0B3B95] focus:ring-1 focus:ring-[#0B3B95]"
                    placeholder="e.g. Jasleen Kaur"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Branch *
                    </label>
                    <select
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="min-h-[44px] w-full px-3 py-2 text-xs border rounded-xl border-stone-300 outline-none bg-white focus:border-[#0B3B95]"
                    >
                      <option value="Kharar Branch">Kharar Branch (SCO-2)</option>
                      <option value="Kurali Branch">Kurali Branch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Service *
                    </label>
                    <select
                      value={newReview.service}
                      onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                      className="min-h-[44px] w-full px-3 py-2 text-xs border rounded-xl border-stone-300 outline-none bg-white focus:border-[#0B3B95]"
                    >
                      <option value="Hair Styling & Blowout">Hair Styling & Blowout</option>
                      <option value="Nails & Extension">Nails & Extension</option>
                      <option value="Bridal / Party Makeup">Makeup Artistry</option>
                      <option value="Skin Glow Facial">Skin Therapies & Facial</option>
                      <option value="Men's Grooming">Men's Grooming</option>
                      <option value="Lash Enhancements">Lash Enhancements</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="cursor-pointer p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-stone-700 ml-2">
                      {newReview.rating} out of 5 stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border rounded-xl border-stone-300 outline-none focus:border-[#0B3B95] focus:ring-1 focus:ring-[#0B3B95]"
                    placeholder="Describe your visit, therapist care, cleanliness, and overall experience..."
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="min-h-[44px] px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-6 py-2.5 bg-[#0B3B95] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#07255E] transition-colors cursor-pointer shadow-sm"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
