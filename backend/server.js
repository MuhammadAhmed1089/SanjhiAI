import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { testConnection, query } from './config/db.js';
import { initWhatsAppGateway } from './utilities/whatsappGateway.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import committeeRoutes from './routes/committeeRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import initAssistantRoutes from './routes/assistantRoutes.js';
import initNotificationRoutes from './routes/notificationRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Serve uploaded profile photos as static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));


// Auth Routes
app.use('/api/auth', authRoutes);

// Dashboard Routes
app.use('/api/dashboard', dashboardRoutes);

// Committee Routes
app.use('/api/committees', committeeRoutes);

// Payment Routes
app.use('/api/payments', paymentRoutes);

// Assistant Routes
initAssistantRoutes(app);

// Notification Routes
initNotificationRoutes(app);

// Activity Routes
app.use('/api/activities', activityRoutes);

// Admin Routes
app.use('/api/admin', adminRoutes);


/**
 * Initializes the default Super Admin account on server startup.
 * Uses the `admins` table (per DDL schema) — NO is_admin column on users.
 * Also drops is_admin column if it was accidentally added previously.
 */
async function initDefaultAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@sanjhi.pk';
  const adminPhone = process.env.ADMIN_PHONE || '03000000000';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@Sanjhi2026';

  // Step 1: Drop is_admin column from users if it exists (cleanup from previous approach)
  try {
    await query(`ALTER TABLE users DROP COLUMN IF EXISTS is_admin`);
    console.log('✅ [Admin Init] Cleaned up: dropped is_admin column from users (not in schema).');
  } catch (err) {
    // Ignore — may not exist or DB may restrict DDL
  }

  // Step 2: Hash password
  let passwordHash;
  try {
    passwordHash = await bcrypt.hash(adminPassword, 10);
  } catch (hashErr) {
    console.error('❌ [Admin Init] bcrypt hash failed:', hashErr.message);
    return;
  }

  // Step 3: Upsert admin user into `users` table
  let adminUser = null;
  try {
    const upsertRes = await query(
      `INSERT INTO users (full_name, email, phone_number, password_hash, is_suspended)
       VALUES ($1, $2, $3, $4, false)
       ON CONFLICT (email) DO UPDATE
         SET password_hash = EXCLUDED.password_hash,
             full_name = EXCLUDED.full_name
       RETURNING id, email, full_name`,
      ['Sanjhi Super Admin', adminEmail, adminPhone, passwordHash]
    );
    adminUser = upsertRes.rows[0];
    console.log(`✅ [Admin Init] Admin user in users table → id: ${adminUser.id}, email: ${adminUser.email}`);
  } catch (upsertErr) {
    console.error('❌ [Admin Init] users upsert failed:', upsertErr.message);
    return;
  }

  // Step 4: Ensure admin user has an entry in the `admins` table
  try {
    const adminRes = await query(
      `INSERT INTO admins (user_id, granted_by)
       VALUES ($1, NULL)
       ON CONFLICT (user_id) DO NOTHING
       RETURNING id, user_id, granted_at`,
      [adminUser.id]
    );
    if (adminRes.rows.length > 0) {
      console.log(`✅ [Admin Init] Super Admin entry created in admins table → admin_id: ${adminRes.rows[0].id}`);
    } else {
      console.log(`ℹ️ [Admin Init] Super Admin already exists in admins table.`);
    }
  } catch (adminErr) {
    console.error('❌ [Admin Init] admins table insert failed:', adminErr.message);
  }
}

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await testConnection(); // logs DB connection status to terminal on startup
  await initDefaultAdmin(); // ensures default super admin account exists
  initWhatsAppGateway();  // Initializes WhatsApp Web Socket Gateway
});
