// server.js
// Basic Express server connected to PostgreSQL via db.js

import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';
import { initWhatsAppGateway } from './utilities/whatsappGateway.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import committeeRoutes from './routes/committeeRoutes.js';

dotenv.config();

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