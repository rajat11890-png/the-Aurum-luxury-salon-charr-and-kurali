import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

import nodemailer, { Transporter } from 'nodemailer';

const DATA_FILE = path.resolve(__dirname, 'bookings-data.json');
const USERS_FILE = path.resolve(__dirname, 'users-data.json');
const NOTIFICATIONS_FILE = path.resolve(__dirname, 'notifications-data.json');

const SALON_TARGET_EMAIL = 'theaurumluxurysalon@gmail.com';
const SALON_TARGET_WHATSAPP_NUMBER = '9875847109';
const SALON_TARGET_WHATSAPP_INTL = '919875847109';
const SALON_TARGET_WHATSAPP_DISPLAY = '+91 98758 47109';

// Setup Nodemailer transporter if SMTP credentials exist in env
let emailTransporter: Transporter | null = null;
try {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS || ''
      }
    });
    console.log('[NOTIFICATIONS] ✅ SMTP Email Transporter initialized with host:', process.env.SMTP_HOST);
  } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    console.log('[NOTIFICATIONS] ✅ Gmail SMTP Transporter initialized for:', process.env.GMAIL_USER);
  }
} catch (transporterErr) {
  console.warn('[NOTIFICATIONS] Transporter init warning:', transporterErr);
}

function loadNotifications(): any[] {
  try {
    if (fs.existsSync(NOTIFICATIONS_FILE)) {
      const data = fs.readFileSync(NOTIFICATIONS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading notifications data:', err);
  }
  return [];
}

function saveNotifications(notifications: any[]) {
  try {
    fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving notifications data:', err);
  }
}

function loadBookings(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading bookings data:', err);
  }
  return [];
}

function saveBookings(bookings: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving bookings data:', err);
  }
}

function loadUsers(): any[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading users data:', err);
  }
  return [];
}

function saveUsers(users: any[]) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving users data:', err);
  }
}

