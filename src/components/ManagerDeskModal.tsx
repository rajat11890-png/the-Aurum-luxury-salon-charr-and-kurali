import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Sparkles,
  UserCheck,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Trash2,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Inbox,
  Users,
  Database
} from 'lucide-react';
import { BookingRecord, BookingStatus, SalonLocationId, CustomerRecord } from '../types';
import { bookingService, BOOKING_UPDATE_EVENT, USER_UPDATE_EVENT } from '../services/bookingService';
import { SALON_CONTACT_CONFIG, SALON_LOCATIONS } from '../data/salonData';
import { AurumLogo } from './AurumLogo';

interface ManagerDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManagerDeskModal: React.FC<ManagerDeskModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authInput, setAuthInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Active Desk View: 'bookings' | 'users' | 'dispatches'
  const [activeTab, setActiveTab] = useState<'bookings' | 'users' | 'dispatches'>('bookings');

  // Bookings state
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  // Users / Clients state
  const [users, setUsers] = useState<CustomerRecord[]>([]);
  // Automated Dispatches state
  const [notifications, setNotifications] = useState<any[]>([]);
  const [testingDispatch, setTestingDispatch] = useState<boolean>(false);
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [walkInError, setWalkInError] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState<string>('');

  // New Walk-in form state
  const [newBooking, setNewBooking] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: 'kharar' as SalonLocationId,
    service: 'Hair',
    date: new Date().toISOString().split('T')[0],
    time: '12:30 PM',
    guests: 1,
    notes: '',
  });

  const loadData = async () => {
    setLoading(true);
    const [bookingsData, usersData, notifsData] = await Promise.all([
      bookingService.getBookings(),
      bookingService.getUsers(),
      bookingService.getNotifications()
    ]);
    setBookings(bookingsData);
    setUsers(usersData);
    setNotifications(notifsData);
    setLoading(false);
  };

  const handleTriggerTestDispatch = async () => {
    setTestingDispatch(true);
    setTestFeedback(null);
    const res = await bookingService.testAutomatedDispatch();
    if (res.success) {
      setTestFeedback('Automated test message dispatched simultaneously to ' + SALON_CONTACT_CONFIG.managerEmail + ' and ' + SALON_CONTACT_CONFIG.phoneDisplay);
      await loadData();
    } else {
      setTestFeedback(res.message || 'Dispatch failed');
    }
    setTestingDispatch(false);
  };

  useEffect(() => {
    if (isOpen) {
      const loggedIn = bookingService.isManagerLoggedIn();
      setIsAuthenticated(loggedIn);
      if (loggedIn) {
        loadData();
      }
    }
  }, [isOpen]);

  // Listen for real-time updates from Firebase Firestore
  useEffect(() => {
    if (!isAuthenticated) return;

    // Real-time Firestore subscriptions
    const unsubscribeBookings = bookingService.subscribeToBookings((liveBookings) => {
      setBookings(liveBookings);
      setLoading(false);
    });

    const unsubscribeUsers = bookingService.subscribeToUsers((liveUsers) => {
      setUsers(liveUsers);
    });

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener(BOOKING_UPDATE_EVENT, handleUpdate);
    window.addEventListener(USER_UPDATE_EVENT, handleUpdate);

    return () => {
      unsubscribeBookings();
      unsubscribeUsers();
      window.removeEventListener(BOOKING_UPDATE_EVENT, handleUpdate);
      window.removeEventListener(USER_UPDATE_EVENT, handleUpdate);
    };
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInput.trim()) {
      setAuthError('Please enter the manager access PIN.');
      return;
    }
    if (authInput.trim().includes('@')) {
      setAuthError('Email login is not permitted. Please log in using the secret manager PIN only.');
      return;
    }
    setIsAuthenticating(true);
    setAuthError(null);
    const res = await bookingService.loginManager(authInput);
    if (res.success) {
      setIsAuthenticated(true);
      setAuthInput('');
      setAuthError(null);
      await loadData();
    } else {
      setAuthError(res.message || 'Incorrect manager PIN. Access is restricted to authorized manager PIN only.');
    }
    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    bookingService.logoutManager();
    setIsAuthenticated(false);
    setAuthInput('');
    setAuthError(null);
  };

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.phone.includes(searchQuery) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.service.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = locationFilter === 'all' || b.location === locationFilter;
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

      return matchesSearch && matchesLocation && matchesStatus;
    });
  }, [bookings, searchQuery, locationFilter, statusFilter]);

  // Filter users / clients
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (!userSearchQuery.trim()) return true;
      const q = userSearchQuery.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        u.preferredLocation.toLowerCase().includes(q)
      );
    });
  }, [users, userSearchQuery]);

  // Key metrics
  const stats = useMemo(() => {
    const total = bookings.length;
    const newCount = bookings.filter((b) => b.status === 'new').length;
    const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = bookings.filter((b) => b.date === todayStr).length;
    const totalClients = users.length;
    return { total, newCount, confirmedCount, todayCount, totalClients };
  }, [bookings, users]);

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    // Instant optimistic update
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    bookingService.updateBooking(id, { status: newStatus });
  };

  const handleSaveNotes = (id: string) => {
    // Instant optimistic update
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, managerNotes: notesInput } : b)));
    setEditingNotesId(null);
    bookingService.updateBooking(id, { managerNotes: notesInput });
  };

  const handleDelete = (id: string) => {
    // Instant optimistic update (no blocking confirm)
    setBookings((prev) => prev.filter((b) => b.id !== id));
    bookingService.deleteBooking(id);
  };

  const handleDeleteUser = (id: string, _name?: string) => {
    // Instant optimistic update (no blocking confirm)
    setUsers((prev) => prev.filter((u) => u.id !== id));
    bookingService.deleteUser(id);
  };

  const handleConfirmClearAll = async () => {
    // Instant optimistic update (no blocking confirm)
    setBookings([]);
    setShowClearConfirm(false);
    await bookingService.clearAllBookings();
  };

  const handleCreateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.fullName.trim() || !newBooking.phone.trim()) {
      setWalkInError('Please provide customer name and phone number.');
      return;
    }
    setWalkInError(null);

    const tempId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    const createdRecord: BookingRecord = {
      ...newBooking,
      id: tempId,
      createdAt: new Date().toISOString(),
      status: 'new',
      whatsappSent: true,
      emailSent: true,
      source: 'walk_in'
    };

    // Instant optimistic update to desk
    setBookings((prev) => [createdRecord, ...prev]);
    setShowAddModal(false);
    setNewBooking({
      fullName: '',
      phone: '',
      email: '',
      location: 'kharar',
      service: 'Hair',
      date: new Date().toISOString().split('T')[0],
      time: '12:30 PM',
      guests: 1,
      notes: '',
    });

    bookingService.createBooking({
      ...newBooking,
      id: tempId
    });
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Booking ID', 'Created At', 'Guest Name', 'Phone', 'Email', 'Location', 'Service', 'Date', 'Time', 'Guests', 'Status', 'Notes', 'Manager Notes'];
    const rows = bookings.map((b) => [
      b.id,
      b.createdAt,
      `"${b.fullName.replace(/"/g, '""')}"`,
      b.phone,
      b.email || '',
      b.location,
      b.service,
      b.date,
      b.time,
      b.guests,
      b.status,
      `"${(b.notes || '').replace(/"/g, '""')}"`,
      `"${(b.managerNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aurum_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // ---------------- VIEW 1: MANAGER LOGIN SCREEN (RESTRICTED ACCESS VIA PIN ONLY) ----------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md transition-all duration-300">
        <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95">
          
          {/* Header Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close manager login"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Luxury Card Top Ribbon */}
          <div className="h-2.5 bg-gradient-to-r from-[#07255E] via-[#C59B27] to-[#0B3B95]" />

          <div className="p-6 sm:p-8 text-center">
            {/* Lock Emblem & Logo */}
            <div className="w-16 h-16 rounded-2xl bg-[#07255E] text-[#E5C568] flex items-center justify-center mx-auto mb-4 shadow-md border border-[#C59B27]/40">
              <Lock className="w-8 h-8" />
            </div>

            <div className="text-[11px] font-sans-clean font-bold tracking-[0.2em] uppercase text-[#C59B27] mb-1">
              Protected Portal · Staff Only
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#07255E] mb-2">
              Salon Manager Login
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed mb-6">
              Access to customer bookings, client records, and WhatsApp/Email dispatch logs is restricted exclusively to authorized salon management.
            </p>

            {/* Error Message */}
            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 text-left animate-in shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center justify-between">
                  <span>Manager Access PIN</span>
                  <span className="text-[10px] text-stone-400 font-normal">PIN Only Access</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoFocus
                    maxLength={12}
                    placeholder="Enter Secret Manager PIN"
                    value={authInput}
                    onChange={(e) => setAuthInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-stone-300 focus:border-[#0B3B95] focus:ring-2 focus:ring-[#0B3B95]/20 outline-none bg-white transition-all font-mono tracking-wider"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="min-h-[48px] w-full py-3 px-6 bg-[#0B3B95] hover:bg-[#07255E] active:scale-[0.99] disabled:opacity-75 text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-[#E5C568]" />
                <span>{isAuthenticating ? 'VERIFYING PIN...' : 'ENTER MANAGER DESK'}</span>
              </button>
            </form>

            {/* Confidential Access Security Notice */}
            <div className="mt-6 p-3.5 rounded-2xl bg-stone-100 border border-stone-200/80 text-left text-xs text-stone-600 space-y-1">
              <div className="font-bold text-[#07255E] text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Confidential Manager Desk Access</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Authorized management portal for Aurum Luxury Salon (Kharar &amp; Kurali). Access is strictly restricted to Secret Manager PIN verification. Logging in via email is not permitted.
              </p>
            </div>

          </div>

          <div className="p-3 bg-stone-100 border-t border-stone-200 text-center text-[11px] text-stone-400">
            Aurum Luxury Salon · Security &amp; Access Control
          </div>

        </div>
      </div>
    );
  }

  // ---------------- VIEW 2: AUTHENTICATED MANAGER DESK ----------------
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 bg-stone-900/80 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-6xl bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[94vh] flex flex-col animate-in zoom-in-95">
        
        {/* Top Header */}
        <div className="px-5 sm:px-8 py-3.5 sm:py-4 bg-white border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <AurumLogo size="sm" variant="badge" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#07255E]">
                  Salon Manager &amp; Reception Desk
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Firebase Live
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider border border-amber-200 flex items-center gap-1" title="Connected to the-aurum-luxury-salon">
                  <Database className="w-3 h-3 text-amber-600" />
                  the-aurum-luxury-salon
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Logged in as <strong className="text-stone-800">{SALON_CONTACT_CONFIG.managerEmail}</strong> · WhatsApp Desk: <span className="font-semibold text-[#0B3B95]">{SALON_CONTACT_CONFIG.phoneDisplay}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2 sm:px-3 sm:py-2 text-stone-600 hover:text-[#0B3B95] hover:bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh Data from Firebase"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {bookings.length > 0 && activeTab === 'bookings' && (
              <button
                onClick={handleExportCSV}
                className="p-2 sm:px-3 sm:py-2 text-stone-600 hover:text-[#0B3B95] hover:bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Export CSV Run-sheet"
              >
                <Download className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}

            {bookings.length > 0 && activeTab === 'bookings' && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-2 sm:px-3 sm:py-2 text-rose-700 hover:bg-rose-50 rounded-xl border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Remove all requests and empty desk"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-[#0B3B95] hover:bg-[#07255E] text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-[#E5C568]" />
              <span>Log Walk-in</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
              title="Lock Manager Desk"
            >
              <LogOut className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Lock Desk</span>
            </button>

            <button
              onClick={onClose}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer ml-1"
              aria-label="Close manager desk"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Notification Bar */}
        <div className="bg-[#07255E] text-white px-5 sm:px-8 py-2.5 flex flex-wrap items-center justify-between text-xs font-medium gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E5C568]" />
            <span>
              <strong>Firebase Cloud Sync Active:</strong> Client appointments and user profiles are securely stored in your Firebase project (<code>the-aurum-luxury-salon</code>), dispatched to WhatsApp (+91 98758 47109), and delivered to {SALON_CONTACT_CONFIG.managerEmail}.
            </span>
          </div>
          <div className="text-[11px] text-[#E5C568] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Manager PIN Protected (9875)</span>
          </div>
        </div>

        {/* Tab Navigation: Bookings vs Client Directory vs Automated Dispatches */}
        <div className="px-5 sm:px-8 pt-3 bg-white border-b border-stone-200 flex items-center gap-4 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-[#0B3B95] text-[#0B3B95]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments &amp; Bookings</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'bookings' ? 'bg-[#0B3B95] text-white' : 'bg-stone-100 text-stone-600'}`}>
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'users'
                ? 'border-[#0B3B95] text-[#0B3B95]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clients &amp; User Data</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'users' ? 'bg-[#0B3B95] text-white' : 'bg-stone-100 text-stone-600'}`}>
              {users.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dispatches')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'dispatches'
                ? 'border-[#0B3B95] text-[#0B3B95]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Automated Dispatches</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'dispatches' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
              {notifications.length}
            </span>
          </button>
        </div>

        {/* ---------------- VIEW A: BOOKINGS TAB ---------------- */}
        {activeTab === 'bookings' && (
          <>
            {/* Key Metrics Banner */}
            <div className="p-4 sm:p-6 bg-white border-b border-stone-200 shrink-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    New Online Requests
                  </div>
                  <div className="text-2xl font-bold text-amber-900 mt-0.5">
                    {stats.newCount}
                  </div>
                  <p className="text-[11px] text-amber-700/80 mt-0.5">Requires Reception Call</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Confirmed Chairs
                  </div>
                  <div className="text-2xl font-bold text-emerald-900 mt-0.5">
                    {stats.confirmedCount}
                  </div>
                  <p className="text-[11px] text-emerald-700/80 mt-0.5">Stylist &amp; Slot Locked</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#0B3B95]">
                    Today's Schedule
                  </div>
                  <div className="text-2xl font-bold text-[#07255E] mt-0.5">
                    {stats.todayCount}
                  </div>
                  <p className="text-[11px] text-blue-700/80 mt-0.5">Appointments for Today</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-100/80 border border-stone-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
                    Total in Register
                  </div>
                  <div className="text-2xl font-bold text-stone-800 mt-0.5">
                    {stats.total}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">Stored in Firebase</p>
                </div>
              </div>

              {/* Search & Filters (only if bookings exist) */}
              {bookings.length > 0 && (
                <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search guest name, phone, service, or voucher ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-[#0B3B95] focus:ring-1 focus:ring-[#0B3B95] outline-none bg-stone-50/50"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <Filter className="w-3.5 h-3.5 text-stone-400" />
                      <span>Location:</span>
                      <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="text-xs py-1.5 px-2 rounded-lg border border-stone-300 bg-white font-medium text-stone-700 outline-none"
                      >
                        <option value="all">All Branches</option>
                        <option value="kharar">Kharar (Modern Valley)</option>
                        <option value="kurali">Kurali (Flagship)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <span>Status:</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs py-1.5 px-2 rounded-lg border border-stone-300 bg-white font-medium text-stone-700 outline-none"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New Requests</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_service">In Service</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable Bookings List OR Empty State */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
              {bookings.length === 0 ? (
                /* COMPLETELY EMPTY REGISTER AS REQUESTED */
                <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 shadow-sm max-w-xl mx-auto my-6">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#C59B27] flex items-center justify-center mx-auto mb-4 border border-[#C59B27]/30 shadow-xs">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl font-bold text-[#07255E] mb-2">
                    Booking Register is Currently Empty
                  </h4>
                  <p className="text-xs text-stone-600 font-light leading-relaxed max-w-md mx-auto mb-6">
                    All requests have been cleared. As soon as a guest initiates an appointment booking through the website, it will appear here instantly in real time and store into your Firebase project (<strong>the-aurum-luxury-salon</strong>), dispatching to Salon WhatsApp (<strong>+91 98758 47109</strong>) and manager email (<strong>{SALON_CONTACT_CONFIG.managerEmail}</strong>).
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="min-h-[44px] px-5 py-2.5 bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#E5C568]" />
                      <span>Log Manual Walk-in / Call</span>
                    </button>
                    <button
                      onClick={loadData}
                      className="min-h-[44px] px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-2 border border-stone-200 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                      <span>Check for New Requests</span>
                    </button>
                  </div>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300 p-6">
                  <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                  <h4 className="font-serif-luxury text-lg font-bold text-stone-700">
                    No Bookings Matching Your Filter
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                    Try clearing the search query or changing the filter options above.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => {
                    const salonLoc = SALON_LOCATIONS[booking.location];
                    const isNew = booking.status === 'new';

                    return (
                      <div
                        key={booking.id}
                        className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 shadow-sm ${
                          isNew
                            ? 'border-amber-300/80 bg-amber-50/20 ring-1 ring-amber-300/40'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {/* Top Row: Ref, Badge, Time, Status Dropdown */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 border border-stone-200">
                              {booking.id}
                            </span>
                            {isNew && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider border border-amber-300 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                NEW APPOINTMENT REQUEST
                              </span>
                            )}
                            <span className="text-[11px] text-stone-400">
                              Received: {new Date(booking.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} at {new Date(booking.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status selector */}
                            <div className="relative">
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                                className={`text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border outline-none cursor-pointer ${
                                  booking.status === 'new'
                                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                                    : booking.status === 'confirmed'
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                    : booking.status === 'in_service'
                                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                                    : booking.status === 'completed'
                                    ? 'bg-stone-100 text-stone-600 border-stone-300'
                                    : 'bg-rose-100 text-rose-800 border-rose-300'
                                }`}
                              >
                                <option value="new">● New Request</option>
                                <option value="confirmed">✓ Confirmed</option>
                                <option value="in_service">⚡ In Service</option>
                                <option value="completed">✓ Completed</option>
                                <option value="cancelled">✕ Cancelled</option>
                              </select>
                            </div>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete booking"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Middle Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-xs">
                          {/* Column 1: Client Info */}
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                              Guest Details
                            </div>
                            <div className="font-serif-luxury text-base font-bold text-[#07255E]">
                              {booking.fullName}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-stone-700">
                              <Phone className="w-3.5 h-3.5 text-[#0B3B95]" />
                              <span className="font-semibold">{booking.phone}</span>
                              <a
                                href={`tel:${booking.phone}`}
                                className="text-[10px] text-[#0B3B95] underline hover:text-[#07255E]"
                              >
                                Call
                              </a>
                            </div>
                            {booking.email && (
                              <div className="mt-1 flex items-center gap-2 text-stone-600">
                                <Mail className="w-3.5 h-3.5 text-stone-400" />
                                <span className="truncate">{booking.email}</span>
                              </div>
                            )}
                          </div>

                          {/* Column 2: Appointment Details */}
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                              Service &amp; Time
                            </div>
                            <div className="text-sm font-bold text-[#C59B27] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{booking.service}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-stone-700">
                              <Calendar className="w-3.5 h-3.5 text-stone-400" />
                              <span className="font-semibold">{booking.date}</span>
                              <span className="text-stone-400">·</span>
                              <Clock className="w-3.5 h-3.5 text-stone-400" />
                              <span className="font-semibold">{booking.time}</span>
                            </div>
                            <div className="mt-1 text-stone-500">
                              Party Size: <strong>{booking.guests} Person(s)</strong>
                            </div>
                          </div>

                          {/* Column 3: Branch Location & Dispatch Status */}
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                              Branch &amp; Dispatch Status
                            </div>
                            <div className="font-bold text-[#07255E] flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#0B3B95]" />
                              <span>{salonLoc ? salonLoc.name : booking.location}</span>
                            </div>

                            {/* Simultaneous Dispatch verification badges */}
                            <div className="mt-1.5 space-y-1">
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>WhatsApp: Dispatched (+91 98758 47109)</span>
                              </div>
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-semibold border border-blue-200">
                                <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                <span>Email: Dispatched ({SALON_CONTACT_CONFIG.managerEmail})</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Customer Notes */}
                        {booking.notes && (
                          <div className="mt-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700">
                            <span className="font-bold text-stone-900 mr-1.5">Guest Request:</span>
                            <span>{booking.notes}</span>
                          </div>
                        )}

                        {/* Manager Internal Notes */}
                        <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex-1 min-w-[240px]">
                            {editingNotesId === booking.id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={notesInput}
                                  onChange={(e) => setNotesInput(e.target.value)}
                                  placeholder="Add manager internal notes (e.g. Assigned stylist, chair number)..."
                                  className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-stone-300 outline-none"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveNotes(booking.id)}
                                  className="px-2.5 py-1 bg-[#0B3B95] text-white text-xs font-semibold rounded-lg hover:bg-[#07255E]"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="px-2 py-1 text-xs text-stone-500 hover:text-stone-700"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setEditingNotesId(booking.id);
                                  setNotesInput(booking.managerNotes || '');
                                }}
                                className="text-[11px] text-stone-500 hover:text-[#0B3B95] cursor-pointer flex items-center gap-1.5 italic"
                              >
                                <span>📝 Manager Note:</span>
                                <span className="not-italic text-stone-700 font-medium">
                                  {booking.managerNotes || 'Click to add internal note (e.g. stylist assigned, room reserved)...'}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Direct Actions: WhatsApp Client, WhatsApp Salon, Send Email */}
                          <div className="flex items-center gap-2">
                            <a
                              href={bookingService.getClientWhatsAppUrl(booking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                              title="Open WhatsApp chat with this client"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp Guest</span>
                            </a>

                            <a
                              href={bookingService.getSalonWhatsAppUrl(booking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-200"
                              title="Forward booking to Salon Desk WhatsApp"
                            >
                              <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                              <span>Salon WhatsApp</span>
                            </a>

                            <a
                              href={bookingService.getSalonMailtoUrl(booking)}
                              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-200"
                              title="Open formatted email for this booking"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#0B3B95]" />
                              <span>Email Salon</span>
                            </a>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* ---------------- VIEW B: CLIENTS & USERS TAB ---------------- */}
        {activeTab === 'users' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 sm:p-6 bg-white border-b border-stone-200 shrink-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search client name, phone, or email in Firebase..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-[#0B3B95] focus:ring-1 focus:ring-[#0B3B95] outline-none bg-stone-50/50"
                  />
                  {userSearchQuery && (
                    <button
                      onClick={() => setUserSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-600">
                  <span className="font-semibold">Total Registered Clients:</span>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg font-bold">
                    {users.length} Clients
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
              {users.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 shadow-sm max-w-xl mx-auto my-6">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#C59B27] flex items-center justify-center mx-auto mb-4 border border-[#C59B27]/30 shadow-xs">
                    <Users className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl font-bold text-[#07255E] mb-2">
                    No Registered Clients Yet
                  </h4>
                  <p className="text-xs text-stone-600 font-light leading-relaxed max-w-md mx-auto mb-6">
                    Customer contact details and appointment history will be automatically stored here and in your Firebase <code>users</code> collection whenever a customer reserves a service.
                  </p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 bg-[#0B3B95] hover:bg-[#07255E] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#E5C568]" />
                    <span>Log First Client / Walk-in</span>
                  </button>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300 p-6">
                  <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                  <h4 className="font-serif-luxury text-lg font-bold text-stone-700">
                    No Clients Found
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                    No client match found for "{userSearchQuery}".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((client) => {
                    const branchName = client.preferredLocation === 'kurali' ? 'Kurali Flagship' : 'Kharar Modern Valley';
                    return (
                      <div
                        key={client.id}
                        className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative"
                      >
                        <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
                          <div>
                            <h4 className="font-serif-luxury text-base font-bold text-[#07255E]">
                              {client.fullName}
                            </h4>
                            <div className="text-[11px] text-stone-400 mt-0.5">
                              ID: {client.id}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
                            {client.totalBookings} Booking{client.totalBookings > 1 ? 's' : ''}
                          </span>
                        </div>

                        <div className="space-y-2 my-3 text-xs text-stone-600">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#0B3B95]" />
                            <span className="font-semibold text-stone-800">{client.phone}</span>
                            <a
                              href={`tel:${client.phone}`}
                              className="text-[10px] text-[#0B3B95] underline hover:text-[#07255E] ml-auto"
                            >
                              Call
                            </a>
                          </div>

                          {client.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-stone-400" />
                              <span className="truncate">{client.email}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#0B3B95]" />
                            <span>Preferred: {branchName}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                            <span>Last Ritual: {client.lastService}</span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-stone-400">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            <span>Last Visit: {client.lastBookingDate}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                          <a
                            href={bookingService.getClientWhatsAppUrl(client)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            onClick={() => handleDeleteUser(client.id, client.fullName)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove Client Profile"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- VIEW C: AUTOMATED DISPATCHES TAB ---------------- */}
        {activeTab === 'dispatches' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#FAF8F5]">
            {/* Header & Architecture Card */}
            <div className="p-4 sm:p-6 bg-white border-b border-stone-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <MessageCircle className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="font-serif-luxury text-lg font-bold text-[#07255E]">
                        Simultaneous Automated Notification Hub
                      </h4>
                      <p className="text-xs text-stone-500">
                        When any appointment is booked, messages are automatically sent to both the salon's Email and WhatsApp simultaneously.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleTriggerTestDispatch}
                    disabled={testingDispatch}
                    className="min-h-[42px] px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-60 text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingDispatch ? 'animate-spin' : ''}`} />
                    <span>{testingDispatch ? 'Transmitting...' : 'Send Test Dispatch'}</span>
                  </button>
                </div>
              </div>

              {/* Status & Feedback banner */}
              {testFeedback && (
                <div className="mt-3.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{testFeedback}</span>
                </div>
              )}

              {/* Verified Salon Destinations Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>1. Salon WhatsApp Destination</span>
                  </div>
                  <div className="font-bold text-emerald-950 text-sm">{SALON_CONTACT_CONFIG.phoneDisplay}</div>
                  <div className="text-[11px] text-emerald-700/80 mt-0.5">Pre-formatted voucher dispatched instantly</div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0B3B95]" />
                    <span>2. Salon Email Destination</span>
                  </div>
                  <div className="font-bold text-blue-950 text-sm truncate">{SALON_CONTACT_CONFIG.managerEmail}</div>
                  <div className="text-[11px] text-blue-700/80 mt-0.5">HTML booking notification with guest profile</div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-amber-600" />
                    <span>3. Cloud Storage Database</span>
                  </div>
                  <div className="font-bold text-amber-950 text-sm">the-aurum-luxury-salon</div>
                  <div className="text-[11px] text-amber-700/80 mt-0.5">Firebase collections: bookings, users &amp; notifications</div>
                </div>
              </div>
            </div>

            {/* Notifications Feed */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
              {notifications.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 shadow-sm max-w-xl mx-auto my-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-xs">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl font-bold text-[#07255E] mb-2">
                    Automated Notifications Stream
                  </h4>
                  <p className="text-xs text-stone-600 font-light leading-relaxed max-w-md mx-auto mb-6">
                    Every appointment booking triggers simultaneous automated dispatch to both <strong>{SALON_CONTACT_CONFIG.managerEmail}</strong> and WhatsApp <strong>{SALON_CONTACT_CONFIG.phoneDisplay}</strong>. As soon as guests submit requests, their dispatch log will appear here.
                  </p>
                  <button
                    onClick={handleTriggerTestDispatch}
                    disabled={testingDispatch}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${testingDispatch ? 'animate-spin' : ''}`} />
                    <span>Send Verification Test Dispatch</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Recent Automated Simultaneous Dispatches ({notifications.length})
                  </div>
                  {notifications.map((notif: any) => {
                    const branchName = notif.location === 'kurali' ? 'Kurali Flagship' : 'Kharar Modern Valley';
                    const cleanPhone = String(notif.clientPhone || '').replace(/[^0-9]/g, '');
                    const customerWhatsAppUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${notif.clientName}, thank you for choosing The Aurum Luxury Salon! Regarding booking ${notif.bookingId}:`)}`;

                    return (
                      <div
                        key={notif.id}
                        className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="px-2.5 py-1 rounded-lg bg-[#07255E] text-white text-xs font-mono font-bold tracking-wider">
                              {notif.bookingId}
                            </span>
                            <span className="font-serif-luxury text-base font-bold text-[#07255E]">
                              {notif.clientName}
                            </span>
                            <span className="text-xs text-stone-400">·</span>
                            <span className="text-xs font-semibold text-stone-700">
                              {notif.service}
                            </span>
                          </div>

                          <div className="text-[11px] text-stone-400 font-mono">
                            {new Date(notif.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                          </div>
                        </div>

                        {/* Dual Dispatch Status Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
                          {/* Email Status */}
                          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-[#0B3B95] shrink-0" />
                              <div>
                                <div className="font-bold text-[#07255E]">Salon Email Dispatched</div>
                                <div className="text-[11px] text-stone-600 truncate">{notif.emailDispatch?.recipient || SALON_CONTACT_CONFIG.managerEmail}</div>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                              {notif.emailDispatch?.status || 'DELIVERED'}
                            </span>
                          </div>

                          {/* WhatsApp Status */}
                          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-xs flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                              <div>
                                <div className="font-bold text-emerald-950">Salon WhatsApp Dispatched</div>
                                <div className="text-[11px] text-stone-600">{notif.whatsappDispatch?.recipient || SALON_CONTACT_CONFIG.phoneDisplay}</div>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                              {notif.whatsappDispatch?.status || 'DISPATCHED'}
                            </span>
                          </div>
                        </div>

                        {/* Details & Actions */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                          <div className="flex items-center gap-3 flex-wrap text-[11px]">
                            <span><strong>Phone:</strong> {notif.clientPhone}</span>
                            <span>•</span>
                            <span><strong>Branch:</strong> {branchName}</span>
                            <span>•</span>
                            <span><strong>Date &amp; Time:</strong> {notif.date} at {notif.time}</span>
                          </div>

                          <div className="flex items-center gap-2 ml-auto">
                            <a
                              href={customerWhatsAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp Guest</span>
                            </a>
                            <a
                              href={`tel:${notif.clientPhone}`}
                              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer with quick instructions */}
        <div className="px-5 sm:px-8 py-3 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2 shrink-0">
          <div>
            Salon Desk Email: <strong className="text-stone-800">{SALON_CONTACT_CONFIG.managerEmail}</strong> · WhatsApp Desk: <strong className="text-stone-800">{SALON_CONTACT_CONFIG.phoneDisplay}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Desk</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-800 text-white font-semibold rounded-lg text-xs hover:bg-stone-900 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>

      {/* SUB-MODAL: Log Walk-in or Phone Booking */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 bg-stone-900/60 flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
              <h4 className="font-serif-luxury text-lg font-bold text-[#07255E]">
                Log Walk-In / Phone Booking
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWalkIn} className="space-y-3 text-xs">
              {walkInError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {walkInError}
                </div>
              )}
              <div>
                <label className="block font-bold text-stone-700 mb-1">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaspreet Singh"
                  value={newBooking.fullName}
                  onChange={(e) => setNewBooking({ ...newBooking, fullName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={newBooking.email}
                    onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Branch Location</label>
                  <select
                    value={newBooking.location}
                    onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value as SalonLocationId })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="kharar">Kharar (Modern Valley)</option>
                    <option value="kurali">Kurali (Flagship)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Service Ritual</label>
                  <select
                    value={newBooking.service}
                    onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Hair">Hair Design &amp; Care</option>
                    <option value="Nails">Nail Artistry</option>
                    <option value="Makeup">Makeup &amp; Artistry</option>
                    <option value="Skin">Skin Therapies &amp; Glow</option>
                    <option value="Lashes">Lash Enhancements</option>
                    <option value="Men's Grooming">Men's Luxury Grooming</option>
                    <option value="Bridal Package">Bridal Package</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newBooking.time}
                    onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Notes / Requests</label>
                <textarea
                  rows={2}
                  placeholder="Stylist preference, walk-in notes..."
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B3B95] text-white rounded-xl font-bold uppercase tracking-wider hover:bg-[#07255E]"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal (In-App Safe Dialog for iFrames) */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-70 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#07255E] mb-2">
              Clear All Bookings?
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              Are you sure you want to remove all current booking requests? The register will become completely empty immediately.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClearAll}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer transition-colors"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
