// db.js
// Flexible PostgreSQL connection: works with a full connection string
// (e.g. Supabase) OR individual local DB params.

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const useConnectionString = !!process.env.DATABASE_URL;

const poolConfig = useConnectionString
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DB_SSL === 'false'
          ? false
          : { rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mydb',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };

const pool = new Pool({
  ...poolConfig,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL error:', err);
  process.exit(-1);
});

// Simple helper for running queries
export const query = (text, params) => pool.query(text, params);

// Runs once at startup to confirm the DB is actually reachable.
// Call this from server.js right after imports.
export const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    console.log(
      `✅ PostgreSQL connected (${useConnectionString ? 'connection string' : 'local params'}) — server time: ${result.rows[0].current_time}`
    );
    return true;
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err.message);
    return false;
  }
};

export { pool };