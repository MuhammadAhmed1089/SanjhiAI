import { query } from '../config/db.js';
import Groq from 'groq-sdk';

const SYSTEM_ASSISTANT_PROMPT = `You are Sanjhi AI, an expert, friendly multilingual assistant for a Pakistani Peer-to-Peer Savings Committee (Kameti / BC / Chit Fund) platform called Sanjhi.
You help users with questions regarding:
1. Creating and managing committee savings pools.
2. Community Trust Scores and how reliability points work (+15 pts on-time payments, +50 pts completed pools).
3. Supported payment methods across Pakistan (JazzCash, EasyPaisa, Direct Bank Transfer IBAN).
4. Payout turn schedules and automatic reminders.
5. Support queries and filing payment dispute complaints.

Answer clearly, professionally, and concisely in English or Roman Urdu depending on the user's query.`;

const KNOWLEDGE_BASE = [
  {
    keywords: ['create', 'committee', 'pool', 'start', 'organize'],
    response: `To create a committee pool on Sanjhi:\n\n1. Click **Create Committee** on your Dashboard.\n2. Enter a pool name (e.g. *Monthly Family Savings*).\n3. Set the monthly/bi-weekly contribution amount (e.g. PKR 5,000).\n4. Define the capacity (number of members) and interval.\n5. Share your unique **Invite Code** with trusted friends or family!`,
  },
  {
    keywords: ['trust', 'score', 'increase', 'calculate', 'reliability'],
    response: `Your **Community Trust Score** starts at **850 points**!\n\nHere is how you can boost your rating:\n• **On-time Payments (+15 pts per cycle)**: Submit your dues before the deadline.\n• **Completed Pools (+50 pts)**: Successfully finish full committee cycles without delays.\n• **Identity Verification (+30 pts)**: Verify your phone number and email address in Profile settings.`,
  },
  {
    keywords: ['payment', 'jazzcash', 'easypaisa', 'bank', 'due', 'pay'],
    response: `Sanjhi supports multiple payment methods across Pakistan:\n• **JazzCash Mobile Wallet**\n• **EasyPaisa Mobile Wallet**\n• **Direct Bank Transfer (IBAN)**\n\nAll payment receipts are verified on our PostgreSQL ledger for 100% transparency!`,
  },
  {
    keywords: ['payout', 'turn', 'schedule', 'receive', 'money'],
    response: `Payout turns are assigned fairly when a committee starts:\n• **Fixed Order**: Members get assigned turn #1, #2, #3 based on initial setup.\n• **Automatic Reminders**: Sanjhi AI alerts you 3 days before your turn payout is due to be released to your linked account!`,
  },
  {
    keywords: ['complaint', 'dispute', 'fraud', 'issue', 'help', 'support'],
    response: `If you have an issue or payment dispute:\n• Visit the **Support** section from the bottom navigation bar.\n• Click **File a Complaint** to submit details directly to our admin team.\n• Our AI triage system prioritizes urgent financial queries within 2 hours!`,
  },
];

/**
 * POST /api/assistant/chat
 * Handles assistant chat prompt using Groq AI or smart knowledge-base fallback
 */
export async function handleAssistantChat(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const lowerQuery = prompt.toLowerCase();
    let matchedResponse = null;

    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => lowerQuery.includes(kw))) {
        matchedResponse = item.response;
        break;
      }
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey && apiKey !== 'your_groq_api_key_here' && apiKey.trim() !== '') {
      try {
        const groq = new Groq({ apiKey });
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: SYSTEM_ASSISTANT_PROMPT },
            { role: 'user', content: prompt }
          ],
          model: 'qwen/qwen3.8-27b',
        });
        const aiReply = chatCompletion.choices[0]?.message?.content;
        if (aiReply) {
          return res.status(200).json({ response: aiReply });
        }
      } catch (aiErr) {
        console.error('Groq assistant error, falling back to KB:', aiErr.message);
      }
    }

    if (!matchedResponse) {
      matchedResponse = `I understand you are asking about "${prompt}".\n\nSanjhi AI is designed to help you manage your committee pools, track contributions, calculate trust scores, and escalate complaints. You can also explore our predefined topics or contact support if you need further help!`;
    }

    return res.status(200).json({ response: matchedResponse });
  } catch (error) {
    console.error('Error in assistant chat controller:', error);
    return res.status(500).json({ error: 'Failed to process assistant chat.' });
  }
}
