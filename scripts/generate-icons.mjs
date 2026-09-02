/**
 * generate-icons.mjs — Generates all Android mipmap launcher icons from the Sanjhi logo.
 * Run: node scripts/generate-icons.mjs
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_LOGO = path.resolve(__dirname, '../src/assets/sanjhi-ai-logo.png');

const ANDROID_RES = path.resolve(__dirname, '../android/app/src/main/res');

// All Android mipmap sizes: [folder, size in px]
const MIPMAP_SIZES = [
  ['mipmap-mdpi',    48],
  ['mipmap-hdpi',    72],
  ['mipmap-xhdpi',   96],
  ['mipmap-xxhdpi',  144],
  ['mipmap-xxxhdpi', 192],
];

async function generateIcons() {
  console.log('🎨 Generating Android launcher icons from Sanjhi logo...\n');

  for (const [folder, size] of MIPMAP_SIZES) {
    const dir = path.join(ANDROID_RES, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const outLauncher = path.join(dir, 'ic_launcher.png');
    const outRound    = path.join(dir, 'ic_launcher_round.png');
    const outFg       = path.join(dir, 'ic_launcher_foreground.png');

    // Standard square launcher icon
    await sharp(SRC_LOGO).resize(size, size).toFile(outLauncher);
    // Round launcher icon (same image, Android clips it to circle)
    await sharp(SRC_LOGO).resize(size, size).toFile(outRound);
    // Foreground (for adaptive icon – larger canvas with padding)
    const fgSize = Math.round(size * 1.5);
    await sharp(SRC_LOGO)
      .resize(size, size)
      .extend({
        top: Math.round((fgSize - size) / 2),
        bottom: Math.round((fgSize - size) / 2),
        left: Math.round((fgSize - size) / 2),
        right: Math.round((fgSize - size) / 2),
        background: { r: 0, g: 105, b: 114, alpha: 1 }, // #006972 brand teal
      })
      .resize(fgSize, fgSize)
      .toFile(outFg);

    console.log(`  ✅ ${folder} (${size}px) → ic_launcher, ic_launcher_round, ic_launcher_foreground`);
  }

  console.log('\n🚀 All Android icons generated successfully!');
  console.log('Next steps:');
  console.log('  1. npx cap sync');
  console.log('  2. cd android && .\\gradlew assembleDebug');
}

generateIcons().catch(err => {
  console.error('❌ Icon generation failed:', err.message);
  process.exit(1);
});