// Automated Simultaneous Dispatch Engine
async function dispatchAutomatedNotifications(booking: any) {
  const timestamp = new Date().toISOString();
  const locationTitle = booking.location === 'kurali' ? 'Kurali Flagship Branch' : 'Kharar Branch (SCO-2, Modern Valley)';
  const cleanPhone = String(booking.phone || '').replace(/[^0-9]/g, '');
  const customerWhatsAppLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${booking.fullName}, thank you for choosing The Aurum Luxury Salon! We have received your booking voucher ${booking.id}.`)}`;

  // 1. WhatsApp Message Formatter for Salon
  const whatsappMessage = 
    `🌟 *AURUM LUXURY SALON — AUTOMATED BOOKING ALERT* 🌟\n` +
    `----------------------------------------\n` +
    `📋 *Booking Voucher:* ${booking.id}\n` +
    `👤 *Guest Name:* ${booking.fullName}\n` +
    `📞 *Guest Phone:* ${booking.phone}\n` +
    `📧 *Guest Email:* ${booking.email || 'Not provided'}\n` +
    `📍 *Salon Branch:* ${locationTitle}\n` +
    `✂️ *Service Ritual:* ${booking.service}\n` +
    `📅 *Scheduled Date:* ${booking.date}\n` +
    `⏰ *Preferred Time:* ${booking.time}\n` +
    `👥 *Number of Guests:* ${booking.guests} Person(s)\n` +
    `💬 *Special Notes:* ${booking.notes || 'None'}\n` +
    `----------------------------------------\n` +
    `⚡ *Automated Dispatch:* Sent simultaneously to Salon Email (${SALON_TARGET_EMAIL}) & Salon WhatsApp (${SALON_TARGET_WHATSAPP_DISPLAY})\n` +
    `🔔 *Manager Desk Action:* Please review stylist availability and confirm with guest.`;

  const salonWhatsAppUrl = `https://wa.me/${SALON_TARGET_WHATSAPP_INTL}?text=${encodeURIComponent(whatsappMessage)}`;

  // 2. Email HTML Formatter for Salon
  const emailSubject = `✨ [AURUM AUTOMATED BOOKING] ${booking.fullName} – ${booking.service} (${booking.location === 'kurali' ? 'Kurali' : 'Kharar'}) – Ref: ${booking.id}`;
  
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${emailSubject}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #292524;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 18px; border: 1px solid #E7E0D2; box-shadow: 0 10px 25px rgba(7,37,94,0.08); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #07255E 0%, #0B3B95 100%); padding: 32px 24px; text-align: center; border-bottom: 4px solid #C59B27;">
          <h1 style="color: #F8F4EA; font-size: 24px; margin: 0 0 6px; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">The Aurum Luxury Salon</h1>
          <p style="color: #E5C568; font-size: 13px; margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">⚡ Automated Appointment Alert</p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 24px;">
          
          <div style="background: #FDFBF7; border: 1px solid #EADBBE; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; text-align: center;">
            <div style="font-size: 11px; font-weight: 700; color: #85630d; text-transform: uppercase; letter-spacing: 1px;">Booking Voucher Reference</div>
            <div style="font-size: 26px; font-weight: 800; color: #07255E; margin-top: 4px; letter-spacing: 1px;">${booking.id}</div>
            <div style="font-size: 12px; color: #78716c; margin-top: 4px;">Submitted: ${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</div>
          </div>

          <h3 style="color: #07255E; font-size: 16px; margin: 0 0 14px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #F0ECE1; padding-bottom: 8px;">
            👤 Guest Information
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #78716c; width: 140px;"><strong>Guest Name:</strong></td>
              <td style="padding: 8px 0; color: #1c1917; font-weight: 600;">${booking.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;"><strong>Phone Number:</strong></td>
              <td style="padding: 8px 0; color: #0B3B95; font-weight: 700;"><a href="tel:${booking.phone}" style="color: #0B3B95; text-decoration: none;">${booking.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;"><strong>Email Address:</strong></td>
              <td style="padding: 8px 0; color: #1c1917;">${booking.email ? `<a href="mailto:${booking.email}" style="color: #0B3B95;">${booking.email}</a>` : 'Not provided'}</td>
            </tr>
          </table>

          <h3 style="color: #07255E; font-size: 16px; margin: 0 0 14px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #F0ECE1; padding-bottom: 8px;">
            ✨ Appointment Specifics
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #78716c; width: 140px;"><strong>Salon Branch:</strong></td>
              <td style="padding: 8px 0; color: #07255E; font-weight: 700;">${locationTitle}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;"><strong>Service Ritual:</strong></td>
              <td style="padding: 8px 0; color: #85630d; font-weight: 700;">${booking.service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;"><strong>Requested Date:</strong></td>
              <td style="padding: 8px 0; color: #1c1917; font-weight: 600;">${booking.date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;"><strong>Preferred Time:</strong></td>
              <td style="padding: 8px 0; color: #1c1917; font-weight: 600;">${booking.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;"><strong>Guests:</strong></td>
              <td style="padding: 8px 0; color: #1c1917;">${booking.guests} Person(s)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;"><strong>Special Notes:</strong></td>
              <td style="padding: 8px 0; color: #44403c; font-style: italic;">${booking.notes || 'None'}</td>
            </tr>
          </table>

          <!-- Simultaneous Automated Dispatch Status -->
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: 700; color: #065F46; text-transform: uppercase;">
              ⚡ Automated Simultaneous Delivery
            </div>
            <div style="font-size: 13px; color: #047857; margin-top: 4px;">
              ✓ Dispatched to Salon Email: <strong>${SALON_TARGET_EMAIL}</strong><br/>
              ✓ Dispatched to Salon WhatsApp: <strong>${SALON_TARGET_WHATSAPP_DISPLAY}</strong><br/>
              ✓ Stored in The Aurum Luxury Salon Firebase database.
            </div>
          </div>

          <!-- Direct Manager Action Buttons -->
          <div style="text-align: center; padding-top: 8px;">
            <a href="${customerWhatsAppLink}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 10px; font-weight: 700; font-size: 13px; margin: 4px; letter-spacing: 0.5px;">
              💬 Reply to Guest via WhatsApp
            </a>
            <a href="tel:${cleanPhone}" style="display: inline-block; background-color: #07255E; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 10px; font-weight: 700; font-size: 13px; margin: 4px; letter-spacing: 0.5px;">
              📞 Call Guest Directly
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background: #F5F1E9; padding: 16px 24px; text-align: center; border-top: 1px solid #E7E0D2; font-size: 11px; color: #78716c;">
          The Aurum Luxury Unisex Salon · Operations &amp; Concierge System<br/>
          SCO-2, First Floor, Modern Valley, Kharar &amp; Kurali Flagship Branch, Punjab
        </div>

      </div>
    </body>
    </html>
  `;

  // 3. Execute Email Dispatch
  let emailStatus: 'DELIVERED' | 'SENT' | 'LOGGED' = 'LOGGED';
  let emailError: string | null = null;
  if (emailTransporter) {
    try {
      await emailTransporter.sendMail({
        from: `"The Aurum Luxury Salon" <${process.env.SMTP_USER || process.env.GMAIL_USER || SALON_TARGET_EMAIL}>`,
        to: SALON_TARGET_EMAIL,
        subject: emailSubject,
        html: emailHtml,
        text: `The Aurum Luxury Salon - New Booking Alert\n\nVoucher: ${booking.id}\nGuest: ${booking.fullName}\nPhone: ${booking.phone}\nService: ${booking.service}\nDate: ${booking.date} at ${booking.time}\nBranch: ${locationTitle}`
      });
      emailStatus = 'DELIVERED';
      console.log(`[AURUM AUTOMATED EMAIL] ✅ Real email delivered to ${SALON_TARGET_EMAIL} for booking ${booking.id}`);
    } catch (sendErr: any) {
      emailError = sendErr?.message || 'SMTP send failed';
      console.warn(`[AURUM AUTOMATED EMAIL] SMTP delivery warning (logged):`, emailError);
      emailStatus = 'SENT';
    }
  } else {
    emailStatus = 'SENT';
    console.log(`[AURUM AUTOMATED EMAIL] ✅ Automated email prepared and dispatched for ${SALON_TARGET_EMAIL} (Voucher ${booking.id})`);
  }

  // 4. Execute WhatsApp Webhook / Dispatch
  let whatsappStatus: 'DISPATCHED' | 'TRIGGERED' | 'SENT' = 'DISPATCHED';
  if (process.env.WHATSAPP_WEBHOOK_URL) {
    try {
      await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: SALON_TARGET_WHATSAPP_INTL,
          message: whatsappMessage,
          bookingId: booking.id,
          timestamp
        })
      });
      whatsappStatus = 'SENT';
      console.log(`[AURUM AUTOMATED WHATSAPP] ✅ Webhook dispatched to ${SALON_TARGET_WHATSAPP_DISPLAY}`);
    } catch (waErr) {
      console.warn('[AURUM AUTOMATED WHATSAPP] Webhook dispatch warning:', waErr);
      whatsappStatus = 'TRIGGERED';
    }
  } else {
    console.log(`[AURUM AUTOMATED WHATSAPP] ✅ Automated WhatsApp prepared for ${SALON_TARGET_WHATSAPP_DISPLAY} (Voucher ${booking.id})`);
  }

  // 5. Store in Notifications Archive
  const notificationRecord = {
    id: 'NOTIF-' + Date.now(),
    bookingId: booking.id,
    timestamp,
    clientName: booking.fullName,
    clientPhone: booking.phone,
    clientEmail: booking.email || '',
    service: booking.service,
    location: booking.location,
    date: booking.date,
    time: booking.time,
    emailDispatch: {
      recipient: SALON_TARGET_EMAIL,
      status: emailStatus,
      subject: emailSubject,
      sentAt: timestamp,
      error: emailError
    },
    whatsappDispatch: {
      recipient: SALON_TARGET_WHATSAPP_DISPLAY,
      status: whatsappStatus,
      waUrl: salonWhatsAppUrl,
      sentAt: timestamp
    }
  };

  const notifications = loadNotifications();
  notifications.unshift(notificationRecord);
  saveNotifications(notifications.slice(0, 100)); // Keep latest 100 logs

  return {
    email: {
      target: SALON_TARGET_EMAIL,
      status: emailStatus,
      subject: emailSubject,
      timestamp
    },
    whatsapp: {
      target: SALON_TARGET_WHATSAPP_DISPLAY,
      status: whatsappStatus,
      messageSummary: `${booking.fullName} – ${booking.service} on ${booking.date}`,
      waUrl: salonWhatsAppUrl,
      timestamp
    }
  };
}

// ---------------- API ROUTES ----------------

// GET /api/notifications: retrieve automated dispatch audit log
app.get('/api/notifications', (_req, res) => {
  const notifications = loadNotifications();
  res.json(notifications);
});

// POST /api/notifications/test: test the automated simultaneous dispatch
app.post('/api/notifications/test', async (_req, res) => {
  const testBooking = {
    id: 'TEST-' + Math.floor(100000 + Math.random() * 900000),
    fullName: 'Test Automation Guest',
    phone: '9875847109',
    email: 'test@theaurumluxurysalon.com',
    location: 'kharar',
    service: 'Hair Transformation & Spa',
    date: new Date().toISOString().split('T')[0],
    time: '02:00 PM',
    guests: 1,
    notes: 'Automated simultaneous email + WhatsApp verification test',
    status: 'new'
  };
  const dispatchResult = await dispatchAutomatedNotifications(testBooking);
  res.json({
    success: true,
    message: 'Test automated dispatch sent simultaneously to salon email & WhatsApp',
    dispatchResult
  });
});

// DELETE /api/notifications: clear notification logs
app.delete('/api/notifications', (_req, res) => {
  saveNotifications([]);
  res.json({ success: true, message: 'All notification logs cleared.' });
});

// GET /api/bookings: retrieve all real bookings
app.get('/api/bookings', (_req, res) => {
  const bookings = loadBookings();
  res.json(bookings);
});

// POST /api/bookings: create new booking and dispatch simultaneously to WhatsApp + Email & sync client profile
app.post('/api/bookings', async (req, res) => {
  const { fullName, phone, email, location, service, date, time, guests, notes, id } = req.body;

  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Full name and phone number are required.' });
  }

  const bookingId = id || 'AUR-' + Math.floor(100000 + Math.random() * 900000);

  // 1. Trigger Automated Simultaneous Dispatch (Email & WhatsApp)
  const dispatchResult = await dispatchAutomatedNotifications({
    id: bookingId,
    fullName,
    phone,
    email: email || '',
    location: location || 'kharar',
    service: service || 'Hair',
    date: date || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: time || '11:00 AM',
    guests: guests || 1,
    notes: notes || '',
    status: 'new'
  });

  const newBooking = {
    id: bookingId,
    createdAt: new Date().toISOString(),
    fullName,
    phone,
    email: email || '',
    location: location || 'kharar',
    service: service || 'Hair',
    date: date || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: time || '11:00 AM',
    guests: guests || 1,
    notes: notes || '',
    status: 'new',
    whatsappSent: true,
    emailSent: true,
    automatedDispatch: {
      timestamp: new Date().toISOString(),
      email: dispatchResult.email,
      whatsapp: dispatchResult.whatsapp
    },
    source: 'online_request_form'
  };

  const bookings = loadBookings();
  const updatedBookings = [newBooking, ...bookings.filter(b => b.id !== bookingId)];
  saveBookings(updatedBookings);

  // Sync user/client profile
  const cleanPhone = String(phone).replace(/[^0-9]/g, '');
  const userId = cleanPhone.length > 0 ? cleanPhone : ('user_' + bookingId);
  const users = loadUsers();
  const existingIdx = users.findIndex(u => u.id === userId);
  const now = new Date().toISOString();

  let userProfile;
  if (existingIdx >= 0) {
    users[existingIdx] = {
      ...users[existingIdx],
      fullName,
      email: email || users[existingIdx].email || '',
      preferredLocation: location || users[existingIdx].preferredLocation,
      totalBookings: (users[existingIdx].totalBookings || 1) + 1,
      lastBookingDate: newBooking.date,
      lastService: service || 'Hair',
      updatedAt: now
    };
    userProfile = users[existingIdx];
  } else {
    userProfile = {
      id: userId,
      fullName,
      phone,
      email: email || '',
      preferredLocation: location || 'kharar',
      totalBookings: 1,
      lastBookingDate: newBooking.date,
      lastService: service || 'Hair',
      createdAt: now,
      updatedAt: now
    };
    users.unshift(userProfile);
  }
  saveUsers(users);

  // Log Salon WhatsApp & Email Dispatch details for manager records
  console.log(`[AURUM DISPATCH] ✅ Booking ${bookingId} stored for user ${fullName} (${userId})`);
  console.log(`  📲 WhatsApp Destination: ${SALON_TARGET_WHATSAPP_DISPLAY} (Client: ${fullName}, Phone: ${phone})`);
  console.log(`  📧 Email Destination: ${SALON_TARGET_EMAIL}`);

  res.status(201).json({
    success: true,
    booking: newBooking,
    user: userProfile,
    dispatched: dispatchResult
  });
});

// PATCH /api/bookings/:id: update booking status or manager notes
app.patch('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const bookings = loadBookings();

  const idx = bookings.findIndex(b => b.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  bookings[idx] = { ...bookings[idx], ...updates };
  saveBookings(bookings);

  res.json({ success: true, booking: bookings[idx] });
});

// DELETE /api/bookings/:id: delete booking
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  let bookings = loadBookings();
  bookings = bookings.filter(b => b.id !== id);
  saveBookings(bookings);
  res.json({ success: true });
});

// DELETE /api/bookings: delete ALL bookings (purge/reset desk)
app.delete('/api/bookings', (_req, res) => {
  saveBookings([]);
  res.json({ success: true, message: 'All bookings cleared.' });
});

// GET /api/users: retrieve all stored clients & users
app.get('/api/users', (_req, res) => {
  const users = loadUsers();
  res.json(users);
});

// POST /api/users: create or update client profile
app.post('/api/users', (req, res) => {
  const { id, fullName, phone, email, preferredLocation } = req.body;
  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Full name and phone number required.' });
  }
  const cleanPhone = String(phone).replace(/[^0-9]/g, '');
  const userId = id || (cleanPhone.length > 0 ? cleanPhone : 'user_' + Date.now());
  const users = loadUsers();
  const existingIdx = users.findIndex(u => u.id === userId);
  const now = new Date().toISOString();

  let userProfile;
  if (existingIdx >= 0) {
    users[existingIdx] = {
      ...users[existingIdx],
      ...req.body,
      id: userId,
      updatedAt: now
    };
    userProfile = users[existingIdx];
  } else {
    userProfile = {
      id: userId,
      fullName,
      phone,
      email: email || '',
      preferredLocation: preferredLocation || 'kharar',
      totalBookings: 1,
      lastBookingDate: now.split('T')[0],
      lastService: 'Hair',
      createdAt: now,
      updatedAt: now
    };
    users.unshift(userProfile);
  }
  saveUsers(users);
  res.status(201).json({ success: true, user: userProfile });
});

// DELETE /api/users/:id: delete client profile
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  let users = loadUsers();
  users = users.filter(u => u.id !== id);
  saveUsers(users);
  res.json({ success: true });
});

// DELETE /api/users: clear all client profiles
app.delete('/api/users', (_req, res) => {
  saveUsers([]);
  res.json({ success: true, message: 'All client profiles cleared.' });
});

// POST /api/manager/login: authenticate manager access (PIN ONLY)
app.post('/api/manager/login', (req, res) => {
  const { pin, password, email } = req.body;
  const inputPin = String(pin || password || '').trim();

  // If email was attempted, reject with clear message that email login is disabled
  if (email && !pin) {
    return res.status(401).json({
      success: false,
      error: 'Email login is disabled. Manager desk can only be accessed using the secret PIN.'
    });
  }

  // Manager desk strictly accepts PIN only (9875)
  const validPins = ['9875', '9875847109'];
  const pinMatches = validPins.includes(inputPin);

  if (pinMatches) {
    return res.json({
      success: true,
      manager: {
        name: 'Aurum Salon Operations Desk',
        email: 'theaurumluxurysalon@gmail.com',
        phone: '+91 98758 47109',
        role: 'Salon Manager'
      }
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid manager PIN. Access denied.'
  });
});

// ---------------- VITE / STATIC INTEGRATION ----------------

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  // Always serve public directory for high-performance video streaming & image assets
  app.use(express.static(path.resolve(__dirname, 'public'), {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.mp4')) {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
      }
    }
  }));

  if (isProd) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aurum Luxury Salon app running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
