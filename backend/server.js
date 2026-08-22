// server.js
// Basic Express server connected to PostgreSQL via db.js

import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await testConnection(); // logs DB connection status to terminal on startup
});