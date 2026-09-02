import 'dotenv/config';
import { retrieveDocs } from '../backend/assistant/retriever.js';
import { chatCompletion } from '../backend/utilities/groqLlm.js';

const prompt = 'trust score kaise barhayein?';
console.log('QUERY:', prompt);

const docs = await retrieveDocs(prompt);
console.log('RETRIEVED:', docs.map((d) => `${d.title} (${d.category})`).join(' | ') || '(none)');

if (docs.length > 0) {
  const context = docs
    .map((d, i) => `--- Document ${i + 1}: "${d.title}" ---\n${d.content}`)
    .join('\n\n');
  const reply = await chatCompletion(
    [
      {
        role: 'system',
        content:
          'You are Sanjhi AI. Answer ONLY from the KNOWLEDGE CONTEXT. Reply in the user\'s language (Roman Urdu here). Plain text, bullets with •, under 120 words.\n\nKNOWLEDGE CONTEXT:\n' +
          context,
      },
      { role: 'user', content: prompt },
    ],
    { temperature: 0.3, max_tokens: 400 }
  );
  console.log('\nGENERATED ANSWER:\n', reply);
}

process.exit(0);
