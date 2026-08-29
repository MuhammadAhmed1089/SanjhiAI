/**
 * investigator.js — Investigator Agent for the Complaint Case-Builder.
 *
 * Uses ReAct pattern: gathers evidence via tools, then produces a structured
 * case file with evidence trail, contradictions, and recommended action.
 */

import { chatCompletionJSON } from '../openrouterLlm.js';
import {
  fetchComplaintDetails,
  fetchPaymentLedger,
  fetchTrustProfiles,
  fetchCommitteeContext,
} from './tools.js';

const INVESTIGATOR_MODEL = 'nvidia/nemotron-3-super-120b-a12b';
const INVESTIGATOR_TEMPERATURE = 0.3;

const SYSTEM_PROMPT = `You are a dispute investigator for Sanjhi AI, a Pakistani ROSCA committee savings platform.
Your role is to investigate complaints by gathering evidence from database records and producing a structured case file.

INVESTIGATION PROCESS:
1. Analyze the complaint description to identify claims (e.g., "I paid on the 3rd", "accused never paid")
2. Cross-reference claims against actual payment timestamps
3. Check trust profiles for patterns (late payments, risk flags)
4. Identify contradictions between claims and evidence
5. Produce a structured case file with evidence trail and recommended action

OUTPUT FORMAT (JSON):
{
  "case_summary": "Brief summary of the complaint and investigation findings",
  "evidence_trail": [
    {
      "type": "payment_record|trust_score|risk_flag|committee_context",
      "timestamp": "ISO timestamp if applicable",
      "description": "What this evidence shows",
      "amount": "number if payment",
      "status": "payment status if applicable",
      "user": "complainant|accused if trust/risk",
      "score": "trust score if applicable",
      "on_time_rate": "on-time rate if applicable",
      "relevance": "Why this evidence matters to the case"
    }
  ],
  "contradictions": [
    "Specific contradiction between claim and evidence"
  ],
  "timeline_analysis": {
    "claimed_by_complainant": "What complainant claims happened",
    "actual_timeline": "What the records show",
    "discrepancy": "Key difference between claim and reality"
  },
  "recommended_priority": "low|medium|high|urgent",
  "recommended_action": "mediate|refund|suspend|dismiss|investigate_further",
  "reasoning": "Detailed reasoning for the recommendation"
}

RULES:
- Base all findings on actual database records, not assumptions
- Flag any contradictions between claims and evidence
- If evidence is incomplete, note what's missing
- Be objective and fair to both parties
- Recommended action should match the severity of findings`;

/**
 * Run the Investigator Agent on a complaint.
 * @param {string} complaintId - UUID of the complaint to investigate
 * @returns {Promise<object>} structured case file
 */
export async function investigate(complaintId) {
  const startTime = Date.now();
  const toolsCalled = [];

  // Step 1: Fetch complaint details
  const complaint = await fetchComplaintDetails(complaintId);
  if (!complaint) {
    throw new Error(`Complaint ${complaintId} not found`);
  }
  toolsCalled.push('fetchComplaintDetails');

  // Step 2: Fetch payment ledger
  const payments = await fetchPaymentLedger(
    complaint.committee_id,
    complaint.filed_by,
    complaint.accused_user_id
  );
  toolsCalled.push('fetchPaymentLedger');

  // Step 3: Fetch trust profiles
  const trustData = await fetchTrustProfiles(
    complaint.filed_by,
    complaint.accused_user_id
  );
  toolsCalled.push('fetchTrustProfiles');

  // Step 4: Fetch committee context
  const committee = await fetchCommitteeContext(complaint.committee_id);
  toolsCalled.push('fetchCommitteeContext');

  // Step 5: Build evidence context for LLM
  const evidenceContext = `
COMPLAINT DETAILS:
- ID: ${complaint.id}
- Complainant: ${complaint.complainant_name} (${complaint.complainant_email})
- Accused: ${complaint.accused_name || 'Unknown'} (${complaint.accused_email || 'N/A'})
- Committee: ${complaint.committee_name}
- Category: ${complaint.category}
- Description: ${complaint.description}
- Filed: ${complaint.created_at}

PAYMENT LEDGER (${payments.length} records):
${payments.map(p => `  - Cycle ${p.cycle_number}: ${p.user_id === complaint.filed_by ? 'Complainant' : 'Accused'} | Status: ${p.status} | Submitted: ${p.submitted_at || 'N/A'} | Confirmed: ${p.confirmed_at || 'N/A'} | Due: ${p.due_date}`).join('\n') || '  No payments found'}

TRUST PROFILES:
Complainant (${complaint.complainant_name}):
${trustData.trustScores.find(s => s.user_id === complaint.filed_by)
  ? `  - Trust Score: ${trustData.trustScores.find(s => s.user_id === complaint.filed_by).score}
  - On-time Rate: ${trustData.trustScores.find(s => s.user_id === complaint.filed_by).on_time_rate}
  - Completed Committees: ${trustData.trustScores.find(s => s.user_id === complaint.filed_by).completed_committees_count}`
  : '  - No trust score data available'}

Accused (${complaint.accused_name || 'Unknown'}):
${trustData.trustScores.find(s => s.user_id === complaint.accused_user_id)
  ? `  - Trust Score: ${trustData.trustScores.find(s => s.user_id === complaint.accused_user_id).score}
  - On-time Rate: ${trustData.trustScores.find(s => s.user_id === complaint.accused_user_id).on_time_rate}
  - Completed Committees: ${trustData.trustScores.find(s => s.user_id === complaint.accused_user_id).completed_committees_count}`
  : '  - No trust score data available'}

ACTIVE RISK FLAGS:
${trustData.riskFlags.length > 0
  ? trustData.riskFlags.map(f => `  - ${f.user_id === complaint.filed_by ? 'Complainant' : 'Accused'}: ${f.reason} (Cycle ${f.cycle_number}, ${f.committee_name}) - Flagged: ${f.flagged_at}`).join('\n')
  : '  No active risk flags'}

COMMITTEE CONTEXT:
- Name: ${committee?.name || 'Unknown'}
- Active Members: ${committee?.active_members || 0}
- Total Cycles: ${committee?.total_cycles || 0}
- Contribution Amount: Rs. ${committee?.contribution_amount || 0}
- Capacity: ${committee?.capacity || 0}
`;

  // Step 6: Call LLM to analyze evidence and produce case file
  const caseFile = await chatCompletionJSON(
    [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Investigate this complaint and produce a structured case file:\n\n${evidenceContext}` },
    ],
    {
      model: INVESTIGATOR_MODEL,
      temperature: INVESTIGATOR_TEMPERATURE,
      top_p: 0.9,
      max_tokens: 4096,
      timeoutMs: 60000,
    }
  );

  // Step 7: Validate output schema
  const requiredFields = ['case_summary', 'evidence_trail', 'recommended_priority', 'recommended_action', 'reasoning'];
  for (const field of requiredFields) {
    if (!caseFile[field]) {
      throw new Error(`Investigator output missing required field: ${field}`);
    }
  }

  // Step 8: Add metadata
  caseFile.investigation_metadata = {
    tools_called: toolsCalled,
    investigator_model: INVESTIGATOR_MODEL,
    investigated_at: new Date().toISOString(),
    investigation_duration_ms: Date.now() - startTime,
  };

  return caseFile;
}
