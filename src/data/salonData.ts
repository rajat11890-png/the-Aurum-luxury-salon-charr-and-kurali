import { LocationInfo, ServiceCategory, ReviewItem, GalleryItem } from '../types';

export const SALON_CONTACT_CONFIG = {
  managerName: 'Aurum Salon Operations Manager',
  managerEmail: 'theaurumluxurysalon@gmail.com',
  salonEmail: 'theaurumluxurysalon@gmail.com',
  notificationEmails: ['theaurumluxurysalon@gmail.com'],
  whatsappNumber: '9875847109',
  whatsappInternational: '919875847109',
  phoneDisplay: '+91 98758 47109',
};

export const SALON_LOCATIONS: Record<string, LocationInfo> = {
  kharar: {
    id: 'kharar',
    name: 'Aurum Luxury Salon – Kharar',
    brandTitle: 'AURUM LUXURY SALON – KHARAR',
    badge: 'Modern Valley Branch',
    address: 'First Floor, SCO-2, Modern Valley, Kharar, Punjab',
    phone: '9875847109',
    phoneFormatted: '+91 98758 47109',
    isPhonePlaceholder: false,
    isAddressPlaceholder: false,
    instagramUrl: 'https://www.instagram.com/theaurumluxurysalon_kharar/',
    instagramHandle: '@theaurumluxurysalon_kharar',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Modern+Valley+Kharar+Punjab',
    whatsappNumber: '9875847109',
    established: 'April 2026',
    features: ['Luxury Arched Styling Stations', 'Private Bridal & Makeup Suite', 'Dedicated Hair Spa Lounge', 'Nail Bar & Pedicure Stations', 'Men\'s Grooming Section']
  },
  kurali: {
    id: 'kurali',
    name: 'The Aurum Luxury Unisex Salon – Kurali',
    brandTitle: 'THE AURUM LUXURY UNISEX SALON – KURALI',
    badge: 'Founding Flagship',
    address: '[INSERT VERIFIED KURALI ADDRESS HERE]',
    phone: '[INSERT VERIFIED KURALI PHONE NUMBER HERE]',
    phoneFormatted: '[VERIFIED PHONE PENDING]',
    isPhonePlaceholder: true,
    isAddressPlaceholder: true,
    instagramUrl: 'https://www.instagram.com/theaurumluxurysalon_kurali/',
    instagramHandle: '@theaurumluxurysalon_kurali',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kurali+Punjab',
    established: 'June 2025',
    features: ['First Luxury Destination in Kurali', 'Full Unisex Grooming Lounge', 'Personalized Skin & Hair Therapies', 'Occasion & Bridal Artistry']
  }
};

