import assert from 'node:assert';
import { ComponentLibrary } from '../src/components/component-library.js';

export async function runComponentLibraryTests() {
  console.log('Running component library tests...');

  const lib = new ComponentLibrary();
  lib.registerComponent({
    name: 'HeroBentoV1',
    category: 'hero',
    code: '<section></section>',
    tags: ['bento', 'hero'],
  });

  const heroComps = lib.getByCategory('hero');
  assert.strictEqual(heroComps.length, 1);
  assert.strictEqual(heroComps[0].name, 'HeroBentoV1');

  console.log('✔ component-library.test.ts passed');
}
