import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './config/db.js';
import { initWhatsAppGateway } from './utilities/whatsappGateway.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import committeeRoutes from './routes/committeeRoutes.js';

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


// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await testConnection(); // logs DB connection status to terminal on startup
  initWhatsAppGateway();  // Initializes WhatsApp Web Socket Gateway
});
