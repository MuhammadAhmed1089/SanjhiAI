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
import complaintRoutes from './routes/complaintRoutes.js';
import { initQueue } from './utilities/complaintAgent/queue.js';
import { startSweeper } from './utilities/complaintAgent/sweeper.js';
import { processComplaint } from './utilities/complaintAgent/index.js';

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

// Complaint Routes (user-facing)
app.use('/api/complaints', complaintRoutes);


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

/**
 * Ensures the notification_channel enum includes 'in_app' (used by all
 * dashboard bell notifications). Idempotent — runs on every startup.
 * Note: ALTER TYPE ... ADD VALUE cannot run inside a transaction block,
 * so we check pg_enum first and run it as a standalone statement.
 */
async function ensureInAppNotificationChannel() {
  try {
    const check = await query(
      `SELECT 1 FROM pg_enum
       WHERE enumlabel = 'in_app'
         AND enumtypid = 'notification_channel'::regtype`
    );
    if (check.rows.length === 0) {
      await query(`ALTER TYPE notification_channel ADD VALUE 'in_app'`);
      console.log("✅ [Schema] Added 'in_app' to notification_channel enum.");
    }
  } catch (err) {
    console.warn('⚠️ [Schema] notification_channel enum check failed:', err.message);
  }
}

/**
 * Ensures the complaints table has the ai_case_file JSONB column
 * for storing AI investigation case files. Idempotent — runs on every startup.
 */
async function ensureAiCaseFileColumn() {
  try {
    const check = await query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_name = 'complaints' AND column_name = 'ai_case_file'`
    );
    if (check.rows.length === 0) {
      await query(`ALTER TABLE complaints ADD COLUMN ai_case_file JSONB`);
      console.log('✅ [Schema] Added ai_case_file JSONB column to complaints table.');
    }
  } catch (err) {
    console.warn('⚠️ [Schema] ai_case_file column check failed:', err.message);
  }
}

/**
 * Ensures the complaint_status enum includes 'ai_resolved' and 'needs_human_review'
 * used by the AI Case-Builder Agent routing logic. Idempotent — runs on every startup.
 */
async function ensureComplaintStatusEnum() {
  const newValues = ['ai_resolved', 'needs_human_review'];
  for (const val of newValues) {
    try {
      const check = await query(
        `SELECT 1 FROM pg_enum WHERE enumlabel = $1 AND enumtypid = 'complaint_status'::regtype`,
        [val]
      );
      if (check.rows.length === 0) {
        await query(`ALTER TYPE complaint_status ADD VALUE '${val}'`);
        console.log(`\u2705 [Schema] Added '${val}' to complaint_status enum.`);
      }
    } catch (err) {
      console.warn(`\u26a0\ufe0f [Schema] complaint_status enum check for '${val}' failed:`, err.message);
    }
  }
}

/**
 * Ensures admin_action_logs table supports AI agent operations:
 * - Makes admin_id nullable (SYSTEM actions have no admin)
 * - Adds required action_type enum values
 */
async function ensureAdminActionLogsCompat() {
  try {
    // Rename 'details' column to 'notes' if old schema exists
    const hasDetails = await query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'admin_action_logs' AND column_name = 'details'`
    );
    const hasNotes = await query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'admin_action_logs' AND column_name = 'notes'`
    );
    if (hasDetails.rows.length > 0 && hasNotes.rows.length === 0) {
      await query(`ALTER TABLE admin_action_logs RENAME COLUMN details TO notes`);
      console.log('\u2705 [Schema] Renamed details -> notes in admin_action_logs.');
    }

    // Make admin_id nullable
    const colInfo = await query(
      `SELECT is_nullable FROM information_schema.columns WHERE table_name = 'admin_action_logs' AND column_name = 'admin_id'`
    );
    if (colInfo.rows[0]?.is_nullable === 'NO') {
      await query(`ALTER TABLE admin_action_logs ALTER COLUMN admin_id DROP NOT NULL`);
      console.log('\u2705 [Schema] Made admin_id nullable in admin_action_logs.');
    }
  } catch (err) {
    console.warn('\u26a0\ufe0f [Schema] admin_action_logs compat check failed:', err.message);
  }

  // Add enum values
  const newActionTypes = ['AI_COMPLAINT_INVESTIGATION', 'AI_COMPLAINT_INVESTIGATION_FAILED', 'REINVESTIGATE_COMPLAINT'];
  for (const val of newActionTypes) {
    try {
      const check = await query(
        `SELECT 1 FROM pg_enum WHERE enumlabel = $1 AND enumtypid = 'admin_action_type'::regtype`,
        [val]
      );
      if (check.rows.length === 0) {
        await query(`ALTER TYPE admin_action_type ADD VALUE '${val}'`);
        console.log(`\u2705 [Schema] Added '${val}' to admin_action_type enum.`);
      }
    } catch (err) {
      console.warn(`\u26a0\ufe0f [Schema] admin_action_type enum check for '${val}' failed:`, err.message);
    }
  }
}

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await testConnection(); // logs DB connection status to terminal on startup
  await ensureInAppNotificationChannel(); // ensures 'in_app' notification channel exists
  await ensureAiCaseFileColumn(); // ensures ai_case_file column exists
  await ensureComplaintStatusEnum(); // ensures 'ai_resolved' + 'needs_human_review' in enum
  await ensureAdminActionLogsCompat(); // ensures admin_action_logs supports AI agent actions
  await initDefaultAdmin(); // ensures default super admin account exists
  initQueue(processComplaint); // initialize complaint agent queue
  startSweeper(); // start periodic stuck-complaint sweeper
  initWhatsAppGateway();  // Initializes WhatsApp Web Socket Gateway
});
