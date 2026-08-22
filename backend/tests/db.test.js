const { Pool } = require('pg');
const pool = new Pool();

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Database Connection Pool', () => {
  it('should export query function and pool instance', () => {
    const db = require('../db/db');
    expect(db.query).toBeDefined();
    expect(db.pool).toBeDefined();
  });
});
