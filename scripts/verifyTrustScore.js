/**
 * verifyTrustScore.js — Trust Score engine verification.
 *
 * Part 1: pure-math unit checks on computeScore (no DB).
 * Part 2: live DB — ensure table, backfill events, recompute, inspect.
 *
 * Run: node scripts/verifyTrustScore.js
 */
import 'dotenv/config';
import { computeScore, ensureTrustScoreTables, backfillTrustEvents } from '../backend/utilities/trustScore.js';
import { query, pool } from '../backend/config/db.js';

const now = new Date();
const daysAgo = (n) => new Date(now.getTime() - n * 86_400_000);

let pass = 0;
let fail = 0;
function check(label, actual, expected, tol = 0) {
  const ok = tol === 0 ? actual === expected : Math.abs(actual - expected) <= tol;
  if (ok) { pass++; console.log(`  ✅ ${label}: ${actual}${tol ? ` (expected ~${expected})` : ''}`); }
  else { fail++; console.log(`  ❌ ${label}: got ${actual}, expected ${expected}${tol ? ` ±${tol}` : ''}`); }
}

console.log('── Part 1: Model math (pure function) ──');

// 1. Brand-new user: no events, phone-only verification → exactly 850
{
  const r = computeScore([], { emailVerified: false, cnicVerified: false }, now);
  check('New user score', r.score, 850);
  check('New user reliability rate', r.reliabilityRate, 0.9);
}

// 2. New user, fully verified (email + CNIC) → 885 (= 850 + 35 verification uplift)
{
  const r = computeScore([], { emailVerified: true, cnicVerified: true }, now);
  check('Verified new user score', r.score, 885);
  check('Verification points', r.components.verification.points, 50);
}

// 3. Perfect veteran: 12 recent on-time payments + 2 completions + verified → ~1000
{
  const events = [];
  for (let i = 0; i < 12; i++) {
    events.push({ event_type: 'payment_on_time', value: 1, half_life_days: 90, occurred_at: daysAgo(i * 25) });
  }
  events.push({ event_type: 'committee_completed', value: 1, half_life_days: 180, occurred_at: daysAgo(30) });
  events.push({ event_type: 'committee_completed', value: 1, half_life_days: 180, occurred_at: daysAgo(120) });
  const r = computeScore(events, { emailVerified: true, cnicVerified: true }, now);
  console.log(`  ℹ️  perfect veteran raw score: ${r.score} (asymptotic by design — 1000 needs long tenure)`);
  check('Perfect veteran in top tier (940..1000)', r.score >= 940 && r.score <= 1000, true);
}

// 4. Interval normalization: 5 days late in a monthly committee → value 0.833
{
  const events = [{ event_type: 'payment_late', value: 1 - 5 / 30, half_life_days: 90, occurred_at: daysAgo(2) }];
  const r = computeScore(events, { emailVerified: false, cnicVerified: false }, now);
  // R = (3*0.9 + 0.8333) / (3 + 1) = 3.5333/4 = 0.8833 → 550*0.8833 = 485.83 → 486
  check('Reliability pts (5d late monthly)', r.components.reliability.points, 486, 2);
}

// 5. Decay: a missed payment 180 days ago hurts ~4x less than one 1 day ago
{
  const recentMiss = computeScore(
    [{ event_type: 'payment_missed', value: 0, half_life_days: 90, occurred_at: daysAgo(1) }],
    { emailVerified: false, cnicVerified: false }, now
  );
  const oldMiss = computeScore(
    [{ event_type: 'payment_missed', value: 0, half_life_days: 90, occurred_at: daysAgo(180) }],
    { emailVerified: false, cnicVerified: false }, now
  );
  const recentDmg = 850 - recentMiss.score;
  const oldDmg = 850 - oldMiss.score;
  const ratio = recentDmg / Math.max(1, oldDmg);
  console.log(`  ℹ️  recent miss damage ${recentDmg} vs old miss damage ${oldDmg} (ratio ${ratio.toFixed(2)})`);
  check('Old miss hurts less (ratio > 2)', ratio > 2, true);
}

// 6. Penalty: resolved fraud complaint −120 (recent), capped at −400
{
  const onePenalty = computeScore(
    [{ event_type: 'complaint_penalty', value: -1, half_life_days: 180, occurred_at: daysAgo(3) }],
    { emailVerified: false, cnicVerified: false }, now
  );
  check('One recent penalty', onePenalty.components.penalties.points <= -110, true);

  const fivePenalties = computeScore(
    Array.from({ length: 5 }, (_, i) => ({ event_type: 'complaint_penalty', value: -1, half_life_days: 180, occurred_at: daysAgo(i * 10) })),
    { emailVerified: false, cnicVerified: false }, now
  );
  check('Penalty cap −400', fivePenalties.components.penalties.points, -400);
}

// 7. Bayesian cold-start: ONE missed payment doesn't tank a new user
{
  const r = computeScore(
    [{ event_type: 'payment_missed', value: 0, half_life_days: 90, occurred_at: daysAgo(1) }],
    { emailVerified: false, cnicVerified: false }, now
  );
  check('One miss keeps score above 650', r.score > 650, true);
}

console.log('── Part 2: Live DB integration ──');
try {
  await ensureTrustScoreTables();

  const tbl = await query(`SELECT 1 FROM information_schema.tables WHERE table_name = 'trust_score_events'`);
  check('trust_score_events table exists', tbl.rows.length, 1);

  await backfillTrustEvents();

  const evCounts = await query(
    `SELECT event_type, COUNT(*)::int AS n FROM trust_score_events GROUP BY event_type ORDER BY n DESC`
  );
  console.log('  Event counts:', evCounts.rows.length ? evCounts.rows.map((r) => `${r.event_type}=${r.n}`).join(', ') : '(none yet — empty DB is fine)');

  const scores = await query(`SELECT COUNT(*)::int AS n, MIN(score)::float AS min, MAX(score)::float AS max, AVG(score)::float AS avg FROM trust_scores`);
  const s = scores.rows[0];
  console.log(`  trust_scores rows: ${s.n} | min=${s.min ?? '—'} max=${s.max ?? '—'} avg=${s.avg ? Number(s.avg).toFixed(1) : '—'}`);
  check('Every cached score within 0–1000', (s.min ?? 850) >= 0 && (s.max ?? 850) <= 1000, true);

  // Determinism: recompute the same user twice → identical score
  const anyUser = await query(`SELECT user_id FROM trust_score_events LIMIT 1`);
  if (anyUser.rows.length > 0) {
    const uid = anyUser.rows[0].user_id;
    const { recomputeUser } = await import('../backend/utilities/trustScore.js');
    const a = await recomputeUser(uid);
    const b = await recomputeUser(uid);
    check('Deterministic replay (same score twice)', a.score, b.score);
  } else {
    console.log('  ℹ️  No events yet — skipping replay check (clean DB).');
  }
} catch (err) {
  fail++;
  console.error('  ❌ DB integration failed:', err.message);
}

console.log(`\n── Result: ${pass} passed, ${fail} failed ──`);
await pool.end();
process.exit(fail > 0 ? 1 : 0);
