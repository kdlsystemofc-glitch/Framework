import assert from 'node:assert';
import { AssetClassifier } from '../src/analyzer/asset.classifier.js';

console.log('Running classifier tests...');
const logoRes = AssetClassifier.classify('logo-main.svg', 'assets/logo-main.svg');
assert.strictEqual(logoRes.category, 'Logo');

const briefingRes = AssetClassifier.classify('briefing-cliente.pdf', 'briefing/briefing-cliente.pdf');
assert.strictEqual(briefingRes.category, 'Briefing');

const imageRes = AssetClassifier.classify('hero-dish.png', 'assets/hero-dish.png');
assert.strictEqual(imageRes.category, 'Image');

const videoRes = AssetClassifier.classify('promo.mp4', 'motion/promo.mp4');
assert.strictEqual(videoRes.category, 'Video');

console.log('✔ classifier.test.ts passed');