export const SALON_SERVICES: ServiceCategory[] = [
  {
    id: 'hair',
    title: 'Hair Design & Care',
    tagline: 'Precision cuts, dimensional color & transformative rituals',
    description: 'Elevate your hair with master stylists trained in contemporary trends, therapeutic nourishment, and flawless finishes.',
    image: '/src/assets/images/aurum_hair_art_optimized.gif',
    videoSrc: '/src/assets/video/aurum_hair_h264.mp4',
    reelUrl: 'https://www.instagram.com/reel/DaUL0ePMGrZ/?psln=MTFvNGpic2ZsdzVrcw==',
    items: [
      'Haircuts & Couture Reshaping',
      'Hair Styling & Signature Blow Dry',
      'Hair Color, Highlights & Balayage',
      'Hair Treatments & Deep Conditioning',
      'Hair Transformations & Keratin / Smoothening',
      'Men\'s Precision Hair Grooming'
    ],
    detailedItems: [
      { id: 'h1', title: 'Haircuts & Couture Styling', description: 'Bespoke precision consultation, scalp wash, cut, and signature blow dry tailored to facial features.', recommendedFor: 'Men & Women' },
      { id: 'h2', title: 'Hair Color & Balayage', description: 'Dimensional color blending, global coverage, balayage, and root touch-ups using hair-safe formulations.', recommendedFor: 'Clients seeking rich tone and gloss' },
      { id: 'h3', title: 'Hair Transformations', description: 'Advanced smoothening, botox hair therapy, and keratin infusion for silky, frizz-free texture.', recommendedFor: 'Manageability and mirror shine' },
      { id: 'h4', title: 'Intense Restorative Spa', description: 'Customized scalp and fiber repair treatments addressing seasonal damage and hydration loss.', recommendedFor: 'Dry, stressed, or color-treated hair' }
    ]
  },
  {
    id: 'nails',
    title: 'Nail Artistry & Care',
    tagline: 'Pristine manicures, bespoke art & enduring extensions',
    description: 'Impeccable hands and feet with meticulous cuticle care, long-lasting gel extensions, and sophisticated custom nail art.',
    image: '/src/assets/images/aurum_nails_art_optimized.gif',
    videoSrc: '/src/assets/video/aurum_nails_h264.mp4',
    reelUrl: 'https://www.instagram.com/reel/DaaZJRrTn1K/?vrfl=c2hnaXp3dmllZmQ1',
    items: [
      'Luxury Manicure',
      'Relaxing Pedicure',
      'Custom Nail Art & Accents',
      'Gel Nails & Long-Wear Polish',
      'Nail Extensions & Overlay',
      'Restorative Nail & Cuticle Care'
    ],
    detailedItems: [
      { id: 'n1', title: 'Gel Nail Extensions', description: 'Sculpted length and natural strength with glossy chrome, French tips, or hand-painted art.', recommendedFor: 'Durable, camera-ready nails' },
      { id: 'n2', title: 'Luxury Spa Manicure', description: 'Exfoliation, gentle cuticle care, hand massage, and professional lacquer application.', recommendedFor: 'Nourished hands and neat cuticles' },
      { id: 'n3', title: 'Therapeutic Pedicure', description: 'Warm herbal foot soak, heel buffing, relaxing pressure point foot massage, and polish.', recommendedFor: 'Tired feet and soft soles' },
      { id: 'n4', title: 'Custom Nail Art Design', description: 'Minimalist foil, ombré gradients, pearl finishes, or intricate bridal motifs.', recommendedFor: 'Special occasions and celebrations' }
    ]
  },
  {
    id: 'makeup',
    title: 'Makeup & Artistry',
    tagline: 'High-definition bridal, party & celebration glam',
    description: 'Refined artistry celebrating your individual beauty with luminous skin prep, high-end cosmetics, and bespoke styling.',
    image: '/src/assets/images/aurum_makeup_art_optimized.gif',
    videoSrc: '/src/assets/video/aurum_makeup_h264.mp4',
    reelUrl: 'https://www.instagram.com/reel/DMXkusCzuQl/?vrfl=dzBkNjV0eTU2OGI1',
    items: [
      'Bridal Makeup & Complete Styling',
      'Party Makeup & Evening Glam',
      'Event & Engagement Makeup',
      'Occasion & Festival Makeup',
      'Professional Camera & HD Makeup'
    ],
    detailedItems: [
      { id: 'm1', title: 'Bridal Couture Makeup', description: 'Comprehensive bridal consultation, skin preparation, HD makeup, draping, and jewelry styling.', recommendedFor: 'The bride\'s memorable wedding day' },
      { id: 'm2', title: 'Party & Celebration Glam', description: 'Dewy luminous finish, striking eye contouring, and complimentary hairstyling coordination.', recommendedFor: 'Receptions, cocktails, and family events' },
      { id: 'm3', title: 'Engagement & Sagan Look', description: 'Subtle elegance balancing glamour and timeless tradition tailored to the event theme.', recommendedFor: 'Pre-wedding celebrations' },
      { id: 'm4', title: 'Occasion & Day Makeup', description: 'Fresh, polished aesthetic with breathable long-wear formulas.', recommendedFor: 'Festivals, gatherings, and editorial shoots' }
    ]
  },
  {
    id: 'skin',
    title: 'Skin Therapies & Glow',
    tagline: 'Targeted facials, gentle resurfacing & skin renewal',
    description: 'Revitalize and clarify your complexion with clinical-grade facial rituals, botanical serums, and deep hydration treatments.',
    image: '/src/assets/images/aurum_skin_art_optimized.gif',
    videoSrc: '/src/assets/video/aurum_skin_h264.mp4',
    reelUrl: 'https://www.instagram.com/reel/DSReOKNkbXr/?xtok=MTBvbHNuaHdvYTlkcw==',
    items: [
      'Signature Aurum Facials',
      'Deep Cleansing & Clarifying',
      'Glow & Radiance Treatments',
      'Hydration & Anti-Pollution Therapy',
      'Specialized Skin Care Rituals'
    ],
    detailedItems: [
      { id: 's1', title: 'Signature Aurum Glow Facial', description: 'Multi-step skin revival focusing on luminosity, gentle exfoliation, and antioxidant infusion.', recommendedFor: 'Dullness, uneven texture, pre-event glow' },
      { id: 's2', title: 'Deep Pore Clarifying Ritual', description: 'Ultrasonic cleansing, gentle extractions, soothing masque, and oil-balancing serums.', recommendedFor: 'Congested or acne-prone skin' },
      { id: 's3', title: 'Hydra-Infusion Moisture Therapy', description: 'Intensive moisture replenishment leaving skin plump, bouncy, and hydrated.', recommendedFor: 'Dehydrated or weather-stressed skin' }
    ]
  },
  {
    id: 'lashes',
    title: 'Lash Enhancements',
    tagline: 'Fluttering extensions, gentle lifts & eye definition',
    description: 'Frame your gaze with customized lash styling, feather-light volume extensions, and nourishing lash tint treatments.',
    image: '/src/assets/images/aurum_lashes_art_optimized.gif',
    videoSrc: '/src/assets/video/aurum_lashes_h264.mp4',
    reelUrl: 'https://www.instagram.com/reel/DeWijC7MopV/?xtok=MWhrcTh1a2gydng1aw==',
    items: [
      'Classic Lash Extensions',
      'Hybrid & Volume Lash Styling',
      'Keratin Lash Lift & Nourish',
      'Lash Enhancement & Tinting',
      'Lash Care & Safe Removal'
    ],
    detailedItems: [
      { id: 'l1', title: 'Custom Lash Extensions', description: 'Individual featherweight synthetic lashes applied lash-by-lash for natural or dramatic full volume.', recommendedFor: 'Low-maintenance, effortlessly defined eyes' },
      { id: 'l2', title: 'Keratin Lash Lift & Tint', description: 'Curls and lifts natural eyelashes from root to tip with a conditioning deep black tint.', recommendedFor: 'Natural look without mascara' },
      { id: 'l3', title: 'Signature Eye Definition', description: 'Bespoke lash mapping tailored to harmonize with your eye contours for an alluring, striking look.', recommendedFor: 'Weddings, celebrations & effortless daily beauty' }
    ]
  },
  {
    id: 'mens',
    title: 'Men\'s Luxury Grooming',
    tagline: 'Precision fades, beard sculpting & executive care',
    description: 'Dedicated his & her experience featuring classic razor detailing, therapeutic scalp massages, and executive grooming.',
    image: '/src/assets/images/aurum_mens_grooming_optimized.gif',
    videoSrc: '/src/assets/video/aurum_mens_h264.mp4',
    reelUrl: 'https://www.instagram.com/reel/DP6URhNkbpG/?xtok=MTFkMHNzMDZqeGFqcQ==',
    items: [
      'Precision Scissor & Fade Cuts',
      'Beard Sculpting & Hot Towel Shave',
      'Scalp Therapy & Head Massage',
      'Men\'s Skin Cleanse & Charcoal Facial',
      'Hair Coloring & Gray Blending'
    ],
    detailedItems: [
      { id: 'g1', title: 'Signature Cut & Beard Sculpt', description: 'Consultation, tailored scissor/clipper haircut, beard shaping, hot towel ritual, and beard oil finish.', recommendedFor: 'Polished everyday presence' },
      { id: 'g2', title: 'Executive Scalp & Facial Detox', description: 'De-stressing head massage paired with an express skin cleanse and soothing eye compress.', recommendedFor: 'Rejuvenation after a busy week' }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-interior-1',
    title: 'The Aurum Arched Styling Stations & Backlit Mirrors',
    category: 'interior',
    categoryLabel: 'Salon Ambience & Architecture',
    image: '/src/assets/images/aurum_kurali_salon_interior_1.jpg',
    locationLabel: 'The Aurum Luxury Salon',
    reelUrl: 'https://www.instagram.com/p/DLKb36Zzmdu/?exln=OTByem5zYW96MXQ='
  },
  {
    id: 'g-hair-reel-1',
    title: 'Aurum Signature Layered Cut & Silk Styling',
    category: 'hair',
    categoryLabel: 'Hair Design (Live Reel)',
    image: '/src/assets/images/aurum_hair_art_optimized.gif',
    locationLabel: 'Official Instagram Reel',
    reelUrl: 'https://www.instagram.com/reel/DaUL0ePMGrZ/?psln=MTFvNGpic2ZsdzVrcw==',
    isVideoGif: true
  },
  {
    id: 'g-hair-1',
    title: 'Dimensional Balayage & Silk Blowout',
    category: 'hair',
    categoryLabel: 'Hair Styling',
    image: '/src/assets/images/service_hair_styling_1791224030056.jpg',
    locationLabel: 'Kharar & Kurali'
  },
  {
    id: 'g-nails-reel-1',
    title: 'Aurum Signature Gel Nail Art & Extensions',
    category: 'nails',
    categoryLabel: 'Nail Artistry (Live Reel)',
    image: '/src/assets/images/aurum_nails_art_optimized.gif',
    locationLabel: 'Official Instagram Reel',
    reelUrl: 'https://www.instagram.com/reel/DaaZJRrTn1K/?vrfl=c2hnaXp3dmllZmQ1',
    isVideoGif: true
  },
  {
    id: 'g-nails-1',
    title: 'Champagne Gold Leaf Gel Nails',
    category: 'nails',
    categoryLabel: 'Nail Art',
    image: '/src/assets/images/service_nail_art_1791224041811.jpg',
    locationLabel: 'Kharar & Kurali'
  },
  {
    id: 'g-makeup-reel-1',
    title: 'Signature Bridal & Glam Artistry',
    category: 'makeup',
    categoryLabel: 'Makeup Artistry (Live Reel)',
    image: '/src/assets/images/aurum_makeup_art_optimized.gif',
    locationLabel: 'Official Instagram Reel',
    reelUrl: 'https://www.instagram.com/reel/DMXkusCzuQl/?vrfl=dzBkNjV0eTU2OGI1',
    isVideoGif: true
  },
  {
    id: 'g-makeup-1',
    title: 'Luminous Bridal & Occasion Artistry',
    category: 'makeup',
    categoryLabel: 'Makeup Artistry',
    image: '/src/assets/images/service_bridal_makeup_1791224052013.jpg',
    locationLabel: 'Kharar & Kurali'
  },
  {
    id: 'g-skin-reel-1',
    title: 'Aurum Radiance Glow & Skin Therapy',
    category: 'skin',
    categoryLabel: 'Skin Therapies & Glow (Live Reel)',
    image: '/src/assets/images/aurum_skin_art_optimized.gif',
    locationLabel: 'Official Instagram Reel',
    reelUrl: 'https://www.instagram.com/reel/DSReOKNkbXr/?xtok=MTBvbHNuaHdvYTlkcw==',
    isVideoGif: true
  },
  {
    id: 'g-lashes-reel-1',
    title: 'Aurum Signature Lash Enhancement & Eye Framing',
    category: 'lashes',
    categoryLabel: 'Lash Enhancements (Live Reel)',
    image: '/src/assets/images/aurum_lashes_art_optimized.gif',
    locationLabel: 'Official Instagram Reel',
    reelUrl: 'https://www.instagram.com/reel/DeWijC7MopV/?xtok=MWhrcTh1a2gydng1aw==',
    isVideoGif: true
  },
  {
    id: 'g-lashes-photo-1',
    title: 'Curated Featherlight Volume Lashes & Eye Definition',
    category: 'lashes',
    categoryLabel: 'Lash Styling',
    image: '/src/assets/images/aurum_lash_enhancement.jpg',
    locationLabel: 'Kharar & Kurali'
  },
  {
    id: 'g-mens-reel-1',
    title: 'Aurum Executive Haircut & Beard Sculpting',
    category: 'mens',
    categoryLabel: 'Men\'s Grooming (Live Reel)',
    image: '/src/assets/images/aurum_mens_grooming_optimized.gif',
    locationLabel: 'Official Instagram Reel',
    reelUrl: 'https://www.instagram.com/reel/DP6URhNkbpG/?xtok=MTFkMHNzMDZqeGFqcQ==',
    isVideoGif: true
  },
  {
    id: 'g-interior-2',
    title: 'Bespoke Arched Mirrors & Velvet Cognac Styling Stations',
    category: 'interior',
    categoryLabel: 'Salon Ambience & Architecture',
    image: '/src/assets/images/aurum_kurali_salon_interior_2.jpg',
    locationLabel: 'The Aurum Luxury Salon',
    reelUrl: 'https://www.instagram.com/p/DLKb36Zzmdu/?exln=OTByem5zYW96MXQ='
  },
  {
    id: 'g-interior-3',
    title: 'Private Treatment Lounge & Backwash Suite',
    category: 'interior',
    categoryLabel: 'Salon Ambience & Architecture',
    image: '/src/assets/images/aurum_kurali_salon_interior_3.jpg',
    locationLabel: 'The Aurum Luxury Salon',
    reelUrl: 'https://www.instagram.com/p/DLKb36Zzmdu/?exln=OTByem5zYW96MXQ='
  },
  {
    id: 'g-interior-4',
    title: 'Grand Salon Floor & Statement Chandelier Ambience',
    category: 'interior',
    categoryLabel: 'Salon Ambience & Architecture',
    image: '/src/assets/images/aurum_kurali_salon_interior_4.jpg',
    locationLabel: 'The Aurum Luxury Salon',
    reelUrl: 'https://www.instagram.com/p/DLKb36Zzmdu/?exln=OTByem5zYW96MXQ='
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-veenit-kumar',
    author: 'Veenit Kumar',
    userBadge: 'Local Guide · 35 reviews · 10 photos',
    avatarInitial: 'V',
    avatarBg: 'bg-emerald-700',
    service: 'Haircut, Grooming & Hygiene',
    location: 'The Aurum Luxury Unisex Salon (Kurali)',
    rating: 5,
    comment: 'Had a great experience at The Aurum Luxury Unisex Salon. The place is clean and has a nice premium feel. The staff was friendly and actually listened to what I wanted, which I really appreciated.\nService was professional and not rushed, and the hygiene standards were impressive. I was really happy with the final result.\nWould definitely recommend!',
    date: '6 months ago',
    isGoogleReview: true,
    ownerResponse: {
      author: 'The Aurum Luxury Unisex Salon(Best & Top Rated Salon of Kurali) (owner)',
      date: 'a month ago',
      text: 'Thank you for trusting us, We truly appreciate your feedback'
    }
  },
  {
    id: 'rev-madhu-bala',
    author: 'Madhu Bala',
    userBadge: '2 reviews',
    avatarInitial: 'M',
    avatarBg: 'bg-rose-600',
    service: 'Relaxing Facial & Skin Glow',
    location: 'The Aurum Luxury Unisex Salon (Kurali)',
    rating: 5,
    comment: 'Had a wonderful experience at the salon! The staff was extremely gentle, polite, and attentive. The facial was very relaxing and left my skin feeling fresh and glowing. Truly satisfied with the service—highly recommend!',
    date: '6 months ago',
    isGoogleReview: true,
    ownerResponse: {
      author: 'The Aurum Luxury Unisex Salon(Best & Top Rated Salon of Kurali) (owner)',
      date: 'a month ago',
      text: 'Thank you for trusting us, We truly appreciate your feedback'
    }
  },
  {
    id: 'rev-balandip-kaur',
    author: 'Balandip Kaur',
    userBadge: '4 reviews',
    avatarInitial: 'B',
    avatarBg: 'bg-amber-600',
    service: 'Bridal & Occasion Makeup',
    location: 'The Aurum Luxury Unisex Salon (Kurali)',
    rating: 5,
    comment: 'I had my makeup done at The Aurum Luxury Unisex Salon and the experience was great. The makeup looked clean, smooth, and very natural. The artist paid attention to details and chose shades that suited my skin tone perfectly. It stayed fresh for hours without feeling heavy. Highly recommend if you want a polished and elegant look.',
    date: '6 months ago',
    isGoogleReview: true,
    ownerResponse: {
      author: 'The Aurum Luxury Unisex Salon(Best & Top Rated Salon of Kurali) (owner)',
      date: 'a month ago',
      text: 'Thank you for trusting us, We truly appreciate your feedback'
    }
  },
  {
    id: 'rev-simran-rajput',
    author: 'Simran Rajput',
    userBadge: '1 review',
    avatarInitial: 'S',
    avatarBg: 'bg-fuchsia-600',
    service: 'Quality Salon Experience & Hair Styling',
    location: 'The Aurum Luxury Unisex Salon (Kurali)',
    rating: 5,
    comment: 'Absolutely amazing service! Clean space, skilled stylists, and a relaxing atmosphere. Highly recommend to anyone looking for a quality salon experience.',
    date: '6 months ago',
    isGoogleReview: true,
    ownerResponse: {
      author: 'The Aurum Luxury Unisex Salon(Best & Top Rated Salon of Kurali) (owner)',
      date: 'a month ago',
      text: 'Thank you for trusting us we really appreciate your feedback 💖'
    }
  },
  {
    id: 'rev-lovepreet-kaur',
    author: 'Lovepreet Kaur',
    userBadge: '2 reviews',
    avatarInitial: 'L',
    avatarBg: 'bg-blue-600',
    service: 'Professional Care & Ambience',
    location: 'The Aurum Luxury Unisex Salon (Kurali)',
    rating: 5,
    comment: 'I had an excellent experience at the salon. The staff was highly professional, friendly, and attentive to my needs. The service was outstanding, and I am extremely satisfied with the results. The ambience was clean and relaxing. I would highly recommend this salon to anyone looking for quality service.',
    date: '6 months ago',
    isGoogleReview: true,
    ownerResponse: {
      author: 'The Aurum Luxury Unisex Salon(Best & Top Rated Salon of Kurali) (owner)',
      date: 'a month ago',
      text: 'Thank you for trusting us, We truly appreciate your feedback'
    }
  },
  {
    id: 'rev-harsimranjit-kaur',
    author: 'Harsimranjit Kaur',
    userBadge: 'Local Guide · 18 reviews · 1 photo',
    avatarInitial: 'H',
    avatarBg: 'bg-teal-700',
    service: 'Stylist Gurpinder Service',
    location: 'The Aurum Luxury Unisex Salon (Kurali)',
    rating: 5,
    comment: 'Gurpinder at Aurum Salon was amazing! Loved the service and the overall experience. She was professional, friendly, and made me feel so comfortable throughout. Really happy with the results — definitely recommend visiting her for a great salon experience!',
    date: '4 months ago',
    isGoogleReview: true,
    ownerResponse: {
      author: 'The Aurum Luxury Unisex Salon(Best & Top Rated Salon of Kurali) (owner)',
      date: 'a month ago',
      text: 'Thank you for trusting us, We truly appreciate your feedback'
    }
  }
];

export const JOURNEY_TIMELINE = [
  {
    year: '2025',
    month: 'June',
    title: 'The Journey Begins in Kurali',
    description: 'Aurum Luxury Unisex Salon opened its doors in Kurali, Punjab, with a dedicated vision to deliver an uncompromising luxury beauty and grooming standard to clients outside metro capitals.'
  },
  {
    year: '2026',
    month: 'April',
    title: 'Expansion to Modern Valley, Kharar',
    description: 'Following heartfelt client support and growing demand, Aurum established its second luxury destination on the First Floor of SCO-2, Modern Valley, Kharar.'
  },
  {
    year: 'Present',
    month: 'Today',
    title: 'Punjab’s Growing Luxury Salon Destination',
    description: 'Serving discerning women and men across both Kharar and Kurali with personalized hair, nails, makeup, skin, and lash rituals.'
  }
];

export const WHY_CHOOSE_AURUM = [
  {
    title: 'Luxury Experience',
    description: 'Step into an elevated sanctuary with arched mirrors, warm brass finishes, and tranquil hospitality.',
    icon: 'Sparkles'
  },
  {
    title: 'Expert Beauty Services',
    description: 'Comprehensive artistry spanning hair styling, nail enhancements, makeup, skin therapies, and lash design.',
    icon: 'Scissors'
  },
  {
    title: 'His & Her (Unisex)',
    description: 'An inclusive, dignified space thoughtfully structured for both women and men to look and feel their finest.',
    icon: 'Users'
  },
  {
    title: 'Personalized Care',
    description: 'In-depth consultations ensuring every ritual is custom tailored to your individual features and lifestyle.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Two Convenient Locations',
    description: 'Conveniently accessible destinations in Modern Valley Kharar and Kurali, Punjab.',
    icon: 'MapPin'
  },
  {
    title: 'Modern Beauty Trends',
    description: 'Continuous mastery of runway techniques, dimensional balayage, dewy bridal glam, and clean aesthetics.',
    icon: 'Camera'
  }
];
