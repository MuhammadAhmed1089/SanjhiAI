import 'dotenv/config';
import { query } from '../backend/config/db.js';
import { ensureAssistantTables, seedDefaultKbDocs } from '../backend/assistant/schema.js';

// Bootstrap schema + seed KB (same as server startup does)
await ensureAssistantTables();
await seedDefaultKbDocs();

const tables = await query(
  `SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'assistant%' ORDER BY 1`
);
console.log('TABLES:', tables.rows.map((r) => r.table_name).join(', ') || '(none)');

const count = await query(`SELECT count(*)::int AS docs FROM assistant_kb_docs`);
console.log('KB DOCS SEEDED:', count.rows[0].docs);

const top = await query(
  `SELECT title, category, priority FROM assistant_kb_docs ORDER BY priority DESC, updated_at LIMIT 6`
);
console.table(top.rows);

const fts = await query(
  `SELECT title, ts_rank(search_vector, plainto_tsquery('english', 'how do i increase my trust score')) AS rank
   FROM assistant_kb_docs
   WHERE search_vector @@ plainto_tsquery('english', 'how do i increase my trust score')
   ORDER BY rank DESC LIMIT 3`
);
console.log('FTS TEST "how do i increase my trust score":');
console.table(fts.rows);

const roman = await query(
  `SELECT d.title
   FROM assistant_kb_docs d
   WHERE d.is_active = TRUE
     AND EXISTS (SELECT 1 FROM unnest(d.keywords) kw WHERE length(kw) > 1 AND position(lower(kw) IN lower('bharosa score kaise barhe')) > 0)
   LIMIT 3`
);
console.log('ROMAN URDU KEYWORD TEST "bharosa score kaise barhe":');
console.table(roman.rows);

process.exit(0);
