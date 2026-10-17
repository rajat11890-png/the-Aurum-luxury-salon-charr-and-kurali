export type SalonLocationId = 'kharar' | 'kurali';

export interface LocationInfo {
  id: SalonLocationId;
  name: string;
  brandTitle: string;
  badge: string;
  address: string;
  phone: string;
  phoneFormatted: string;
  isPhonePlaceholder: boolean;
  isAddressPlaceholder: boolean;
  instagramUrl: string;
  instagramHandle: string;
  googleMapsUrl: string;
  whatsappNumber?: string;
  established: string;
  features: string[];
}

export type ServiceCategoryId = 'hair' | 'nails' | 'makeup' | 'skin' | 'lashes' | 'mens';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  recommendedFor: string;
  duration?: string;
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  tagline: string;
  description: string;
  image: string;
  videoSrc?: string;
  reelUrl?: string;
  items: string[];
  detailedItems?: ServiceItem[];
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  location: SalonLocationId;
  service: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

export type BookingStatus = 'new' | 'confirmed' | 'in_service' | 'completed' | 'cancelled';

export interface AutomatedDispatchInfo {
  timestamp: string;
  email: {
    target: string;
    status: 'SENT' | 'SIMULATED' | 'LOGGED' | 'DELIVERED';
    subject: string;
  };
  whatsapp: {
    target: string;
    status: 'SENT' | 'TRIGGERED' | 'DISPATCHED';
    messageSummary: string;
    waUrl?: string;
  };
}

export interface BookingRecord extends BookingFormData {
  id: string;
  createdAt: string;
  status: BookingStatus;
  whatsappSent: boolean;
  emailSent: boolean;
  automatedDispatch?: AutomatedDispatchInfo;
  managerNotes?: string;
  source?: 'whatsapp_quick_booking' | 'online_request_form' | 'walk_in' | 'phone_desk';
}

export interface SalonNotificationRecord {
  id: string;
  bookingId: string;
  timestamp: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  service: string;
  location: SalonLocationId;
  date: string;
  time: string;
  emailDispatch: {
    recipient: string;
    status: 'DELIVERED' | 'SENT' | 'LOGGED';
    subject: string;
    sentAt: string;
  };
  whatsappDispatch: {
    recipient: string;
    status: 'DISPATCHED' | 'TRIGGERED' | 'SENT';
    waUrl: string;
    sentAt: string;
  };
}

export interface CustomerRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredLocation: SalonLocationId;
  totalBookings: number;
  lastBookingDate: string;
  lastService: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  userBadge?: string;
  avatarInitial?: string;
  avatarBg?: string;
  service: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  isPlaceholder?: boolean;
  isGoogleReview?: boolean;
  ownerResponse?: {
    text: string;
    date: string;
    author: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategoryId | 'interior';
  categoryLabel: string;
  image: string;
  locationLabel: string;
  reelUrl?: string;
  isVideoGif?: boolean;
}
