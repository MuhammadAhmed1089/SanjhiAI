import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcLogo = path.resolve(__dirname, '../src/assets/sanjhi-ai-logo.png');
const outPublicLogo = path.resolve(__dirname, '../public/sanjhi-logo.png');
const outB64Json = path.resolve(__dirname, '../scripts/logo-b64.json');

async function processLogo() {
  const buffer = await sharp(srcLogo)
    .resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(outPublicLogo, buffer);
  const b64 = 'data:image/png;base64,' + buffer.toString('base64');
  fs.writeFileSync(outB64Json, JSON.stringify({ b64 }), 'utf8');
  console.log('✅ Generated public/sanjhi-logo.png and Base64 string (' + b64.length + ' chars)');
}

processLogo().catch(err => console.error(err));
