/**
 * openrouterLlm.js — OpenAI-compatible chat completion client for OpenRouter.
 *
 * OpenRouter aggregates models from multiple providers (NVIDIA, Google, etc.)
 * and exposes them via an OpenAI-compatible API.
 *
 * Used by the Complaint Case-Builder Agent to access Nemotron 3 Super.
 */

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = 'nvidia/nemotron-3-super-120b-a12b';
const FALLBACK_MODEL = 'google/gemma-4-31b-it';

/**
 * Send a chat completion request to OpenRouter and return the assistant content.
 * @param {Array<{role: string, content: string}>} messages
 * @param {{ model?: string, temperature?: number, top_p?: number, max_tokens?: number, timeoutMs?: number }} options
 * @returns {Promise<string>} assistant message content
 */
export async function chatCompletion(messages, options = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const model = options.model || DEFAULT_MODEL;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 30000);

  try {
    const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
        'X-Title': 'Sanjhi AI - Complaint Case Builder',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.3,
        top_p: options.top_p ?? 0.9,
        max_tokens: options.max_tokens ?? 4096,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      throw new Error(`OpenRouter API error ${res.status}: ${errBody.slice(0, 200)}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('OpenRouter API returned empty content');
    return content;
  } catch (err) {
    // If the primary model fails, try fallback
    if (model !== FALLBACK_MODEL && err.message.includes('not available')) {
      console.warn(`LLM: ${model} unavailable, falling back to ${FALLBACK_MODEL}`);
      return chatCompletion(messages, { ...options, model: FALLBACK_MODEL });
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Send a chat completion request and parse JSON response.
 * Useful for structured outputs (case files, judge assessments).
 * @param {Array<{role: string, content: string}>} messages
 * @param {{ model?: string, temperature?: number, top_p?: number, max_tokens?: number }} options
 * @returns {Promise<object>} parsed JSON response
 */
export async function chatCompletionJSON(messages, options = {}) {
  const content = await chatCompletion(messages, options);

  // Try to extract JSON from the response (may be wrapped in markdown code blocks)
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || content.match(/({[\s\S]*})/);
  const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;

  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('Failed to parse LLM JSON response:', err.message);
    console.error('Raw content:', content);
    throw new Error('LLM returned invalid JSON');
  }
}
