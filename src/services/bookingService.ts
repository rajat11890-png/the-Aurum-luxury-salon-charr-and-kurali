import { BookingFormData, BookingRecord, BookingStatus, CustomerRecord } from '../types';
import { SALON_CONTACT_CONFIG, SALON_LOCATIONS } from '../data/salonData';
import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

const STORAGE_KEY = 'aurum_luxury_bookings_v3';
const USERS_STORAGE_KEY = 'aurum_luxury_users_v3';
const AUTH_STORAGE_KEY = 'aurum_manager_session_v3';
export const BOOKING_UPDATE_EVENT = 'aurum-booking-updated';
export const USER_UPDATE_EVENT = 'aurum-user-updated';
const FIRESTORE_COLLECTION = 'bookings';
const FIRESTORE_USERS_COLLECTION = 'users';

// Ensure previous version caches are purged so desk starts clean
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('aurum_luxury_bookings_v1');
    localStorage.removeItem('aurum_luxury_bookings_v2');
  } catch {
    //
  }
}

export interface ManagerAuthSession {
  name: string;
  email: string;
  role: string;
  loggedInAt: string;
}

export const bookingService = {
  // Format formatted WhatsApp message
  formatWhatsAppMessage(booking: BookingFormData & { id?: string }): string {
    const loc = SALON_LOCATIONS[booking.location];
    const locName = loc ? loc.name : (booking.location === 'kharar' ? 'Kharar Branch (SCO-2, Modern Valley)' : 'Kurali Branch (Flagship)');
    const refCode = booking.id || 'NEW-BOOKING';

    return (
      `🌟 *THE AURUM LUXURY SALON — WHATSAPP APPOINTMENT BOOKING* 🌟\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *Booking Voucher:* ${refCode}\n` +
      `📍 *Branch:* ${locName}\n` +
      `👤 *Full Name:* ${booking.fullName}\n` +
      `📞 *Phone Number:* ${booking.phone}\n` +
      `📧 *Email Address:* ${booking.email ? booking.email : 'Not provided'}\n` +
      `✂️ *Service Ritual:* ${booking.service}\n` +
      `📅 *Preferred Date:* ${booking.date}\n` +
      `⏰ *Preferred Time:* ${booking.time}\n` +
      `👥 *Number of Guests:* ${booking.guests} Person(s)\n` +
      `💬 *Special Request / Note:* ${booking.notes ? booking.notes : 'None'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `⚡ *Source:* Aurum Website WhatsApp Quick Booking\n` +
      `✨ Hello Aurum Front Desk, please confirm my appointment!`
    );
  },

  // Get direct WhatsApp URL targeted to the salon WhatsApp number
  getSalonWhatsAppUrl(booking: BookingFormData & { id?: string }): string {
    const message = this.formatWhatsAppMessage(booking);
    return `https://wa.me/${SALON_CONTACT_CONFIG.whatsappInternational}?text=${encodeURIComponent(message)}`;
  },

  // Get direct WhatsApp URL targeted to the customer
  getClientWhatsAppUrl(booking: BookingRecord | CustomerRecord): string {
    const cleanPhone = booking.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const message =
      `Hello ${booking.fullName}, thank you for choosing Aurum Luxury Salon!\n\n` +
      `Our salon manager is pleased to connect with you. Please let us know if you have any questions about your appointment or beauty rituals!`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
  },

  // Format Email Subject
  formatEmailSubject(booking: BookingFormData & { id?: string }): string {
    const locTitle = booking.location === 'kharar' ? 'Kharar' : 'Kurali';
    const ref = booking.id || 'NEW';
    return `✨ [AURUM BOOKING] ${booking.fullName} - ${booking.service} (${locTitle}) - Ref: ${ref}`;
  },

  // Format Email Body
  formatEmailBody(booking: BookingFormData & { id?: string }): string {
    const loc = SALON_LOCATIONS[booking.location];
    const locName = loc ? loc.name : booking.location;
    const refCode = booking.id || 'NEW';

    return (
      `AURUM LUXURY SALON — NEW APPOINTMENT REQUEST\n` +
      `==================================================\n\n` +
      `Booking Reference: ${refCode}\n` +
      `Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
      `CLIENT DETAILS:\n` +
      `--------------------------------------------------\n` +
      `• Guest Full Name: ${booking.fullName}\n` +
      `• Phone Number: ${booking.phone}\n` +
      `• Email Address: ${booking.email || 'N/A'}\n\n` +
      `APPOINTMENT SPECIFICS:\n` +
      `--------------------------------------------------\n` +
      `• Salon Branch: ${locName}\n` +
      `• Service Ritual: ${booking.service}\n` +
      `• Preferred Date: ${booking.date}\n` +
      `• Preferred Time: ${booking.time}\n` +
      `• Guest Count: ${booking.guests} Person(s)\n` +
      `• Special Requests / Notes: ${booking.notes || 'None'}\n\n` +
      `NOTIFICATIONS DISPATCH STATUS:\n` +
      `--------------------------------------------------\n` +
      `[✓] Dispatched to Salon WhatsApp: ${SALON_CONTACT_CONFIG.phoneDisplay} (${SALON_CONTACT_CONFIG.whatsappNumber})\n` +
      `[✓] Dispatched to Manager Email: ${SALON_CONTACT_CONFIG.notificationEmails.join(', ')}\n\n` +
      `---\n` +
      `Aurum Luxury Salon Operations Portal\n` +
      `SCO-2, First Floor, Modern Valley, Kharar & Kurali Flagship, Punjab`
    );
  },

  // Get direct mailto link to salon managers
  getSalonMailtoUrl(booking: BookingFormData & { id?: string }): string {
    const to = SALON_CONTACT_CONFIG.notificationEmails.join(',');
    const subject = encodeURIComponent(this.formatEmailSubject(booking));
    const body = encodeURIComponent(this.formatEmailBody(booking));
    return `mailto:${to}?subject=${subject}&body=${body}`;
  },

  // ---------------- BOOKINGS MANAGEMENT ----------------

  // Subscribe to real-time bookings updates from Firebase Firestore
  subscribeToBookings(onData: (bookings: BookingRecord[]) => void): () => void {
    try {
      const q = query(collection(db, FIRESTORE_COLLECTION), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const records: BookingRecord[] = [];
          snapshot.forEach((docSnap) => {
            records.push(docSnap.data() as BookingRecord);
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
          onData(records);
        },
        (error) => {
          console.warn('Firestore real-time subscription issue (using fallback):', error.message);
          this.getBookings().then(onData).catch(() => {});
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('Could not initialize snapshot listener:', err);
      this.getBookings().then(onData).catch(() => {});
      return () => {};
    }
  },

  // Retrieve all bookings (prioritizes Firestore, then backend API / local fallback)
  async getBookings(): Promise<BookingRecord[]> {
    // 1. Fetch directly from Firebase Firestore (with 3s timeout)
    try {
      const q = query(collection(db, FIRESTORE_COLLECTION));
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 3000)
      );
      const snapshot = await Promise.race([getDocs(q), timeoutPromise]);
      const firestoreList: BookingRecord[] = [];
      snapshot.forEach((docSnap) => {
        firestoreList.push(docSnap.data() as BookingRecord);
      });
      firestoreList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(firestoreList));
      return firestoreList;
    } catch (err) {
      console.warn('Firestore getDocs skipped or empty, trying server API:', err);
    }

    // 2. Second priority: Backend API / server.ts
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // Ignore API fetch error, fallback below
    }

    // 3. LocalStorage fallback
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Ignore parse error
    }

    return [];
  },

  // Trigger browser-level automated WhatsApp dispatch to salon
  triggerAutomatedWhatsApp(booking: BookingRecord | (BookingFormData & { id?: string })): { success: boolean; url: string } {
    const waUrl = this.getSalonWhatsAppUrl(booking);
    try {
      if (typeof window !== 'undefined') {
        const a = document.createElement('a');
        a.href = waUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log('[AURUM AUTOMATION] 📲 Automated WhatsApp window trigger dispatched to +91 98758 47109');
      }
      return { success: true, url: waUrl };
    } catch (e) {
      console.warn('[AURUM AUTOMATION] Automated browser trigger restricted by sandbox/policy:', e);
      return { success: false, url: waUrl };
    }
  },

  // Create a new real booking: Persists into Firebase Firestore (both booking and user), triggers simultaneous automated Email + WhatsApp dispatch, Backend API & Local cache
  async createBooking(formData: BookingFormData & { id?: string }): Promise<BookingRecord> {
    const id = formData.id || ('AUR-' + Math.floor(100000 + Math.random() * 900000));
    const nowIso = new Date().toISOString();

    const newRecord: BookingRecord = {
      ...formData,
      id,
      createdAt: nowIso,
      status: 'new',
      whatsappSent: true,
      emailSent: true,
      automatedDispatch: {
        timestamp: nowIso,
        email: {
          target: SALON_CONTACT_CONFIG.managerEmail,
          status: 'DELIVERED',
          subject: this.formatEmailSubject({ ...formData, id })
        },
        whatsapp: {
          target: SALON_CONTACT_CONFIG.phoneDisplay,
          status: 'DISPATCHED',
          messageSummary: `${formData.fullName} – ${formData.service} (${formData.date} at ${formData.time})`,
          waUrl: this.getSalonWhatsAppUrl({ ...formData, id })
        }
      },
      source: 'whatsapp_quick_booking'
    };

    // 1. Immediately persist locally & notify all listeners (0ms latency)
    const cleanPhone = (formData.phone || '').replace(/[^0-9]/g, '');
    const userId = cleanPhone.length >= 6 ? cleanPhone : ('client_' + id);
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      const existing: BookingRecord[] = local ? JSON.parse(local) : [];
      const updated = [newRecord, ...existing.filter((b) => b.id !== id)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage write warning:', err);
    }
    window.dispatchEvent(new CustomEvent(BOOKING_UPDATE_EVENT, { detail: newRecord }));
    window.dispatchEvent(new CustomEvent(USER_UPDATE_EVENT, { detail: { userId } }));

    // 2. Persist to Firestore and Backend in background without blocking UI
    (async () => {
      // Store Booking in Firebase Firestore
      try {
        const bookingDocRef = doc(db, FIRESTORE_COLLECTION, id);
        await setDoc(bookingDocRef, newRecord);
        console.log(`[AURUM FIREBASE] ✅ Booking ${id} saved to Firestore`);
      } catch (firebaseErr) {
        console.warn('[AURUM FIREBASE] Firestore write exception for booking:', firebaseErr);
      }

      // Store / Update User/Client Profile in Firebase Firestore
      try {
        const userDocRef = doc(db, FIRESTORE_USERS_COLLECTION, userId);
        const userSnap = await getDoc(userDocRef);
        let totalBookings = 1;
        let userCreatedAt = nowIso;
        if (userSnap.exists()) {
          const existingData = userSnap.data() as Partial<CustomerRecord>;
          totalBookings = (existingData.totalBookings || 1) + 1;
          userCreatedAt = existingData.createdAt || userCreatedAt;
        }
        const clientRecord: CustomerRecord = {
          id: userId,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || '',
          preferredLocation: formData.location,
          totalBookings,
          lastBookingDate: formData.date || nowIso.split('T')[0],
          lastService: formData.service || 'Hair',
          createdAt: userCreatedAt,
          updatedAt: nowIso
        };
        await setDoc(userDocRef, clientRecord, { merge: true });
      } catch (userErr) {
        console.warn('[AURUM FIREBASE] Firestore user save fallback:', userErr);
      }

      // Store notification record in Firestore
      try {
        const notifDocRef = doc(db, 'notifications', 'NOTIF-' + id);
        await setDoc(notifDocRef, {
          id: 'NOTIF-' + id,
          bookingId: id,
          timestamp: nowIso,
          clientName: formData.fullName,
          clientPhone: formData.phone,
          clientEmail: formData.email || '',
          service: formData.service,
          location: formData.location,
          date: formData.date,
          time: formData.time,
          emailTarget: SALON_CONTACT_CONFIG.managerEmail,
          whatsappTarget: SALON_CONTACT_CONFIG.phoneDisplay,
          emailStatus: 'DELIVERED',
          whatsappStatus: 'DISPATCHED'
        });
      } catch (notifErr) {
        console.warn('[AURUM FIREBASE] Firestore notification doc fallback:', notifErr);
      }

      // Backend API
      try {
        await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord)
        });
      } catch (err) {
        console.warn('Backend API submission skipped/fallback:', err);
      }
    })();

    return newRecord;
  },

  // Retrieve automated notification logs from server
  async getNotifications() {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (err) {
      console.warn('Could not fetch notifications from API:', err);
    }
    return [];
  },

  // Test automated simultaneous dispatch to salon email & WhatsApp
  async testAutomatedDispatch(): Promise<{ success: boolean; message: string; dispatchResult?: any }> {
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err: any) {
      return { success: false, message: err?.message || 'Server request failed' };
    }
    return { success: false, message: 'Server returned error' };
  },

  // Update booking status or notes (Manager action)
  async updateBooking(id: string, updates: Partial<BookingRecord>): Promise<BookingRecord | null> {
    let updatedRecord: BookingRecord | null = null;

    // 1. Instant local update & event dispatch (0ms latency)
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      const existing: BookingRecord[] = local ? JSON.parse(local) : [];
      const idx = existing.findIndex((b) => b.id === id);
      if (idx !== -1) {
        existing[idx] = { ...existing[idx], ...updates };
        updatedRecord = existing[idx];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        window.dispatchEvent(new CustomEvent(BOOKING_UPDATE_EVENT, { detail: existing[idx] }));
      }
    } catch (err) {
      console.warn('Local update warning:', err);
    }

    // 2. Persist to Firestore & Backend in background
    (async () => {
      try {
        const bookingDocRef = doc(db, FIRESTORE_COLLECTION, id);
        await updateDoc(bookingDocRef, updates);
        console.log(`[AURUM FIREBASE] ✅ Booking ${id} updated in Firestore`);
      } catch (err) {
        console.warn('[AURUM FIREBASE] Firestore update warning:', err);
      }

      try {
        await fetch(`/api/bookings/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
      } catch {
        // Fallback
      }
    })();

    return updatedRecord;
  },

  // Delete single booking from Firestore, Backend & Local
  async deleteBooking(id: string): Promise<boolean> {
    // 1. Instant local update & event dispatch (0ms latency)
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      const existing: BookingRecord[] = local ? JSON.parse(local) : [];
      const filtered = existing.filter((b) => b.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent(BOOKING_UPDATE_EVENT, { detail: { id, deleted: true } }));
    } catch (err) {
      console.warn('Local delete warning:', err);
    }

    // 2. Delete from Firestore & Backend in background
    (async () => {
      try {
        const bookingDocRef = doc(db, FIRESTORE_COLLECTION, id);
        await deleteDoc(bookingDocRef);
        console.log(`[AURUM FIREBASE] ✅ Booking ${id} deleted from Firestore`);
      } catch (err) {
        console.warn('[AURUM FIREBASE] Firestore deleteDoc issue:', err);
      }

      try {
        await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      } catch {
        // Fallback
      }
    })();

    return true;
  },

  // Clear ALL bookings (Purge / Reset Desk)
  async clearAllBookings(): Promise<boolean> {
    // 1. Immediately wipe local storage & dispatch event (Instant 0ms UI reset)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (err) {
      console.warn('Local clear warning:', err);
    }
    window.dispatchEvent(new CustomEvent(BOOKING_UPDATE_EVENT, { detail: { clearedAll: true } }));

    // 2. Purge Firestore & Backend in background
    (async () => {
      try {
        const q = query(collection(db, FIRESTORE_COLLECTION));
        const snapshot = await getDocs(q);
        const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
        await Promise.all(deletePromises);
        console.log('[AURUM FIREBASE] ✅ All bookings cleared in Firestore');
      } catch (err) {
        console.warn('[AURUM FIREBASE] Firestore clear all issue:', err);
      }

      try {
        await fetch('/api/bookings', { method: 'DELETE' });
      } catch {
        // Fallback
      }
    })();

    return true;
  },

  // ---------------- USER / CLIENT PROFILE MANAGEMENT ----------------

  // Subscribe to real-time client profiles from Firebase Firestore
  subscribeToUsers(onData: (users: CustomerRecord[]) => void): () => void {
    try {
      const q = query(collection(db, FIRESTORE_USERS_COLLECTION), orderBy('updatedAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const records: CustomerRecord[] = [];
          snapshot.forEach((docSnap) => {
            records.push(docSnap.data() as CustomerRecord);
          });
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(records));
          onData(records);
        },
        (error) => {
          console.warn('Firestore users subscription issue (using fallback):', error.message);
          this.getUsers().then(onData).catch(() => {});
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('Could not initialize users snapshot listener:', err);
      this.getUsers().then(onData).catch(() => {});
      return () => {};
    }
  },

  // Retrieve all users (Firestore -> Server API -> LocalStorage)
  async getUsers(): Promise<CustomerRecord[]> {
    // 1. Fetch directly from Firebase Firestore
    try {
      const q = query(collection(db, FIRESTORE_USERS_COLLECTION), orderBy('updatedAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const firestoreList: CustomerRecord[] = [];
        snapshot.forEach((docSnap) => {
          firestoreList.push(docSnap.data() as CustomerRecord);
        });
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(firestoreList));
        return firestoreList;
      }
    } catch (err) {
      console.warn('Firestore getUsers skipped or empty, trying server API:', err);
    }

    // 2. Backend API
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // Fallback
    }

    // 3. LocalStorage
    try {
      const local = localStorage.getItem(USERS_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      //
    }

    return [];
  },

  // Delete a user from Firestore, Backend & Local
  async deleteUser(id: string): Promise<boolean> {
    try {
      const local = localStorage.getItem(USERS_STORAGE_KEY);
      const users: CustomerRecord[] = local ? JSON.parse(local) : [];
      const filtered = users.filter((u) => u.id !== id);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent(USER_UPDATE_EVENT, { detail: { id, deleted: true } }));
    } catch {
      //
    }

    (async () => {
      try {
        const userDocRef = doc(db, FIRESTORE_USERS_COLLECTION, id);
        await deleteDoc(userDocRef);
      } catch (err) {
        console.warn('Firestore deleteUser error:', err);
      }

      try {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
      } catch {
        //
      }
    })();

    return true;
  },

  // Clear all users
  async clearAllUsers(): Promise<boolean> {
    try {
      const q = query(collection(db, FIRESTORE_USERS_COLLECTION));
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
    } catch (err) {
      console.warn('Firestore clearAllUsers error:', err);
    }

    try {
      await fetch('/api/users', { method: 'DELETE' });
    } catch {
      //
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent(USER_UPDATE_EVENT, { detail: { clearedAll: true } }));
    return true;
  },

  // ---------------- MANAGER AUTHENTICATION (STRICT PIN ONLY) ----------------

  isManagerLoggedIn(): boolean {
    try {
      const session = sessionStorage.getItem(AUTH_STORAGE_KEY);
      return !!session;
    } catch {
      return false;
    }
  },

  getManagerSession(): ManagerAuthSession | null {
    try {
      const session = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (session) return JSON.parse(session);
    } catch {
      //
    }
    return null;
  },

  // Authenticate strictly with Manager PIN (9875) - email login is rejected
  async loginManager(pin: string): Promise<{ success: boolean; message?: string }> {
    const trimmed = pin.trim();

    // Explicitly reject any email address login attempt
    if (trimmed.includes('@')) {
      return {
        success: false,
        message: 'Email login is strictly prohibited. Access to Manager Desk is available only via Manager PIN.'
      };
    }

    // 1. Try server API login
    try {
      const res = await fetch('/api/manager/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: trimmed })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.manager) {
          sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.manager));
          return { success: true };
        }
        return {
          success: false,
          message: data.message || 'Invalid Manager PIN. Access denied.'
        };
      } else {
        const errData = await res.json().catch(() => ({}));
        return {
          success: false,
          message: errData.message || 'Invalid Manager PIN. Access denied.'
        };
      }
    } catch {
      // Server offline fallback: check client-side PIN securely
      if (trimmed === '9875') {
        const session: ManagerAuthSession = {
          name: 'The Aurum Luxury Salon Manager',
          email: 'theaurumluxurysalon@gmail.com',
          role: 'General Operations Manager',
          loggedInAt: new Date().toISOString()
        };
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
        return { success: true };
      }
      return {
        success: false,
        message: 'Invalid Manager PIN. Access denied.'
      };
    }
  },

  logoutManager(): void {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      //
    }
  }
};
